<!-- IconListNavigator2 -->
<template>
  <div class="editor-wrapper">
    <div class="section-list">
      <div class="image-wrapper">
        <q-img
          :src="imgURL"
          alt="Show me the Image"
          spinner-color="blue"
          class="image"
        />
      </div>

      <SectionIconDisplayItem
        v-for="section in sections"
        :key="section.id"
        :section="section"
        :selectedItem="selectedSectionId"
        @item-click="openDrawer"
        @update-drawer="$emit('update-drawer', $event)"
      />
    </div>
    <div class="drawer" v-show="!showFullView" :class="{ 'full-view': showFullView }">
      <SummaryViewEditor
      :is="currentEditor"
      v-if="selectedSection"
      :section="selectedSection"
      @update-drawer="updateDrawer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import SectionIconDisplayItem from './SectionIconDisplayItem.vue'; ///Users/danielspirn/Projects/Composer/composer/quasar-app/src/components/SectionIconDisplayItem.vue
import SummaryViewEditor from './SummaryViewEditor.vue';
import { Section } from 'components/models';

const emits = defineEmits(['item-click', 'update-drawer']); // add 'update-drawer' event

const props = defineProps({
  sections: {
    type: Array as () => Section[],
    required: true
  },
  imgURL: {
    type: String,
    default: 'https://picsum.photos/500/300'
  }
});

function updateDrawer(state: string) {
  console.log('Update Drawer =' + state);
  emits('update-drawer', state)
}

/*
const sections: Section[] = [
  {
    id: '1',
    icon: 'icon1',
    label: 'Section 1',
    title: 'Section 1 Title',
    content: 'Section 1 Content',
    type: 'text',
    allowsChildren: false
  },
  {
    id: '2',
    icon: 'icon2',
    label: 'Section 2',
    title: 'Section 2 Title',
    content: 'Section 2 Content',
    type: 'image',
    allowsChildren: true,
    children: [
      {
        id: '2-1',
        label: 'Subsection 1',
        title: 'Subsection 1 Title',
        content: 'Subsection 1 Content',
        type: 'text',
        allowsChildren: false
      },
      {
        id: '2-2',
        label: 'Subsection 2',
        title: 'Subsection 2 Title',
        content: 'Subsection 2 Content',
        type: 'image',
        allowsChildren: false
      }
    ]
  }
];
*/
const selectedSection = ref<Section | null>(null);
const selectedSectionId = ref<string>('');
const showFullView = ref(false);

const currentEditor = computed(() => {
  if (selectedSection.value) {
    switch (selectedSection.value.type) {
      case 'text':
        return 'TextEditor';
      case 'image':
        return 'ImageEditor';
      default:
        return null;
    }
  }
  return null;
});

function openDrawer(section: Section) {
  selectedSection.value = section;
  showFullView.value = true;
  selectedSectionId.value = section.id;
}

function closeDrawer(section: Section) {
  selectedSection.value = null;
  showFullView.value = false;
  selectedSectionId.value = '';
}

</script>

<style scoped>
.editor-wrapper {
  display: flex;
  flex-direction: row;
  padding: 0;
}

.section-list {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.image-wrapper {
  position: relative;
  padding-bottom: 25px;
}

.image {
  width: 100%;
  height: 75px;
}

.drawer {
  transition: transform 0.3s;
  transform: translateX(100%);
  width: 100%;
  max-width: 600px;
}

.full-view {
  transform: translateX(0);
}
</style>

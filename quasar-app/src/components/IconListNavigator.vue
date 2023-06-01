<template>
  <div class="editor-wrapper">
    <div class="section-list">
      <div style="padding-bottom: 25px; right:2px; left:2px; top:2px; position: relative;">
        <q-img
      :src="imgURL"
      alt="Show me the Image"
      spinner-color="blue"
      style="height: 75px; width:100%"
    />
      </div>

      <SectionIconDisplayItem
        v-for="section in sections"
        :key="section.id"
        :section="section"
        :selectedItem="selectedSectionId"
        @item-click="openDrawer"
      />
    </div>
    <div class="drawer" :class="{ 'full-view': showFullView }">
      <SummaryViewEditor :is="currentEditor" v-if="selectedSection" :section="selectedSection" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import SectionIconDisplayItem from './SectionIconDisplayItem.vue'; ///Users/danielspirn/Projects/Composer/composer/quasar-app/src/components/SectionIconDisplayItem.vue
import SummaryViewEditor from './SummaryViewEditor.vue';
import { Section } from 'components/models';

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
</script>

<style scoped>
.editor-wrapper {
  display: flex;
  flex-direction: row;
  padding: 0px;
}
.section-list {
  display: flex;
  flex-direction: column;
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

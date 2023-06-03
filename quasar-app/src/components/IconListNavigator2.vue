<!-- IconListNavigator2 -->
<template>
  <div class="col"> <!-- editor-wrapper -->
    <div class="image-wrapper">
        <q-img
          :src="imgURL"
          alt="Show me the Image"
          spinner-color="blue"
          class="image"
        />
      </div>
    <div class="row"> <!-- columnsEdit -->
      <div class="col"> <!-- section-list -->
      <SectionIconDisplayItem
        v-for="section in sections"
        :key="section.id"
        :section="section"
        :selectedItem="selectedSectionId"
        @item-click="itemSelected"
      />
    </div>
    <div v-show="displayEditor" class="editor-wrapper"> <!-- editors -->
      <SummaryViewEditor
      :is="currentEditor"
      v-if="selectedSection"
      :section="selectedSection"
      @update-editor-state="editorUpdate"
      @outline-book="updateOutline" />
    </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import SectionIconDisplayItem from './SectionIconDisplayItem.vue'; ///Users/danielspirn/Projects/Composer/composer/quasar-app/src/components/SectionIconDisplayItem.vue
import SummaryViewEditor from './SummaryViewEditor.vue';
import { Section } from 'components/models';

const selectedSection = ref<Section | null>(null);
const selectedSectionId = ref<string>('');
const showFullView = ref(false);

const emits = defineEmits(['item-click', 'update-drawer']); // add 'update-drawer' event

const props = defineProps({
  drawOpen: {
    type: Boolean,
    required: true,
    default: false
  },
  sections: {
    type: Array as () => Section[],
    required: true
  },
  imgURL: {
    type: String,
    default: 'https://picsum.photos/500/300'
  }
});

function itemSelected(section: Section) {
  console.log('Item Selected =' + section.label);
  selectedSection.value = section;
  selectedSectionId.value = section.id;
  if (!props.drawOpen) {
    console.log('Time to open the Drawer Open=' + props.drawOpen);
    emits('update-drawer', 'Open')
  }
}

function unSelectItems() {
  console.log('unSelectItems =' + 'all');
  selectedSection.value = null;
  selectedSectionId.value = '';
}

function editorUpdate(state: string) {
  console.log('Drawer: editorUpdate  =' + state);
  if (state == 'Close') {
    unSelectItems();
  }
  emits('update-drawer', state)
}

function updateDrawer(state: string) {
  console.log('Update Drawer =' + state);
  emits('update-drawer', state)
}

function updateOutline(state: string) {
  console.log('Update Outline =' + state);
  //Call Store here
}


const displayEditor = computed(() => {
  console.log('Drawer Open Closed =' + props.drawOpen);
  if (props.drawOpen == true) {
    return true;
  }
  return false;
});

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
  height: 100px;
}

.editor-wrapper {
 /* transition: transform 0.3s;
  transform: translateX(100%); */
  width: 100%;
  width: 500px;
}

.full-view {
  transform: translateX(0);
}
</style>

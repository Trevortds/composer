<template>
  <q-page class="row items-center justify-evenly">

    <outline-editor :sectionData="cDoc.metaData" />

  </q-page>
</template>

<script setup lang="ts">
import { ComposerDocument } from 'components/models';
import { fictionBookTemplate } from 'components/TypesTemplates';
import OutlineEditor from 'components/OutlineEditor.vue';
//import { ref } from 'vue';

const cDoc: ComposerDocument = { ...fictionBookTemplate };

/*
const sections = ref<Section[]>([
  { id: '1', title: 'Plot Summary', label: 'Summary', content: 'Test 1', allowsChildren: false },
  { id: '2', title: 'Setting and Timeline', label: 'Setting', content: 'content of content', allowsChildren: false },
  { id: '3', title: 'Characters', label: 'Characters', content: 'More', allowsChildren: true },
  { id: '4', title: 'Writing Style', label: 'Style', content: '', allowsChildren: false },
  { id: '5', title: 'Length of Book', label: 'Length', content: 'not', allowsChildren: false }
])
const meta = ref<Meta2>({
  totalCount: 1200
});
*/

</script>

<template>
  <q-page class="container">
    <q-editor v-model="editorDoc" class="fullscreen-editor" />
  </q-page>
</template>

<script setup lang="ts">
import { ComposerDocument } from 'components/models';
import { fictionBookTemplate } from 'components/TypesTemplates';
import { ref } from 'vue';

const editorDoc = ref('');


</script>

<style>
.container {
  height: 90vh; /* Set the height of the container to 100% of the viewport */
  /* height: 100%; /* Set the height of the container to 100% of the viewport */
  width: 100%; /* Set the width of the container to 100% */
}

.fullscreen-editor {
  position: relative;
  top: 20px;
  bottom: 10px;
  left: 5px;
  right: 10px;
  height: 100%; /* Set the height of the editor to 100% of its parent container */
  width: 100%; /* Set the width of the editor to 100% */
}
</style>

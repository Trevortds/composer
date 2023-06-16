<template>
  <router-view v-if="initialized"/>
</template>

<script setup lang="ts">

import {useAiDocumentStore} from 'stores/ai-document-store';
import {ref} from 'vue';

const store = useAiDocumentStore();
const initialized = ref(false);
store.init()
  .then(() => {
    initialized.value = true;
  })
  .catch((err) => {
    console.error(err);
  });

</script>

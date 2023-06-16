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
    console.log("Initialized")
    initialized.value = true;
  })
  .catch((err) => {
    console.log("failed to initialize")
    console.error(err);
  });

</script>

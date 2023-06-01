<template>
    <q-menu>
        <div class="row no-wrap q-pa-md">
          <div class="column">
            <div class="text-h6 q-mb-md">Settings</div>
            <div class="text-caption">
              <q-toggle v-model="useOpenAI" label="Use Open AI" />
              <q-input v-show="useOpenAI" label="OpenAI API Key" :model-value="useOpenAIKey" outlined />
            </div>
            <div class="text-caption">
              <q-toggle v-model="useHuggingFaces" label="Use Hugging Faces" />
              <q-input v-show="useHuggingFaces" label="HuggingFaces API Key" :model-value="useHuggingFacesKey" outlined />
            </div>
          </div>

          <q-separator vertical inset class="q-mx-lg" />

          <div class="column items-center">
            <q-avatar size="72px">
              <img src="https://cdn.quasar.dev/img/avatar4.jpg">
            </q-avatar>

            <div class="text-subtitle1 q-mt-md q-mb-xs">John Doe</div>

            <q-btn
              color="primary"
              label="Logout"
              push
              size="sm"
              v-close-popup
            />
          </div>
        </div>
    </q-menu>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const useOpenAI = ref(true)
const useHuggingFaces = ref(false)

const useOpenAIKey = ref('');
const useHuggingFacesKey = ref('');

</script>

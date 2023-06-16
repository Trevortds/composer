<!-- MainLayout -->
<template>
  <q-layout view="lHh Lpr lFf">
    <q-header bordered class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <q-icon name="mdi-ghost-outline" size="2rem" />
          </q-avatar>
          Ghost Writer
        </q-toolbar-title>

        <div>version v0.0.1</div>
        <q-btn dense flat round icon="settings" >
          <SettingsMenu />
        </q-btn>

        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>

    <!--
      <q-tabs align="center">
        <q-route-tab to="pages/IndexPage" label="Fiction" />
        <q-route-tab to="pages/IndexPage" label="Non-Fiction" />
        <q-route-tab to="pages/IndexPage" label="Presentation" />
      </q-tabs>
          -->
    </q-header>

    <!--  show-if-above -->
    <q-drawer v-model="rightDrawerOpenAlways" side="right" overlay elevated :width="rightDrawWidth">
      <IconListNavigator2 :sections="cDoc.metaData" @update-drawer="updateDrawer" :draw-open="rightDrawerOpen" />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SettingsMenu from 'components/SettingsMenu.vue';
import EssentialLink from 'components/EssentialLink.vue';
import IconListNavigator2 from 'components/IconListNavigator2.vue';
import {useAiDocumentStore} from 'stores/ai-document-store';
import {ComposerDocument} from 'common';

const store = useAiDocumentStore();

const cDoc: ComposerDocument = store.currentDocument as ComposerDocument;

const rightDrawWidth = ref(1200);
const rightDrawOpenState = ref('New');
// New
// Edit
// Close

const leftDrawerOpen = ref(false)
const rightDrawerOpen = ref(false)
const rightDrawerOpenAlways = ref(true)

const useOpenAI = ref(true)
const useHuggingFaces = ref(false)

const useOpenAIKey = ref('');
const useHuggingFacesKey = ref('');


function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function updateDrawer(state: string) {
  console.log("Update Drawer State="+ state);
  rightDrawOpenState.value = state;
  if (state == 'Close' || state == 'Edit' ) {
   // toggleRightDrawer();
  }
  toggleRightDrawer();

}

function toggleRightDrawer() {
  rightDrawerOpen.value = !rightDrawerOpen.value
  if (rightDrawerOpen.value) {
    rightDrawWidth.value = 600;
  } else {
    rightDrawWidth.value = 82;
  }
}

const essentialLinks = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
];

</script>

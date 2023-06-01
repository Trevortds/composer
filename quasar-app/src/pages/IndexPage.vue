<template>
  <q-page class="row">
    <q-splitter v-model="outlineWidth" unit="px">
    <template v-slot:before>
    <div>
      <q-list>
        <q-item-label
          header
        >
          Story Outline
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </div>
    </template>
    <template v-slot:after>
    <div class="container">
      <q-editor v-model="editorDoc" class="fullscreen-editor" />
      <q-space width="150" />
    </div>
  </template>
</q-splitter>
  </q-page>
</template>

<script setup lang="ts">
import { ComposerDocument } from 'components/models';
import EssentialLink from 'components/EssentialLink.vue';
import { fictionBookTemplate } from 'components/TypesTemplates';
import { ref } from 'vue';

const outlineWidth  = ref(200);
const editorDoc= ref('');



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

<style>
.container {
  height: 90vh; /* Set the height of the container to 100% of the viewport */
  /* height: 100%; /* Set the height of the container to 100% of the viewport */
  width: 100%; /* Set the width of the container to 100% */
  margin-right: 250px;
}

.fullscreen-editor {
  /*
  top: 20px;
  bottom: 10px;
  left: 5px;
  right: 110px;
  */
  height: 100%; /* Set the height of the editor to 100% of its parent container */
  width: 700px; /* Set the width of the editor to 100% */
}
</style>

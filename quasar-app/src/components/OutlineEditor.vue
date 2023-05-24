<template>
  <div>
    <q-splitter
      v-model="splitterModel"
      style="height: 400px"
    >
      <template v-slot:after>
        <q-tab-panels
          v-model="selected"
          animated
          transition-prev="slide-down"
          transition-next="slide-up"
        >
          <q-tab-panel style="min-width: 500px" v-for="section in sectionData" :key="section.id" :name="section.id.toString()">
            <div class="text-h4 q-mb-md" >{{ section.title }}</div>
            <SummaryViewEditor :section="section" />
          </q-tab-panel>
        </q-tab-panels>
      </template>
      <template v-slot:before>
        <div class="q-pa-md">
          <q-tree
            :nodes="sectionData"
            node-key="id"
            selected-color="primary"
            v-model:selected="selected"
            default-expand-all
            no-selection-unset
          />
          <div v-show="false">Meta is {{ meta.totalCount }}</div>
        </div>
      </template>
    </q-splitter>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Section, Meta2 } from 'components/models';
import SummaryViewEditor from './SummaryViewEditor.vue';

const splitterModel = ref(20);

const props = defineProps({
  sectionData: {
    type: Array as () => Section[],
    required: true
  },
  meta: {
    type: Meta2,
    required: false,
    default: () => ({ totalCount: 100 })
  }
});

const selected = ref('1');



</script>

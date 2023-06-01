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

            selected-color="primary"
            v-model:selected="selected"
            default-expand-all
            no-selection-unset
          >
        </q-tree>
        </div>

      </template>
    </q-splitter>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps } from 'vue';
import { Section } from 'components/models';
import SummaryViewEditor from './SummaryViewEditor.vue';

const splitterModel = ref(20);

const props = defineProps({
  sectionData: {
    type: Array as () => Section[],
    required: true
  }
});

const selected = ref('1');

const treeData = computed(() => {
  return props.sectionData.map(node => {
    return {
      ...node,
      label: `<q-icon name="${node.icon}" class="text-primary" size="md" /> ${node.label}`
    }
  })
});

</script>

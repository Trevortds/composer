<!-- SectionIconDisplayItem -->
<template>
  <div class="section-item column justify-start" :class="{ selected: selected }" @click="handleItemClick">
    <q-icon :name="section.icon" class="icon col-1" size="2.2em" />
    <div class="label col-1">{{ section.label }}</div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';
import { QIcon } from 'quasar';
import { Section } from 'components/models';

const props = defineProps({
  section: {
    type: Object as () => Section,
    required: true
  },
  selectedItem: {
    type: String,
    required: true
  }
});

const selected = computed(() => {
  if (props.selectedItem == props.section.id) {
    return true;
  }
  return false;
});

const emits = defineEmits(['item-click', 'update-drawer']);

function handleItemClick() {
  emits('item-click', props.section);
  emits('update-drawer', 'Edit'); // emit event here
}
</script>

<style scoped>
.section-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 10px;
}

.icon {
  padding-bottom: 10px;
  color: grey;
}

.label {
  font-size: 0.8rem;
  color: grey;
}

.section-item.selected .icon,
.section-item.selected .label {
  color: blue;
}

/* Hover state */
.section-item:hover .icon,
.section-item:hover .label {
  color: black;
}
</style>

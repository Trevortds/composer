<template>
  <div>
            <q-form action="https://some-url.com" method="post" @submit.prevent="onSubmit">
              <div v-show="calculatedEmpty || editState" class="q-pa-md" style="max-width: 300px">
                <p style="font-size: 0.7em; color:darkgray">{{ section.instructions }}</p>
                <q-input
                 v-model="inputContent"
                 filled
                 type="textarea"/>

                 <div class="row justify-end q-gutter-sm " style="padding-top: 10px;">
                  <q-btn push color="white" text-color="primary" label="Revert" size="xs" @click="revert" />
                  <q-btn push size-xs color="primary" label="Save" size="xs" @click="save"/>
                </div>
               </div>
              <div v-show="!editState && !calculatedEmpty">
                content is {{ section.content }} and this is the data {{ inputContent }}
                <div class="row justify-end q-gutter-sm" style="padding-top: 20px;">
                  <q-btn push size-sm color="white" text-color="primary" label="Edit" size="xs" @click="edit" />
                </div>
              </div>
            </q-form>


      </div>
</template>

<script setup lang="ts">
import { ref, computed, PropType } from 'vue';
import { Section } from 'components/models';

const props = defineProps({
  section: {
    type: Object as PropType<Section>,
    required: true
  },

});

const inputContent = ref(props.section.content);

const editState = ref(false);

const calculatedEmpty = computed(() => {
  return inputContent.value === '';
});

const save = () => {
  //props.section.content = inputContent.value;
  editState.value = false;
};

const revert = () => {
  inputContent.value = props.section.content;
  editState.value = false;
};

const edit = () => {
  editState.value = true;
};

const onSubmit = (event: Event) => {
  event.preventDefault();
  console.log('submitted');
  editState.value = false;
};

</script>

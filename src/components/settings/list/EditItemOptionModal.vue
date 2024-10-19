<template>
  <Dialog
    v-model:visible="visible"
    modal
    :draggable="false"
    :style="{ width: '40rem' }"
  >
    <template #header>
      <div class="flex justify-center items-center ml-7">
        <p class="font-semibold text-xl flex justify-center text-center">
          Item options
        </p>
      </div>
    </template>
    <div class="px-7 mb-5">
      <div class="flex flex-col align-items-center gap-3 mb-5">
        <label for="listname" class="font-semibold w-6rem text-lg"
          >Item name <span class="text-red-400">*</span></label
        >
        <InputText
          id="listname"
          class="flex-auto"
          v-model="listItemName"
          placeholder="Item name"
          autocomplete="off"
        />
      </div>
    </div>

    <div class="px-7 mb-5">
            <p class="text-lg font-medium">Used in</p>
            <div class="ml-2 py-2">
                <p v-for="list in listOptions" class=" text-lg"><i class="mr-2 pi pi-minus"></i> {{ list.option }}</p>
               
            </div>
        <div>

        </div>
      </div>
      
    <div class="flex justify-center mt-10 mr-5">
      <Button
        label="Save"
        icon="pi pi-check"
        class="bg-success text-white hover:bg-success hover:border-success w-28 ml-2"
        @click="handleEditItem"
      />
    </div>
  </Dialog>
</template>

<script setup>
import { watch, ref } from "vue";

const emit = defineEmits();
const props = defineProps({
  editableItem: {
    type: Object,
    required: true,
  },
});

const listOptions = [
    { option:"Form to doc" },
    { option:"Table to doc" }
  ]

const visible = ref(false);
const listItemName = ref(props.editableItem.title);

watch(
  () => props.editableItem,
  (newVal) => {
    listItemName.value = newVal.title;
  }
);

const handleEditItem = () => {
  const editedData = {
    id: props.editableItem.id,
    title: listItemName.value,
  };

  emit("editItem", editedData);

  listItemName.value = "";
  emit("cancel");
};
</script>
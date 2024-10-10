<template>
  <Dialog
    v-model:visible="visible"
    modal
    :draggable="false"
    :style="{ width: '40rem' }"
  >
    <template #header>
      <div class="flex justify-center items-center ml-5">
        <p class="font-semibold text-xl flex justify-center text-center">
          Item options
        </p>
      </div>
    </template>

    <div class="px-5 my-5">
      <div class="flex flex-col align-items-center gap-3 mb-5">
        <label for="listname" class="font-semibold w-6rem text-lg"
          >Item name <span class="text-red-400">*</span></label
        >
        <InputText
          id="listname"
          class="flex-auto"
          v-model="listItemName"
          placeholder="list Item Name"
          autocomplete="off"
        />
      </div>
    </div>

    <div
      v-if="props.editableItem?.level != 3"
      class="flex align-items-center px-5 mt-5"
    >
      <Checkbox
        v-model="containsublist"
        inputId="containsublist"
        name="sublist"
        value="sublist"
        :binary="true"
      />
      <label for="containsublist" class="ml-2">Contains sublist</label>
    </div>

    <div class="flex justify-center mt-5 mr-5">
      <Button
        label="Save"
        icon="pi pi-check"
        class="bg-success text-white hover:bg-success hover:border-success w-28"
        @click="handleEditItem"
      />
    </div>

    <Dialog
      v-model:visible="containsublist"
      header="Sublist"
      modal
      :style="{ width: '25rem' }"
    >
      <span class="p-text-secondary block mb-5"
        >Do you want to create a new Sublist?</span
      >

      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="No"
          outlined
          @click="containsublist = false"
        ></Button>

        <Button
          type="button"
          label="Yes"
          @click="emitOpenCreateListModal"
        ></Button>
      </div>
    </Dialog>
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

const containsublist = ref(false);
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

const emitOpenCreateListModal = () => {
  containsublist.value = false;
  emit("openCreateListModal", props.editableItem);
};
</script>

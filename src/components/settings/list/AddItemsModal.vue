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
          Add items
        </p>
      </div>
    </template>

    <div class="px-5 mb-5">
      <div class="flex flex-col align-items-center gap-2 mb-3">
        <label for="listitems" class="font-semibold w-6rem text-lg"
          >List items<span class="text-red-400">*</span></label
        >
        <span class="text-sm text-surface-500"
          >Multiple entries are allowed
        </span>
        <Textarea
          id="listItems"
          v-model="listItem"
          rows="10"
          cols="20"
          placeholder="List item"
        />
      </div>
    </div>

    <div class="flex justify-center mt-5 mr-5">
      <Button
        label="Save"
        icon="pi pi-check"
        class="bg-success text-white hover:bg-success hover:border-success w-28"
        @click="handleAddItems"
      />
    </div>
  </Dialog>
</template>

<script setup>
import { ref } from "vue";
import { useToast } from "primevue/usetoast";
const toast = useToast();

const visible = ref(false);
const listItem = ref("");
const listItems = ref([]);

const emit = defineEmits();

const handleAddItems = () => {
  const items = listItem.value
    .split(/[\n,]+/)
    .map((item) => item.trim())
    .filter((item) => item !== "")
    .map((item) => ({ name: item }));

  listItems.value = listItems.value.concat(items);

  emit("addItems", listItems.value);
  listItem.value = "";
  listItems.value = [];
  emit("cancel");
};
</script>

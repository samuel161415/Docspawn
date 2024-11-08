<template>
  <div class="h-[50vh] overflow-auto px-5">
    <!-- Simple list input fields -->
    <div class="flex flex-col align-items-center gap-2 mb-3">
        <div class="flex flex-col gap-2 mb-6">
      <label for="sublistName" class="font-semibold w-6rem text-lg">
        Sublist name <span class="text-red-400">*</span>
      </label>
      <span v-if="addClicked && !sublistName.trim()" class="text-sm text-error">
        Sublist name should not be empty
      </span>
      <InputText
        id="sublistName"
        v-model="sublistName"
        :placeholder="level===-1 ? 'Enter list name':'Enter sublist name'"
        :invalid="addClicked && !sublistName.trim()"
      />
    </div>
      <span class="text-sm text-surface-500">
        Multiple entries are allowed <br />(Comma separated entries)
      </span>
      <span v-if="addClicked && !sublistItem.trim()" class="text-sm text-error">
        <font-awesome-icon
          :icon="['fas', 'exclamation-triangle']"
          class="text-error mr-2"
        ></font-awesome-icon>
        You should add items
      </span>
      <Textarea
        id="sublistItems"
        v-model="sublistItem"
        rows="10"
        cols="30"
        placeholder="List item"
        :invalid="addClicked && !sublistItem.trim()"
      />
    </div>
    <Button
      label="Add"
      icon="pi pi-plus"
      @click="handleAdd"
      class="bg-success text-white hover:bg-success hover:border-success my-2"
    />
    <DataTable
      :value="sublistItems"
      striped-rows
      show-gridlines
      scrollable
      scrollHeight="400px"
      :reorderableColumns="true"
      @rowReorder="onRowReorder"
      tableStyle="min-width: 30rem"
    >
      <Column field="index" rowReorder style="width: 3%">
        <template #rowreordericon>
          <font-awesome-icon
            :icon="['fas', 'bars']"
            class="cursor-move p-6"
          ></font-awesome-icon>
        </template>
      </Column>
      <Column field="name" header="Name">
        <template #body="{ data }">
          <p class="ml-2">{{ data["name"] }}</p>
        </template>
      </Column>
      <Column field="action" header="Actions" style="width: 3%">
        <template #body="{ data }">
          <div class="flex justify-center">
            <font-awesome-icon
              :icon="['fas', 'trash-alt']"
              class="text-error cursor-pointer"
              @click="deleteItem(data)"
            ></font-awesome-icon>
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Textarea from "primevue/textarea";
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

const props = defineProps({
  initialItems: {
    type: Array,
    default: () => [],
  },
  initialSublistName:{
    type: String,
    default: ""
  },
  level : {
    type: Number,
    default: 0
  }

  
});
const emit = defineEmits(["updateItems","SublistNameUpdated"]);

const sublistItem = ref("");
const sublistItems = ref([...props.initialItems]);
const sublistName = ref(props.initialSublistName);
const addClicked = ref(false);

const handleAdd = () => {
    if (sublistItem.value.trim() === "") {
    addClicked.value = true;
    return;
  }

  const items = sublistItem.value
    .split(/[\n,]+/)
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => ({ name: item }));

  sublistItems.value = [...sublistItems.value, ...items];
  sublistItem.value = "";
  emit("updateItems", sublistItems.value);
};

const deleteItem = (item) => {
  sublistItems.value = sublistItems.value.filter((i) => i !== item);
  emit("updateItems", sublistItems.value);
};

const onRowReorder = (event) => {
  sublistItems.value = event.value;
  emit("updateItems", sublistItems.value);
};

watch(sublistName, () => emit("SublistNameUpdated", sublistName.value));
</script>

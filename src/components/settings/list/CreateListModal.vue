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
          Create list
        </p>
      </div>
    </template>

    <div class="px-5">
      <div class="flex flex-col align-items-center gap-3 mb-5">
        <label for="listname" class="font-semibold w-6rem text-lg"
          >List name <span class="text-red-400">*</span></label
        >
        <span v-if="addClicked && listName === ''" class="text-sm text-error"
          ><i class="pi pi-exclamation-triangle text-error mr-2"></i>List name
          should not be empty!</span
        >
        <InputText
          id="listname"
          class="flex-auto"
          v-model="listName"
          placeholder="List name"
          autocomplete="off"
          :invalid="addClicked && listName === ''"
        />
      </div>

      <div class="flex flex-col align-items-center gap-2 mb-3">
        <label for="listitems" class="font-semibold w-6rem text-lg"
          >List items<span class="text-red-400">*</span></label
        >
        <span class="text-sm text-surface-500"
          >Multiple entries are allowed <br />
          (Comma separated entries)</span
        >
        <span
          v-if="addClicked && listItems.length === 0"
          class="text-sm text-error"
          ><font-awesome-icon
            :icon="['fas', 'exclamation-triangle']"
            class="text-error mr-2"
          ></font-awesome-icon>
          You should Add Items!</span
        >
        <Textarea
          id="listItems"
          v-model="listItem"
          rows="10"
          cols="30"
          placeholder="List item"
          :invalid="addClicked && listItem === ''"
        />
      </div>

      <Button
        label="Add"
        icon="pi pi-plus"
        @click="handleAdd"
        class="bg-success text-white hover:bg-success hover:border-success my-2"
      />

      <DataTable
        :value="listItems"
        striped-rows
        show-gridlines
        :reorderableColumns="true"
        @rowReorder="onRowReorder"
        tableStyle="min-width: 30rem"
      >
        <Column
          field="index"
          :body-style="{ margin: '0rem', padding: '0rem' }"
          rowReorder
          style="width: 3%"
        >
          <template #rowreordericon>
            <font-awesome-icon
              :icon="['fas', 'bars']"
              class="cursor-move p-6"
              data-pc-section="rowreordericon"
            ></font-awesome-icon>
          </template>
        </Column>
        <Column
          field="name"
          header="Name"
          :body-style="{ margin: '0rem', padding: '0rem' }"
        >
          <template #body="{ data }">
            <p class="ml-2">
              {{ data["name"] }}
            </p>
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

    <div class="flex justify-center mt-5">
      <Button
        label="Create list"
        icon="pi pi-check"
        class="bg-success text-white hover:bg-success hover:border-success flex justify-center text-center"
        @click="handleCreateList"
      />
    </div>
  </Dialog>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["createList", "cancel", "error", "success"]);

const visible = ref(false);
const listName = ref("");
const listItem = ref("");
const listItems = ref([]);
const addClicked = ref(false);

const handleAdd = () => {
  const items = listItem.value
    .split(/[\n,]+/)
    .map((item) => item.trim())
    .filter((item) => item !== "")
    .map((item) => ({ name: item }));

  listItems.value = listItems.value.concat(items);
};

const handleCreateList = () => {
  addClicked.value = true;
  if (listName.value === "" || listItems.value.length === 0) {
    emit("error");
  } else if (listName.value !== "" && listItems.value.length > 0) {
    listItems.value = listItems.value.map((item) => {
      return item;
    });

    emit("createList", {
      listName: listName.value,
      listItems: listItems.value,
    });

    listName.value = "";
    listItem.value = "";
    listItems.value = [];

    emit("success");
    emit("cancel");
  }
};

const deleteItem = (data) => {
  listItems.value = listItems.value.filter((item) => item.name !== data.name);
};

// data table
const columns = ref([
  { field: "name", header: "Name" },
  { field: "action", header: "Action" },
]);

const onRowReorder = (event) => {
  listItems.value = event.value;
};
</script>

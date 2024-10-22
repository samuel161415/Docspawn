<template>
  <div
    :class="
    isSublistData ? `max-w-[calc(70vw-${c_level * 65}px)]`: ''  "
    class=""
  >
    <DataTable
      v-model:expandedRows="expandedRows"
      :value="tableData?.sublists"
      dataKey="id"
      :paginator="showPaginator"
      :rows="5"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      currentPageReportTemplate="{first} to {last} of {totalRecords}"
      class="border border-blue-500"
      showGridlines
    >
      <template v-if="calledFrom === 'root'" #header>
        <div class="flex flex-wrap justify-between items-center">
          <p class="font-poppins font-normal text-lg">
            {{ tableData.title }}
          </p>
          <div class="flex flex-col md:flex-row justify-end gap-2">
            <Button
              :icon="isAllExpanded ? 'pi pi-minus' : 'pi pi-plus'"
              :label="isAllExpanded ? 'Collapse' : 'Expand'"
              class="p-button-success w-36"
              outlined
              @click="toggleExpandCollapse"
            />
            <Button
              icon="pi pi-plus"
              label="Add item(s)"
              outlined
              @click="$emit('open-add-items', tableData.title)"
              class="text-success border-success hover:bg-green-50 w-40"
            />
            <Button
              icon="pi pi-cog"
              label="List options"
              class="p-button-success w-40 flex justify-start"
              outlined
              @click="$emit('open-list-options')"
            />
          </div>
        </div>
      </template>
      <template v-if="isSublistData" #header>
        <div
          class="flex justify-start border-b bg-white m-[-14px] pl-4 flex-wrap items-center"
        >
          <div class="w-[80px] px-[35px] py-[21px] border-r  h-full">
            <!-- <font-awesome-icon :icon="['fas', 'minus']" class="w-full" /> -->
            <i class="pi pi-minus "></i>
          </div>
          <p
            class="font-poppins p-[35px] py-[21px] whitespace-nowrap font-normal text-lg"
          >
            {{ tableData.name }}
          </p>
        </div>
      </template>

      <template v-if="!isSublistData">
        <Column class="w-[80px] bg-white text-center">
          <template #body="{ data }">
            <span
              v-if="hasSublists(data, 'branch')"
              @click="toggleRow(data)"
              class="w-[14px] cursor-pointer"
            >
              <i
                :class="
                  expandedRows[data.id]
                    ? 'pi pi-chevron-down'
                    : 'pi pi-chevron-right'
                "
                class="w-full"
              ></i>
            </span>
            <span v-else class="w-[14px]">
              <!-- <font-awesome-icon :icon="['fas', 'minus']" class="w-full" /> -->
              <i class="pi pi-minus w-full "></i>
            </span>
          </template>
        </Column>
        <Column
          v-for="(column, index) in columns"
          :key="index"
          :field="column"
          :header="null"
          :sortable="false"
          class="w-[calc(100% - 193px)] custom-padding"
          :class="headerClass"
        >
          <template #body="{ data, field }">
            <p class="font-poppins fles justify-start p font-normal">
              {{ data[field] }}
            </p>
          </template>
        </Column>

        <Column :header="null" class="bg-white text-center w-[80px]">
          <template #body="{ data }">
            <div class="flex justify-center">
              <Button
                icon="pi pi-cog"
                outlined
                class="p-button-rounded p-button-success flex justify-center items-center"
                @click="$refs[`menu-${data.id}`].toggle($event)"
              />
              <!--   {
                    label: 'Add Item',
                    icon: 'pi pi-plus',
                    command: () => $emit('open-add-items', tableData.title),
                  }, -->
              <Menu
                :ref="`menu-${data.id}`"
                :model="[
                  {
                    label: 'Add Sublist',
                    icon: 'pi pi-plus',
                    command: () =>
                      $emit('open-create-sublist-modal', {
                        ...data,
                        path: data.path,
                      }),
                  },
                  {
                    label: 'Edit',
                    icon: 'pi pi-pencil',
                    command: () =>
                      $emit('edit-item', { ...data, path: data.path }),
                  },
                  {
                    label: 'Delete',
                    icon: 'pi pi-trash',
                    command: () => $emit('open-delete', data),
                  },
                ]"
                popup
              />
            </div>
          </template>
        </Column>
      </template>

      <template v-else>
        <Column v-if="!isSublistData" expander class="w-[80px]"></Column>
        <Column
          v-for="(column, index) in columns"
          :key="index"
          :field="column"
          :header="isSublistData ? column : null"
          :sortable="isSublistData ? true : false"
          class="w-[calc(100% - 80px)] pl-[33px]"
          :class="headerClass"
        >
          <template #body="{ data, field }">
            <p
              class="font-poppins font-normal flex justify-center mt-3 whitespace-nowrap py-2"
            >
              {{ data[field] }}
            </p>
          </template>
        </Column>
      </template>

      <template v-if="tableData?.sublists?.length" #expansion="{ data }">
        <div
          v-if="hasSublists(data, 'branch')"
          :class="isChildSublistSimple(data) ? '' : 'max-w-[calc(70vw-65px)]'"
          class="pl-[79px] border-none mt-[-14px] mb-[-15px] overflow-auto"
        >
          <Table
            :tableData="data"
            @open-add-items="$emit('open-add-items', $event)"
            @open-list-options="$emit('open-list-options')"
            @edit-item="$emit('edit-item', $event)"
            @open-delete="$emit('open-delete', $event)"
            @open-create-sublist-modal="
              $emit('open-create-sublist-modal', $event)
            "
            calledFrom="nested"
            class="w-full"
            :c_level="Number(c_level) + 1"
          />
        </div>
      </template>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useToast } from "primevue/usetoast";
import Table from "~/components/settings/list/Table.vue";

const props = defineProps({
  tableData: Object,
  filters: Object,
  calledFrom: String,
  c_level: Number,
});

const emit = defineEmits();
const filters = ref(props.filters);
const expandedRows = ref({});
const toast = useToast();
const isAllExpanded = ref(false);

const headerClass = computed(() => {
  return isSublistData.value ? "sublist-padding" : "no-padding";
});

const showPaginator = computed(() => {
  return props.tableData.sublists?.length > 5;
});

const expandAll = () => {
  if (props.tableData?.sublists) {
    expandedRows.value = props.tableData.sublists.reduce(
      (acc, item) => (acc[item.id] = true) && acc,
      {}
    );
  }
};

const toggleExpandCollapse = () => {
  if (isAllExpanded.value) {
    collapseAll();
  } else {
    expandAll();
  }
  isAllExpanded.value = !isAllExpanded.value;
};

const collapseAll = () => {
  expandedRows.value = {};
};

const hasSublists = (data, from) => {
  return data?.sublists?.length > 0;
};
const isChildSublistSimple = (data) => {
  const sublists = data?.sublists;
  if (Array.isArray(sublists) && sublists.length > 0) {
    // Check if any of the sublists have isSublistSimple set to true
    return sublists.some((sublist) => sublist.isSublistSimple);
  }
  return false;
};

const isSublistData = computed(() => {
  return !props.tableData?.isSublistSimple;
});
const isCalleFromRoot = computed(() => {
  return props.calledFrom;
});

const columns = computed(() => {
  if (
    !props.tableData.isSublistSimple &&
    props.tableData.sublists?.length > 0
  ) {
    return Object.keys(props.tableData.sublists[0]).filter(
      (key) => key !== "sublists"
    );
  } else if (props.tableData.sublists?.length > 0) {
    return ["title"];
  }
  return [];
});

const toggleRow = (data) => {
  if (expandedRows.value[data.id]) {
    delete expandedRows.value[data.id];
  } else {
    expandedRows.value[data.id] = true;
  }
};
</script>

<style scoped>
::v-deep .p-datatable-row-expansion {
  padding: 0 !important;
  margin: 0 !important;
}

::v-deep .p-datatable {
  border: none !important;
  padding: 0 !important;
}

::v-deep
  .p-datatable-tbody
  > tr.p-row-expanded
  > td
  > .p-datatable-row-expansion {
  margin: 0 !important;
  padding: 0 !important;
}

::v-deep .p-datatable-thead > tr {
  padding: 0 !important;
  border: none !important;
}

::v-deep .p-datatable-thead > tr > th {
  border: none !important;
  padding: 0 !important;
  white-space: nowrap;
}

::v-deep .p-datatable-tbody > tr > td {
  border-top: none !important;
  padding-right: 0;
  padding-left: 0;

  /* border-bottom: none !important; */
}
::v-deep .p-datatable-tbody > tr > td.custom-padding {
  padding-left: 33px !important;
}

::v-deep .p-datatable-tbody > tr.p-row-expanded {
  border-bottom: none !important;
}

::v-deep .p-datatable-thead > tr > th.sublist-padding {
  padding: 10px !important;
  white-space: nowrap;
}
</style>

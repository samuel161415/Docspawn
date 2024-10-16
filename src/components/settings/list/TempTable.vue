<template>
  <div>
    <!-- DataTable with manual row expansion -->
    <DataTable
      :value="tableData?.sublists"
      :paginator="showPaginator"
      :rows="5"
      class="border border-white"
      dataKey="id"
    >
      <!-- Header with Expand/Collapse All button and other actions -->
      <template v-if="calledFrom === 'root'" #header>
        <div class="flex flex-wrap justify-between items-center">
          <p class="font-poppins font-normal text-lg">
            {{ tableData.title }}
          </p>
          <div class="flex flex-col md:flex-row justify-end gap-2">
            <!-- Expand/Collapse All Button -->
            <Button
              :icon="isAllExpanded ? 'pi pi-minus' : 'pi pi-plus'"
              :label="isAllExpanded ? 'Collapse' : 'Expand'"
              class="p-button-success w-36"
              outlined
              @click="toggleExpandCollapse"
            />
            <!-- Add Item Button -->
            <Button
              icon="pi pi-plus"
              label="Add item(s)"
              outlined
              @click="$emit('open-add-items', tableData.title)"
              class="text-success border-success hover:bg-green-50 w-40"
            />
            <!-- List Options Button -->
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

      <!-- Custom Expander Column -->
      <Column style="width: 5rem" class="bg-white">
        <template #body="{ data }">
          <!-- Only show expander icon if the row has sublists -->
          <span
            v-if="hasSublists(data)"
            class="cursor-pointer"
            @click="toggleRowExpansion(data)"
          >
            <i
              :class="
                expandedRows[data.id]
                  ? 'pi pi-chevron-down'
                  : 'pi pi-chevron-right'
              "
            ></i>
          </span>
        </template>
      </Column>

      <!-- Data Columns -->
      <Column
        v-for="(column, index) in columns"
        :key="index"
        :field="column"
        :header="isSublistData ? column : null"
        :sortable="isSublistData ? true : false"
        :headerStyle="
          isSublistData
            ? { height: 'auto' }
            : { height: '0px', backgroundColor: 'blue', border: '0 white' }
        "
      >
        <template #body="{ data, field }">
          <p class="font-poppins font-normal">{{ data[field] }}</p>
        </template>
      </Column>

      <!-- Actions Column -->
      <Column
        :header="isSublistData ? 'Actions' : null"
        style="width: 5%"
        class="bg-white text-center"
        :headerStyle="
          isSublistData
            ? { height: 'auto' }
            : { height: '0px', backgroundColor: 'blue', border: '0 white' }
        "
      >
        <template #body="{ data }">
          <div class="flex space-x-8">
            <font-awesome-icon
              :icon="['fas', 'plus']"
              class="text-primaryBlue cursor-pointer"
              @click="$emit('open-add-items', tableData.title)"
            />
            <font-awesome-icon
              :icon="['fas', 'pencil-alt']"
              class="text-success text-lg cursor-pointer"
              @click="$emit('edit-item', data)"
            />
            <font-awesome-icon
              :icon="['fas', 'trash-alt']"
              class="text-error text-lg cursor-pointer"
              @click="$emit('open-delete', data)"
            />
          </div>
        </template>
      </Column>

      <!-- Expanded Row Content (Recursive TempTable) -->
      <template #body-expanded="{ data }">
        <tr v-if="expandedRows[data.id]">
          <td :colspan="columns.length + 1">
            <!-- Call TempTable recursively if sublists exist -->
            <div v-if="hasSublists(data)" class="pl-5">
              <TempTable
                :tableData="data"
                @open-add-items="$emit('open-add-items', $event)"
                @edit-item="$emit('edit-item', $event)"
                @open-delete="$emit('open-delete', $event)"
                calledFrom="nested"
              />
            </div>
          </td>
        </tr>
      </template>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import TempTable from "~/components/settings/list/TempTable.vue"; // Recursive TempTable

// Props and Emits
const props = defineProps({
  tableData: Object,
  calledFrom: String,
});
const emit = defineEmits();

// State to track expanded rows and global expansion
const expandedRows = ref({});
const isAllExpanded = ref(false);

// Toggle individual row expansion
const toggleRowExpansion = (row) => {
  expandedRows.value[row.id] = !expandedRows.value[row.id];
};

// Expand or collapse all rows
const expandAll = () => {
  expandedRows.value = props.tableData.sublists.reduce(
    (acc, item) => ((acc[item.id] = true), acc),
    {}
  );
  isAllExpanded.value = true;
};

const collapseAll = () => {
  expandedRows.value = {};
  isAllExpanded.value = false;
};

// Toggle between expanding and collapsing all rows
const toggleExpandCollapse = () => {
  isAllExpanded.value ? collapseAll() : expandAll();
};

// Check if a row has sublists
const hasSublists = (data) => {
  return Array.isArray(data?.sublists) && data.sublists.length > 0;
};

// Define columns based on whether the table has simple or complex data
const isSublistData = computed(() => {
  return !props.tableData?.isSublistSimple;
});

const columns = computed(() => {
  if (props.tableData?.sublists?.length > 0) {
    return Object.keys(props.tableData.sublists[0]).filter(
      (key) => key !== "sublists"
    );
  }
  return ["title"];
});

// Determine whether to show paginator based on the number of sublists
const showPaginator = computed(() => {
  return props.tableData.sublists?.length > 5;
});
</script>

<style scoped>
.pi-chevron-right {
  font-size: 1.2rem;
  color: #6b7280; /* Customize icon color */
}

.pi-chevron-down {
  font-size: 1.2rem;
  color: #6b7280;
}

.cursor-pointer {
  cursor: pointer;
}
</style>

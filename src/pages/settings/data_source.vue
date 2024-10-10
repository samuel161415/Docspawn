<template>
  <div class="w-full h-full ml-4 bg-white overflow-scroll no-scrollbar">
    <div class="px-8 py-8 rounded-lg">
      <div id="lists">
        <List />
      </div>
      <div id="databases">
        <DataSources />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import DataSources from "./data_sources";
import List from "./list.vue";
</script>

<style scoped>
.highlight {
  background-color: yellow;
  color: black;
}
</style>

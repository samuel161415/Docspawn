import { defineNuxtPlugin } from '#app';
import { TreeViewPlugin } from '@syncfusion/ej2-vue-navigations';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(TreeViewPlugin);
});
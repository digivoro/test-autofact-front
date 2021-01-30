<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="text-center">
          Autofact Test
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container class="q-px-md">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",
  components: {},
  data() {
    return {};
  },
};
</script>

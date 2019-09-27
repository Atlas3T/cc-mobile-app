<template>
  <q-layout view="lHh Lpr lFf">
    <q-footer
      bordered
      class="bg-white text-primary"
    >
      <q-tabs
        v-model="tab"
        no-caps
        active-color="primary"
        indicator-color="transparent"
        class="text-grey"
      >
        <q-tab
          name=""
          icon="house"
          label="Home"
        />
        <q-tab
          name="recycle"
          icon="fas fa-recycle"
          label="Recycle"
        />
        <q-tab
          name="rewards"
          icon="fas fa-money-bill-wave"
          label="Rewards"
        />
        <q-tab
          name="settings"
          icon="settings"
          label="Settings"
        />
      </q-tabs>
    </q-footer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MyLayout',

  data() {
    return {
      tab: 'recycle',
    };
  },
  watch: {
    tab(val) {
      this.$router.push({ path: `/${val}` });
    },
  },
};
</script>

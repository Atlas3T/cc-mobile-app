<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      class="bg-primary text-white flex flex-center"
    >
      <div class="page-title">
        home
      </div>
    </q-header>
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
    <q-page-container v-if="signedIn">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar';
import Mgr from '../boot/security-oidc.js';

export default {
  name: 'MyLayout',

  data() {
    return {
      tab: 'recycle',
      mgr: new Mgr(),
      signedIn: false,
    };
  },
  watch: {
    tab(val) {
      this.$router.push({ path: `/${val}` });
    },
  },
  mounted() {
    this.mgr.getSignedIn().then(
      (sucess) => {
        this.signedIn = sucess;
      },
      (err) => {
        console.log(err);
      },
    );
  },
  methods: {
    openURL,
  },
};
</script>

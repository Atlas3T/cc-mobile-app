<template>
  <q-page class="flex flex-center bg-primary q-pa-md">
    <img
      alt="Cryptocyle logo"
      src="~assets/logo.png"
      class="logo q-pr-sm"
    >
    <q-footer class="q-pb-sm text-center text-body1 text-weight-bold">
      powered by CryptoCycle&trade;
    </q-footer>
  </q-page>
</template>

<script>
import { openURL } from 'quasar';
import Mgr from '../../boot/security-oidc.js';

export default {
  name: 'Splash',

  data() {
    return {
      mgr: new Mgr(),
    };
  },

  mounted() {
    setTimeout(() => {
      this.mgr.getSignedIn().then(
        (signedIn) => {
          if (signedIn) {
            this.$router.push({ path: '/home' });
          } else {
            this.$router.push({ path: '/login' });
          }
        },
        (err) => {
          console.log(err);
        },
      );
    }, 2000);
  },
  methods: {
    openURL,
  },
};
</script>
<style>
.logo {
  width: -webkit-fill-available;
}
</style>

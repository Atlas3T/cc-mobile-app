
<template>
  <div
    v-if="ready"
    id="q-app"
  >
    <router-view />
  </div>
</template>

<script>
import { colors } from 'quasar';
import Mgr from './boot/security-oidc.js';

export default {
  name: 'App',

  data() {
    return {
      ready: false,
      config: null,
      colours: null,
    };
  },

  mounted() {
    this.$axios.get('./statics/config.json').then((response) => {
      this.config = {
        callback: response.data.callback,
        logout_redirect: response.data.logout_redirect,
      };
      this.colours = {
        primary: response.data.primary_colour,
        secondary: response.data.secondary_colour,
      };
      console.log(this.config);
      Object.getPrototypeOf(this.$root).$mgr = new Mgr(this.config);
      this.setTheme();
      this.ready = true;
    });
  },

  methods: {
    setTheme() {
      colors.setBrand('primary', this.colours.primary);
      colors.setBrand('secondary', this.colours.secondary);
    },
  },
};
</script>
<style>

</style>

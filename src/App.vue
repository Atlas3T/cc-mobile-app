
<template>
  <div
    v-if="ready"
    id="q-app"
  >
    <router-view />
  </div>
</template>

<script>
import Mgr from './boot/security-oidc.js';

export default {
  name: 'App',

  data() {
    return {
      ready: false,
      config: null,
    };
  },

  mounted() {
    this.$axios.get(`${window.location.origin}/statics/config.json`).then((response) => {
      this.config = response.data;
      console.log(this.config);
      Object.getPrototypeOf(this.$root).$mgr = new Mgr(this.config);
      this.ready = true;
    });
  },
};
</script>
<style>

</style>

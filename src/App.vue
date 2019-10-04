
<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import Mgr from './boot/security-oidc.js';

export default {
  name: 'App',

  data() {
    return {
      mgr: new Mgr(),
    };
  },

  mounted() {
    Object.getPrototypeOf(this.$root).$mgr = new Mgr();
  },
};
</script>
<style>

</style>

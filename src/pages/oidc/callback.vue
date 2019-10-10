<template>
  <q-page class="bg-primary">
    <div class="bg-primary fixed-center text-center">
      <q-spinner
        color="secondary"
        size="3em"
      />
    </div>
  </q-page>
</template>

<script>
// import Oidc from 'oidc-client'

export default {
  mounted() {
    const mgr = this.$oidc;
    mgr.signinRedirectCallback().then(() => {
      this.$router.push({ path: '/' });
    }).catch((err) => {
      console.log(err);
    });
  },
};
</script>

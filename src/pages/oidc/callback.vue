<template>
  <q-page>
    <div class="fixed-center text-center">
      <p>
        <q-icon
          name="person"
          size="8em"
          color="grey-5"
        />
      </p>
      <p class="text-faded">
        We're preparing your session.
      </p>
      ><p class="text-faded">
        <strong>Please wait while we set up your information...</strong>
      </p>
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

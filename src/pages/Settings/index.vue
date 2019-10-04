<template>
  <q-page class="text-accent text-weight-bold grey-gradient">
    <div
      class="q-pa-md settings-menu"
    >
      <q-list class="text-center">
        <q-item
          v-ripple
          clickable
        >
          <q-item-section>Account</q-item-section>
        </q-item>

        <q-item
          v-ripple
          clickable
        >
          <q-item-section>
            <q-item-label>your Rewards</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          v-ripple
          clickable
        >
          <q-item-section>About</q-item-section>
        </q-item>

        <q-item
          v-ripple
          clickable
        >
          <q-item-section>
            <q-item-label>Terms & Conditons</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          v-ripple
          clickable
        >
          <q-item-section>
            Privacy Policy
          </q-item-section>
        </q-item>
        <q-item
          v-ripple
          clickable
          @click="signOut"
        >
          <q-item-section>
            Log Out
          </q-item-section>
        </q-item>
        <q-item
          v-ripple
          clickable
        >
          <q-item-section>
            help
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Settings',

  methods: {
    async signOut() {
      // this.$oidc.signoutRedirect();
      // console.log(this.$oidc);

      await this.$mgr.signOut();

      // const test = await fetch('https://cryptocycle.online/api/account', {
      //   headers: {
      //     Accept: 'application/json',
      //     Authorization: `Bearer ${user.access_token}`,
      //   },
      // });
      // console.log(test);
    },
  },
};
</script>
<style>
.settings-menu .q-item__section {
    font-size: 20px;
}

.settings-menu .q-item {
    padding: 5px 16px;
    margin-bottom: 1em;
    border-radius: 20px;
    background-color: white;
    text-transform: lowercase;
}
</style>
<style lang="scss">
.settings-menu .q-item {
    border: 3px solid $grey-5;
}
</style>

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
          <q-item-section>{{ $t('account') }}</q-item-section>
        </q-item>

        <q-item
          v-ripple
          clickable
        >
          <q-item-section>
            <q-item-label>{{ $t('yourRewards') }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          v-ripple
          clickable
        >
          <q-item-section>{{ $t('about') }}</q-item-section>
        </q-item>

        <q-item
          v-ripple
          clickable
        >
          <q-item-section>
            <q-item-label>{{ $t('termsConditions') }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          v-ripple
          clickable
        >
          <q-item-section>
            {{ $t('privacyPolicy') }}
          </q-item-section>
        </q-item>
        <q-item
          v-ripple
          clickable
          @click="signOut"
        >
          <q-item-section>
            {{ $t('logOut') }}
          </q-item-section>
        </q-item>
        <q-item
          v-ripple
          clickable
        >
          <q-item-section>
            {{ $t('help') }}
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
      await this.$mgr.signOut();
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

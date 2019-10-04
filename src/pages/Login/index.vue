<template>
  <q-page class="flex justify-center">
    <div class="column items-center justify-between bg-white">
      <div class="form-container flex flex-center">
        <div>
          <!-- <q-input
            v-model="username"
            color="secondary"
            bg-color="white"
            outlined
            label="email"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <q-input
            v-model="password"
            color="secondary"
            bg-color="white"
            outlined
            label="password"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          /> -->
          <img
            alt="Cryptocyle logo"
            src="~assets/logo.png"
            class="logo q-pr-sm q-mb-xl"
          >
          <p class="recycle-fact">
            DID YOU KNOW... just one recycled plastic bottle can save enough
            energy to power a bulb for 3 hours
          </p>
        </div>
      </div>
      <div>
        <q-btn
          unelevated
          color="secondary"
          text-color="white"
          size="xl"
          :label="$t('sign up')"
          class="login-button"
        />
        <q-btn
          unelevated
          color="#3f3e3e"
          text-color="white"
          size="xl"
          :label="$t('log in')"
          class="login-button bottom-button"
          @click="login"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { openURL } from 'quasar';

export default {
  name: 'Login',

  methods: {
    openURL,
    login() {
      this.$mgr.signIn();
    },
  },
};
</script>
<style>
.logo {
  width: 90vw;
}
.login-button {
    width: 100vw;
    text-transform: lowercase;
}
.bottom-button {
  background-color: #3f3e3e;
  border-top: 4px solid white;
}
.form-container {
    padding: 0 5vw;
    background:linear-gradient(
      #284242bf,
      #284242bf
    ), url('../../assets/login-bg.jpg');
    background-size: cover;
    height: 81%;
}
.form-container .q-input {
    margin-bottom: 5px;
    width: 90vw;
    color: white;
}
.recycle-fact {
  color: white;
  font-size: x-large;
  text-align: center;
}
</style>

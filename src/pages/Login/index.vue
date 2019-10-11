<template>
  <q-layout>
    <q-footer>
      <div>
        <q-btn
          v-if="!showRegister"
          unelevated
          color="secondary"
          text-color="white"
          size="xl"
          label="sign up"
          class="login-button bottom-button"
          @click="showRegister=true"
        />
        <q-btn
          v-if="!showRegister"
          unelevated
          color="#3f3e3e"
          text-color="white"
          size="xl"
          label="log in"
          class="login-button bottom-button"
          @click="login"
        />
        <q-btn
          v-if="showRegister"
          unelevated
          color="#3f3e3e"
          text-color="white"
          size="xl"
          label="register"
          class="login-button bottom-button"
          @click="register"
        />
      </div>
    </q-footer>
    <q-page class="flex justify-center">
      <div class="column items-center justify-between bg-white">
        <div class="form-container flex flex-center">
          <div v-if="!showRegister">
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
          <div v-if="showRegister">
            <q-input
              ref="username"
              v-model="username"
              color="secondary"
              bg-color="white"
              outlined
              label="username"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />
            <q-input
              ref="email"
              v-model="email"
              color="secondary"
              bg-color="white"
              outlined
              label="email"
              lazy-rules
              :rules="[ val => val && emailRegex.test(val.toLowerCase()) ||
                'Please enter a valid email address']"
            />
            <q-input
              ref="password"
              v-model="password"
              type="password"
              color="secondary"
              bg-color="white"
              outlined
              label="password"
              lazy-rules
              :rules="[ val => val && val.length > 8 || 'Password must be at least 8 characters',
                        val => /\d/.test(val) || 'Password must contain a number',
                        val => /[A-Z]/.test(val) ||
                          'Password must contain at least one uppercase letter']"
            />
            <q-btn
              flat
              icon="navigate_before"
              color="white"
              size="lg"
              class="absolute back-button q-mt-sm"
              @click="showRegister=false"
            />
          </div>
        </div>
      </div>
    </q-page>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar';

export default {
  name: 'Login',
  data() {
    return {
      showRegister: false,
      username: null,
      email: null,
      password: null,
      emailRegex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    };
  },

  methods: {
    openURL,
    login() {
      this.$mgr.signIn();
    },
    async register() {
      this.$refs.username.validate();
      this.$refs.email.validate();
      this.$refs.password.validate();

      if (!this.$refs.username.hasError
        || !this.$refs.email.hasError
        || !this.$refs.password.hasError) {
        this.$q.loading.show();
        try {
          const newAccount = await this.$axios.post('https://cryptocycle.online/api/user', {
            userName: this.userName,
            password: this.password,
            emailAddress: this.emailAddress,
          });
          if (newAccount.status === 200 || newAccount.status === 201) {
            this.login();
          }
        } catch (e) {
          console.error(e);
        }
        this.$q.loading.hide();
      }
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
    height: 100%;
    width: 100vw;
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

.back-button {
  top: 0;
  left: 0
}
</style>

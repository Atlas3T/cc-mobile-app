<template>
  <q-page class="flex bg-white justify-center">
    <div class="column items-center justify-between bg-primary">
      <div class="col-9 bg-primary form-container flex flex-center">
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
          class="login-button signup"
        />
        <q-btn
          unelevated
          color="primary"
          text-color="white"
          size="xl"
          :label="$t('log in')"
          class="login-button"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Login',
  username: '',
  password: '',
};
</script>
<style>
.login-button {
    width: 100vw;
    border-top: 7px solid white;
    text-transform: lowercase;
}
.signup {
}
.form-container {
    padding: 0 5vw;
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

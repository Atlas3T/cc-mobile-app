<template>
  <q-page class="flex bg-white justify-center">
    <div class="column items-center justify-between">
      <div class="col-9 bg-primary form-container flex flex-center">
        <div>
          <q-input
            v-model="name"
            outlined
            label="email"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <q-input
            v-model="name"
            outlined
            label="password"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
        </div>
      </div>
      <div class="col-auto justify-end">
        <q-btn
          unelevated
          color="primary"
          size="xl"
          :label="$t('log in')"
          class="login-button"
        />
      </div>
      <div class="col-auto justify-end">
        <q-btn
          outline
          color="primary"
          size="xl"
          :label="$t('sign up')"
          class="login-button signup"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Login',
  username: '',
};
</script>
<style>
.login-button {
    width: 90vw;
}
.signup {
    margin-bottom: 2rem;;
}
.form-container {
    padding: 0 5vw;
}
.form-container .q-input {
    margin-bottom: 5px;
    width: 90vw;
    color: white;
}
</style>

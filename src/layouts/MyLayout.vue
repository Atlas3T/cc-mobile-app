<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      class="bg-accent text-white text-weight-bold flex flex-center"
    >
      <div class="top-bar row justify-between items-center">
        <div class="col reward-balance text-secondary">
          150 points
        </div>
        <div class="col-auto page-title text-center text-lowercase">
          {{ $router.currentRoute.name }}
        </div>
        <div class="col reward-balance text-secondary text-right">
          £5.60
        </div>
      </div>
    </q-header>
    <q-footer
      flat
      class="bg-grey-5 text-white"
    >
      <div
        class="top-bar row justify-center"
        style=""
      >
        <q-btn
          size="25px"
          round
          unelevated
          color="secondary"
          class="scan-button absolute-center"
        >
          <q-icon name="crop_free" />
        </q-btn>
      </div>

      <q-tabs
        v-model="tab"
        no-caps
        active-color="white"
        indicator-color="transparent"
        class="text-white"
      >
        <q-tab
          name="home"
          icon="house"
        />
        <q-tab
          name="rewards"
          icon="fas fa-money-bill-wave"
        />
        <q-tab
          name="placeholder"
          class="placeholder"
        />
        <q-tab
          name="location"
          icon="where_to_vote"
        />
        <q-tab
          name="settings"
          icon="settings"
        />
      </q-tabs>
    </q-footer>
    <q-page-container v-if="signedIn">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar';
import Mgr from '../boot/security-oidc.js';

export default {
  name: 'MyLayout',

  data() {
    return {
      tab: 'recycle',
      mgr: new Mgr(),
      signedIn: false,
    };
  },
  watch: {
    tab(val) {
      if (val !== 'placeholder') {
        this.$router.push({ path: `/${val}` });
      }
    },
  },
  mounted() {
    this.mgr.getSignedIn().then(
      (sucess) => {
        this.signedIn = sucess;
      },
      (err) => {
        console.log(err);
      },
    );
  },
  methods: {
    openURL,
  },
};
</script>
<style>
.top-bar {
  width: 100%;
}
.page-title {
  font-size: 1.5em;
  padding: 5px 0;
}
.reward-balance {
  padding: 5px 10px;
}
.scan-button {
  border: 3px solid white;
  margin-top: -20px;
}
</style>

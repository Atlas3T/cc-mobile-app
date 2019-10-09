<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      class="text-weight-bold flex flex-center"
      :class="barColour"
    >
      <div class="top-bar row justify-between items-center">
        <div class="col reward-balance">
          {{ user.pointsBalance }} points
        </div>
        <div
          v-if="customHeader === null"
          class="col-auto page-title text-white text-center text-lowercase"
        >
          {{ $router.currentRoute.name }}
        </div>
        <div
          v-if="customHeader !== null"
          class="col-auto page-title text-white text-center text-lowercase"
        >
          {{ customHeader }}
        </div>
        <div class="col reward-balance text-right">
          £{{ user.cashBalance }}
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
          to="/recycle"
        >
          <q-icon name="crop_free" />
        </q-btn>
      </div>

      <q-tabs
        no-caps
        active-color="white"
        indicator-color="transparent"
        class=" navbar text-white"
      >
        <q-route-tab
          name="home"
          to="/home"
          icon="img:statics/nav-icons/home.svg"
        />
        <q-separator
          vertical
        />

        <q-route-tab
          name="rewards"
          to="/rewards"
          icon="img:statics/nav-icons/rewards.svg"
        />
        <q-tab
          disable
          name="placeholder"
          class="placeholder"
        />
        <q-route-tab
          name="location"
          to="/location"
          icon="img:statics/nav-icons/map.svg"
        />
        <q-separator
          vertical
        />
        <q-route-tab
          name="settings"
          to="/settings"
          icon="img:statics/nav-icons/settings.svg"
        />
      </q-tabs>
    </q-footer>
    <q-page-container>
      <router-view @updateStatus="updateStatus" />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar';
import User from '../store/User';

export default {
  name: 'MyLayout',

  data() {
    return {
      tab: '',
      signedIn: false,
      customHeader: null,
      barColour: 'bg-accent text-secondary',
    };
  },
  computed: {
    user() {
      return User.query().first();
    },
  },
  watch: {
    tab(val) {
      if (val !== 'placeholder') {
        this.$router.push({ path: `/${val}` });
      }
    },
  },
  async mounted() {
    this.$mgr.getSignedIn().then(
      async (success) => {
        this.signedIn = success;
        await this.$mgr.getToken().then(
          (accessToken) => {
            this.$axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
          }, (err) => {
            console.log(err);
          },
        );
      },
      (err) => {
        console.log(err);
      },
    );
  },
  methods: {
    openURL,
    updateStatus(val, colour = 'bg-accent text-secondary') {
      this.customHeader = val;
      this.barColour = colour;
    },
  },
};
</script>
<style lang="scss">
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
  z-index: 9999;
}
.navbar .q-separator--vertical {
  background-color: $grey-4;
  width: 3px;
  height: 26px;
  min-height: 0%;
  margin: 11px 0;
}

.navbar .q-tab__icon {
    width: 30px;
    height: 30px;
    font-size: 30px;
}
</style>

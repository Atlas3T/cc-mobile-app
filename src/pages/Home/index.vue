<template>
  <q-page class="column bg-white text-primary">
    <div class="col-6">
      <div @click="navToRewards">
        <v-lazy-image
          :src="require('../../statics/mocks/home-showcase1.jpg')"
          :src-placeholder="
            require('../../statics/mocks/home-showcase-placeholder.jpg')"
          class="home-showcase"
        />
      </div>
    </div>
    <div class="col grey-gradient q-pa-md flex flex-center">
      <q-card class="balance-card q-mb-md">
        <q-card-section class="q-pa-sm q-pt-md">
          <div class="row">
            <div class="col text-center text-grey-6">
              <div class="amount-left text-h3 text-accent text-weight-bold">
                {{ user.pointsBalance }}
              </div>
              {{ $t('pointsBalance') }}
              <div
                class="actions q-pa-sm bg-secondary text-white text-weight-bold q-mr-xs q-mt-sm"
                @click="$router.push('/rewards')"
              >
                {{ $t('spendPoints') }}
              </div>
            </div>
            <div
              class="col text-center text-grey-6"
            >
              <div class="amount text-h3 text-accent text-weight-bold">
                £{{ user.cashBalance }}
              </div>
              cash balance
              <div
                class="actions q-pa-sm bg-secondary text-white text-weight-bold q-ml-xs q-mt-sm"
                @click="$router.push('/withdraw')"
              >
                {{ $t('withdrawBalance') }}
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
      <div
        v-if="showLastReturned"
        class="q-px-md q-pb-xs text-accent text-center text-h6 text-weight-bold"
      >
        great work! <br> you've just returned {{ user.itemsReturnedLast }}
        <span v-if="user.itemsReturnedLast < 2">item</span> <span v-else>items</span>
      </div>
    </div>
    <div class="col flex justify-center">
      <div class="stats q-mt-xl q-mx-md q-pb-sm q-pt-md">
        <div class="row">
          <div class="box-section col text-center">
            <q-knob
              v-model="bottleTarget"
              readonly
              show-value
              size="115px"
              :thickness="0.1"
              color="secondary"
              track-color="grey-3"
              class=" knob bg-white text-accent text-weight-bold absolute-center"
            >
              <div class="q-ma-sm">
                <div class="text-h3 text-weight-bold">
                  {{ user.itemsRecycled }}
                </div>
                <div class="text-body1 text-grey-6">
                  {{ $t('bottles') }}
                </div>
              </div>
            </q-knob>
            <div class="q-mt-xl q-pt-sm text-weight-bold text-h6">
              {{ user.pointsBalance }}
            </div>
            <div class="text-grey-6 text-weight-bold">
              {{ $t('points') }}
            </div>
          </div>
          <q-separator vertical />
          <div class="box-section col text-center">
            <q-knob
              v-model="value2"
              readonly
              show-value
              size="115px"
              :thickness="0.1"
              color="blue"
              track-color="grey-3"
              class="knob bg-white text-accent text-weight-bold absolute-center"
            >
              <div class="q-ma-sm">
                <div class="text-h3 text-weight-bold">
                  5
                </div>
                <div class="text-body1 text-grey-6">
                  {{ $t('cans') }}
                </div>
              </div>
            </q-knob>
            <div class="q-mt-xl q-pt-sm text-weight-bold text-h6">
              50
            </div>
            <div class="text-grey-6 text-weight-bold">
              {{ $t('points') }}
            </div>
          </div>
        </div>
      </div>
      <!-- <img
        src="../../statics/mocks/recycling-report-mock.png"
        style="width:95vw"
      > -->
      <div class="text-h6 text-grey-6 text-weight-bold">
        shop rewards
      </div>
      <div
        class="row text-center q-gutter-x-md q-mt-md q-mb-xl"
        style="width:95vw"
      >
        <div
          class="col relative"
          @click="navToRewards"
        >
          <img
            src="../../statics/mocks/rewards/pizza.jpg"
            alt=""
            style="width:100%; height:100%"
            class="round-border"
          >
          <div
            class="text-white text-weight-bold text-body1
             reward-caption absolute-center text-overlay flex flex-center round-border"
          >
            free doughballs
          </div>
        </div>
        <div
          class="col relative"
          @click="navToRewards"
        >
          <img
            src="../../statics/mocks/rewards/theme-park.jpg"
            alt=""
            style="width:100%; height:100%"
            class="round-border"
          >
          <div
            class="text-white text-weight-bold text-body1
             reward-caption absolute-center text-overlay flex flex-center round-border"
          >
            2 kids go free
          </div>
        </div>
        <div
          class="col relative"
          @click="navToRewards"
        >
          <img
            src="../../statics/mocks/rewards/clothes.jpg"
            alt=""
            style="width:100%; height:100%"
            class="round-border"
          >
          <div
            class="text-white text-weight-bold text-body1
             reward-caption absolute-center text-overlay flex flex-center round-border"
          >
            20% off
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import VLazyImage from 'v-lazy-image';
import User from '../../store/User';

export default {
  name: 'Home',

  components: {
    VLazyImage,
  },

  data() {
    return {
      value1: 100,
      value2: 100,
    };
  },

  computed: {
    user() {
      return User.query().first();
    },

    bottleTarget() {
      const val = this.user.itemsRecycled / this.user.bottleTarget * 100;
      if (val > 100) {
        return 100;
      }
      return val;
    },

    showLastReturned() {
      const lastThreeHours = Date.now() - this.user.itemsReturnedTime < 10800000;
      if (this.user.itemsReturnedLast > 0 && lastThreeHours) {
        return true;
      }
      return false;
    },
  },


  methods: {
    navToRewards() {
      this.$router.push({ path: '/rewards' });
    },
  },

};
</script>

<style lang="scss">

.text-overlay {
  background: #00000066
}
.home-showcase {
    width: 100vw;
}

.balance-card {
    border-radius: 15px;
    border: 4px solid #cfcfcf;
    box-shadow: initial;
    width: 90vw;
}

.balance-card .actions {
    border-radius: 7px;
}
.amount-left {
    position:relative;
}
.amount-left:after {
    content: '';
  height: 100%;
  width: 3px;

  position: absolute;
  right: 0;
  top: 5px;

  background-color: $grey-5;
}
.stats {
    width: 100%;
    border: 3px solid $grey-4;
    border-radius: 15px;
    margin-bottom: 25px;
}

.stats .q-separator--vertical {
  width: 3px;
}

.stats .box-section {
  position: relative;
}
.stats .knob {
  top: -10%;
}

.round-border{
  border-radius: 15px;
}
.relative {
  position: relative;
}

.reward-caption {
  height: 100%;
  width: 100%;
}

</style>

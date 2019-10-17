<template>
  <div class="reward-card">
    <q-dialog
      v-model="info.open"
      maximised
      content-class="reward-dialog"
    >
      <div class="reward-list q-pa-md">
        <q-btn
          v-close-popup
          icon="close"
          flat
          round
          dense
          class="text-white absolute"
          style="right:2px; top:5px;"
        />
        <q-card class="reward-card">
          <img
            :src="info.image"
            class="image"
          >
          <q-card-section style="position: relative">
            <div class="reward-logo absolute-center">
              <q-avatar
                color="red"
                text-color="white"
                size="100px"
              >
                <img
                  :src="info.logo"
                  alt=""
                >
              </q-avatar>
            </div>
            <div class="q-mt-lg q-pt-md text-h5 text-accent text-center text-weight-bold">
              {{ info.title }}
            </div>
            <div class="text-body1 text-accent text-center text-weight-bold">
              {{ info.description }}
            </div>
            <div class="text-body1 text-white text-center text-weight-bold">
              VIEW WEBSITE
            </div>
            <div
              v-if="!info.claimed && info.reward"
              class="text-h5 text-white text-center text-weight-bold"
            >
              {{ info.points }} <span v-if="info.reward">points</span>
            </div>
            <div
              v-if="!info.claimed && !info.reward"
              class="text-h5 text-white text-center text-weight-bold"
            >
              <q-btn-toggle
                v-model="model"
                spread
                no-caps
                toggle-color="purple"
                color="white"
                text-color="black"
                :options="[
                  {label: 'Option 1', value: '£1'},
                  {label: 'Option 2', value: '£5'},
                  {label: 'Option 3', value: '£10'}
                ]"
              />
            </div>

            <div
              v-if="info.reward && info.claimed"
              class="text-body1 text-white text-center text-weight-bold"
            >
              click on the code to copy
            </div>
          </q-card-section>
        </q-card>
        <div class="reward-button">
          <div
            v-if="!info.claimed && enoughBalance"
            class=" reward-button
              bg-secondary text-center text-white text-weight-bold q-pa-md q-mt-sm"
            @click="action"
          >
            <span v-if="info.reward">claim</span> <span v-else>confirm</span>
          </div>
          <div
            v-if="info.claimed"
            class=" reward-button
              bg-secondary text-center text-white text-weight-bold q-pa-md q-mt-sm"
          >
            <span v-if="info.reward">{{ info.code }}</span>
            <span v-else>confirmed</span>
          </div>
          <div
            v-if="info.reward && !enoughBalance"
            class=" reward-button
              bg-secondary text-center text-white text-weight-bold q-pa-md q-mt-sm"
          >
            not enough balance
          </div>
        </div>
      </div>
    </q-dialog>
  </div>
</template>
<script>
import User from '../../store/User';

export default {

  props: {
    info: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {

    };
  },

  computed: {
    user() {
      return User.query().first();
    },

    enoughBalance() {
      return this.user.pointsBalance >= this.info.points;
    },
  },

  methods: {
    action() {
      if (this.info.reward) {
        this.claim();
      } else {
        this.info.description = 'thank you for your donation';
        this.info.claimed = true;
      }
    },

    claim() {
      if (this.user.pointsBalance >= this.info.points) {
        this.info.title = 'congratulations!';
        this.info.description = 'voucher code to be used at online checkout';
        this.info.points = '';
        this.info.claimed = true;
      }
    },
  },
};
</script>
<style lang="scss">

</style>

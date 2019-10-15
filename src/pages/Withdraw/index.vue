<template>
  <q-page class="reward-list bg-white text-primary">
    <div class="reward-list q-pa-md items-start">
      <div class="q-pa-sm q-mb-sm withdraw-box text-center">
        <div class="text-h4 text-weight-bold">
          £5.60
        </div>
        <div class="text-grey-6 q-mb-xs">
          cash balance
        </div>
        <div class="text-white text-left text-weight-bold bg-accent rounded-border q-pa-sm">
          <div class="row">
            <div class="col-3">
              <q-icon
                name="far fa-credit-card"
                size="xl"
                class="q-mx-sm"
              />
            </div>
            <div class="col">
              Withdraw to Bank Account No.6******3
            </div>
          </div>
        </div>
      </div>
      <div class="text-h5 text-center text-secondary text-weight-bold">
        make a donation
      </div>
      <div class="q-pb-sm text-body1 text-center text-accent">
        why not donate to one of our carefully selected charities
      </div>
      <div class="row q-gutter-sm q-pb-sm">
        <div class="col">
          <q-card
            class="reward-card"
            @click="setPopup('card1')"
          >
            <v-lazy-image
              :src="require('../../statics/mocks/charities/homeless.jpg')"
              :src-placeholder="
                require('../../statics/mocks/charities/placeholders/homeless-placeholder.jpg')"
            />
            <q-card-section style="position: relative">
              <div class="reward-logo absolute-center">
                <q-avatar
                  color="red"
                  text-color="white"
                  size="80px"
                >
                  <img
                    src="../../statics/brand-logos/centre-point.png"
                    alt=""
                  >
                </q-avatar>
              </div>
              <div class="q-mt-lg q-pt-sm text-body1 text-accent text-center text-weight-bold">
                donate £1 to <br> centre point
              </div>
            </q-card-section>
          </q-card>
        </div>

        <div class="col">
          <q-card
            class="reward-card"
            @click="setPopup('card2')"
          >
            <v-lazy-image
              :src="require('../../statics/mocks/charities/leopard.jpg')"
              :src-placeholder="
                require('../../statics/mocks/charities/placeholders/leopard-placeholder.jpg')"
            />
            <q-card-section style="position: relative">
              <div class="reward-logo absolute-center">
                <q-avatar
                  color="red"
                  text-color="white"
                  size="80px"
                >
                  <img
                    src="../../statics/brand-logos/wwf.png"
                    alt=""
                  >
                </q-avatar>
              </div>
              <div class="q-mt-lg q-pt-sm text-body1 text-accent text-center text-weight-bold">
                donate £1 to <br> wwf
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div class="row q-gutter-sm">
        <div class="col">
          <q-card
            class="reward-card"
            @click="setPopup('card3')"
          >
            <v-lazy-image
              :src="require('../../statics/mocks/charities/dog.jpg')"
              :src-placeholder="
                require('../../statics/mocks/charities/placeholders/dog-placeholder.jpg')"
            />
            <q-card-section style="position: relative">
              <div class="reward-logo absolute-center">
                <q-avatar
                  color="red"
                  text-color="white"
                  size="80px"
                >
                  <img
                    src="../../statics/brand-logos/dogs-trust.png"
                    alt=""
                  >
                </q-avatar>
              </div>
              <div class="q-mt-lg q-pt-sm text-body1 text-accent text-center text-weight-bold">
                donate £1 to <br> dogs trust
              </div>
            </q-card-section>
          </q-card>
        </div>

        <div class="col">
          <q-card
            class="reward-card"
            @click="setPopup('card4')"
          >
            <v-lazy-image
              :src="require('../../statics/mocks/charities/boy.jpg')"
              :src-placeholder="
                require('../../statics/mocks/charities/placeholders/boy-placeholder.jpg')"
            />
            <q-card-section style="position: relative">
              <div class="reward-logo absolute-center">
                <q-avatar
                  color="red"
                  text-color="white"
                  size="80px"
                >
                  <img
                    src="../../statics/brand-logos/water-aid.png"
                    alt=""
                  >
                </q-avatar>
              </div>
              <div class="q-mt-lg q-pt-sm text-body1 text-accent text-center text-weight-bold">
                donate £1 to <br> water aid
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
    <PopupCard
      v-if="popup"
      :info="popup"
    />
  </q-page>
</template>
<script>
import VLazyImage from 'v-lazy-image';
import PopupCard from '../../components/PopupCard';

export default {
  components: {
    PopupCard,
    VLazyImage,
  },
  data() {
    return {
      card1: {
        image: '../../statics/mocks/charities/homeless.jpg',
        title: '',
        logo: '../../statics/brand-logos/centre-point.png',
        description: 'providing accomodation and support to homelss people aged 16-25',
        points: '£1',
        code: '',
        reward: false,
        open: true,
      },
      card2: {
        image: '../../statics/mocks/charities/leopard.jpg',
        title: '',
        logo: '../../statics/brand-logos/wwf.png',
        description: 'help us protect our natural world for future generations',
        points: '£1',
        code: '',
        reward: false,
        open: true,
      },
      card3: {
        image: '../../statics/mocks/charities/dog.jpg',
        title: '',
        logo: '../../statics/brand-logos/dogs-trust.png',
        description: 'will you be able to help an abandoned puppy get the care they need',
        points: '£1',
        code: '',
        reward: false,
        open: true,
      },
      card4: {
        image: '../../statics/mocks/charities/boy.jpg',
        title: '',
        logo: '../../statics/brand-logos/water-aid.png',
        description: 'support wateraid and save lives',
        points: '£1',
        code: '',
        reward: false,
        open: true,
      },
      popup: null,
    };
  },
  methods: {
    setPopup(card) {
      this[card].open = true;
      this.popup = this[card];
    },
  },
};
</script>
<style lang="scss">
.rounded-border {
    border-radius: 15px;
}
.withdraw-box {
    border: 3px solid $grey-4;
    border-radius: 15px;
}

.reward-list .q-card {
    box-shadow: inherit;
    background-color: $grey-5;
    border-radius: 15px;
}

.reward-logo {
    top: 0%
}
.reward-dialog .image {
    object-fit: cover;
    height: 40vh;
}

.reward-dialog .reward-list {
}
.reward-dialog .q-dialog__inner--minimized {
    padding: 0;
}
 .reward-dialog .q-dialog__inner > div {
     box-shadow: inherit;
 }

 .reward-button {
     border-radius: 15px;
 }

</style>

<template>
  <q-page class="reward-list bg-white text-primary">
    <div class="reward-list q-pa-md items-start">
      <div class="row q-gutter-sm q-pb-sm">
        <div class="col">
          <q-card
            class="reward-card"
            @click="setPopup('card1')"
          >
            <v-lazy-image
              :src="require('../../statics/mocks/rewards/pizza.jpg')"
              :src-placeholder="
                require('../../statics/mocks/rewards/placeholders/pizza-placeholder.jpg')"
            />
            <q-card-section style="position: relative">
              <div class="reward-logo absolute-center">
                <q-avatar
                  color="red"
                  text-color="white"
                  size="80px"
                >
                  <img
                    src="../../statics/brand-logos/mamma-mia.png"
                    alt=""
                  >
                </q-avatar>
              </div>
              <div class="q-mt-lg q-pt-sm text-body1 text-accent text-center text-weight-bold">
                free doughballs
              </div>
              <div class="text-subtitle2 text-white text-center text-weight-bold">
                250 points
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
              :src="require('../../statics/mocks/rewards/theme-park.jpg')"
              :src-placeholder="
                require('../../statics/mocks/rewards/placeholders/theme-park-placeholder.jpg')"
            />
            <q-card-section style="position: relative">
              <div class="reward-logo absolute-center">
                <q-avatar
                  color="red"
                  text-color="white"
                  size="80px"
                >
                  <img
                    src="../../statics/brand-logos/jungle-park.png"
                    alt=""
                  >
                </q-avatar>
              </div>
              <div class="q-mt-lg q-pt-sm text-body1 text-accent text-center text-weight-bold">
                two kids free
              </div>
              <div class="text-subtitle2 text-white text-center text-weight-bold">
                300 points
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
              :src="require('../../statics/mocks/rewards/orange.jpg')"
              :src-placeholder="
                require('../../statics/mocks/rewards/placeholders/orange-placeholder.jpg')"
            />
            <q-card-section style="position: relative">
              <div class="reward-logo absolute-center">
                <q-avatar
                  color="red"
                  text-color="white"
                  size="80px"
                >
                  <img
                    src="../../statics/brand-logos/zesti.png"
                    alt=""
                  >
                </q-avatar>
              </div>
              <div class="q-mt-lg q-pt-sm text-body1 text-accent text-center text-weight-bold">
                free can of zesti
              </div>
              <div class="text-subtitle2 text-white text-center text-weight-bold">
                200 points
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
              :src="require('../../statics/mocks/rewards/clothes.jpg')"
              :src-placeholder="
                require('../../statics/mocks/rewards/placeholders/clothes-placeholder.jpg')"
            />
            <q-card-section style="position: relative">
              <div class="reward-logo absolute-center">
                <q-avatar
                  color="red"
                  text-color="white"
                  size="80px"
                >
                  <img
                    src="../../statics/brand-logos/kooku.png"
                    alt=""
                  >
                </q-avatar>
              </div>
              <div class="q-mt-lg q-pt-sm text-body1 text-accent text-center text-weight-bold">
                20% off
              </div>
              <div class="text-subtitle2 text-white text-center text-weight-bold">
                150 points
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
        image: '../../statics/mocks/rewards/pizza.jpg',
        title: 'free doughballs',
        logo: '../../statics/brand-logos/mamma-mia.png',
        description: 'when you buy any large pizza at mamma mia',
        points: 250,
        code: 'K001-KOA6-WA10-0JW1',
        reward: true,
        open: true,
      },
      card2: {
        image: '../../statics/mocks/rewards/theme-park.jpg',
        title: 'two kids free',
        logo: '../../statics/brand-logos/jungle-park.png',
        description: 'when you buy any adult ticket at jungle park',
        points: 300,
        code: 'K001-KOA6-WA10-0JW1',
        reward: true,
        open: true,
      },
      card3: {
        image: '../../statics/mocks/rewards/orange.jpg',
        title: 'free can of zesti',
        logo: '../../statics/brand-logos/zesti.png',
        description: 'with any order online at zesti',
        points: 200,
        code: 'K001-KOA6-WA10-0JW1',
        reward: true,
        open: true,
      },
      card4: {
        image: '../../statics/mocks/rewards/clothes.jpg',
        title: '20% off',
        logo: '../../statics/brand-logos/kooku.png',
        description: 'mens and womens clothing at kooku online',
        points: 150,
        code: 'K001-KOA6-WA10-0JW1',
        reward: true,
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

.reward-dialog .q-dialog__inner--minimized {
    padding: 0;
}
 .reward-dialog .q-dialog__inner > div {
     box-shadow: inherit;
 }

 .reward-button {
     border-radius: 15px;
 }

 .v-lazy-image {
  filter: blur(10px);
  transition: filter 0.7s;
}

.v-lazy-image-loaded {
  filter: blur(0);
}

</style>

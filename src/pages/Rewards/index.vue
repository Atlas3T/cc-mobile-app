<template>
  <q-page class="reward-list bg-white text-primary">
    <div class="reward-list q-pa-md items-start">
      <div class="row q-gutter-sm q-pb-sm">
        <div class="col">
          <q-card
            class="reward-card"
            @click="card=true"
          >
            <img src="../../assets/mocks/rewards/pizza.jpg">
            <q-card-section style="position: relative">
              <div class="reward-logo absolute-center">
                <q-avatar
                  color="red"
                  text-color="white"
                  size="80px"
                >
                  <div class="text-body1 text-center">
                    logo
                  </div>
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
          <q-card class="reward-card">
            <img src="../../assets/mocks/rewards/theme-park.jpg">
            <q-card-section style="position: relative">
              <div class="reward-logo absolute-center">
                <q-avatar
                  color="red"
                  text-color="white"
                  size="80px"
                >
                  <div class="text-body1 text-center">
                    logo
                  </div>
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
          <q-card class="reward-card">
            <img src="../../assets/mocks/rewards/orange.jpg">
            <q-card-section style="position: relative">
              <div class="reward-logo absolute-center">
                <q-avatar
                  color="red"
                  text-color="white"
                  size="80px"
                >
                  <div class="text-body1 text-center">
                    logo
                  </div>
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
          <q-card class="reward-card">
            <img src="../../assets/mocks/rewards/clothes.jpg">
            <q-card-section style="position: relative">
              <div class="reward-logo absolute-center">
                <q-avatar
                  color="red"
                  text-color="white"
                  size="80px"
                >
                  <div class="text-body1 text-center">
                    logo
                  </div>
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
    <div class="reward-card">
      <q-dialog
        v-model="card"
        maximised
        content-class="reward-dialog"
      >
        <div class="reward-list q-pa-md">
          <q-card class="reward-card">
            <!-- <q-btn
              v-close-popup
              icon="close"
              flat
              round
              dense
              class="text-white absolute"
              style="right:2px; top:5px;"
            /> -->
            <img
              src="../../assets/mocks/rewards/pizza.jpg"
              class="image"
            >
            <q-card-section style="position: relative">
              <div class="reward-logo absolute-center">
                <q-avatar
                  color="red"
                  text-color="white"
                  size="80px"
                >
                  <div class="text-body1 text-center">
                    logo
                  </div>
                </q-avatar>
              </div>
              <div class="q-mt-lg q-pt-sm text-h5 text-accent text-center text-weight-bold">
                free doughballs
              </div>
              <div class="text-body1 text-accent text-center text-weight-bold">
                when you buy any large pizza at Mama Mia
              </div>
              <div class="text-body1 text-white text-center text-weight-bold">
                VIEW WEBSITE
              </div>
              <div class="text-h5 text-white text-center text-weight-bold">
                250 points
              </div>
            </q-card-section>
          </q-card>
          <div class="reward-button">
            <div
              class=" reward-button
              bg-secondary text-center text-white text-weight-bold q-pa-md q-mt-sm"
            >
              claim
            </div>
          </div>
        </div>
      </q-dialog>
    </div>
  </q-page>
</template>
<script>
export default {

  data() {
    return {
      card: false,
    };
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

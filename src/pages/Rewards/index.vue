<template>
  <q-page class="bg-white text-primary">
    <div class="reward-list q-pa-md items-start">
      <div class="row q-gutter-sm q-pb-sm">
        <div class="col">
          <q-card class="reward-card">
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
                two kids free
              </div>
              <div class="text-subtitle2 text-white text-center text-weight-bold">
                300 points
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {

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
</style>

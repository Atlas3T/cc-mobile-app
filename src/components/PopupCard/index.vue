<template>
  <div class="reward-card">
    <q-dialog
      v-model="info.open"
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
            <div class="text-h5 text-white text-center text-weight-bold">
              {{ info.points }}
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
</template>
<script>
export default {

  props: {
    info: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style lang="scss">

</style>

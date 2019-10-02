<template>
  <q-page class="column bg-white text-primary">
    <div class="col-6">
      <img
        src="../../assets/mocks/home-showcase.jpg"
        alt=""
        class="home-showcase"
      >
    </div>
    <div class="col info-section q-pa-md">
      <q-card class="balance-card">
        <q-card-section class="q-pa-sm">
          <div class="row">
            <div class="col text-center">
              <div class="amount text-h4 text-accent">
                150
              </div>
              points balance
              <div class="actions q-pa-sm bg-secondary text-white q-mr-xs q-mt-sm">
                spend points
              </div>
            </div>
            <q-separator
              vertical
              inset
            />
            <div
              class="col text-center"
            >
              <div class="amount text-h4 text-accent">
                £5.60
              </div>
              cash balance
              <div
                class="actions q-pa-sm bg-secondary text-white q-ml-xs q-mt-sm"
              >
                withdraw your balance
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
      .
    </div>
  </q-page>
</template>

<script>
export default {

};
</script>

<style>
.home-showcase {
    width: 100vw;
}
.info-section {
    background: linear-gradient(
        #cccccc,
        #ffffff
    );
    background-size: cover;
}

.balance-card {
    border-radius: 10px;
}

.balance-card .actions {
    border-radius: 10px;
}
</style>

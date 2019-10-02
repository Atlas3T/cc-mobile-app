<template>
  <q-page class="column bg-white text-primary">
    <div class="col-6">
      <img
        src="../../assets/mocks/home-showcase.jpg"
        alt=""
        class="home-showcase"
      >
    </div>
    <div class="col grey-gradient q-pa-md flex flex-center">
      <q-card class="balance-card">
        <q-card-section class="q-pa-sm">
          <div class="row">
            <div class="col text-center text-grey-6">
              <div class="amount text-h3 text-accent text-weight-bold">
                150
              </div>
              points balance
              <div class="actions q-pa-sm bg-secondary text-white text-weight-bold q-mr-xs q-mt-sm">
                spend points
              </div>
            </div>
            <q-separator
              vertical
              inset
            />
            <div
              class="col text-center text-grey-6"
            >
              <div class="amount text-h3 text-accent text-weight-bold">
                £5.60
              </div>
              cash balance
              <div
                class="actions q-pa-sm bg-secondary text-white text-weight-bold q-ml-xs q-mt-sm"
              >
                withdraw balance
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
      <div class="q-pa-md text-accent text-center text-h6 text-weight-bold">
        great work! you've recycled 5% more than last week
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Home',

};
</script>

<style>
.home-showcase {
    width: 100vw;
}

.balance-card {
    border-radius: 10px;
    border: 4px solid #cfcfcf;
    box-shadow: initial;
    width: 90vw;
}

.balance-card .actions {
    border-radius: 7px;
}
</style>

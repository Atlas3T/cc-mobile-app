<template>
  <q-page class="flex justify-center bg-white text-primary">
    <div class="column">
      <h4>Select Deposit Point</h4>
      <div class="column justify-center">
        <div class="col flex flex-center">
          <img
            src="~assets/recycle-bin.png"
            alt=""
            class="deposit-point"
          >
        </div>
        <div class="col flex flex-center">
          <img
            src="~assets/over-the-counter.png"
            alt=""
            class="deposit-point"
          >
        </div>
        <div class="col flex flex-center">
          <img
            src="~assets/rvm.png"
            alt=""
            class="deposit-point"
          >
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Location',
};
</script>
<style>
.deposit-point {
  height: 160px;
  margin-bottom: 1rem;
}
</style>

<template>
  <q-page class="flex flex-center bg-primary">
    <div class="column">
      <div class="row justify-center">
        <q-btn
          size="70px"
          round
          color="secondary"
        >
          <q-icon name="fas fa-qrcode" />
        </q-btn>
      </div>
      <div class="row text-center text-white">
        <h3>
          {{ $t('tapToScan') }}
        </h3>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Recycle',
};
</script>
<style>

</style>

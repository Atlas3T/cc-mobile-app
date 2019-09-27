<template>
  <q-page class="flex bg-white justify-center">
    <div class="column items-center justify-between recycle-container">
      <div class="col-2">
        <h4>Recycling Facts</h4>
      </div>
      <div class="col-auto bg-primary scan-button">
        <div class="column">
          <div class="row justify-center">
            <q-btn
              size="70px"
              round
              unelevated
              color="secondary"
            >
              <q-icon name="fas fa-qrcode" />
            </q-btn>
          </div>
          <div class="row justify-center text-white">
            <h3>
              {{ $t('tapToScan') }}
            </h3>
          </div>
        </div>
      </div>
      <div class="col-2 justify-end">
        <q-btn
          unelevated
          color="primary"
          size="xl"
          :label="$t('recyclingHistory')"
          class="history-button"
        />
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
.recycle-container {
  width: 100%;
}
.recycle-container h4 {
  margin-block-start: 2rem;
  margin-block-end: 2rem;
}

.scan-button {
  width: 100%;
  padding-top: 1.5em;
}

.history-button {
  margin-top: 20px;
  width: 100%;
  letter-spacing: 1px;
  text-transform: none;
  width: 90vw;
}
</style>

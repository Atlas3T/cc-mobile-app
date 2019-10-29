<template>
  <q-page class="bg-black flex justify-center">
    <video
      id="video"
      class="camera"
    />
    <div
      class="target-wrapper flex flex-center"
      :class="(recyclableFail || returnFail) ? 'white-overlay' : ''"
    >
      <div
        v-if="!recyclableFail && !returnFail"
        class="target"
      />
      <div
        v-if="recyclableFail || returnFail"
        class="scan-fail flex-center"
      >
        <div class=" scan-fail-heading text-h4 text-center text-weight-bold">
          {{ errorTitle }}
        </div>
        <div class="text-center q-mx-xl text-grey-6 text-weight-bold">
          {{ errorMessage }}
        </div>
      </div>
    </div>
    <div class="controls-box">
      <q-btn
        v-if="itemCounter < 1 || recyclableFail || returnFail"
        flat
        icon="close"
        :color="(recyclableFail || returnFail) ? 'accent' : 'grey-4'"
        size="lg"
        @click="finish()"
      />
    </div>
    <div class="finish-box absolute-center">
      <q-btn
        v-if="itemCounter > 0 && !recyclableFail && !returnFail"
        no-caps
        :label="$t('finish')"
        color="secondary"
        size="lg"
        content-class="finish-button"
        @click="finish()"
      />
    </div>
  </q-page>
</template>
<script>
import { BrowserMultiFormatReader } from '@zxing/library';
import User from '../../store/User';

export default {

  data() {
    return {
      codeReader: new BrowserMultiFormatReader(),
      firstDeviceId: null,
      accountNumber: null,
      recyclePoint: null,
      itemCounter: 0,
      newPoints: 0,
      recyclableFail: false,
      returnFail: false,
      errorTitle: null,
      errorMessage: null,
    };
  },
  computed: {
    user() {
      return User.query().first();
    },
  },

  beforeRouteLeave(to, from, next) {
    this.$emit('updateStatus', null);

    this.codeReader.stream.getTracks().forEach(track => track.stop());
    next();
  },

  async mounted() {
    this.$emit('updateStatus', this.$t('scanReturnPoint'));
    this.accountNumber = this.user.accountNumber;

    this.codeReader
      .listVideoInputDevices()
      .then((videoInputDevices) => {
        videoInputDevices.forEach(device => console.log(`${device.label}, ${device.deviceId}`));
        this.firstDeviceId = videoInputDevices[0].deviceId;
        this.scanBin();
      })
      .catch(err => console.error(err));
  },

  methods: {
    displayError(code) {
      if (code === 'RECYCLABLE_ALREADY_RECYCLED') {
        this.errorTitle = 'scan fail';
        this.errorMessage = 'item has already been scanned';
        this.recyclableFail = true;
      }
      if (code === 'ITEM_NOT_RECOGNIZED') {
        this.errorTitle = 'item not recognized';
        this.errorMessage = 'Are you trying to scan a return point?';
        this.recyclableFail = true;
      }

      if (code === 'RETURN_NOT_RECOGNIZED') {
        this.errorTitle = 'return point not recognized';
        this.errorMessage = 'Are you trying to scan a recyclable?';
        this.returnFail = true;
      }
    },

    async createRecycleTx(recyclables) {
      try {
        const tx = await this.$axios.post('https://cryptocycle.online/api/recycling-transactions', {
          consumerAccountNumber: this.accountNumber,
          recyclePointCode: this.recyclePoint,
          recyclables,
        });
        if (tx.status === 200 || tx.status === 201) {
          return [null, tx];
        }
        return [false, null];
      } catch (e) {
        if (e.response && e.response.data && e.response.data.errors) {
          if (e.response.data.errors[0].code === 'RECYCLABLE_ALREADY_RECYCLED') {
            return ['RECYCLABLE_ALREADY_RECYCLED', null];
          }
        }
        return [true, null];
      }
    },


    async checkBin(code) {
      try {
        const recyclePoint = await this.$axios.get(`https://cryptocycle.online/api/recycle-points/${code}`);
        if (recyclePoint.status === 200) {
          this.recyclePoint = recyclePoint.data.data.code;
          return true;
        }
        return false;
      } catch (e) {
        return false;
      }
    },

    async scanBin() {
      this.$emit('updateStatus', this.$t('scanReturnPoint'));
      this.$q.loading.hide();
      await this.codeReader
        .decodeFromInputVideoDevice(null, 'video')
        .then(async (result) => {
          if (result.format !== 11) {
            this.displayError('RETURN_NOT_RECOGNIZED');
            return false;
          }
          if (navigator.vibrate) {
            window.navigator.vibrate(100);
          }

          this.$emit('updateStatus', this.$t('recyclePointScanned'), 'bg-secondary text-accent');
          this.$q.loading.show({
            delay: 400, // ms
          });
          const valid = await this.checkBin(result.text);
          setTimeout(async () => {
            if (valid) {
              this.scanBottle();
              return true;
            }
            this.$emit('updateStatus', this.$t('invalidCode'), 'bg-red text-white');
            await new Promise(resolve => setTimeout(resolve, 1000));
            this.scanBin();
            return false;
          }, 2000);
          return true;
        })
        .catch(err => console.error(err));
    },

    async checkBottle(barcode) {
      const code = encodeURI(barcode.substr(1));
      try {
        const item = await this.$axios.get(`https://cryptocycle.online/api/recyclables/${code}`);
        if (item && item.status === 200) {
          if (item.data) {
            const recyclable = {
              uniqueCode: item.data.data.code,
              productGtin: item.data.data.product.gtin,
            };
            return [null, recyclable];
          }
        }
        return ['invalid code', null];
      } catch (e) {
        return ['invalid code', null];
      }
    },

    async scanBottle() {
      const scanOk = async (result) => {
        if (result.format !== 5) {
          this.displayError('ITEM_NOT_RECOGNIZED');
          return false;
        }
        if (navigator.vibrate) {
          window.navigator.vibrate(100);
        }
        this.$q.loading.show({
          delay: 400, // ms
        });
        this.$emit('updateStatus', this.$t('itemScanned'), 'bg-secondary text-accent');
        const [err, valid] = await this.checkBottle(result.text);

        if (err) {
          if (err === 'invalid code') {
            this.$emit('updateStatus', this.$t('invalidCode'), 'bg-red text-white');
            await new Promise(resolve => setTimeout(resolve, 1000));
            this.scanBottle();
          }
        } else {
          const [error, tx] = await this.createRecycleTx([valid]);
          if (tx) {
            this.itemCounter += 1;
            await new Promise(resolve => setTimeout(resolve, 1000));
            this.scanBottle();
          } else if (error === 'RECYCLABLE_ALREADY_RECYCLED') {
            this.$emit('updateStatus', this.$t('scanFail'));
            this.$q.loading.hide();
            this.displayError('RECYCLABLE_ALREADY_RECYCLED');
          } else {
            this.$emit('updateStatus', this.$t('invalidCode'), 'bg-red text-white');
            await new Promise(resolve => setTimeout(resolve, 1000));
            this.scanBottle();
          }
        }
        return true;
      };

      if (this.itemCounter > 0) {
        this.$emit('updateStatus', this.$t('scanAnotherItem'));
      } else {
        this.$emit('updateStatus', this.$t('scanYourItem'));
      }
      setTimeout(() => {
        this.$q.loading.hide();
      }, 500);
      await this.codeReader
        .decodeFromInputVideoDevice(null, 'video')
        .then(scanOk)
        .catch(err => console.error(err));
    },

    async finish() {
      if (this.recyclableFail) {
        this.recyclableFail = false;
        this.scanBottle();
      } else if (this.returnFail) {
        this.returnFail = false;
        this.scanBin();
      } else {
        this.$q.loading.show();
        if (this.itemCounter > 0) {
          const stats = await this.$axios.get('https://cryptocycle.online/api/account/statistics');
          const balances = await this.$axios.get('https://cryptocycle.online/api/account/balances');


          User.insertOrUpdate({
            data: {
              accountNumber: this.user.accountNumber,
              itemsRecycled: stats.data.data[0].itemsRecycled,
              pointsBalance: balances.data.data.rewardPoints,
              cashBalance: balances.data.data.rewardValue,
              itemsReturnedLast: this.itemCounter,
              itemsReturnedTime: Date.now(),
            },
          });
        }

        this.$router.push({ path: '/home' });
        this.$q.loading.hide();
      }
    },
  },
};
</script>
<style lang="scss">
.white-overlay {
  background: #ffffff66
}
.q-loading:before {
  top: 41px;
  background: $primary;
  opacity: .8;
}
.camera {
  width: 100%,;
  object-fit: fill;
  height: 88vh;
    }

.target {
  width: 15rem;
  height: 15rem;
  border: 1rem solid rgba(0, 0, 0, 0.3);
  background: none;
  margin-bottom: 82px;
}
.target-wrapper {
  position: absolute;
  height: calc(100vh - 42px);
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.controls-box {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
}

.finish-box {
  position: absolute;
  bottom: 14%;
  top: inherit;
  display: flex;
}

.finish-box button{
  border-radius: 15px;
  padding: 0 50px;
}

.scan-fail {
  width: 15rem;
  height: 15rem;
  background: white;
  border-radius: 20px;
}

.scan-fail-heading {
  margin-top: 4rem;
}
</style>

<template>
  <q-page class="bg-black flex justify-center">
    <video
      id="video"
      class="camera"
    />
    <div
      class="target-wrapper flex flex-center"
      :class="scanFail ? 'white-overlay' : ''"
    >
      <div
        v-if="!scanFail"
        class="target"
      />
      <div
        v-if="scanFail"
        class="scan-fail flex-center"
      >
        <div class=" scan-fail-heading text-h4 text-center text-weight-bold">
          scan fail
        </div>
        <div class="text-center q-mx-xl text-grey-6 text-weight-bold">
          scan failed because the item has already been scanned
        </div>
      </div>
    </div>
    <div class="controls-box">
      <q-btn
        v-if="itemCounter < 1 || scanFail"
        flat
        icon="close"
        :color="scanFail ? 'accent' : 'grey-4'"
        size="lg"
        @click="finish()"
      />
    </div>
    <div class="finish-box absolute-center">
      <q-btn
        v-if="itemCounter > 0 && !scanFail"
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
      scanFail: false,
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

    addItemScanned(val) {
      const items = this.user.itemsScanned.map(item => item);
      items.push(val);
      console.log(items);
      User.insertOrUpdate({
        data: {
          accountNumber: this.user.accountNumber,
          itemsScanned: items,
        },
      });
    },

    async createRecycleTx(recyclables) {
      const tx = await this.$axios.post('https://cryptocycle.online/api/recycling-transactions', {
        consumerAccountNumber: this.accountNumber,
        recyclePointCode: this.recyclePoint,
        recyclables,
      });
      if (tx.status === 200 || tx.status === 201) {
        return tx;
      }
      return false;
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
          if (navigator.vibrate) {
            console.log('can vibrate');
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
        })
        .catch(err => console.error(err));
    },

    async checkBottle(barcode) {
      const code = encodeURI(barcode.substr(1));
      try {
        const item = await this.$axios.get(`https://cryptocycle.online/api/recyclables/${code}`);
        console.log(item.data.data);
        if (item && item.status === 200) {
          if (this.user.itemsScanned.includes(item.data.data.code)) {
            console.log('itemScanned');
            return ['item already scanned', null];
          }
          const recyclable = {
            uniqueCode: item.data.data.code,
            productGtin: item.data.data.product.gtin,
          };
          this.addItemScanned(recyclable.uniqueCode);
          return [null, recyclable];
        }
        return ['invalid code', null];
      } catch (e) {
        return [e, null];
      }
    },

    async scanBottle() {
      const scanOk = async (result) => {
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
          this.$emit('updateStatus', 'scan fail');
          this.$q.loading.hide();
          this.scanFail = true;
        } else {
          await this.createRecycleTx([valid]);
          this.itemCounter += 1;
          await new Promise(resolve => setTimeout(resolve, 1000));
          this.scanBottle();
        }
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

    //   console.log(res);
    //   this.scanBottle();
    },

    async finish() {
      if (this.scanFail) {
        this.scanFail = false;
        this.scanBottle();
      } else {
        this.$q.loading.show();
        if (this.itemCounter > 0) {
          const stats = await this.$axios.get('https://cryptocycle.online/api/account/statistics');

          User.insertOrUpdate({
            data: {
              accountNumber: this.user.accountNumber,
              itemsRecycled: stats.data.data[0].itemsRecycled,
              pointsBalance: stats.data.data[0].rewardPointsEarned,
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
  height: 87vh;
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

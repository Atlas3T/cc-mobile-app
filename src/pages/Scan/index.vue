<template>
  <q-page class="bg-black flex justify-center">
    <video
      id="video"
      class="camera"
    />
    <div class="target-wrapper flex flex-center">
      <div class="target" />
    </div>
    <div class="controls-box">
      <q-btn
        flat
        icon="close"
        color="grey-4"
        size="lg"
        @click="finish()"
      />
    </div>
    <div class="finish-box absolute-center">
      <q-btn
        v-if="itemCounter > 0"
        unelevated
        rounded
        no-caps
        label="finish"
        color="secondary"
        size="lg"
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
    // if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
    //   console.log('enumerateDevices() not supported.');
    //   return;
    // }
    console.log(this.user);
    this.$emit('updateStatus', 'Scan return point');
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
      const recyclePoint = await this.$axios.get(`https://cryptocycle.online/api/recycle-points/${code}`);
      if (recyclePoint.status === 200) {
        this.recyclePoint = recyclePoint.data.data.code;
        return true;
      }
      return false;
    },

    async scanBin() {
      await this.codeReader
        .decodeFromInputVideoDevice(null, 'video')
        .then(async (result) => {
          window.navigator.vibrate(100);
          this.$emit('updateStatus', 'recycle point scanned', 'bg-secondary text-accent');
          this.$q.loading.show({
            delay: 400, // ms
          });
          console.log(result.text);
          const valid = await this.checkBin(result.text);
          console.log('valid: ', valid);
          setTimeout(() => {
            if (valid) {
              this.scanBottle();
              return true;
            }
            this.scanBin();
            return false;
          }, 2000);
        })
        .catch(err => console.error(err));
    },

    async checkBottle(barcode) {
      const code = encodeURI(barcode);
      try {
        const recyclePoint = await this.$axios.get(`https://cryptocycle.online/api/recyclables/${code}`);
        console.log(recyclePoint);
        if (recyclePoint && recyclePoint.status === 200) {
          const recyclable = {
            uniqueCode: recyclePoint.data.data.code,
            productGtin: recyclePoint.data.data.product.gtin,
          };
          return recyclable;
        }
        return false;
      } catch (e) {
        return false;
      }
    },

    async scanBottle() {
      const scanOk = async (result) => {
        window.navigator.vibrate(100);

        this.$q.loading.show({
          delay: 400, // ms
        });
        this.$emit('updateStatus', 'item scanned', 'bg-secondary text-accent');

        console.log(result.text);
        const valid = await this.checkBottle(result.text);
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (valid) {
          this.$emit('updateStatus', 'add item to bin', 'bg-secondary text-accent');
          const tx = await this.createRecycleTx([valid]);
          console.log(tx);
          this.itemCounter += 1;
          await new Promise(resolve => setTimeout(resolve, 1000));
          // return true;
        } else {
          this.$emit('updateStatus', 'invalid code', 'bg-red text-white');
          await new Promise(resolve => setTimeout(resolve, 2000));
          // return false;
        }

        this.scanBottle();
      };

      if (this.itemCounter > 0) {
        this.$emit('updateStatus', 'Scan another item');
      } else {
        this.$emit('updateStatus', 'Scan your item');
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
      this.$q.loading.show();
      if (this.itemCounter > 0) {
        const stats = await this.$axios.get('https://cryptocycle.online/api/account/statistics');

        User.insertOrUpdate({
          data: [
            {
              accountNumber: this.user.accountNumber,
              itemsRecycled: stats.data.data[0].itemsRecycled,
              pointsBalance: stats.data.data[0].rewardPointsEarned,
            },
          ],
        });
      }

      this.$router.push({ path: '/home' });
      this.$q.loading.hide();
    },
  },
};
</script>
<style lang="scss">
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
  bottom: 15%;
  top: inherit;
  display: flex;
}
</style>

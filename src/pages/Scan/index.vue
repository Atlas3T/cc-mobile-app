<template>
  <q-page class="flex justify-center">
    <video
      id="video"
      class="camera"
    />
    <div id="content">
      <q-icon
        name="crop_free"
        class="text-white text-h1 absolute-center"
      />
    </div>
  </q-page>
</template>
<script>
import { BrowserMultiFormatReader } from '@zxing/library';

export default {

  data() {
    return {
      codeReader: new BrowserMultiFormatReader(),
      firstDeviceId: null,
    };
  },
  mounted() {
    console.log(this.codeReader);
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
        return true;
      }
      return false;
    },

    async scanBin() {
      await this.codeReader
        .decodeFromInputVideoDevice(this.firstDeviceId, 'video')
        .then(async (result) => {
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

    async checkBottle() {
      const code = encodeURI('\\F210000000000');
      const recyclePoint = await this.$axios.get(`https://cryptocycle.online/api/recyclables/${code}`);
      console.log(recyclePoint);
      if (recyclePoint.status === 200) {
        return true;
      }
      return false;
    },

    async scanBottle() {
      console.log('scan bottle called');
      const res = await this.codeReader
        .decodeFromInputVideoDevice(this.firstDeviceId, 'video')
        .then(async (result) => {
          console.log(result.text);
          const valid = await this.checkBottle();
          if (valid) {
            return true;
          }
          this.scanBin();
          return false;
        })
        .catch(err => console.error(err));

      console.log(res);
    },
  },
};
</script>
<style lang="scss">
#content {
  position:relative;
  width:360px;
  height:200px;
  display: flex;
  align-items: center;
  justify-content: center;
  }
#content h2 {
  position: absolute;
  display: flex;
  padding: 10px;
  background-color: rgba(255,255,255,0.8);
}
#content p {
  flex: 1;
  display: flex;
}
#content img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

#content:before,
#content:after,
#content>:last-child:before,
#content>:last-child:after {
    position: absolute;
    width: 60px;
    height: 50px;
    border-color: white;
    border-style: solid;
    content: ' ';
}

#content:before {
    top: 10px;
    left: 10px;
    border-width: 1px 0 0 1px
}

#content:after {
    top: 10px;
    right: 10px;
    border-width: 1px 1px 0 0
}

#content>:last-child:before {
    bottom: 10px;
    right: 10px;
    border-width: 0 1px 1px 0
}

#content>:last-child:after {
    bottom: 10px;
    left: 10px;
    border-width: 0 0 1px 1px
}
.camera {
        width: 100%,;
        object-fit: fill;
    }
</style>

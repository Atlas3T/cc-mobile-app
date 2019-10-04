<template>
  <video
    id="video"
    class="camera"
  />
</template>
<script>
import { BrowserMultiFormatReader } from '@zxing/library';

export default {
  mounted() {
    const codeReader = new BrowserMultiFormatReader();

    codeReader
      .listVideoInputDevices()
      .then((videoInputDevices) => {
        videoInputDevices.forEach(device => console.log(`${device.label}, ${device.deviceId}`));
        const firstDeviceId = videoInputDevices[0].deviceId;

        codeReader
          .decodeFromInputVideoDevice(firstDeviceId, 'video')
          .then(result => console.log(result.text))
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  },
};
</script>
<style lang="scss">
    .camera {
        height: 100vh;
        width: 100%,;
        object-fit: fill;
    }
</style>

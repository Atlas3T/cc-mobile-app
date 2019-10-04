<template>
  <q-page class="reward-list bg-white text-primary">
    <div class="reward-list q-pa-md items-start">
      <div class="q-pa-sm q-mb-sm withdraw-box text-center">
        <div class="text-h4 text-weight-bold">
          £5.60
        </div>
        <div class="text-grey-6 q-mb-xs">
          cash balance
        </div>
        <div class="text-white text-left text-weight-bold bg-accent rounded-border q-pa-sm">
          <div class="row">
            <div class="col-3">
              <q-icon
                name="far fa-credit-card"
                size="xl"
                class="q-mx-sm"
              />
            </div>
            <div class="col">
              Withdraw to Bank Account No.6******3
            </div>
          </div>
        </div>
      </div>
      <div class="text-h5 text-center text-secondary text-weight-bold">
        make a donation
      </div>
      <div class="q-pb-sm text-body1 text-center text-accent">
        why not donate to one of our carefully selected charities
      </div>
      <div class="row q-gutter-sm q-pb-sm">
        <div class="col">
          <q-card
            class="reward-card"
            @click="popup.open=true"
          >
            <img src="../../assets/mocks/charities/homeless.jpg">
            <q-card-section style="position: relative">
              <div class="reward-logo absolute-center">
                <q-avatar
                  color="red"
                  text-color="white"
                  size="80px"
                >
                  <img
                    src="../../assets/brand-logos/centre-point.png"
                    alt=""
                  >
                </q-avatar>
              </div>
              <div class="q-mt-lg q-pt-sm text-body1 text-accent text-center text-weight-bold">
                donate £1 to centre point
              </div>
            </q-card-section>
          </q-card>
        </div>

        <div class="col">
          <q-card class="reward-card">
            <img src="../../assets/mocks/charities/leopard.jpg">
            <q-card-section style="position: relative">
              <div class="reward-logo absolute-center">
                <q-avatar
                  color="red"
                  text-color="white"
                  size="80px"
                >
                  <img
                    src="../../assets/brand-logos/wwf.png"
                    alt=""
                  >
                </q-avatar>
              </div>
              <div class="q-mt-lg q-pt-sm text-body1 text-accent text-center text-weight-bold">
                donate £1 to wwf
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div class="row q-gutter-sm">
        <div class="col">
          <q-card class="reward-card">
            <img src="../../assets/mocks/charities/dog.jpg">
            <q-card-section style="position: relative">
              <div class="reward-logo absolute-center">
                <q-avatar
                  color="red"
                  text-color="white"
                  size="80px"
                >
                  <img
                    src="../../assets/brand-logos/dogs-trust.png"
                    alt=""
                  >
                </q-avatar>
              </div>
              <div class="q-mt-lg q-pt-sm text-body1 text-accent text-center text-weight-bold">
                donate £1 to dogs trust
              </div>
            </q-card-section>
          </q-card>
        </div>

        <div class="col">
          <q-card class="reward-card">
            <img src="../../assets/mocks/charities/boy.jpg">
            <q-card-section style="position: relative">
              <div class="reward-logo absolute-center">
                <q-avatar
                  color="red"
                  text-color="white"
                  size="80px"
                >
                  <img
                    src="../../assets/brand-logos/water-aid.png"
                    alt=""
                  >
                </q-avatar>
              </div>
              <div class="q-mt-lg q-pt-sm text-body1 text-accent text-center text-weight-bold">
                donate £1 to water aid
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
    <PopupCard :info="popup" />
  </q-page>
</template>
<script>
import PopupCard from '../../components/PopupCard';

export default {
  components: {
    PopupCard,
  },
  data() {
    return {
      popup: {
        image: 'img/homeless.jpg',
        title: '',
        logo: 'img/centre-point.png',
        description: 'providing accomodation and support to homelss people aged 16-25',
        points: '£1',
        code: '',
        open: false,
      },
    };
  },
};
</script>
<style lang="scss">
.rounded-border {
    border-radius: 15px;
}
.withdraw-box {
    border: 3px solid $grey-4;
    border-radius: 15px;
}

.reward-list .q-card {
    box-shadow: inherit;
    background-color: $grey-5;
    border-radius: 15px;
}

.reward-logo {
    top: 0%
}
.reward-dialog .image {
    object-fit: cover;
    height: 40vh;
}

.reward-dialog .reward-list {
}
.reward-dialog .q-dialog__inner--minimized {
    padding: 0;
}
 .reward-dialog .q-dialog__inner > div {
     box-shadow: inherit;
 }

 .reward-button {
     border-radius: 15px;
 }

</style>

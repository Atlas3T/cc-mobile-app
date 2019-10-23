<template>
  <q-page class="flex flex-center bg-primary q-pa-md">
    <img
      alt="Cryptocyle logo"
      src="~assets/logo.png"
      class="logo q-pr-sm"
    >
    <q-footer class="q-pb-sm text-center text-body1 text-weight-bold">
      powered by CryptoCycle&trade;
    </q-footer>
  </q-page>
</template>

<script>
import { openURL } from 'quasar';
import User from '../../store/User';

export default {
  name: 'Splash',

  computed: {
    user() {
      if (User.all().length > 0) {
        return User.query().first();
      }
      return null;
    },
  },

  mounted() {
    setTimeout(() => {
      this.$mgr.getSignedIn().then(
        async (user) => {
          if (!user) {
            this.$router.push({ path: '/login' });
          } else {
            this.$axios.defaults.headers.common.Authorization = `Bearer ${user.access_token}`;

            const account = await this.$axios.get('https://cryptocycle.online/api/account');
            const { accountNumber } = account.data.data;
            const stats = await this.$axios.get('https://cryptocycle.online/api/account/statistics');

            if (this.user) {
              User.delete(this.user.accountNumber);
            }
            console.log(account.data.data);
            User.insertOrUpdate({
              data: [
                {
                  userName: user.profile.name,
                  emailAddress: user.profile.email,
                  itemsRecycled: stats.data.data[0].itemsRecycled,
                  pointsBalance: account.data.data.balances.rewardPoints,
                  cashBalance: account.data.data.balances.rewardValue,
                  expires: user.expires_at,
                  accountNumber,
                },
              ],
            });

            this.$router.push({ path: '/recycle' });
          }
        },
        (err) => {
          console.log(err);
        },
      );
    }, 2000);
  },
  methods: {
    openURL,
  },
};
</script>
<style>
.logo {
  width: -webkit-fill-available;
}
</style>

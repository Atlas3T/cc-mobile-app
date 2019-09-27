<template>
  <q-page class="bg-white text-primary">
    <div
      class="q-pa-md settings-menu"
    >
      <h5
        class="text-bold text-primary"
        style="padding: 0 16px;"
      >
        Settings
      </h5>
      <q-list class="text-grey">
        <q-item
          v-ripple
          clickable
        >
          <q-item-section>Account</q-item-section>
          <q-item-section avatar>
            <q-icon
              color="grey"
              name="keyboard_arrow_right"
            />
          </q-item-section>
        </q-item>

        <q-item
          v-ripple
          clickable
        >
          <q-item-section>
            <q-item-label>Rewards</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-icon
              color="grey"
              name="keyboard_arrow_right"
            />
          </q-item-section>
        </q-item>

        <q-item
          v-ripple
          clickable
        >
          <q-item-section>
            Personal details
          </q-item-section>
          <q-item-section avatar>
            <q-icon
              color="grey"
              name="keyboard_arrow_right"
            />
          </q-item-section>
        </q-item>
        <q-item
          v-ripple
          clickable
        >
          <q-item-section>About</q-item-section>
          <q-item-section avatar>
            <q-icon
              color="grey"
              name="keyboard_arrow_right"
            />
          </q-item-section>
        </q-item>

        <q-item
          v-ripple
          clickable
        >
          <q-item-section>
            <q-item-label>Terms & Conditons</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-icon
              color="grey"
              name="keyboard_arrow_right"
            />
          </q-item-section>
        </q-item>

        <q-item
          v-ripple
          clickable
        >
          <q-item-section>
            Privacy Policy
          </q-item-section>
          <q-item-section avatar>
            <q-icon
              color="grey"
              name="keyboard_arrow_right"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Location',
};
</script>
<style>
.settings-menu .q-item__section {
    font-size: 22px;
}

.settings-menu .q-item {
    padding: 10px 16px;
}
</style>

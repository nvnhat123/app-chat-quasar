<template>
  <q-page>
    <q-list>
      <q-item v-for="(user, index) in users" :key="index" clickable v-ripple :to="'/chat/' + index">
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{ user.name.charAt(0) }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label> {{ user.name }} </q-item-label>
          <q-item-label caption lines="1"> </q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-badge class="shadow-5"
            :color="user.online ? 'green' : 'grey'"
            :label="user.online ? 'Online' : 'Offline'"
          />
        </q-item-section>
      </q-item>

      <q-separator />
    </q-list>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data() {
        return {}
    },
    computed: {
      ...mapGetters('store',['users'])
    },
}
</script>

<template>
  <q-page>
    <q-list>
      <q-item v-for="user in users" :key="user.id" clickable v-ripple>
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{ user.name.charAt(0) }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label> {{ user.name }} </q-item-label>
          <q-item-label caption lines="1">  </q-item-label>
        </q-item-section>

        <q-item-section side>
            <q-badge :color="user.online ? 'green' : 'grey' " :label="user.online ? 'Online' : 'Offline' " />
        </q-item-section>
      </q-item>

      <q-separator />
    </q-list>
  </q-page>
</template>

<script>
export default {
    data() {
        return {
            users: [
                {
                    id: 1,
                    name: 'PHP',
                    online: true
                },
                {
                    id: 2,
                    name: 'JS',
                    online: false
                },
                {
                    id: 3,
                    name: 'TS',
                    online: true
                }
            ]
        }
    }
}
</script>

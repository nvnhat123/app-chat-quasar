<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <!-- <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        /> -->

        <q-toolbar-title>
          <q-btn
            v-if="$route.fullPath.includes('/chat')"
            v-go-back.single
            dense
            flat
            icon="arrow_back"
            label="Back"
          />
        </q-toolbar-title>

        <q-btn
          class="absolute-center"
          flat
          color="white"
          dense
          flat
          :label="'Chat with ' + otherUserDetails.name"
          no-caps
        />

        <q-btn
          @click="logoutUser"
          v-if="userDetails.userId"
          flat
          color="white"
          dense
          flat
          :label="userDetails.name"
          no-caps
          icon="account_circle"
        />
        <q-btn
          v-else
          flat
          color="white"
          dense
          flat
          label="Login"
          no-caps
          icon="account_circle"
          to="/auth"
        />
      </q-toolbar>
    </q-header>

    <!-- <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-1">
      <q-list>
        <q-item-label header class="text-grey-8"> Essential Links </q-item-label>
        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer> -->

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";
import MixinOtherUserDetail from "src/mixins/other-user-detail.js";
import { mapState, mapActions } from "vuex";

export default {
  name: "MainLayout",
  mixins: [MixinOtherUserDetail],
  components: {
    EssentialLink,
  },

  computed: {
    ...mapState("store", ["userDetails"]),
  },

  methods: {
    ...mapActions("store", ["logoutUser"]),
  },

  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData,
    };
  },
};

const linksData = [
  {
    title: "Docs",
    caption: "quasar.dev",
    icon: "school",
    link: "https://quasar.dev",
  },
  {
    title: "Github",
    caption: "github.com/quasarframework",
    icon: "code",
    link: "https://github.com/quasarframework",
  },
  {
    title: "Discord Chat Channel",
    caption: "chat.quasar.dev",
    icon: "chat",
    link: "https://chat.quasar.dev",
  },
  {
    title: "Forum",
    caption: "forum.quasar.dev",
    icon: "record_voice_over",
    link: "https://forum.quasar.dev",
  },
  {
    title: "Twitter",
    caption: "@quasarframework",
    icon: "rss_feed",
    link: "https://twitter.quasar.dev",
  },
  {
    title: "Facebook",
    caption: "@QuasarFramework",
    icon: "public",
    link: "https://facebook.quasar.dev",
  },
  {
    title: "Quasar Awesome",
    caption: "Community Quasar projects",
    icon: "favorite",
    link: "https://awesome.quasar.dev",
  },
];
</script>

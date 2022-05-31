<template>
  <q-page class="flex column" ref="pageChat">
    <q-banner class="bg-grey text-white" v-if="!otherUserDetails.online">
      User is offline.
    </q-banner>
    <div class="q-pa-md col column row justify-end">
      <q-chat-message
        :text="[message.text]"
        :sent="message.from == 'me' ? true : false"
        v-for="(message, index) in messages"
      />
    </div>
    <q-footer elevated>
      <q-toolbar>
        <q-form @submit="sendMessage" class="full-width">
          <q-input
            v-model="newMessage"
            label="Message"
            bg-color="white"
            outlined
            class="full-width"
            dense
          >
            <template v-slot:after>
              <q-btn
                round
                dense
                flat
                icon="send"
                @click="sendMessage"
                color="white"
                type="submit"
              />
            </template>
          </q-input>
        </q-form>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      newMessage: "",
    };
  },

  methods: {
    ...mapActions("store", [
      "firebaseGetMessages",
      "firebaseStopGettingMessages",
      "firebaseSendMessage",
    ]),
    sendMessage() {
      this.firebaseSendMessage({
        message: { text: this.newMessage, from: "me" },
        otherUserId: this.$route.params.otherUserId,
      });
      this.clearMessage();
    },

    clearMessage() {
      this.newMessage = '';
    }
  },
  mounted() {
    this.firebaseGetMessages(this.$route.params.otherUserId);
  },
  computed: {
    ...mapState("store", ["messages"]),
    otherUserDetails() {
      if (this.$store.state.store.users[this.$route.params.otherUserId]) {
        return this.$store.state.store.users[this.$route.params.otherUserId];
      }

      return {};
    },
  },

  watch: {
    messages(value) {
      const countMessage = Object.keys(value).length;
      if (countMessage) {
        setTimeout(() => {
          window.scrollTo(0, this.$refs.pageChat.$el.scrollHeight);
        }, 1000);
      }
    },
  },

  destroyed() {
    this.firebaseStopGettingMessages();
  },
};
</script>

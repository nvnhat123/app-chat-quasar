<template>
  <q-page class="flex column">
    <q-banner class="bg-grey text-white" v-if="!otherUserDetails.online">
      Unfortunately, the credit card did not go through, please try again.
    </q-banner>
    <div class="q-pa-md col column row justify-end">
      <q-chat-message
        :text="[message.text]"
        :sent="message.from == 'me' ? true : false"
        v-for="(message, index) in messages"
      />
      <q-chat-message :text="['doing fine, how r you?']" />
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
    ...mapActions("store", ["firebaseGetMessages", "firebaseStopGettingMessages", "firebaseSendMessage"]),
    sendMessage() {
      // console.log(this.newMessage);
      // this.messages.push({ content: this.newMessage, from: "me" });
      this.firebaseSendMessage({
        message: { text: this.newMessage, from: "me" },
        otherUserId: this.$route.params.otherUserId
      });
    },
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
  destroyed() {
    this.firebaseStopGettingMessages();
  },
};
</script>

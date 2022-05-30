<template>
  <q-form @submit="submitForm">
    <q-input
      v-if="tab == 'register'"
      label="Name"
      class="q-mb-sm"
      v-model="formData.name"
    />
    <q-input label="Email" class="q-mb-sm" v-model="formData.email" />
    <q-input label="Password" class="q-mb-sm" v-model="formData.password" />
    <div class="row">
      <q-space />
      <q-btn color="primary" :label="tab" type="submit" class="q-mt-md" />
    </div>
  </q-form>
</template>
<script>
import { mapActions } from "vuex";

export default {
  props: ["tab"],
  data() {
    return {
      formData: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions("store", ["registerUser", "loginUser"]),
    submitForm() {
      if (this.tab == "login") {
        this.loginUser(this.formData);
      } else {
        this.registerUser(this.formData);
      }
    },
  },
};
</script>

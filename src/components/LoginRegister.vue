<template>
  <q-form @submit="submitForm">
    <q-input
      v-if="tab == 'register'"
      label="Name"
      class="q-mb-sm"
      v-model="formData.name"
    />
    <q-input label="Email" class="q-mb-sm" v-model="formData.email" />
    <p class="color-red" v-if="errorLogin.message">{{ errorLogin.message }}</p>
    <q-input
      label="Password"
      type="password"
      class="q-mb-sm"
      v-model="formData.password"
    />
    <div class="row">
      <q-space />
      <q-btn color="primary" :label="tab" type="submit" class="q-mt-md" />
    </div>
  </q-form>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  props: {
    tab: {
      type: String,
      required: false,
    },
  },
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
    ...mapActions("store", ["registerUser", "loginUser", "clearErrorLoginRegister"]),
    submitForm() {
      if (this.tab == "login") {
        this.loginUser(this.formData);
      } else {
        this.registerUser(this.formData);
      }
    },
  },
  computed: {
    ...mapState("store", ["errorLogin"]),
  },
  mounted() {
    this.clearErrorLoginRegister();
  },
};
</script>

<style scope lang="scss">
.color-red {
  color: red;
}
</style>

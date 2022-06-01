<template lang="">
    <div class="q-pa-md">
        <div class="q-gutter-y-md column q-mx-auto" style="max-width: 300px">
            <div class="profile">
                <img class="br-06" :src="form.currentAvatar" width="100%" height="100%" />
                <label class="avatar">
                    <input type="file" name="upload" class="w-0" @change="changeAvatar" />
                </label>
            </div>
        <q-input
            clearable
            clear-icon="close"
            filled
            color="purple-12"
            v-model="form.name"
            label="Name"
        />
        <q-input 
            v-model="form.date" 
            filled 
            type="date" 
        />
        <q-input
            v-model="form.description"
            filled
            clearable
            autogrow
            color="green-8"
            label="Description"
        />
        <q-btn 
            color="secondary"
            label="Submit" 
            @click="updateProfile"
        />
        </div>
    </div>
</template>
<script>

import { mapActions, mapState } from "vuex";
import firebase from "firebase";

export default {
    data() {
        return {
            form: {
                name: '',
                date: '',
                description: '',
                currentAvatar: 'https://placeimg.com/300/300/nature',
                newAvatar: '',
            }
        }
    },

    methods: {
        ...mapActions("store", ["firebaseUpdateProfile"]),
        changeAvatar(event) {
            if (event.target.files && event.target.files[0]) {
                console.log(event.target.files[0]);
                const fileType = event.target.files[0].type.toString();
                if (fileType.indexOf("image") != 0) {
                    console.log('error');
                    return;
                }
                this.form.newAvatar = event.target.files[0];
                this.form.currentAvatar = URL.createObjectURL(event.target.files[0]);
                console.log(this.form);
            //     () => {
            // upload.snapshot.ref.getDownloadURL().then(url => {
            //   console.log('img', url);
            //   this.updateUserInfo(true, url);
            // });
        //   }
            } else {
                console.log('error');
            }
        },
        
        updateProfile() {
            this.firebaseUpdateProfile(this.form);
        }
    },

    computed: {
        ...mapState("store", ["userDetails"]),
    },

    mounted() {
    },
}
</script>
<style lang="css">
    label {
  font-size: 18px;
  font-weight: 600;
}
.fw-600 {
  font-weight: 600;
}
.w-100 {
  width: 100vw;
}
.w-0 {
  width: 0;
}
.br-06 {
  border-radius: 0.6rem;
}
.profile {
  margin: 20px auto;
  width: 150px;
  height: 150px;
  background-color: royalblue;
  position: relative;
  border-radius: 0.6rem;
}
.avatar {
  width: 100%;
  height: 100%;
  border-radius: 0.6rem;
  position: absolute;
  top: 0;
  right: 0px;
  padding: 2px 0px 0px 7px;
}
</style>
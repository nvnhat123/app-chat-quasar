import firebase from "boot/firebase"
import Vue from 'vue'

let messageGroup;

const state = {
    userDetails: {},
    users: {},
    messages: {},
    errorLogin: {},
}

const mutations = {
    setUserDetails(state, payload) {
        state.userDetails = payload
        console.log('state', state);
    },
    setErrorLoginRegister(state, payload) {
        state.errorLogin = payload;
    },
    addUser(state, payload) {
        Vue.set(state.users, payload.userId, payload.userDetails)
    },
    updateUser(state, payload) {
        Object.assign(state.users[payload.userId], payload.userDetails)
    },
    addMessage(state, payload) {
        Vue.set(state.messages, payload.messageId, payload.messageDetails)
    },
    removeMessage(state) {
        state.messages = {};
    },
    clearError(state) {
        state.errorLogin = {};
    }
}
const actions = {

    registerUser({ commit }, payload) {
        firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
            .then(response => {
                console.log(response);
                let uid = firebase.auth().currentUser.uid;
                firebase.database().ref("users/" + uid).set({
                    name: payload.name,
                    email: payload.email,
                    password: payload.password,
                    online: true
                })
            })
            .catch(error => {
                commit('setErrorLoginRegister', error)
            });
    },

    loginUser({ commit }, payload) {
        firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
            .then(response => {
                console.log(response);
            }).catch(error => {
                console.log(error);
                commit('setErrorLoginRegister', error)
            })
    },

    logoutUser() {
        firebase.auth().signOut();
    },

    handleAuthStateChanged({ commit, dispatch, state }) {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log('yes');
                // User login
                let uid = firebase.auth().currentUser.uid;
                firebase.database().ref('users/' + uid).once('value', snapshot => {
                    let userDetails = snapshot.val();
                    console.log('user detail ', userDetails);
                    commit('setUserDetails', {
                        name: userDetails.name,
                        email: userDetails.email,
                        userId: uid
                    })
                });
                dispatch('firebaseUpdateUser', {
                    userId: uid,
                    updates: {
                        online: true
                    }
                })
                dispatch('firebaseGetUsers')
                this.$router.push({ name: 'users' })
            } else {
                // User logout
                dispatch('firebaseUpdateUser', {
                    userId: state.userDetails.userId,
                    updates: {
                        online: false
                    }
                })
                commit('setUserDetails', {})
                this.$router.push({ name: 'auth' })
            }
        });
    },

    firebaseUpdateUser({ }, payload) {
        firebase.database().ref('users/' + payload.userId).update(payload.updates);
    },

    firebaseGetUsers({ commit }) {
        firebase.database().ref('users').on('child_added', snapshot => {
            let userDetails = snapshot.val();
            let userId = snapshot.key
            commit('addUser', {
                userId,
                userDetails
            })
        }),
        firebase.database().ref('users').on('child_changed', snapshot => {
            let userDetails = snapshot.val();
            let userId = snapshot.key
            commit('updateUser', {
                userId,
                userDetails
            })
        })
    },

    firebaseGetMessages({ state, commit }, otherUserId) {
        let userId = state.userDetails.userId;
        messageGroup = firebase.database().ref('chats/' + userId + '/' + otherUserId);
        messageGroup.on('child_added', snapshot => {
            let messageDetails = snapshot.val();
            let messageId = snapshot.key
            console.log(messageDetails);
            commit('addMessage', {
                messageId,
                messageDetails
            })
        })
    },

    firebaseStopGettingMessages({ commit }) {
        if (messageGroup) {
            messageGroup.off('child_added')
            commit('removeMessage')
        }
    },

    firebaseSendMessage({ state }, payload) {
        firebase.database().ref('chats/' + state.userDetails.userId + '/' + payload.otherUserId).push(payload.message)
        payload.message.from = "them"
        firebase.database().ref('chats/' + payload.otherUserId + '/' + state.userDetails.userId).push(payload.message)
    },

    clearErrorLoginRegister({ commit }) {
        commit('clearError');
    },

    firebaseUpdateProfile({ }, payload) {
        console.log('pay', payload.form);
        // dispatch('firebaseUpdateUser', {
        //     userId: state.userDetails.userId,
        //     updates: {
        //         name: payload.form.name,
        //         description: payload.form.description,
        //         date: payload.form.date,
        //     }
        // })

        // dispatch('firebaseUploadImage', {
        //     avatar: payload.form.newAvatar
        // })
        console.log('done');
    },

    firebaseUploadImage({state}, payload) {
        const storage = firebase.storage()
            .ref('user-profile/' + state.userDetails.userId + '/' + payload.avatar.name)
        const task = storage.put(payload.avatar);

            task.on('state_changed',
                function(snap) {
                    console.log(snap);
                },
                function (err) {
                    console.log(err.message);
                },
                function () {
                    storage.snapshot.ref.getDownloadURL().then(url => {
                        console.log('link', url);
                    })
                }
            );
    }

}

const getters = {
    users: state => {
        let usersFiltered = {}
        Object.keys(state.users).forEach(key => {
            if (key !== state.userDetails.userId && key !== 'undefined') {
                usersFiltered[key] = state.users[key];
            }
        })
        return usersFiltered;
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
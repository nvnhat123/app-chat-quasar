import firebase from "boot/firebase"
import Vue from 'vue'

let messageGroup;
const state = {
    userDetails: {},
    users: {},
    messages: {}
}
const mutations = {
    setUserDetails(state, payload) {
        state.userDetails = payload
        console.log('state', state);
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
    }
}
const actions = {

    registerUser({ }, payload) {
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
                console.log(error.message);
            });
    },
    loginUser({ }, payload) {
        firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
            .then(response => {
                console.log(response);
            }).catch(error => {
                console.log(error.message);
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
                this.$router.push({name: 'users'});
            } else {
                // User logout
                dispatch('firebaseUpdateUser', {
                    userId: state.userDetails.userId,
                    updates: {
                        online: false
                    }
                })
                commit('setUserDetails', {})
                this.$router.push({name: 'auth'})
            }
        });
    },
    firebaseUpdateUser({}, payload) {
        firebase.database().ref('users/' + payload.userId).update(payload.updates);
    },
    firebaseGetUsers({commit}) {
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
    firebaseGetMessages({state, commit}, otherUserId) {
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
    firebaseStopGettingMessages({commit}) {
        if (messageGroup) {
            messageGroup.off('child_added')
            commit('removeMessage')
        }
    },
    firebaseSendMessage({}, payload) {
        console.log(payload);
        // https://www.youtube.com/watch?v=p2WdMLJjBjk&list=PLAiDzIdBfy8iZTjdu3mjNglucWadtLG1v&index=13&ab_channel=MakeAppswithDanny
        // https://github.com/joaohhenriq/quasar-chat-app/blob/master/src/store/store.js
    }
}
const getters = {
    users: state => {
        let usersFiltered = {}
        Object.keys(state.users).forEach(key => {
            if (key !== state.userDetails.userId ) {
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
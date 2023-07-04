import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import Crypto from 'crypto-js';

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
});

const store = new Vuex.Store({
    state: {
        user: {
        },
        tokens: {
            accessToken: "",
            refreshToken: ""
        }
    },
    getters: {
        getUser(state){
            return { id: state.user.id, username: state.user.username, tipo: state.user.tipo ? Crypto.AES.decrypt(state.user.tipo, import.meta.env.VITE_CRYPTO_KEY).toString(Crypto.enc.Utf8) : null };
        },
        getAccessToken(state) {
            return state.tokens.accessToken;
        },
        getRefreshToken(state) {
            return state.tokens.refreshToken;
        }
    },
    mutations: {
        setUser(state, user){
            state.user = { id: user.id, username: user.username, tipo: Crypto.AES.encrypt(user.tipo, import.meta.env.VITE_CRYPTO_KEY).toString() }
        },
        setAccessToken(state, token){
            state.tokens.accessToken = token;
        },
        setRefreshToken(state, token){
            state.tokens.refreshToken = token;
        },
        resetUser(state) {
            state.user = {};
            state.tokens.refreshToken = "";
            state.tokens.accessToken = "";
        }
    },
    plugins: [vuexLocal.plugin]
})

export default store
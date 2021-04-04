
export default {
    state: {
        info: '',
        snack: false
    },
    mutations: {
        infoSnack(state, info) {

            state.info = info;
            state.snack = true;
        },
        snackFalse(state) {
            state.snack = false;
        }
    },
    actions: {
        initInfo({ commit }, info) {
            commit('infoSnack', info);
        },
        setSnackFalse({ commit }) {
            commit('snackFalse');
        }
    },
    getters: {
        info(state) {
            return state.info;
        },
        snack(state) {
            return state.snack;
        }    
    }
}
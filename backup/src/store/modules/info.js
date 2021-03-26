
export default {
    state: {
        info: '',
        snack: false
    },
    mutations: {
        setInfo(state, info) {

            state.info = info;
            state.snack = true;
        },
        setSnack(state) {
            state.snack = false;
        }
    },
    actions: {
        initInfo({ commit }, info) {
            commit('setInfo', info);
        },
        setSnackFalse({ commit }) {
            commit('setSnack');
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
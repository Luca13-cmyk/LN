
export default {
    state: {
        dataSheet: [],
        bottomSheet: false
    },
    mutations: {
        dataSheet(state, data) {

            state.dataSheet = data;
            state.bottomSheet = true;
        },
        sheetFalse(state) {
            state.bottomSheet = false;
        }
    },
    actions: {
        initEdit({ commit }, data) {
            commit('dataSheet', data);
        },
        setSheetFalse({ commit }) {
            commit('sheetFalse');
        }
    },
    getters: {
        dataSheet(state) {
            return state.dataSheet;
        },
        bottomSheet(state) {
            return state.bottomSheet;
        }    
    }
}
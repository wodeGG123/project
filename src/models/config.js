
export default {

  namespace: 'config',

  state: {},

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      let contentHeight = document.documentElement.clientHeight - 99
      dispatch({
        type:'save',
        payload:{
          contentHeight
        }  
      })
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};

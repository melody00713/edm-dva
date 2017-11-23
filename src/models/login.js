
export default {
  namespace: 'login',
  state: {
    loginForm: {
      username: '',
      password: '',
      domain: '',
      remeber: false,
      autologin: false,
    },
  },
  reducers: {
  },
  effects: {
    *login({ payload }, { call, put }) {
      yield put({ type: 'showLoginLoading' });
      const data = yield call(login, payload);
    },
  },
  subscriptions: {},
};

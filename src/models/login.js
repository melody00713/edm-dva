
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
    powerType: null,
    powerVisible: false,
  },
  reducers: {
    showPowerModal() {
      this.setState({
        powerVisible: true,
      });
    },
    hidePowerModal() {
      this.setState({
        powerVisible: false,
      });
    },
    changePowerType({ payload }) {
      console.log(payload);
      // this.setState({
      //   powerType: value,
      // });
    },
  },
  effects: {
    *login({ payload }, { call, put }) {
      yield put({ type: 'showLoginLoading' });
      const data = yield call(login, payload);
    },
  },
  subscriptions: {},
};

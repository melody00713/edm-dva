
export default {
  namespace: 'app',
  state: {
    powerType: null,
    powerVisible: false,
  },
  reducers: {
    showPowerModal(state, { payload }) {
      return { ...state, ...payload, powerVisible: true };
    },
    hidePowerModal(state) {
      return { ...state, powerVisible: false };
    },
  },
  effects: {},
  subscriptions: {},
};

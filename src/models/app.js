import { message } from 'antd';

export default {
  namespace: 'app',
  state: {
    powerType: null, // 2 - 重启 1 - 关机
    powerVisible: false,
  },
  reducers: {
    showPowerModal(state, { payload }) {
      return {
        ...state,
        powerType: parseInt(payload.powerType),
        powerVisible: true,
      };
    },
    hidePowerModal(state) {
      return {
        ...state,
        powerType: null,
        powerVisible: false,
      };
    },
    togglePowerType(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *powerHandler(_, { select, put }) {
      const models = yield select();
      yield put({
        type: 'hidePowerModal',
      });
      message.info(`${models.app.powerType === 1 ? '关机' : '重启'}操作`);
    },
  },
  subscriptions: {},
};

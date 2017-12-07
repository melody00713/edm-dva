import qs from 'query-string';
import { queryFakeList } from '../services/api';
import { PAGE_SIZE } from '../constants';

export default {
  namespace: 'vms',
  state: {
    list: [],
    toggleListLayout: false, // 列表显示方式 false-图形化 true-列表
    loading: false,
  },
  reducers: {
    setState(state, action) {
      return { ...state, ...action.payload };
    },
    save(state, { payload: { data: list, total, page } }) {
      return { ...state, list, total, page };
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
  },
  effects: {
    // 获取列表数据方法
    *fetch({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const data = yield call(queryFakeList, payload);
      yield put({
        type: 'save',
        payload: {
          data,
          count: parseInt(payload.count, 10),
        },
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
  },
};

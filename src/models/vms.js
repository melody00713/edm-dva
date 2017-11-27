import qs from 'query-string';
import { queryFakeList } from '../services/api';
import PAGE_SIZE from '../constants';

export default {
  namespace: 'vms',
  state: {
    list: [],
    total: null,
    page: null,
    toggleListLayout: false, // 列表显示方式 false-图形化 true-列表
  },
  reducers: {
    setState(state, action) {
      return { ...state, ...action.payload };
    },
    save(state, { payload: { data: list, total, page } }) {
      return { ...state, list, total, page };
    },
  },
  effects: {
    // 获取列表数据方法
    *fetch({ payload: { count = PAGE_SIZE } }, { call, put }) {
      const data = yield call(queryFakeList, { count });
      yield put({
        type: 'save',
        payload: {
          data,
          count: parseInt(count, 10),
        },
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        if (pathname === '/vms') {
          dispatch({ type: 'fetch', payload: qs.parse(search) });
        }
      });
    },
  },
};

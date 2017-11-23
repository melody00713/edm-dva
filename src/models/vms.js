import qs from 'query-string';
import * as usersService from '../services/users';

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
    *fetch({ payload: { page = 1 } }, { call, put }) {
      const { data, headers } = yield call(usersService.fetch, { page });
      yield put({
        type: 'save',
        payload: {
          data,
          total: parseInt(headers['x-total-count'], 10),
          page: parseInt(page, 10),
        },
      });
    },
    *remove({ payload: id }, { call, put, select }) {
      yield call(usersService.remove, id);
      const page = yield select(state => state.users.page);
      yield put({
        type: 'fetch',
        payload: { page },
      });
    },
    *patch({ payload: { id, values } }, { call, put, select }) {
      yield call(usersService.patch, id, values);
      const page = yield select(state => state.users.page);
      yield put({
        type: 'fetch',
        payload: { page },
      });
    },
    *create({ payload: { values } }, { call, put, select }) {
      yield call(usersService.create, values);
      const page = yield select(state => state.users.page);
      yield put({
        type: 'fetch',
        payload: { page },
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

import { routerRedux } from 'dva/router';
import { fakeAccountLogin, queryFakeDomainList } from '../services/api';

export default {
  namespace: 'login',
  state: {
    status: undefined,
    domainList: [],
    account: null,
  },
  effects: {
    *getDomainList(_, { call, put }) {
      const response = yield call(queryFakeDomainList);
      yield put({
        type: 'setDomainList',
        payload: response,
      });
    },
    *accountSubmit({ payload }, { call, put }) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });
      const response = yield call(fakeAccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      yield put({
        type: 'changeSubmitting',
        payload: false,
      });
    },
    *logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
        },
      });
      yield put(routerRedux.push('/login'));
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      return {
        ...state,
        status: payload.status,
        account: payload.account,
      };
    },
    changeSubmitting(state, { payload }) {
      return {
        ...state,
        submitting: payload,
      };
    },
    setDomainList(state, { payload }) {
      return {
        ...state,
        domainList: payload,
      };
    },
  },
};

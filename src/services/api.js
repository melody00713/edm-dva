import { stringify } from 'qs';
import request from '../utils/request';

export async function queryFakeList(params) {
  console.log(params)
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function queryFakeDomainList() {
  return request('/api/domain_list');
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

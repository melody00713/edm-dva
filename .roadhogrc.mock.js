import mockjs from 'mockjs';
import { getFakeList, getDomainList, acount } from './mock/api';
import { format, delay } from 'roadhog-api-doc';

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
  'GET /api/fake_list': getFakeList,
  'GET /api/domain_list': getDomainList,
  'POST /api/login/account': acount,
};

export default noProxy ? {} : delay(proxy, 1000);

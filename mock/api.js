import { getUrlParams } from './utils';

const os = [
  'windows xp',
  'windows 8',
  'Linux',
];

const deskName = [
  'desktop-001',
  'desktop-002',
  'desktop-003',
  'desktop-004',
  'desktop-005',
  'desktop-006',
  'desktop-007',
  'desktop-008',
  'desktop-009',
  'desktop-010',
  'desktop-001',
  'desktop-002',
  'desktop-003',
  'desktop-004',
  'desktop-005',
  'desktop-006',
  'desktop-007',
  'desktop-008',
  'desktop-009',
  'desktop-010',
];
const DomainList = ['internal', 'Dva', 'Dva-2-5G', 'Dva-4-8G', 'Easted'];

const User = [
  { username: 'admin', password: 'easted2013', domain: 'internal' },
  { username: 'guoxn', password: 'password', domain: 'Dva' },
];

export function fakeList(count) {
  const list = [];
  count = count === -1 ? deskName.length : count;
  for (let i = 0; i < count; i += 1) {
    list.push({
      id: Math.ceil(Math.random() * 100000) + 100000,
      name: deskName[i % 10],
      os: os[i % 3],
      status: i % 2 === 0 ? 'on' : 'off',
      ip: '10.10.139.13',
      cpu: '2 核',
      memory: '4 GB',
      mac: '44-45-53-54-00-00',
      diskused: '1 GB',
      diskall: '4 GB',
      createtime: new Date(),
      domain: DomainList[i % 2],
    });
  }

  return list;
}

export function getFakeList(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = getUrlParams(url);
  console.log(url)

  const count = (params.count * 1) || 3;

  let result = fakeList(count);
  result = result.filter((item) => {
    return item.domain === params.domain;
  });

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}


export function getDomainList(req, res) {
  const result = DomainList;

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export function acount(req, res) {
  const { password, userName, domain } = req.body;
  const result = User.find((item) => {
    return item.username === userName && item.password === password && item.domain === domain;
  });
  if (res && res.json) {
    res.json({ status: result ? 'ok' : 'error', account: result });
  } else {
    return { status: result ? 'ok' : 'error', account: result };
  }
}


export default {
  getFakeList,
  getDomainList,
  acount,
};

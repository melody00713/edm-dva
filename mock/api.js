import { getUrlParams } from './utils';

const os = [
  'windows xp',
  'windows 8',
  'Linux',
];

const name = [
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

export function fakeList(count) {
  const list = [];
  for (let i = 0; i < count; i += 1) {
    list.push({
      id: Math.ceil(Math.random() * 100000) + 100000,
      name: name[i % 10],
      os: os[i % 3],
      status: i % 2 === 0 ? 'on' : 'off',
      ip: '10.10.139.13',
      cpu: '2 核',
      memory: '4 GB',
      mac: '44-45-53-54-00-00',
      diskused: '1 GB',
      diskall: '4 GB',
      createtime: new Date(),
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

  const count = (params.count * 1) || 3;

  const result = fakeList(count);

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}


export default {
  getFakeList,
};

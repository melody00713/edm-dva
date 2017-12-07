
// 每行显示几个图形 根据页面宽度判断
let COL_COUNT;
if (document.body.clientWidth > 1500) {
  COL_COUNT = 3;
} else if (document.body.clientWidth > 1000) {
  COL_COUNT = 2;
} else {
  COL_COUNT = 1;
}

// 每页显示几行图形 根据页面高度判断
let ROW_COUNT;
console.log(document.body.clientHeight - 198);
if (document.body.clientHeight > 1500) {
  ROW_COUNT = 2;
} else {
  ROW_COUNT = 2;
}


// 查找数据条数 全部 = -1
const PAGE_SIZE = -1;


export default {
  COL_COUNT,
  ROW_COUNT,
  PAGE_SIZE,
};

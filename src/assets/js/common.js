export function sliceArray(arr, size) {
  let result = [];
  for (let i = 0; i < Math.ceil(arr.length / size); i++) {
    let start = i * size;
    let end = start + size;
    result.push(arr.slice(start, end));
  }
  return result;
}

export default {
  sliceArray,
};

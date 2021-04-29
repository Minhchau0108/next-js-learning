export function transformData(data) {
  let transformData = [];
  for (let key in data) {
    transformData.push({ id: key, ...data[key] });
  }
  return transformData;
}

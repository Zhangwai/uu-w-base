/**获取start到end的随机数 */
export const getRandomNumberByRange = (start: number, end: number) => {
  return Math.round(Math.random() * (end - start) + start);
};
/**x,y求和 */
export const sum = (x: number, y: number) => {
  return x + y;
};
/**x平方 */
export const square = (x: number) => {
  return x * x;
};

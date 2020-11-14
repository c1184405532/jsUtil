/**
 * 字符串去重
 * @param {*} string 
 * stringDeDuplication('我的我的啊啊啊131324')
 */
const stringDeDuplication = (string) => {
  if(typeof string !== 'string'){
     console.error('请传入字符串！')
    return;
  }
  return [...new Set(string)].join('')
}
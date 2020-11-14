/**
 * 字符串超长替换省略号
 * @param {*} str 要省略的字符串
 * @param {*} length 截取长度
 * @param {*} unit 后缀单位
 * strElipsis('ad爱我啊打是啊',3,'...')
 */
const strElipsis = (str,length = 5,unit = '...') => {
  let result;  
  if(str.length >= length){
    let intercept = str.substr(0,length);
    result = intercept+unit
  }else{
    result = str;
  }
  return result
}

/**
 * 电话号码脱敏
 * @param {*} phone 
 * phoneSpilt('18584084806')
 * 
 */
const phoneSpilt = (phone) => {
  if(typeof phone !== 'string' && typeof phone !== 'number'){
    console.error('请传入字符串电话号码或数值类型电话号码！')
    return;
  }
  return phone.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2")
}
/**
 * 姓名脱敏
 * @param {*} name 
 * nameSplit('陈禹廷')
 * 
 */
const nameSplit = (name) => {
  if(typeof name !== 'string'){
    console.error('请传入字符串')
    return;
  }
  let arr = name.split('');
  if(arr.length > 2){
    for(let i=0; i<arr.length; i++){
      if(i < arr.length-2){
        arr[i+1] = '*';
      }
    }
  }else{
    arr[1] = '*'
  }
  return arr.join('');
}


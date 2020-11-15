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

/**
 * 正则校验只能输入中文和字母数字
 * @param {*} name 
 */
const regCNA = (str) => {
  if(typeof str !== 'string'){
    console.error('请传入字符串！')
    return;
  }
  let reg = /^[a-z\u4e00-\u9fa50-9]*$/ig
  if (str.search(reg) === -1){
    return false
  }
  return str;
}

/**
 * 限制只能输入纯数字 只能在input输入事件时使用，如果直接传入一长串字符串，返回结果不准
 * @param {*} number 
 *  <input type="text" oninput="isNumber(this)" name="" id="">
 *  function isNumber(event){ event.value = inputNumber(event.value); }
 */
const inputNumber = (number) => {
  let reg = /^[0-9]+.?[0-9]*$/g;
  let flag = reg.test(number);
  if(flag){
    return number
  }else{
    return number.substr(0,number.length - 1)
  }
}
/**
 * 截取url传递的参数 
 * @param {*} key 
 * 传入需要获取的key index.html?id=15&name=chen
 * GetQueryString('name') === chen
 */
const GetQueryString = (key) => {
  let reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");    //正则截取参数
  let r = window.location.search.substr(1).match(reg);    //截取url
  if (r != null) return (decodeURIComponent(r[2]));
  return null;
}
/**
 * 时间戳倒计时
 * @param {*} times  
 * times 为十位时间戳，且需大于当前时间时间戳。
 * setInterval(()=>{
    console.log(countDown(1605435235))
   },1000)
 */
const countDown = (times) => {
  let currentTimes =  Date.parse(new Date())/1000;
  let surplusTimes =  times - currentTimes;
  if(currentTimes > times){
    return '时间已过期！'
  }
  let result = "";
  let $days,$hours,$minutes,$secend; 
  if (surplusTimes >= 86400) {
    $days = Math.floor(surplusTimes / 86400);
    surplusTimes = surplusTimes % 86400;
    result = $days + '天 ';
    if (surplusTimes > 0) {
      result += '';
    }
  }
  if (surplusTimes >= 3600) {
    $hours = Math.floor(surplusTimes / 3600);
    surplusTimes = surplusTimes % 3600;
    if ($hours < 10) {
        $hours = '0' + $hours;
    }
    result += $hours + ':';
  }
  if (surplusTimes < 60) {
    $minutes = Math.floor(surplusTimes / 60);
    $minutes = '0' + $minutes;
    result += $minutes + ':';
  }
  if (surplusTimes >= 60) {
    $minutes = Math.floor(surplusTimes / 60);
    surplusTimes = surplusTimes % 60;
    if ($minutes < 10) {
      $minutes = '0' + $minutes;
    }
    result += $minutes + ':';
  }
  $secend = Math.floor(surplusTimes);
  if ($secend < 10) {
    $secend = '0' + $secend;
  }
  result += $secend;
  return result;
}
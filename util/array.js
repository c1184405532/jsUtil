
/**
 * 
 * @param {*} params  
 *    params类型为obj or arr。如果初次传入不是这个两个类型，直接返回传入的值
 * @param {*} first 调用时不传递，内部逻辑判断使用
 */
const deepClone = (params,first) => {
  if(!first){
    if(typeof params !== 'object' || params === null) return params;
    try {
      params.exec('')
      return params
    } catch (error) {}
  }
  let newObj = {};
  if(Array.isArray(params)){
    newObj = [];
  }
  for(key in params){
    if(typeof params[key] === 'object' && params[key] !== null){
      newObj[key] = deepClone(params[key],true)
    }else{
      newObj[key] = params[key]
    }
  }
  return newObj
}
/**
 * 一维数组去重 不能去除对象 arr = [1,2,3,1,2] 
 * @param {*} arr 
 */

const arrRemoval = (arr) => {
  if(Array.isArray(arr)){
    return [...new Set(arr)]
  }else{
    console.error('请传入数组')
  }
}

/** 
 * 一维数组取，交集、并集、补集、差集。
 * params 
 * arr1 Array [1,2,3]
 * arr2 Array [4,5,6,1,2]
 * type String 'intersection' 交集，'union' 并集，'complement' 补集，'diff' 差集，
 * arrGather(arr1,arr2,'intersection')
 */
const arrGather = (arr1,arr2,type) => {
  let resultArray = [];
  switch(type){
    case 'intersection':
      resultArray = arr1.filter(function (val) { return arr2.indexOf(val) > -1 })
      break;
    case 'union':
      resultArray = Array.from(new Set([...arr1, ...arr2]))
      break;
    case 'complement':
      resultArray = arr1.filter(function (val) { return !(arr2.indexOf(val) > -1) }).concat(arr2.filter(function (val) { return !(arr1.indexOf(val) > -1) }))
      break;
    case 'diff':
      //差集是返回arr1中与arr2所没有的
      resultArray = arr1.filter(function (val) { return arr2.indexOf(val) === -1 })
      break;
    default:
      resultArray = `请传入type指定获取集合类型，类型有'intersection' 交集，'union' 并集，'complement' 补集，'diff' 差集。`
  }
  return resultArray
};

/** 一维数组对象取，交集、并集、补集、差集。
   * params 
   * arr1 Array [{id:'1',name:'Tes'},{id:'2',name:'Ig'},{id:'3',name:'Sn'},{id:'4',name:'Skt'},{id:'5',name:'Fpx'}]
   * arr2 Array [{id:'1',name:'Tes'},{id:'2',name:'Ig'},{id:'3',name:'Sn'},{id:'4',name:'Skt'},{id:'6',name:'Fpx'}]
   * type String 'intersection' 交集，'union' 并集，'complement' 补集，'diff' 差集，
   * key String 用于你传入的数组对象中的唯一key做对比的数据值  默认为'id'
   * arrObjectGather(arrObject1,arrObject2,'diff',id||key)
  */
 const arrObjectGather = (arr1,arr2,type,key = 'id') => {
  let resultArray = [];
  let allArr = [];
  switch(type){
    case 'intersection':
      resultArray = arr1.filter(arr1Val => { 
        let resObject;
        arr2.forEach(arr2Val => {
          if(arr1Val[key] === arr2Val[key]){
            resObject = arr1Val[key] 
          }
        })
        return resObject
      })
      break;
    case 'union':
      //交换位置 长度大的那个数组永远在后面。否则长度大的在前面遍历出来并集的排序方式会把长的那个数组里面的唯一值添加在新数组前面。
      if(arr1.length > arr2.length){
        allArr = [...arr2,...arr1];
      }else{
        allArr = [...arr1,...arr2];
      }
      arr1.forEach(arr1Val => { 
        arr2.forEach(arr2Val => {
          if(arr1Val[key] === arr2Val[key]){
            allArr.splice(allArr.findIndex(item => item[key] === arr1Val[key]),1)
          }
        })
      })
      resultArray = allArr;
      break;
    case 'complement':
      allArr = [...arr1,...arr2];
      arr1.forEach(arr1Val => { 
        arr2.forEach(arr2Val => {
          if(arr1Val[key] === arr2Val[key]){
            allArr.splice(allArr.findIndex(item => item[key] === arr1Val[key]),1)
            allArr.splice(allArr.findIndex(item => item[key] === arr2Val[key]),1)
          }
        })
      })
      resultArray = allArr;
      break;
    case 'diff':
      //差集是返回arr1中与arr2所没有的
      let diffArr = [...arr1];
      arr1.forEach(arr1Val => {
        let flag = false; 
        arr2.forEach(arr2Val => {
          if(arr1Val[key] === arr2Val[key]){
            flag = true;
          }
        })
        if(flag){
          diffArr.splice(diffArr.findIndex(item => item[key] === arr1Val[key]),1)
        }
      })
      resultArray = diffArr;
      break;
    default:
      resultArray = `请传入type指定获取集合类型，类型有'intersection' 交集，'union' 并集，'complement' 补集，'diff' 差集。`
  }
  return resultArray
};

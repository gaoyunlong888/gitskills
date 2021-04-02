// 解析 URL Params 为对象

parseParams = ( url ) => {
  const paramsStr = /.+\?(.+)$/.exec(url)[1];
  const paramsArr = paramsStr.split('&');
  let paramObj = {};
  paramsArr.forEach( ( param ) => {
    if( /=/.test( param ) ){
      let [ key, val ] = param.split('=');
      val = decodeURIComponent( val );
      key = decodeURIComponent( key );
      if( paramObj.hasOwnProperty(key) ){
        paramObj[key] = [].concat(paramObj[key], val);
      } else {
        paramObj[key] = val;
      }
    }else {
      paramObj[param] = true;
    }
  } )
  return paramObj;
}

// 模板引擎实现

let template = '我是{{name}}，年龄{{age}}，性别{{sex}}';
let data = {
  name: '小王',
  age: 18
}
render( template, data );
var render = ( template, data ) => {
  const reg = /\{\{(\w+)\}\}/;
  if( reg.test( template ) ){
    const name = reg.exec( template )[1];
    template = template.replace( reg, data[name] );
    return render( template, data );
  }
  return template;
}

//转化为驼峰命名

let s1 = 'get-element-by-id';
let f = function ( s ){
  return s.replace( /-\w/g, function ( x ){
    return x.slice(1).toUpperCase();
  } )
}


//查找字符串中出现最多的字符和个数

let str = 'abcabcabcbbccccc';
let num = 0;
let char = '';
str = str.split('').sort().join('');
let re = /(\w)\1+/g;
str.replace(re, ($0, $1) => {
  if( num < $0.length ){
    num = $0.length;
    char = $1
  }
})


// 字符串查找，遍历实现判断字符串 a 是否被包含在字符串 b 中，并返回第一次出现的位置
let a = '34'; b = '1234567';
isContain(a, b);
var isContain = (a, b) => {
  for( let i in b ){
    if( a[0] === b[i] ){
      let tmp = true;
      for( let j in a ){
        if( a[j] !== b[i, i+j] ){
          tmp = false;
        }
      }
      if( tmp ){
        return i;
      }
    }
  }
  return -1;
}


// js 防抖   ---------------   lodash  _.debounce( func, timer )
let debounce = (fn, delay = 500) => {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout( () => {
      fn.apply(this, args);
    }, delay )
  }
}

// js 节流       --------------    lodash  _.throttle( function, timer )
let throttle = ( fn, delay = 500 ) => {
  let timer = true;
  return (...args) => {
    if( !timer ) return;
    timer = false;
    setTimeout( ()=> {
      fn.apply( this, args );
      timer = true;
    }, delay )
  }
}


// 浅克隆
shallowClone = (source) => {
  let target = {};
  for( let i in source ){
    if( source.hasOwnProperty(i) ){
      target[i] = source[i]
    }
  }
  return target;
}



// 深克隆
easyDeepClone = (source) => {
  if( typeof source !== 'object' ) return source;
  let target = {};
  for( let i in source ){
    if( source.hasOwnProperty(i) ){
      if( typeof source[i] === 'object' ){
        target[i] = easyDeepClone(source[i]);
      } else {
        target[i] = source[i]
      }
    }
  }
  return target;
}

normalDeepClone = (source, map = new WeakMap()) => {   //考虑了 array
  if( typeof source !== 'object') return source;
  let target = Array.isArray(source)? []: {};
  if( map.get(source) ) return source;
  map.set(source, target);
  for( let i in source ){
    target[i] = normalDeepClone(source[i], map)
  }
  return source;
}



// instanceOf

instanceOf = ( L, R ) => {
  let O = R.prototype;
  L = L.__proto__;
  while(true){
    if( L === null ) return false;
    if( 0 === L ) return true
    L = L.__proto__;
  }
}

// new
objectFactory = () => {
  const obj = new Object();
  const constructor = [].shift.call(arguments);
  obj.__proto__ = constructor.prototype;
  const ret = constructor.apply(obj, arguments);
  return typeof ret === 'object' ? ret : obj;
}


// bind






// 类的继承
function Parent(name){
  this.parentName = name;
}
Parent.prototype.say = () => {
  console.log( 11, this.parentName )
}
function Child(name, parent) {
  parent.call(this, parent)
  this.child = name;
}





























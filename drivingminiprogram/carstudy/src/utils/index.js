function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('-')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

/**
 * 拼接对象为请求字符串
 * @param {Object} obj - 待拼接的对象
 * @returns {string} - 拼接成的请求字符串
 */
export function formatGetUri (obj) {
  const params = []
  Object.keys(obj).forEach((key) => {
    let value = obj[key]
    if (typeof value === 'undefined' || value === null || value === '') {
    } else {
      params.push([key, encodeURIComponent(value)].join('='))
    }
  })
  return params.join('&')
}

/**
 * 页面跳转
 */
export function navigate(url) {
  wx.navigateTo({ url: url });
}
/**
 * 页面跳转替换当前页
 */
export function redirectTo(url) {
  wx.redirectTo({ url: url });
}
/**
 * 页面跳转清空所有页面
 */
export function reLaunch(url) {
  wx.reLaunch({ url: url });
}

/**
 * 返回上一页
 */
export function goBack() {
  wx.navigateBack({ delta: 1 })
}


export const promisic = func => {
  return (params = {}) => {
    return new Promise((resolve, reject) => {
      const args = Object.assign(params, {
        success: (res) => {
          resolve(res)
        },
        fail: (error) => {
          reject(error)
        }
      })
      func(args)
    })
  }
}
//分钟转换小时分钟
export function timeminutes(StatusMinute){	
	var day=parseInt(StatusMinute/60/24);
        var hour=parseInt(StatusMinute/60%24);
	var min= parseInt(StatusMinute % 60);
	StatusMinute="";
	if (day > 0)
	{
	    StatusMinute= day + "天";
	} 
	if (hour>0)
	{
	    StatusMinute += hour + "小时";
	} 
	if (min>0)
	{
	    StatusMinute += parseFloat(min) + "分钟";
	}
	    return StatusMinute;
  }
  


/**
 * 数据 按照 拼音首字母 排序 并分组
 * 
 * @param {Json} data ; 需要 排序的 数据
 * @param {String} field ；必须；排序所依据的 字段 名
 * 
 * @return {Json} ; 例如：{A:[{},{}],B:[{},{}],C:[{}],#:[]}
 */
export function data_letter_sort (data, field) {
  var letter_reg = /^[A-Z]$/;
  var letter = '';
  var list = new Array();
  for (var i = 0; i < data.length; i++) {
      // 添加 # 分组，用来 存放 首字母不能 转为 大写英文的 数据
      list['#'] = new Array();
      // 首字母 转 大写英文
      letter = (data[i][field]).substr(0, 1).toUpperCase();
      // 是否 大写 英文 字母
      if (!letter_reg.test(letter)) {
          letter = '#';
      }
      // 创建 字母 分组
      if (!(letter in list)) {
          list[letter] = new Array();
      }
      // 字母 分组 添加 数据
      list[letter].push(data[i]);
  }
  // 转换 格式 进行 排序；
  var resault = new Array();
  for (var key in list) {
      resault.push({
          letter: key,
          list: list[key]
      });
  }
  resault.sort(function (x, y) {
      return x.letter.charCodeAt(0) - y.letter.charCodeAt(0);
  });
  // # 号分组 放最后
  var last_arr = resault[0];
  resault.splice(0, 1);
  resault.push(last_arr);

  // 转换 数据 格式
  var json_sort = {}
  for (var i = 0; i < resault.length; i++) {
      json_sort[resault[i].letter] = resault[i].list;
  }

  return json_sort;
}

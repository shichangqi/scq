var _utils = {
    //简易的ajax请求
    ajax: function(object) {
        var xhr = new(self.XMLHttpRequest || ActiveXObject)('Microsoft.XMLHTTP');
        xhr.open(object.method, object.url, true);
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4 && xhr.status == 200) {
                var result = (new Function('', 'return ' + xhr.responseText))();
                object.success && object.success(result);
            }
        }
        if(object.cookie){
	        	//支持跨域发送cookies
	        xhr.withCredentials = true;
        }
        //跨域时，当出现自定义请求头，会出现Preflighted Requests(预检请求)
        //xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        if('post' == object.method.toLowerCase()) {
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            var str = [];
            var obj = object.data;
            for(var p in obj) {
                if(obj.hasOwnProperty(p) && '' != obj[p]) {
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
            }
            xhr.send(str.join("&"));
        } else {
            xhr.send(null);
        }
    },
    setCookie: function(key, value, expire) {
        var str = key + "=" + escape(value),
            date = '',
            ms = '';
        if(expire > 0) {
            date = new Date();
            ms = expire * 3600 * 1000;
            date.setTime(date.getTime() + ms)
            str += '; expires=' + date.toGMTString();
        }
        document.cookie = str;
    },
    getCookie: function(key) {
        var cookieArr = document.cookie.split("; ");
        for(var i = 0, len = cookieArr.length; i < len; i++) {
            var temp = cookieArr[i].split("=");
            if(key === temp[0]) {
                return unescape(temp[1]);
            }
        }
        return '';
    },
    delCookie: function(key) {
        var date = new Date();
        date.setTime(-1000);
        document.cookie = key + "=; expires=" + date.toGMTString();
    },
    getAllCookie: function() {
        return document.cookie;
    },
    //获取当天剩余多少小时
    getRemainHourOfDay: function() {
        var now = new Date();
        var nowSeconds = now.getHours() * 60 * 60 + now.getMinutes() * 60 + now.getSeconds();
        return(86400 - nowSeconds) / 3600;
    },
    getUrlParam: function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if(r != null) return decodeURIComponent(r[2]);
        return '';
    },
    getOneLevelDomain: function(){
    		//获取当前域名的一级域名，目前不严谨(不考虑.com.cn这样的多级域名)
    		var tempArr = location.hostname.split('.');
    		var size = tempArr.length;
    		return tempArr[size - 2] + '.' + tempArr[size - 1];
    },
    store: {
    		set: function(key, value){
    			if(_utils.localStorage){
    				_utils.localStorage.setItem(key, value);
    			} else {
    				_utils.setCookie(key, value);
    			}
    		},
    		get: function(key){
    			if(_utils.localStorage){
    				var result = _utils.localStorage.getItem(key);
    				return result ? result : '';
    			} else {
    				return _utils.getCookie(key);
    			}
    		},
    		del: function(key){
    			if(_utils.localStorage){
    				_utils.localStorage.removeItem(key);
    			} else {
    				_utils.delCookie(key);
    			}
    		}
    },
    inWx: (navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == "micromessenger"),
    localStorage: (window.localStorage || false),
    formatTimestamp: function (timestamp, hideTime) {
        var date = new Date(parseInt(timestamp));
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        month = month <= 9 ? "0" + month : month;
        var day = date.getDate();
        day = day <= 9 ? "0" + day : day;
        var hours = date.getHours();
        hours = hours <= 9 ? "0" + hours : hours;
        var minutes = date.getMinutes();
        minutes = minutes <= 9 ? "0" + minutes : minutes;
        var seconds = date.getSeconds();
        seconds = seconds <= 9 ? "0" + seconds : seconds;
        var result = year + "-" + month + "-" + day;
        if (!hideTime) {
            result += " " + hours + ":" + minutes + ":" + seconds;
        }
        return result;
    },
    getFormData: function ($form, mergeParam) { //获取表单数据
        var unindexed_array = $form.serializeArray();
        var indexed_array = {};

        $.map(unindexed_array, function (n, i) {
            //取第一个有值的参数
            if ((mergeParam && !indexed_array[n['name']]) || !mergeParam) {
                indexed_array[n['name']] = n['value'];
            }
        });

        return indexed_array;
    },
    success: function(content) {
        $.messager.show({ title: '成功', msg: content });
    },
    error: function(content) {
        $.messager.alert('错误信息', content, 'error');
    },
    alert: function(content) {
        $.messager.alert('警告', content);
    }
}
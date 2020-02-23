import CryptoJS from '@/util/crypto-js/index.js'
function friendlyDate(timestamp) {
	var formats = {
		'year': '%n% 年前',
		'month': '%n% 月前',
		'day': '%n% 天前',
		'hour': '%n% 小时前',
		'minute': '%n% 分钟前',
		'second': '%n% 秒前',
	};

	var now = Date.now();
	var seconds = Math.floor((now - timestamp) / 1000);
	var minutes = Math.floor(seconds / 60);
	var hours = Math.floor(minutes / 60);
	var days = Math.floor(hours / 24);
	var months = Math.floor(days / 30);
	var years = Math.floor(months / 12);

	var diffType = '';
	var diffValue = 0;
	if (years > 0) {
		diffType = 'year';
		diffValue = years;
	} else {
		if (months > 0) {
			diffType = 'month';
			diffValue = months;
		} else {
			if (days > 0) {
				diffType = 'day';
				diffValue = days;
			} else {
				if (hours > 0) {
					diffType = 'hour';
					diffValue = hours;
				} else {
					if (minutes > 0) {
						diffType = 'minute';
						diffValue = minutes;
					} else {
						diffType = 'second';
						diffValue = seconds === 0 ? (seconds = 1) : seconds;
					}
				}
			}
		}
	}
	return formats[diffType].replace('%n%', diffValue);
}
//查询字符串参数
function getQueryString(url){
    var index1=url.indexOf("?");
    if(index1>0){
        var qs=url.substring(index1+1);
        var args={};
        var items=qs.split("&");
        var len=items.length;
        var i= 0,item=null,name=null,value=null;
        for(i=0;i<len;i++){
            item=items[i].split("=");
            name=decodeURIComponent(item[0]);
            value=decodeURIComponent(item[1]);
            if(name.length){
                args[name]=value;
            }
        }
        return args;
    }
}
function decrypt(word,key){
	 var key = CryptoJS.enc.Utf8.parse(key);	
	 var decrypt = CryptoJS.AES.decrypt(word, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
	 return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}

export {
	friendlyDate,
	getQueryString,
	decrypt
}

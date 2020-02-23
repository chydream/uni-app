import {baseUrl,codeKey} from '../config/config'
import {decrypt} from '@/util/util'
import store from '@/store'
export default function request(successCallBack,errorCallBack,url,method,param,noLoading,header){
	if(!noLoading){
		uni.showLoading({
			title:'加载中'
		});
	}
	header=header==null?{
		'token':store.getters.token,
		'roleCode':store.getters.roleCode,
		'Content-type': 'application/x-www-form-urlencoded'
	}:header;
	uni.request({
		url: baseUrl+url, //仅为示例，并非真实接口地址。
		data:param,
		header: header,
		method:method,
		// dataType:'application/json; charset=utf-8',
		success: (data) => {
			if (decrypt(data.data,codeKey)) {
				data.data = JSON.parse(decrypt(data.data,codeKey))
			}
			if(data.statusCode === 401){
				uni.showToast({
					icon: 'none',
					title: '请重新登录!'
				});
			}
			// console.log(data)
			//成功处理
			if (null != successCallBack){
                successCallBack(data);
            }
		},
		fail:(error)=>{
            //异常处理；
            if (null != errorCallBack){
                errorCallBack(xhr, textStatus, errorThrown);
            }
        },
        complete: ()=> {
            uni.hideLoading();
        }
	});
}
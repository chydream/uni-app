import baseUrl from '../config/config'
export default function request(successCallBack,errorCallBack,url,method,param){
	uni.showLoading({
		title:'加载中'
	});
	uni.request({
		url: baseUrl+url, //仅为示例，并非真实接口地址。
		data:param,
		header: header,
		method:method,
		dataType:'application/json; charset=utf-8',
		success: (data) => {
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
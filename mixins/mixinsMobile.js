import {getStore,setStore} from '@/util/service'
const mixinsFun = {
  data () {
    return {
    }
  },
  onLoad () {
	  if(getStore('studentId')==''){
		// this.goUrl('/pages/home/index')
	  }
  },
  methods: {
    uShowToast (title,icon) {
    	uni.showToast({
    		icon: icon==null?'none':icon,
    		title: title
    	});
    },
    uHideToast(){
    	uni.hideToast();
    },
    uShowLoading(title){
    	uni.showLoading({
    		title:title
    	});
    },
    uHideLoading(){
    	uni.hideLoading();
    },
    uShowModel(title,content,callback){
    	uni.showModal({
    		title: title,
    		content: content,
    		success: function (res) {
    			if (res.confirm) {
					callback()
    				// console.log('用户点击确定');
    			} else if (res.cancel) {
    				// console.log('用户点击取消');
    			}
    		}
    	});
    },
    uShowActionSheet(itemList){
    	uni.showActionSheet({
    		itemList: itemList,
    		success: function (res) {
    			console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
    		},
    		fail: function (res) {
    			console.log(res.errMsg);
    		}
    	});
    },
    getSystemInfoSyncData(){
    	let systemInfo = uni.getSystemInfoSync()
    	return systemInfo
    },
    goUrl(url){
    	uni.navigateTo({
    		url:url
    	})
    },
    redirectUrl(url){
    	uni.redirectTo({
    		url:url
    	})
    },
    reLaunchUrl(url){
    	uni.reLaunch({
    		url: url
    	});
    },
    switchTabUrl(url){
    	uni.switchTab({
    		url: url
    	});
    },
    goBackUrl(delta){
    	let current = getCurrentPages();
    	console.log(current);
    	// uni.navigateBack({
    	// 	delta:delta
    	// });
    },
    getProviderData(){
    	uni.getProvider({
    		service:'oauth',
    		success: (res) => {
    			console.log(res);
    		}
    	})
    },
    getLogin(){
    	uni.login({
    		provider:'',
    		success: (res) => {
    			console.log(res);
    		},
    		fail: (error) => {
    			console.log(error);
    		}
    	})
    },
	formatTime (time) {
		var date = new Date(time)
		var y = date.getFullYear(date)
		var m = date.getMonth() + 1
		var d = date.getDay()
		var h = date.getHours()
		var mi = date.getMinutes()
		if(m<10){
			m = '0'+ m
		}
		if(d<10){
			d = '0'+ d
		}
		if(h<10){
			h = '0'+ h
		}
		if(mi<10){
			mi = '0'+ mi
		}
		return y + "-" + m + "-" + d + " " + h + ":" + mi
	}
  }
}
const mixinsMobile = {
  install: function (Vue, options) {
    Vue.mixin(mixinsFun)
  }
}

export default mixinsMobile

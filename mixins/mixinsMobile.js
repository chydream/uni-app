const mixinsFun = {
  data () {
    return {
    }
  },
  created () {
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
    uShowModel(title,content){
    	uni.showModal({
    		title: title,
    		content: content,
    		success: function (res) {
    			if (res.confirm) {
    				console.log('用户点击确定');
    			} else if (res.cancel) {
    				console.log('用户点击取消');
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
    }
  }
}
const mixinsMobile = {
  install: function (Vue, options) {
    Vue.mixin(mixinsFun)
  }
}

export default mixinsMobile

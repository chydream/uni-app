<script>
	import {analysisUserInfo} from '@/api/userApi'
	import request from '@/api/request'
	import {cloudUrl} from '@/config/config'
	import {mapGetters} from 'vuex'
	import {getStore,setStore} from '@/util/service'
	// import WXBizDataCrypt from '@/util/WXBizDataCrypt'
	export default {
		data() {
			return {
				title: '首页',
				userData: {}
			}
		},
		computed: {
		  ...mapGetters(['uniToken', 'roleCode', 'token', 'studentInfo'])
		},
		onLaunch: function() {
			console.log('App Launch')
			var self = this
			// var params = {
			// 	wxMiniProgramToken: 'wxtest000003',
			// 	roleCode: this.roleCode
			// }
			// this.$store.dispatch('user/AnalysisUserInfo',params)
			// #ifdef MP-WEIXIN
			// 接口1
			uni.login({
			  provider: 'weixin',
			  success: function (res) {
				var js_code = res.code	
				var params = {
					code: js_code
				}
				self.$store.dispatch('home/QetLoginInfoByCode',params).then(result => {
					// console.log(result)
				}) 
			  }
			})
			// 前端取appId
			// var appId = 'wx93f5d66572e98eca'
			// uni.login({
			//   provider: 'weixin',
			//   success: function (res) {
			// 	var js_code = res.code	
			// 	var params = {
			// 		code: js_code
			// 	}
			// 	uni.request({
			// 	  url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx93f5d66572e98eca&secret=9517cb3de6a4350faa73916ca2e2b0db&js_code='+js_code, //仅为示例，并非真实接口地址。
			// 	  header: {
			// 		'Content-type': 'application/x-www-form-urlencoded'
			// 	  },
			// 	  method:"POST",
			// 	  success: (res) => {
			// 		  console.log(res)
			// 		  setStore('openId',res.data.openid)
			// 		  var sessionKey = res.data.session_key
			// 		  wx.getUserInfo({
			// 		  	success: function(res) {
			// 		  	  var encryptedData = res.encryptedData
			// 		  	  var iv = res.iv
			// 		  	  var pc = new WXBizDataCrypt(appId, sessionKey)
			// 		  	  var data = pc.decryptData(encryptedData , iv)
			// 		  	  console.log(data)
			// 		  	}
			// 		  })
			// 	  }
			// 	})
			//   }
			// })
			// #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
			
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import url("./style/reset.css");
	// uni-page[data-page="pages/login/login"]{
	// 	.uni-page-head{
	// 		display: none!important;
	// 	}
	// 	uni-page-head .uni-page-head~.uni-placeholder{
	// 		display: none;
	// 	}
	// }
	html,body{
		width: 100%;
		height: 100%;
		background: #f6f4f5;
	}
</style>

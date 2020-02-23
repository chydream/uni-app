<template>
	<div class="detail">
		<div class="banner">
			<img :src="detailData.ccCoverPath" v-if="detailData.ccCoverPath"/>
			<img src="../../static/img/home/banner.png" v-else/>
		</div>
		<div class="desc">
			<p class="desc-title">{{detailData.ccName}}</p>
			<p class="desc-info">{{detailData.ccIntroduction}}</p>
			<p class="desc-p">
				<span class="price">原价：¥<span v-if="detailData.ccChargeNum || detailData.ccChargeNum === 0" class="line-through">{{detailData.ccOriginalPrice}}</span><span v-else>{{detailData.ccOriginalPrice}}</span></span>
				<span class="pro">¥{{detailData.ccChargeNum}}</span>
			</p>
			<span class="desc-btn do" v-if="detailData.enterType === '1'">已报名</span>
			<span class="desc-btn doing" v-if="detailData.enterType === '0'" @click="enroll">报名</span>
		</div>
		<div class="section">
			<div class="section-title">直播章节</div>
			<div class="section-body">
				<ul class="list-section">
					<li v-for="(item,index) in liveData" :key="index">
						<span class="num">{{index + 1}}</span>
						<span class="info">{{item.clName}}</span>
						<span class="time">{{formatTime(item.clStartTime)}}</span>
						<em class="icon-arrow"></em>
					</li>
				</ul>
			</div>
		</div>
		<div class="section">
			<div class="section-title">资源章节</div>
			<div class="section-body">
				<ul class="list-section">
					<li v-for="(item,index) in resourceData" :key="index">
						<span class="num">{{index + 1}}</span>
						<span class="info">{{item.crName}}</span>
						<span class="time">{{item.crVideoTime}}</span>
						<em class="icon-arrow"></em>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	import {getStore,setStore} from '@/util/service'
	export default {
		name:'Index',
		data() {
			return {
				detailData: {},
				liveData: [],
				resourceData: [],
				ccoId: '',
				timer: null,
				urlParams: {},
				openId: ''
			}
		},
		computed: {
		  ...mapGetters(['uniToken', 'roleCode', 'token', 'studentInfo'])
		},
		onLoad(option) {
			// console.log(option)
			this.urlParams = option
			this.queryCourseToStu() //详情
			this.selectLiveListByCourseToStu() //直播列表
			this.selectResVideoByCourseToStu() //资源列表
			this.openId = getStore('openId')
			// console.log(this.openId)
		},
		onShow (){
		},
		methods: {
			queryCourseToStu () {
				// console.log(this.$route.query.ccId)
				var params = {
					ccId: this.urlParams.ccId,
					cceStudentId: this.urlParams.cceStudentId
				}
				this.$store.dispatch('home/QueryCourseToStu',params).then((res) => {
					// console.log(res)
					if(res.status === 200){
						this.detailData = res.data
						// console.log(this.detailData)
					}
				})
			},
			selectLiveListByCourseToStu () {
				var params = {
					ccId: this.urlParams.ccId,
					cceStudentId: this.urlParams.cceStudentId
				}
				this.$store.dispatch('home/SelectLiveListByCourseToStu',params).then((res) => {
					// console.log(res)
					if(res.status === 200){
						this.liveData = res.data
						// console.log(this.liveData)
					}
				})
			},
			selectResVideoByCourseToStu () {
				var params = {
					ccId: this.urlParams.ccId
				}
				this.$store.dispatch('home/SelectResVideoByCourseToStu',params).then((res) => {
					// console.log(res)
					if(res.status === 200){
						this.resourceData = res.data
						// console.log(this.resourceData)
					}
				})
			},
			enroll () {
				var now = new Date()
				var time = now.getTime()
				if(time>this.detailData.ccEnterEnd){
					this.uShowToast('报名时间已经结束')
					return
				}
				var self = this
				this.uShowModel('提示','确定要报名吗?',function(){
					// if(self.detailData.ccOriginalPrice === 0 || self.detailData.ccChargeNum === 0){
					if(self.detailData.waitPay === 0 && (self.detailData.ccOriginalPrice === 0 || self.detailData.ccChargeNum === 0)){
						self.saveCourseEnterWeixin('',1) //免费报名
					} else {
						self.saveCourseEnterWeixin(2,0) //付费报名 2 微信
					}
				})
			},
			// 提交订单
			saveCourseEnter (ccoPayType,ccoStatus) {
				var price = this.detailData.ccChargeNum||this.detailData.ccChargeNum === 0 ? this.detailData.ccChargeNum : this.detailData.ccOriginalPrice
				var params = {
					// cceId: '',
					ccId: this.urlParams.ccId,
					// cceTime: '',
					cceStudentId: this.urlParams.cceStudentId,
					cceSchoolId: this.urlParams.ccSchoolId,
					// ccoId: '',
					// ccoIdent: '',
					ccoContent: this.detailData.ccName,
					ccoPayType: ccoPayType,
					ccoPayMoney: price,
					ccoStatus: ccoStatus,
					ccoStudentId: this.urlParams.cceStudentId,
					ccoSchoolId: this.urlParams.ccSchoolId,
					// ccoCreateTime: '',
					// ccoSign: '',
					ccoStudentName: this.urlParams.userName,
					ccoSchoolName: this.detailData.ccSchoolName
				}
				this.$store.dispatch('home/SaveCourseEnter',params).then(res => {
					// console.log(res)
					if(ccoStatus === 1){
						if (res.status === 200) {
							this.uShowToast('报名成功')
							this.detailData.enterType = '1'
						}
					}else{
						// location.href = res.data.payWebUrl
						// this.ccoId = res.data.ccoId
						// var self = this
						// this.timer = setInterval(function(){
						// 	self.queryCloudCourseOrderById()
						// },5000)
					}
				})
			},
			// 提交订单
			saveCourseEnterWeixin (ccoPayType,ccoStatus) {
				var price = this.detailData.ccChargeNum||this.detailData.ccChargeNum === 0 ? this.detailData.ccChargeNum : this.detailData.ccOriginalPrice
				var params = {
					// cceId: '',
					ccId: this.urlParams.ccId,
					// cceTime: '',
					cceStudentId: this.urlParams.cceStudentId,
					cceSchoolId: this.urlParams.ccSchoolId,
					// ccoId: '',
					// ccoIdent: '',
					ccoContent: this.detailData.ccName,
					ccoPayType: ccoPayType,
					ccoPayMoney: price,
					ccoStatus: ccoStatus,
					ccoStudentId: this.urlParams.cceStudentId,
					ccoSchoolId: this.urlParams.ccSchoolId,
					// ccoCreateTime: '',
					// ccoSign: '',
					ccoStudentName: this.urlParams.userName,
					ccoSchoolName: this.detailData.ccSchoolName,
					openId: this.openId
				}
				this.$store.dispatch('home/SaveCourseEnterWeixin',params).then(res => {
					// console.log(res)
					if(ccoStatus === 1){
						this.uShowToast('报名成功')
						this.detailData.enterType = '1'
					}else{
						console.log(res)
						// location.href = res.data.payWebUrl
						this.ccoId = res.data.ccoId
						var self = this
						// this.timer = setInterval(function(){
						// 	self.queryCloudCourseOrderById()
						// },5000)
						if(res.status===200){
						  var payUrl = res.data;
						  var appId = payUrl.jsapi_appid;
						  var timeStamp = payUrl.jsapi_timestamp;
						  var nonceStr = payUrl.jsapi_noncestr;
						  var jsPackage = payUrl.jsapi_package;
						  var signType = payUrl.jsapi_signtype;
						  var paySign = payUrl.jsapi_paysign;
						  console.log(WeixinJSBridge)
						  // WeixinJSBridge.invoke(
							 //  'getBrandWCPayRequest', {
								// "appId":appId,     //公众号名称，由商户传入     
								// "timeStamp":timeStamp,         //时间戳，自1970年以来的秒数     
								// "nonceStr":nonceStr, //随机串     
								// "package":jsPackage,     
								// "signType":signType,         //微信签名方式：     
								// "paySign":paySign //微信签名 
							 //  },
							 //  function(res){
								//   console.log(res)
								// // alert(JSON.stringify(res))
								// if(res.err_msg == "get_brand_wcpay_request:ok" ){
								//   // 使用以上方式判断前端返回,微信团队郑重提示：
								//   //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
								//   WeixinJSBridge.call('closeWindow')
								// }else{
								//   // alert('支付失败');
								//   WeixinJSBridge.call('closeWindow')
								// }
						  // })
						  wx.requestPayment(
							  {
								  'timeStamp': timeStamp,
								  'nonceStr': nonceStr,
								  'package': jsPackage,
								  'signType': signType,
								  'paySign': paySign,
								  'success':function(res){
									  console.log(res)
								  },
								  'fail':function(res){
									  console.log(res)
								  },
								  'complete':function(res){
									  console.log(res)
								  }
							  }
						  )
						}else{
						  alert(data.msg);
						  WeixinJSBridge.call('closeWindow')
						}
					}
				})
			},
			// 根据订单编号查询订单对象
			queryCloudCourseOrderById () {
				var params = {
					ccoId: this.ccoId
				}
				this.$store.dispatch('home/QueryCloudCourseOrderById',params).then(res => {
					if(res.data.ccoStatus === 1){
						this.detailData.enterType = '1'
						clearInterval(this.timer)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
.detail{
	.banner{
		width: 100%;
		height: 460rpx;
		background: #fff;
	}
	.banner img{
		width: 100%;
		height: 100%;
	}
	.desc{
		width: 100%;
		// height: 248rpx;
		height: auto;
		padding: 20rpx;
		box-sizing: border-box;
		font-size:30rpx;
		line-height:44rpx;
		color: #333;
		position: relative;
		background: #fff;
	}
	.desc-info{
		max-height: 116rpx;
		overflow: hidden;
	}
	.desc-p{
		margin-top: 25rpx;
		font-size:24rpx;
		color: #999;
	}
	.pro{
		font-size:36rpx;
		color: #FF3000;
		margin-left: 16rpx;
	}
	.desc-btn{
		position: absolute;
		right: 20rpx;
		bottom: 24rpx;
		width:210rpx;
		height:68rpx;
		background:rgba(255,153,0,1);
		border-radius:8rpx;
		font-size:28rpx;
		text-align: center;
		line-height: 68rpx;
		cursor: pointer;
		color: #FEFEFE;
	}
	.doing{
		background:#FF9900;
	}
	.do{
		background:#A9A9A9;
	}
	.section{
		margin-top: 22rpx;
		background: #fff;
	}
	.section-title{
		height: 88rpx;
		line-height: 88rpx;
		text-indent: 20rpx;
		border-bottom: 1px solid #E5E5E5;
		font-size:32rpx;
		color:#333;
		font-weight:bold;
	}
	.list-section li{
		height: 88rpx;
		line-height: 88rpx;
		padding: 0 20rpx;
		position: relative;
		width: 100%;
		box-sizing: border-box;
		border-bottom: 1rpx solid #E5E5E5;
	}
	.list-section li span{
		display: inline-block;
		line-height: 88rpx;
		height: 88rpx;
		vertical-align: middle;
		color: #333;
		font-size: 28rpx;
	}
	.list-section li span.num{
		width: 32rpx;
		margin-right: 18rpx;
	}
	.list-section li span.info{
		width: 315rpx;
		margin-right: 18rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.list-section li span.time{
		width: 232rpx;
		overflow: hidden;
		color: #999;
	}
	.icon-arrow{
		position: absolute;
		right: 28rpx;
		top: 30rpx;
		width: 13rpx;
		height: 24rpx;
		background: url(../../static/img/home/arrow-right.png) no-repeat 0 0;
		background-size: cover;
		display: inline-block;
	}
	.line-through{
		text-decoration: line-through;
	}
}
</style>

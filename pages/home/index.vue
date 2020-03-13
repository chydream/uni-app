<template>
	<div class="home">
		<div class="head">
			<view class="flex-wrap">
				<view class="flex-item">
					<view><span class="icon-1"></span></view>
					<view><text>电子课本</text></view>
				</view>
				<view class="flex-item">
					<navigator :url="'/pages/live/index'">
						<view><span class="icon-2"></span></view>
						<view><text>直播中心</text></view>
					</navigator>
				</view>
				<view class="flex-item">
					<navigator :url="'/pages/record/index'">
						<view><span class="icon-3"></span></view>
						<view><text>点播课堂</text></view>
					</navigator>
				</view>
				<view class="flex-item">
					<navigator :url="'/pages/course/index'">
						<view><span class="icon-4"></span></view>
						<view><text>我的课程</text></view>
					</navigator>
				</view>
			</view>
			<div class="search">
				<div class="input-wrap">
					<span class="icon-search"></span>
					<input type="text" v-model="courseName" placeholder="输入课程名称">
				</div>
				<span class="search-btn" @click="searchCourse">搜索</span>
			</div>
		</div>
		<!-- <button open-type="getUserInfo" lang="zh_CN" @click="getUserInfo">获取用户信息ddd</button> -->
		<div class="item-wrap">
			<ul class="list-item">
				<li v-for="(item,index) in liveList" :key="index" @click="goDetail(item.ccId)" v-if="liveList.length > 0">
					<div class="img-wrap">
						<img :src="item.ccCoverPath" v-if="item.ccCoverPath"/>
						<img src="../../static/img/home/item.png" v-else/>
					</div>
					<div class="item-info">
						<h3>{{item.ccName}}</h3>
						<p style="white-space: nowrap">
							<span>报名时间：</span>
							<span :title="(item.ccEnterStart?formatTime(item.ccEnterStart) + ' 至':'')+' ' + (item.ccEnterEnd?formatTime(item.ccEnterEnd):'')"> {{item.ccEnterStart?formatTime(item.ccEnterStart) + ' 至':''}}  {{item.ccEnterEnd?formatTime(item.ccEnterEnd):''}}</span>
						</p>
						<p><span>{{item.ccSchoolName}}</span></p>
						<p>
							<span class="price">
								原价：¥
								<span v-if="item.ccChargeNum || item.ccChargeNum === 0" class="line-through">{{item.ccOriginalPrice}}</span>
								<span v-else>{{item.ccOriginalPrice}}</span>
							</span>
							<span class="pro">¥{{item.ccChargeNum}}</span>
							<!-- <span class="free" v-if="item.ccOriginalPrice == 0&&item.ccChargeNum == 0">免费{{item.ccOriginalPrice}}</span> -->
						</p>
						<span class="item-btn done" v-if="item.enterType == '2'">报名结束</span>
						<span class="item-btn do" v-if="item.enterType === '1'">已报名</span>
						<span class="item-btn doing" v-if="item.enterType === '0'">报名</span>
					</div>
				</li>
				<li v-else>
					暂无数据...
				</li>
			</ul>
			<uni-load-more  :status="more" v-if="liveList.length>0"></uni-load-more>
		</div>
	</div>
</template>

<script>
	import {getStore,setStore} from '@/util/service'
	import {mapGetters} from 'vuex'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';	
	export default {
		name:'Index',
		components: {
		    uniLoadMore
		},
		data() {
			return {
				title: '首页',
				schoolId: '',
				studentId: '',
				userName: '',
				page: 1,
				limit: 10,
				totalPage: 1,
				liveList: [],
				more: 'more',
				courseName: '',
				ccName: ''
			}
		},
		computed: {
		  ...mapGetters(['uniToken', 'roleCode', 'token', 'studentInfo', 'unionId'])
		},
		onLoad(option) {
			this.initData()
		},
		//上拉刷新
		onPullDownRefresh () {
			this.page = 1
			this.selectCsListToStu('','','pullDown')
		},
		//下拉加载
		onReachBottom () {
			if(this.page<this.totalPage){
				this.page++
				this.selectCsListToStu(this.ccName,'','')
			}
		},
		onShow (){
		},
onPageScroll (scrollTop) {
			var self = this
			clearTimeout(this.timer);
			self.timer = setTimeout(function(){
				self.t2 = scrollTop.scrollTop
				if(self.t2 == self.t1){
					self.isScroll = false
				}
			}, 2000);
			self.t1 = scrollTop.scrollTop
			self.isScroll = true
		},
		onUnload(){
			this.goUrl('index')
		},
		onShareAppMessage: function() {
		},
		methods: {
			getUserInfo (e) {
				console.log(e)
			},
			initData () {
				var self = this
				// 接口2
				uni.login({
				  provider: 'weixin',
				  success: function (res) {
					// console.log(res)
					var js_code = res.code	
					var params = {
						code: js_code
					}
					// self.uShowModel('111','111',null)
					wx.getUserInfo({
						success: function(data) {
						  // self.uShowModel('222','222',null)
						  // console.log(data)
						  var encryptedData = data.encryptedData
						  var iv = data.iv
						  var paramsNew = {
							  code: js_code,
							  encryptedData:encryptedData,
							  iv:iv
						  }
						  // console.log(paramsNew)
						  self.$store.dispatch('home/GetLoginInfoByCodeAndUserInfo',paramsNew).then(resultData => {
							  // console.log(resultData)
							  if(resultData.status === 200&&resultData.data.decryptedData){
								  setStore('openId',resultData.data.openId)
								  // self.$store.commit('user/SET_UNIONID',resultData.data.decryptedData.unionId)
								  self.$store.commit('user/SET_UNIONID', 'wxtest000003')
								  var params = {
								  	wxMiniProgramToken: self.unionId,
								  	roleCode: self.roleCode
								  }
								  self.$store.dispatch('user/AnalysisUserInfo',params).then((res) => {
								  	// console.log(res)
								  	if(res.status === 200){
								  		self.schoolId = res.data.schoolId
								  		self.studentId = res.data.userId
								  		self.userName = res.data.userName
								  		self.selectCsListToStu('','','')
								  	}
								  })
							  }
						  })
						},
						fail: function(data){
							wx.showModal({
								title: '警告',
								content: '尚未进行授权，请点击确定跳转到授权页面进行授权。',
								success: function (res) {
									if (res.confirm) {
										console.log('用户点击确定')
										wx.navigateTo({
											url: 'auth',
										})
									}
								}
							})
						}
					})
				  }
				})
			},
			selectCsListToStu (ccName, ccPlatformCourse, status) {
				var params = {
					page: this.page,
					limit: this.limit,
					sidx: '',
					order: '',
					ccName: ccName,
					ccSchoolId: this.schoolId,
					studentId: this.studentId,
					ccPlatformCourse: ccPlatformCourse,
					ccOnlineStatus: 0
				}
				this.more = 'loading'
				this.$store.dispatch('home/SelectCsListToStu',params).then((res) => {
					// console.log(res)
					if(res.status === 200){
						this.totalPage = res.data.pages
						this.more = 'more'
						this.liveList = this.liveList.concat(res.data.records)
						// console.log(this.liveList)
						if(status == 'pullDown'){
							uni.stopPullDownRefresh();
							this.liveList = res.data.records
						}
						if(this.page == this.totalPage){
							this.more = 'noMore'
						}
						if(this.page === 1){
							this.liveList = res.data.records
						}
					}
				})
			},
			goDetail (ccId, cceStudentId) {
				var url = '/pages/home/detail?ccId='+ccId + '&cceStudentId='+this.studentId + '&ccSchoolId='+ this.schoolId + '&userName='+ this.userName
				this.goUrl(encodeURI(url))
			},
			searchCourse () {
				this.page = 1
				this.ccName = this.courseName
				this.selectCsListToStu(this.ccName, '', '')
			}
		}
	}
</script>

<style lang="scss">
.home{
	padding-top: 246rpx;
	.head{
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: auto;
		z-index: 10;
	}
	.flex-wrap{
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: center;
		align-items: center;
		width: 100%;
		background: url(../../static/img/home/head.png) no-repeat 0 0;
		background-size: cover;
		height: 156rpx;
	}
	.flex-item{
		width: 25%;
		text-align: center;
	}
	.flex-item view{
		margin-top: 5rpx;
	}
	.flex-item text{
		font-size: 28rpx;
		color: #fff;
	}
	.icon-1{
		width: 60rpx;
		height: 50rpx;
		display: inline-block;
		background: url(../../static/img/home/icon1.png) no-repeat 0 0;
		background-size: cover;
	}
	.icon-2{
		width: 60rpx;
		height: 50rpx;
		display: inline-block;
		background: url(../../static/img/home/icon2.png) no-repeat 0 0;
		background-size: cover;
	}
	.icon-3{
		width: 60rpx;
		height: 50rpx;
		display: inline-block;
		background: url(../../static/img/home/icon3.png) no-repeat 0 0;
		background-size: cover;
	}
	.icon-4{
		width: 60rpx;
		height: 50rpx;
		display: inline-block;
		background: url(../../static/img/home/icon4.png) no-repeat 0 0;
		background-size: cover;
	}
	.search{
		width: 100%;
		height: 90rpx;
		background: #F4F4F4;
		box-sizing: border-box;
		padding: 16rpx 100rpx 16rpx 20rpx;
		position: relative;
	}
	.input-wrap{
		width:630rpx;
		height:58rpx;
		background:rgba(255,255,255,1);
		border:1rpx solid rgba(212, 212, 212, 1);
		border-radius:29rpx;
		padding-left: 60rpx;
		box-sizing: border-box;
		position: relative;
	}
	.input-wrap input{
		width: 100%;
		height: 100%;
		text-indent: 4rpx;
		font-size:24rpx;
	}
	.icon-search{
		width: 32rpx;
		height: 32rpx;
		display: inline-block;
		background: url(../../static/img/home/icon5.png) no-repeat 0 0;
		background-size: cover;
		left: 20rpx;
		top: 10rpx;
		position: absolute;
	}
	.search-btn{
		position: absolute;
		font-size:28rpx;
		font-weight:500;
		color:rgba(18,143,239,1);
		right: 28rpx;
		top:26rpx;
	}
	.item-wrap{
		background: #fff;
	}
	.list-item li{
		height: 202rpx;
		width: 100%;
		padding: 24rpx 20rpx;
		box-sizing: border-box;
		border-bottom: 1rpx solid #E5E5E5;
		overflow: hidden;
		position: relative;
	}
	.img-wrap{
		width: 242rpx;
		height: 154rpx;
		float: left;
		margin-right: 18rpx;
	}
	.img-wrap img{
		width: 100%;
		height: 100%;
	}
	.item-info{
		height: 154rpx;
		overflow: hidden;
		line-height: 37rpx;
		position: relative;
	}
	.item-info h3{
		font-size:30rpx;
		color: #333;
		font-weight: normal;
		margin-bottom: 4rpx;
	}
	.item-info span{
		font-size:24rpx;
		color: #999;
	}
	.item-info span.price{
		font-size: 20rpx;
	}
	.item-info span.pro{
		color: #FF3000;
		margin-left: 13rpx;
	}
	.item-info span.free{
		color: #14BE58;
	}
	.item-btn{
		position: absolute;
		right: 0;
		bottom: 0;
		width:120rpx;
		height:48rpx;
		border-radius:8rpx;
		color: #FEFEFE!important;
		font-size:24rpx;
		text-align: center;
		line-height: 48rpx;
		cursor: pointer;
	}
	.doing{
		background:#FF9900;
	}
	.do{
		background:#A9A9A9;
	}
	.done{
		background:#06CA8C;
	}
	.line-through{
		text-decoration: line-through;
	}
}
</style>

<template>
	<div class="course">
		<div class="item-wrap">
			<ul class="list-item">
				<li v-for="(item,index) in courseList" :key="index" @click="goDetail(item.ccId)" v-if="courseList.length > 0">
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
							<span class="price">原价：¥<span v-if="item.ccChargeNum || item.ccChargeNum === 0" class="line-through">{{item.ccOriginalPrice}}</span><span v-else>{{item.ccOriginalPrice}}</span></span>
							<span class="pro">¥{{item.ccChargeNum}}</span>
							<!-- <span class="free" v-if="item.ccOriginalPrice == 0">免费</span> -->
						</p>
						<span class="item-btn do" >已报名</span>
					</div>
				</li>
				<li v-else>
					暂无数据...
				</li>
			</ul>
			<uni-load-more  :status="more" v-if="courseList.length>0"></uni-load-more>
		</div>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';	
	export default {
		name:'Index',
		components: {
		    uniLoadMore
		},
		data() {
			return {
				schoolId: '',
				studentId: '',
				page: 1,
				limit: 10,
				totalPage: 1,
				courseList: [],
				more: 'more'
			}
		},
		computed: {
		  ...mapGetters(['uniToken', 'roleCode', 'token', 'studentInfo'])
		},
		onLoad() {
			this.initData()
		},
		//上拉刷新
		onPullDownRefresh () {
			this.page = 1
			this.selectMyCourseListToStu('','','pullDown')
		},
		//下拉加载
		onReachBottom () {
			if(this.page<this.totalPage){
				this.page++
				this.selectMyCourseListToStu(this.ccName,'','')
			}
		},
		onShow (){
		},
		methods: {
			initData () {
				var params = {
					token: this.token,
					roleCode: this.roleCode
				}
				this.$store.dispatch('user/AnalysisUserInfo',params).then((res) => {
					// console.log(res)
					if(res.status === 200){
						this.schoolId = res.data.schoolId
						this.studentId = res.data.userId
						this.selectMyCourseListToStu('','','')
					}
				})
			},
			selectMyCourseListToStu (ccName, ccPlatformCourse, status) {
				var params = {
					page: this.page,
					limit: this.limit,
					sidx: '',
					order: '',
					ccName: ccName,
					ccSchoolId: this.schoolId,
					studentId: this.studentId,
					ccPlatformCourse: ccPlatformCourse
				}
				this.more = 'loading'
				this.$store.dispatch('home/SelectMyCourseListToStu',params).then((res) => {
					// console.log(res)
					if(res.status === 200){
						this.totalPage = res.data.pages
						this.more = 'more'
						this.courseList = this.courseList.concat(res.data.records)
						if(status == 'pullDown'){
							uni.stopPullDownRefresh();
							this.courseList = res.data.records
						}
						if(this.page == this.totalPage){
							this.more = 'noMore'
						}
						if(this.page === 1){
							this.courseList = res.data.records
						}
						// console.log(this.courseList)
					}
				})
			},
			goDetail (ccId, cceStudentId) {
				var url = '/pages/home/detail?ccId='+ccId + '&cceStudentId='+this.studentId
				this.goUrl(url)
			}
		}
	}
</script>

<style lang="scss">
.course{
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

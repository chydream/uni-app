<template>
	<div class="record">
		<!-- #ifdef H5 -->
		<div class="head" style="top:44px;">
			<div class="search-box">
				<!-- <img src="@/static/img/liveImg/live01.png" alt=""> -->
				<span class="icon-search"></span>
				<input placeholder="输入视频名称关键字搜索" v-model="keyword"/>
				<span @click="searchRecord">搜索</span>
			</div>
		</div>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<div class="head" style="top:0;">
			<div class="search-box">
				<!-- <img src="@/static/img/liveImg/live01.png" alt=""> -->
				<span class="icon-search"></span>
				<input placeholder="输入视频名称关键字搜索" v-model="keyword"/>
				<span @click="searchRecord">搜索</span>
			</div>
		</div>
		<!-- #endif -->
		<div class="record-list">
			<ul class="clearfix">
				<li v-for="(item, index) in recordList" :key="index" @click="goToRecord(item.cl_record_url, item.cl_end_time, item.cc_name, item.cc_id)">
					<div class="course-pic">
						<img v-if="item.cc_cover_path == ''" src="@/static/img/liveImg/courseImg.png" alt="">
						<img v-else :src="item.cc_cover_path" alt="">
					</div>
					<div class="course-info">
						<p class="title one-txt-cut">{{ item.cl_name }}</p>
						<p class="record-time">
							<!-- <img src='@/static/img/liveImg/live03.png' alt=""> -->
							<span class="icon-time"></span>
							<span>{{ item.cl_end_time | getTime }}</span>
						</p>
					</div>
				</li>
			</ul>
			<uni-load-more :status="more"></uni-load-more>
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
				keyword: '',
				page: 1,
				pageSize: 8,
				total: 0,
				totalPage: 1,
				recordList: [],
				more: 'more'
			}
		},
		computed: {
		  ...mapGetters(['uniToken', 'roleCode', 'token', 'studentInfo'])
		},
		filters: {
			getTime (value) {
				let date = new Date(value)
				let Y = date.getFullYear() + '-'
				let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
				let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
				let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
				// let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
				let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
				let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
				// return Y + M + D + ' ' + ' ' + h + m + s
				return Y + M + D + ' ' + ' ' + h + m
			}
		},
		onLoad() {
			let params = {
				token: this.token,
				roleCode: this.roleCode
			}
			this.$store.dispatch('user/AnalysisUserInfo',params).then((res) => {
				// console.log(res)
				if (res.status === 200) {
					this.schoolId = res.data.schoolId
					this.studentId = res.data.userId
					this.getLiveRecordListByStudent(this.keyword, '')
				}
			})
		},
		//上拉刷新
		onPullDownRefresh () {
			this.page = 1
			this.getLiveRecordListByStudent(this.keyword, 'pullDown')
		},
		//下拉加载
		onReachBottom () {
			if(this.page < this.totalPage){
				this.page++
				this.getLiveRecordListByStudent(this.keyword, '')
			}
		},
		onShow (){
			// if(this.uniToken==''){
			// 	this.goUrl('/pages/login/login');
			// }
		},
		methods: {
			searchRecord () {
				this.page = 1
				this.getLiveRecordListByStudent(this.keyword, '')
			},
			getLiveRecordListByStudent (keyword, status) {
				let params = {
					page: this.page,
					limit: this.pageSize,
					sidx: '',
					order: '',
					ccSchoolId: this.schoolId,
					cceStudentId: this.studentId,
					clName: keyword,
					ccPlatformCourse: 0
				}
				this.more = 'loading'
				this.$store.dispatch('record/GetLiveRecordListByStudent', params).then(res => {
					// console.log(res)
					if (res.status === 200) {
						this.totalPage = res.data.pages
						this.more = 'more'
						this.recordList = this.recordList.concat(res.data.records)
						if (status == 'pullDown') {
							uni.stopPullDownRefresh()
							this.recordList = res.data.records
						}
						if (this.page == this.totalPage) {
							this.more = 'noMore'
						}
						if (this.page === 1) {
							this.recordList = res.data.records
						}
					}
				}).catch(err => console.log(err))
			},
			goToRecord (recordUrl, time, courseName, courseId) {
				let params = {
					recordUrl: recordUrl,
					time: time,
					courseName: courseName,
					courseId: courseId
				}
				let url = '/pages/live/detail?params=' + encodeURIComponent(JSON.stringify(params))
				// let url = '/pages/live/detail?recordUrl=' + recordUrl + '&time=' + time + '&courseName=' + courseName + '&courseId=' + courseId
				this.goUrl(url)
			}
		}
	}
</script>

<style lang="scss">
	/*单行溢出*/
	.one-txt-cut {
	  /* 溢出隐藏 */
	  overflow: hidden;
	  /* 规定段落中的文本不换行 */
	  white-space: nowrap;
	  /* 溢出文本显示省略号 */
	  text-overflow: ellipsis;
	}
	.record{
		// 移动端
		padding-top: 90rpx;
		.head {
			position: fixed;
			left: 0;
			// top: 0;
			// 移动端
			// top: 44px;
			width: 100%;
			height: auto;
			z-index: 10;
		}
		.clearfix::before,
		.clearfix::after {
		  content: "";
		  display: table;
		}
		.clearfix::after {
		  clear: both;
		}
		
		.search-box {
			background-color: #f4f4f4;
			height: 90rpx;
			padding: 16rpx 30rpx 0 30rpx;
			border-top: 1rpx solid #dfdfdf;
			box-sizing: border-box;
			position: relative;
			
			input {
				padding-left: 64rpx;
				font-size: 26rpx;
				width: 630rpx;
				height: 58rpx;
				border-radius: 29rpx;
				background-color: #fff;
				border: 1rpx solid #d4d4d4;
				box-sizing: border-box;
			}
			.icon-search {
				width: 32rpx;
				height: 32rpx;
				display: inline-block;
				background: url(../../static/img/liveImg/live01.png) no-repeat 0 0;
				background-size: cover;
				left: 46rpx;
				top: 28rpx;
				position: absolute;
			}
			
			span {
				position: absolute;
				right: 30rpx;
				top: 26rpx;
				font-size: 28rpx;
				font-weight:500;
				color: #128FEF;
			}
		}
		.record-list {
			// 小程序
			// padding-top: 90rpx;
			
			padding-left: 20rpx;
			padding-right: 20rpx;
			background-color: #fff;
			
			li {
				float: left;
				width: 344rpx;
				height: 320rpx;
				margin-top: 20rpx;
				
			}
			li:nth-child(odd) {
				margin-right: 22rpx;
			}
			
			.course-pic {
				width: 100%;
				height: 218rpx;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.course-info {
				.title {
					width: 344rpx;
					font-size:30rpx;
					color:rgba(51,51,51,1);
					line-height:46rpx;

				}
				.record-time {
					font-size:24rpx;
					color:#666666;
					line-height:40rpx;
					padding-left: 36rpx;
					position: relative;
					// img {
					// 	width: 26rpx;
					// 	margin-right: 10rpx;
					// }
					
					.icon-time {
						width: 26rpx;
						height: 26rpx;
						display: inline-block;
						background: url(../../static/img/liveImg/live03.png) no-repeat 0 0;
						background-size: cover;
						left: 0rpx;
						top: 6rpx;
						position: absolute;
					}
				}
			}
		}
	}
</style>

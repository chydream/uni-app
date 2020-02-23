<template>
	<div class="detail">
		<div class="video-box">
			<div class="video-title">
				<p class="title">{{ courseName }}</p>
				<p class="time">
					<!-- <img src='@/static/img/liveImg/live03.png' alt=""> -->
					<span class="icon-time"></span>
					<span>{{ startTime | getTime }}</span>
				</p>
			</div>
			<video :src="videoUrl" ></video>
		</div>
		<div class="record-video">
			<h3>相关视频</h3>
			<ul class="clearfix">
				<li v-for="(item, index) in courseList" :key="index" @click="goToRecord(item.clRecordUrl, item.clEndTime, item.ccName, item.ccId)">
					<div class="course-pic">
						<img v-if="item.ccCoverPath == ''" src="@/static/img/liveImg/courseImg.png" alt="">
						<img v-else :src="item.ccCoverPath" alt="">
					</div>
					<div class="course-info">
						<p class="title one-txt-cut">{{ item.clName }}</p>
						<p class="record-time">
							<!-- <img src='@/static/img/liveImg/live03.png' alt=""> -->
							<span class="icon-time"></span>
							<span>{{ item.clEndTime | getTime }}</span>
						</p>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import {getStore,setStore} from '@/util/service'
	import {mapGetters} from 'vuex'
	export default {
		name:'Detail',
		data() {
			return {
				courseName: '',
				startTime: '',
				schoolId: '',
				studentId: '',
				videoUrl: '',
				courseList: []
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
				let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
				let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
				return Y + M + D + ' ' + ' ' + h + m
			}
		},
		onLoad(option) {
			const data = JSON.parse(decodeURIComponent(option.params))
			// console.log(data)
			this.videoUrl = data.recordUrl
			this.courseName = data.courseName
			this.startTime = data.time
			this.fillupLiveRecordPage(data.courseId)
			let params = {
				token: this.token,
				roleCode: this.roleCode
			}
			this.$store.dispatch('user/AnalysisUserInfo',params).then((res) => {
				// console.log(res)
				if (res.status === 200) {
					this.schoolId = res.data.schoolId
					this.studentId = res.data.userId
				}
			})
		},
		onShow (){
			// if(this.uniToken==''){
			// 	this.goUrl('/pages/login/login');
			// }
		},
		methods: {
			fillupLiveRecordPage (courseId) {
				let params = {
					courseId: courseId
				}
				this.$store.dispatch('record/FillupLiveRecordPage', params).then(res => {
					// console.log(res)
					if (res.status === 200) {
						this.courseList = res.data
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
	.detail{
		.clearfix::before,
		.clearfix::after {
		  content: "";
		  display: table;
		}
		.clearfix::after {
		  clear: both;
		}
		.one-txt-cut {
		  /* 溢出隐藏 */
		  overflow: hidden;
		  /* 规定段落中的文本不换行 */
		  white-space: nowrap;
		  /* 溢出文本显示省略号 */
		  text-overflow: ellipsis;
		}
		
		.video-box {
			height: 608rpx;
			
			.video-title {
				// padding: 14rpx 20rpx 16rpx 20rpx;
				padding: 14rpx 20rpx;
				box-sizing: border-box;
				.title {
					color: #333333;
					font-size: 32rpx;
					line-height: 46rpx,
				}
				.time {
					position: relative;
					padding-left: 36rpx;
					span {
						color: #666666;
						font-size: 24rpx;
						line-height: 40rpx,
					}
					/* #ifdef H5 */
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
					/* #endif */
					/* #ifdef MP-WEIXIN */
					.icon-time {
						width: 26rpx;
						height: 26rpx;
						display: inline-block;
						background: url(../../static/img/liveImg/live03.png) no-repeat 0 0;
						background-size: cover;
						left: 0rpx;
						top: 8rpx;
						position: absolute;
					}
					/* #endif */
				}
			}
			video {
				width: 750rpx;
				height: 500rpx;
			}
		}
		.record-video {
			border-top: 20rpx solid #f4f4f4;
			padding: 15rpx 20rpx;
			background-color: #fff;
			box-sizing: border-box;
			h3 {
				color:#333333;
				font-size:32rpx;
				line-height:54rpx;
			}
			
			li {
				float: left;
				width: 344rpx;
				height: 320rpx;
				margin-top: 18rpx;
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
					font-size: 30rpx;
					color: rgba(51,51,51,1);
					line-height: 46rpx;
			
				}
				.record-time {
					font-size: 24rpx;
					color: #666666;
					line-height: 40rpx;
					position: relative;
					padding-left: 36rpx;
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

<template>
  <div class="live">
    <!-- #ifdef H5 -->
    <div class="head" style="top:44px;">
      <div class="search-box">
        <!-- <img src="@/static/img/liveImg/live01.png" alt=""> -->
        <span class="icon-search"></span>
        <!-- maxlength="10" -->
        <input v-model="keyword" placeholder="输入直播名称关键字搜索" />
        <span @click="searchList">搜索</span>
      </div>
    </div>
    <uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="text" active-color="#128FEF" style="top:44px;" ></uni-segmented-control>
    <!-- #endif -->
    <!-- #ifdef MP-WEIXIN -->
    <div class="head" style="top:0px;">
      <div class="search-box">
        <!-- <img src="@/static/img/liveImg/live01.png" alt=""> -->
        <span class="icon-search"></span>
        <!-- maxlength="10" -->
        <input v-model="keyword" placeholder="输入直播名称关键字搜索" />
        <span @click="searchList">搜索</span>
      </div>
    </div>
    <uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="text" active-color="#128FEF" class="fix-top" ></uni-segmented-control>
    <!-- #endif -->

    <view class="content">
      <view v-show="current === 0">
        <!-- <div class="no-list" v-if="!(liveList.length)">暂无数据...</div> -->
        <div class="live-item" v-for="(item, index) in liveList" :key="index">
          <h3 class="title one-txt-cut">{{ item.clName }}</h3>
          <div class="time">
            <!-- <img src='@/static/img/liveImg/live03.png' alt=""> -->
            <span class="icon-time"></span>
            <span>{{ item.clStartTime | getTime}}</span>
          </div>
          <div class="live-info one-txt-cut">
            <span>{{ item.ccName }}</span>
            <span>主讲老师：{{ item.teacherName }}</span>
          </div>
          <div class="live-btn" @click="goToLiveRoom">
            正在直播
            <span class="icon-into"></span>
          </div>
        </div>
        <uni-load-more :status="more"></uni-load-more>
      </view>
      <view v-show="current === 1">
        <!-- <div class="no-list" v-if="!(noStartList.length)">暂无数据...</div> -->
        <div class="live-item" v-for="(item, index) in noStartList" :key="index">
          <h3 class="title">{{ item.clName }}</h3>
          <div class="time">
            <span class="icon-time"></span>
            <span>{{ item.clStartTime | getTime}}</span>
          </div>
          <div class="live-info one-txt-cut">
            <span>{{ item.ccName }}</span>
            <span>主讲老师：{{ item.teacherName }}</span>
          </div>
          <div class="live-btn2">直播未开始</div>
        </div>
        <uni-load-more :status="more"></uni-load-more>
      </view>
      <view v-show="current === 2">
        <!-- <div class="no-list" v-if="!(liveVideoList.length)">暂无数据...</div> -->
        <div class="live-item" v-for="(item, index) in liveVideoList" :key="index">
          <h3 class="title">{{ item.clName }}</h3>
          <div class="time">
            <span class="icon-time"></span>
            <span>{{ item.clStartTime | getTime}}</span>
          </div>
          <div class="live-info">
            <span>{{ item.ccName }}</span>
            <span>主讲老师：{{ item.teacherName }}</span>
          </div>
          <div class="live-btn3"@click="goToRecord(item.recordUrl, item.clEndTime, item.ccName, item.ccId)" >
            直播录像
            <span class="icon-into"></span>
          </div>
        </div>
        <uni-load-more :status="more"></uni-load-more>
      </view>
    </view>
  </div>
</template>

<script>
import { getStore, setStore } from '@/util/service'
import { mapGetters } from 'vuex'
import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue"
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
export default {
  name: 'Index',
  components: {
    uniSegmentedControl,
    uniLoadMore
  },
  data () {
    return {
      schoolId: '',
      studentId: '',
      keyword: '',
      items: ['正在直播', '未开始', '已结束'],
      current: 0,
      liveList: [],
      noStartList: [],
      liveVideoList: [],
      more: 'more',
      page: 1,
      pageSize: 10,
      totalPage: 1,
      // page2: 1,
      // pageSize2: 10,
      // totalPage2: 1,
      // page3: 1,
      // pageSize3: 10,
      // totalPage3: 1,
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
  onLoad () {
    let params = {
      token: this.token,
      roleCode: this.roleCode
    }
    this.$store.dispatch('user/AnalysisUserInfo', params).then((res) => {
      // console.log(res)
      if (res.status === 200) {
        this.schoolId = res.data.schoolId
        this.studentId = res.data.userId
        this.selectLiveListByCouSchoolToStu(this.keyword, this.current)
      }
    })
  },
  //上拉刷新
  onPullDownRefresh () {
    this.page = 1
    this.selectLiveListByCouSchoolToStu('', this.current, 'pullDown')
  },
  //下拉加载
  onReachBottom () {
    if (this.page < this.totalPage) {
      this.page++
      this.selectLiveListByCouSchoolToStu(this.keyword, this.current, '')
    }
  },
  onShow () {
    // if(this.uniToken==''){
    // 	this.goUrl('/pages/login/login');
    // }
  },
  methods: {
    onClickItem (e) {
      // console.log(e)
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 300
      })
			
      this.keyword = ''
      this.page = 1
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex
        this.selectLiveListByCouSchoolToStu(this.keyword, this.current, '')
      }
    },
    searchList () {
      this.page = 1
      this.selectLiveListByCouSchoolToStu(this.keyword, this.current, '')
    },
    selectLiveListByCouSchoolToStu (keyword, index, status) {
      let params = {
        page: this.page,
        limit: this.pageSize,
        sidx: '',
        order: '',
        cceStudentId: this.studentId,
        ccSchoolId: this.schoolId,
        clName: keyword,
        ccPlatformCourse: 0,
        clFlag: index
      }
      this.more = 'loading'
      this.$store.dispatch('live/SelectLiveListByCouSchoolToStu', params).then(res => {
        // console.log(res)
        if (res.status === 200) {
          this.totalPage = res.data.pages
          this.more = 'more'
          this.liveList = this.liveList.concat(res.data.records)
          this.noStartList = this.noStartList.concat(res.data.records)
          this.liveVideoList = this.liveVideoList.concat(res.data.records)
          if (status == 'pullDown') {
            uni.stopPullDownRefresh()
            this.liveList = res.data.records
            this.noStartList = res.data.records
            this.liveVideoList = res.data.records
          }
          if (this.page == this.totalPage) {
            this.more = 'noMore'
          }
          if (this.page === 1) {
            this.liveList = res.data.records
            this.noStartList = res.data.records
            this.liveVideoList = res.data.records
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
      // let url = '/pages/live/detail?recordUrl=' + recordUrl + '&time=' + time + '&courseName=' + courseName + '&courseId=' + courseId
			let url = '/pages/live/detail?params=' + encodeURIComponent(JSON.stringify(params))
      this.goUrl(url)
    },
    goToLiveRoom () {
      // this.goUrl(url)
    }
  }
}
</script>







<style lang="scss">
.one-txt-cut {
  /* 溢出隐藏 */
  overflow: hidden;
  /* 规定段落中的文本不换行 */
  white-space: nowrap;
  /* 溢出文本显示省略号 */
  text-overflow: ellipsis;
}
.live {
  // 移动端
  padding-top: 90rpx;
  .head {
    position: fixed;
    // top: 0rpx;
    left: 0;
    width: 100%;
    height: auto;
    z-index: 10;
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
      font-weight: 500;
      color: #128fef;
    }
  }

  .segmented-control {
    height: 95rpx;
    width: 100%;
    border-bottom: 1rpx solid #dddddd;
    background-color: #fff;
    position: fixed;
    left: 0;
    // top: 90rpx;
    z-index: 10;
    // 移动端
    // top: 44px;
    margin-top: 90rpx;
  }
  .fix-top .segmented-control {
    top: 0px;
  }
  .content {
    // 移动端
    margin-top: 88rpx;
    background-color: #fff;
    .no-list {
      text-align: center;
      font-size: 36rpx;
      margin-top: 60rpx;
    }
    .live-item {
      height: 183rpx;
      padding-right: 224rpx;
      padding-top: 35rpx;
      padding-left: 20rpx;
      border-bottom: 1rpx solid #e5e5e5;
      position: relative;

      .title {
        width: 506rpx;
        font-size: 32rpx;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 56rpx;
      }
      .time {
        width: 506rpx;
        font-size: 24rpx;
        color: rgba(51, 51, 51, 1);
        line-height: 48rpx;
        padding-left: 36rpx;
        position: relative;

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
      }
      .live-info {
        width: 506rpx;
        font-size: 24rpx;
        color: rgba(102, 102, 102, 1);
        line-height: 46rpx;

        span:nth-child(1) {
          margin-right: 54rpx;
        }
      }
      .live-btn {
        position: absolute;
        right: 20rpx;
        top: 68rpx;
        width: 204rpx;
        height: 64rpx;
        line-height: 64rpx;
        text-align: center;
        color: #fff;
        background: rgba(255, 153, 0, 1);
        border-radius: 32rpx;
        padding-right: 28rpx;
        box-sizing: border-box;

        .icon-into {
          width: 28rpx;
          height: 28rpx;
          display: inline-block;
          background: url(../../static/img/liveImg/live02.png) no-repeat 0 0;
          background-size: cover;
          right: 20rpx;
          top: 18rpx;
          position: absolute;
        }
      }
      .live-btn2 {
        position: absolute;
        right: 20rpx;
        top: 68rpx;
        width: 204rpx;
        height: 64rpx;
        line-height: 64rpx;
        text-align: center;
        color: #fff;
        color: rgba(255, 153, 0, 1);
        border: 1px solid rgba(255, 153, 0, 1);
        border-radius: 32rpx;
      }
      .live-btn3 {
        position: absolute;
        right: 20rpx;
        top: 68rpx;
        width: 204rpx;
        height: 64rpx;
        line-height: 64rpx;
        text-align: center;
        color: #14bf59;
        border: 1px solid#14BF59;
        border-radius: 32rpx;
        padding-right: 28rpx;
        box-sizing: border-box;

        .icon-into {
          width: 28rpx;
          height: 28rpx;
          display: inline-block;
          background: url(../../static/img/liveImg/live04.png) no-repeat 0 0;
          background-size: cover;
          right: 20rpx;
          top: 18rpx;
          position: absolute;
        }
      }
    }
  }
}
</style>

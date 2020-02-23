<template>
  <div class="home">
	<uni-search-bar :radius="100" @confirm="search"></uni-search-bar>
    <div>
      <div class="cu-bar bg-white solid-bottom">
        <div class="action">
          <text class="cuIcon-titles text-orange"></text>平分
        </div>
      </div>
      <wuc-tab :tab-list="tabList3" textFlex :tabCur.sync="TabCur3" tab-class="text-center text-black bg-white" select-class="text-orange"></wuc-tab>
      <swiper :current="TabCur3" class="swiper" duration="300" :circular="true" indicator-color="rgba(255,255,255,0)" indicator-active-color="rgba(255,255,255,0)" @change="swiperChange3">
        <swiper-item v-for="(item,index) in tabList3" :key="index">
          <div class="bg-white padding margin text-center text-black">{{item.name}}</div>
		  <view class="product-flex-row">
			  <view class="product-flex-item">
				  <view class="img-wrap"><image src="/images/index/item4@2x.png" class="product-image"/></view>
				  <view class="product-title">九阳 JYF-40FS28电饭煲4L智能家用电饭锅</view>
				  <view class="product-price"><view class='product-price'>¥<text>ddddd</text><span class='product-buy'>购买</span></view></view>
			  </view>
			  <view class="product-flex-item">
				  <view class="img-wrap"><image src="/images/index/item4@2x.png" class="product-image"/></view>
				  <view class="product-title">九阳 JYF-40FS28电饭煲4L智能家用电饭锅</view>
				  <view class="product-price"><view class='product-price'>¥<text>ddddd</text><span class='product-buy'>购买</span></view></view>
			  </view>
		  </view>
        </swiper-item>
      </swiper>
    </div>
  </div>
</template>

<script>
import WucTab from '@/components/wuc-tab/wuc-tab.vue';
import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
export default {
    data() {
        return {
            tabList3: [{ name: '精选' }, { name: '订阅' }],
            TabCur3: 0
        };
    },
    components: { WucTab, uniSearchBar },
    computed: {},
    methods: {
        swiperChange3(e) {
            let { current } = e.target;
            this.TabCur3 = current;
        },
		search () {
			alert(123)
		}
    },
    onReady() {}
};
</script>

<style lang="scss">
.home{
	div,
	scroll-view,
	swiper {
		box-sizing: border-box;
	}
	div {
	  font-size: 28upx;
	  /* background-color: #f1f1f1; */
	}
	.swiper {
		height: 1000upx;
	}

	.cu-bar {
		display: flex;
		position: relative;
		align-items: center;
		min-height: 100upx;
		justify-content: space-between;
	}

	.cu-bar .action {
		display: flex;
		align-items: center;
		height: 100%;
		justify-content: center;
		max-width: 100%;
	  background-color: #ffffff;
	}

	.cu-bar .action:first-child {
		margin-left: 30upx;
		font-size: 30upx;
	}

	.solid,
	.solid-bottom {
		position: relative;
	}

	.solid::after,
	.solid-bottom::after{
		content: " ";
		width: 200%;
		height: 200%;
		position: absolute;
		top: 0;
		left: 0;
		border-radius: inherit;
		transform: scale(0.5);
		transform-origin: 0 0;
		pointer-events: none;
		box-sizing: border-box;
	}

	.solid::after {
		border: 1upx solid rgba(0, 0, 0, 0.1);
	}

	.solid-bottom::after {
		border-bottom: 1upx solid rgba(0, 0, 0, 0.1);
	}

	.text-orange{
	  color:#f37b1d
	}
	.text-black{
	  color:#333333;
	}
	.bg-white{
		background-color: #ffffff;
	}

	.padding {
		padding: 30upx;
	}

	.margin {
		margin: 30upx;
	}

	.margin-top {
		margin-top: 30upx;
	}
	.text-center {
		text-align: center;
	}
}
</style>
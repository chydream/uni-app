<template>
	<view>
		<view class="uni-padding-wrap uni-common-mt">
			<view class="uni-title uni-commont">
				Vertical Scroll
				<text>纵向滚动</text>
			</view>
			<view>
				<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" 
					@scrolltoupper="upper" @scrolltolower="lower" scroll="scroll">
					<view id="demo1" class="scroll-view-item uni-bg-red">A</view>
					<view id="demo2" class="scroll-view-item uni-bg-green">B</view>
					<view id="demo2" class="scroll-view-item uni-bg-blue">C</view>
				</scroll-view>
			</view>
			<view @tap="goTop" class="uni-link uni-center uni-common-mt">
				点击这里返回顶部
			</view>
			<view class="uni-title uni-common-mt">
				Horizontal Scroll
				<text>\n横向滚动</text>
			</view>
			<view>
				<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="120">
					<view id="demo1" class="scroll-view-item_H uni-bg-red">A</view>
					<view id="demo2" class="scroll-view-item_H uni-bg-green">A</view>
					<view id="demo3" class="scroll-view-item_H uni-bg-blue">A</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				scrollTop:0,
				old:{
					scrollTop:0
				}
			}
		},
		methods:{
			upper:function(e){
				console.log(e)
			},
			lower:function(e){
				console.log(e)
			},
			scroll:function(e){
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			goTop:function(e){
				this.scrollTop = this.old.scrollTop
				this.$nextTick(function(){
					this.scrollTop = 0
				})
				uni.showToast({
					icon:"none",
					title:"纵向滚动 scrollTop值已被修改为0"
				})
			}
		}
	}
</script>

<style>
.scroll-view-item,.scroll-view-item_H{
	height: 200px;
}
.uni-bg-red{
	background: red;
}
.uni-bg-green{
	background: green;
}
.uni-bg-blue{
	background: blue;
}
</style>

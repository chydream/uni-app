<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view>
			<text class="title">{{title}}</text>
		</view>
	</view>
</template>

<script>
	import {mapGetters} from 'vuex'
	export default {
		name:'Index',
		data() {
			return {
				title: '首页'
			}
		},
		computed: {
		  ...mapGetters(['uniToken'])
		},
		onLoad() {
			// if(this.uniToken==''){
			// 	this.goUrl('/pages/login/login');
			// }
		},
		onShow (){
			// if(this.uniToken==''){
			// 	this.goUrl('/pages/login/login');
			// }
		},
		methods: {

		}
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
</style>

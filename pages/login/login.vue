<template>
	<view>
		<!-- #ifdef APP-PLUS -->  
		<view class="status_bar">  
			<view class="top_view"></view>  
		</view>  
		<!-- #endif -->
		<view class="uni-common-mt">
			<view class="uni-form-item uni-column">
				<view class="title">用户名</view>
				<input class="uni-input" focus placeholder="请输入用户名" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">密码</view>
				<input class="uni-input" password type="text" placeholder="请输入密码" />
			</view>
			<view class="button-sp-area log-btn">
				<button type="primary" plain="true" @click="bindLogin" size="mini">按钮</button>
			</view>
		</view>
	</view>
</template>

<script>
	import mixinsFun from '../../mixins/mixinsFun.js';
	export default {
		mixins:[mixinsFun],
		data(){
			return {
				account:'',
				password:'',
				title: 'input',
				focus: false,
				inputValue: '',
				changeValue: ''
			}
		},
		methods:{
			bindLogin(){
				// this.uShowActionSheet(['A', 'B', 'C'])
				// console.log(this.getSystemInfoSyncData())
				// this.goBackUrl(1);
				// this.getProviderData()
				this.getLogin()
			},
			initPosition() {
				this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
			},
			onKeyInput: function(event) {
				this.inputValue = event.target.value
			},
			replaceInput: function(event) {
				var value = event.target.value;
				if (value === '11') {
					this.changeValue = '2';
				}
			},
			hideKeyboard: function(event) {
				if (event.target.value === '123') {
					uni.hideKeyboard();
				}
			}
		},
		onReady() {
            this.initPosition();
        }
	}
</script>

<style>
	.status_bar {  
		height: var(--status-bar-height);  
		width: 100%;  
		background-color: #F8F8F8;  
	}  
	.top_view {  
		height: var(--status-bar-height);  
		width: 100%;  
		position: fixed;  
		background-color: #F8F8F8;  
		top: 0;  
		z-index: 999;  
	}  
	.log-btn{
		margin-top: 20upx;
		text-align: center;
	}
	.title{
		width: 100upx;
		float: left;
		text-align: right;
		margin-right: 20upx;
	}
	.uni-input{
		border: 1px solid #ccc;
		margin: 0 20upx 0 0upx;
		text-indent: 10upx;
	}
	.uni-form-item{
		margin: 20upx 0;
	}
</style>

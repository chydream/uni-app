<template>
	<div>
		<p>用户名：<input type="text" placeholder="请输入用户名" v-model="account"></p>
		<p>密码：<input type="password" placeholder="请输入密码" v-model="password"></p>
		<p><input type="button" value="登录" @click="bindLogin"></p>
	</div>
</template>

<script>
	import mixinsFun from '../../mixins/mixinsFun.js';
	export default {
		mixins:[mixinsFun],
		data(){
			return {
				account:'',
				password:''
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
			}
		},
		onReady() {
            this.initPosition();
        }
	}
</script>

<style>
</style>

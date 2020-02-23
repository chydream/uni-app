<template>
	<div class="home">
		
	</div>
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
			// this.$store.dispatch('user/Login', '').then((res)=>{
			// 	console.log(res)
			// })
		},
		onShow (){
			// location.href = 'http://www.baidu.com'
			// if(this.uniToken==''){
			// 	this.goUrl('/pages/login/login');
			// }
		},
		onTabItemTap (e) {
			console.log(e.index)
			if(e.index === 1 ){
				// location.href = 'http://www.baidu.com'
			}
		},
		methods: {

		}
	}
</script>

<style>
	.home{
		
	}
</style>

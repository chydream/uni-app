<template>
	<div class="home">
		dddddd
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
			// if(this.uniToken==''){
			// 	this.goUrl('/pages/login/login');
			// }
		},
		methods: {

		}
	}
</script>

<style>
	.home{
		
	}
</style>

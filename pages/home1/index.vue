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

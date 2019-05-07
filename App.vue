<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import url("./style/reset.css");
	// uni-page[data-page="pages/login/login"]{
	// 	.uni-page-head{
	// 		display: none!important;
	// 	}
	// 	uni-page-head .uni-page-head~.uni-placeholder{
	// 		display: none;
	// 	}
	// }
</style>

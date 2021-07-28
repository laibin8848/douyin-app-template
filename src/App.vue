<script>
	export default {
		onLaunch: function(options) {
			console.log('App Launch', options)

			uni.login({
				provider: 'toutiao',
				success: function(loginRes) {
					console.log('login', loginRes);
					
				}
			})

			//clear flag
			uni.setStorage({
				key: 'show_coupon_popup',
				data: ''
			})
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import './common/uni.css';
</style>

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
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import './common/uni.css';
</style>

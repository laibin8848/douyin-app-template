<script>
	import { douyinAppletsLogin } from '@/api'

	export default {
		onLaunch: function(options) {
			console.log('App Launch', options)

			uni.login({
				provider: 'toutiao',
				success: function(loginRes) {
					console.log('loginRes', loginRes)
					
					uni.getUserInfo({
						success(res) {
							//
						}
					})

					douyinAppletsLogin({
						'anonymousCode': loginRes.anonymousCode,
						'code': loginRes.code
					},(res) => {
						uni.setStorage({
							key: 'access_token',
							data: res.data.result.token || ''
						})
					})
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

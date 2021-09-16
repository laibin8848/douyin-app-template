<script>
	import { douyinAppletsLogin } from '@/api'
	import setNavBar from '@/mixin/set-nav-bar'

	export default {
		mixins: [setNavBar],
		onLaunch: function(options) {
			console.log('App Launch', options)
			let provider = 'toutiao'
			// #ifdef MP-WEIXIN
			provider = 'weixin'  
			// #endif
			uni.login({
				provider: provider,
				success: function(loginRes) {
					console.log('loginRes', loginRes)
					uni.setStorage({
						key: 'logined_anonymousCode',
						data: loginRes.anonymousCode
					})
					uni.setStorage({
						key: 'logined_code',
						data: loginRes.code
					})
					douyinAppletsLogin({
						'anonymousCode': loginRes.anonymousCode,
						'code': loginRes.code
					},(res) => {
						res.data.result && uni.setStorage({
							key: 'access_token',
							data: res.data.result.token || ''
						})
					})
				}
			})

			uni.getSetting({
				success(res) {
					if(!res.authSetting['scope.userInfo']) {
						uni.showModal({
							title: '提示',
							content: '应用将请求获取您的头像及昵称，仅限于展示作用。',
							success: function (res) {
								if (res.confirm) {
									const anonymousCode = uni.getStorageSync('logined_anonymousCode')
									const code = uni.getStorageSync('logined_code')
									uni.getUserInfo({
										success(res) {
											douyinAppletsLogin({
												'anonymousCode': anonymousCode,
												'code': code,
												'avatar': res.userInfo.avatarUrl,
												'nickname': res.userInfo.nickName
											},(res) => {
												res.data.result && uni.setStorage({
													key: 'access_token',
													data: res.data.result.token || ''
												})
											})
										}
									})
								}
							}
						})
					}
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

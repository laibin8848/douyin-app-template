<template>
	<view>
		enterprise
		<popup ref="popup">
			<view style="width: 80%;margin: 0 auto;">
			<button type="primary" plain="true" @click="goList">
				已领取
			</button>
			</view>
		</popup>
	</view>
</template>

<script>
	import popup from '@/components/popup.vue'
	export default {
		components: {popup},
		mounted() {
			const popupFlag = uni.getStorageSync('show_coupon_popup')
			setTimeout(()=> {
				!popupFlag && this.$refs.popup.open()
			}, 1000)
		},
		methods: {
			goList() {
				uni.setStorage({
					key: 'show_coupon_popup',
					data: '1'
				})
				this.$refs.popup.close()
				setTimeout(()=> {
					uni.switchTab({
						url: '/pages/coupon/list-get'
					})
				}, 1000)
			}
		}
	}
</script>

<style>
</style>

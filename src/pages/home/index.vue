<template>
	<view>
		<view class="ad_swiper_wrapper">
			<swiper class="swiper" circular :indicator-dots="true" :autoplay="true" :interval="2000" :duration="500">
				<swiper-item>
					<view class="swiper-item uni-bg-red">A</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item uni-bg-green">B</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item uni-bg-blue">C</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="__title">
			<text>小游戏</text>
		</view>
		<view class="btn_list">
			<button class="btn_item" type="primary" plain="true" @click="goMiniApp('tt6e6718daf14de0aa')">斗兽棋大战</button>
			<button class="btn_item" type="primary" plain="true" @click="goMiniApp('tt95d6e36b0afcf314')">水枪奇兵</button>
			<button class="btn_item" type="primary" plain="true" @click="goMiniApp('tt65e7135afacd0320')">摩托车狂飙</button>
			<button class="btn_item" type="primary" plain="true" @click="goMiniApp('ttbceeca5323c481f2')">全民枪神边境王者</button>
			<button class="btn_item" type="primary" plain="true" @click="goMiniApp('tt2a5d5ce0b577716b')">斗兽棋123</button>
			<button type="primary" plain="true" @click="goMiniApp('tt33a94514ac83c9e2')">贪吃蛇</button>
		</view>
		<popup ref="popup">
			<view style="width: 80%;margin: 0 auto;">
			<button type="primary" plain="true" @click="getCoupon">
				马上领取
			</button>
			</view>
		</popup>
	</view>
</template>

<script>
	import popup from '@/components/popup.vue'
	export default {
		components: {
			popup
		},
		data() {
			return {
			}
		},
		onLoad(options) {
			if(options.status == 2) {
				uni.redirectTo({
					url: '/pages/enterprise/coupon'
				})
			}
		},
		mounted() {
			const popupFlag = uni.getStorageSync('show_coupon_popup')
			setTimeout(()=> {
				!popupFlag && this.$refs.popup.open()
			}, 1000)
		},
		methods: {
			goMiniApp(appid) {
				uni.navigateToMiniProgram({
					appId: appid,
					envVersion: 'latest'
				}).then(res=> {
					console.log('goMiniApp res', res)
				})
			},
			getCoupon() {
				const _this = this
				uni.showModal({
					title: '领取成功',
					content: '领取成功',
					showCancel: false,
					success: function (res) {
						uni.setStorage({
							key: 'show_coupon_popup',
							data: '1'
						})
						_this.$refs.popup.close()
					}
				})

			}
		}
	}
</script>

<style>
.btn_list {
	width: 90%;margin: 0 auto;
}
.btn_item { margin-bottom: 10px; }
.swiper {
	height: 300rpx;
}
.swiper-item {
	display: block;
	height: 300rpx;
	line-height: 300rpx;
	text-align: center;
}
.ad_swiper_wrapper {
	width: 90%;
	margin: 0 auto 20rpx auto;
}
.__title {
	width: 90%;
	margin: 20rpx auto 20rpx auto;
	font-size: 24rpx;
}
.top_layer {
	width: 100vw;
	height: 200px;
	position:fixed;
	top: 100px;
	left: 0;
	z-index: 998;
	text-align: center;
}
.top_layer_mask {
	width: 100vw;
	height: 100%;
	position:fixed;
	top: 0;
	left: 0;
	background: rgb(0, 0, 0, 0.8);
	z-index: 996;
}
</style>

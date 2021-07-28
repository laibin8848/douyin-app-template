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
		<view class="btn_list">
			<button class="btn_item" type="primary" plain="true" @click="goMiniApp('tt6e6718daf14de0aa')">斗兽棋大战</button>
			<button class="btn_item" type="primary" plain="true" @click="goMiniApp('tt95d6e36b0afcf314')">水枪奇兵</button>
			<button class="btn_item" type="primary" plain="true" @click="goMiniApp('tt65e7135afacd0320')">摩托车狂飙</button>
			<button class="btn_item" type="primary" plain="true" @click="goMiniApp('ttbceeca5323c481f2')">全民枪神边境王者</button>
			<button class="btn_item" type="primary" plain="true" @click="goMiniApp('tt2a5d5ce0b577716b')">斗兽棋123</button>
			<button type="primary" plain="true" @click="goMiniApp('tt33a94514ac83c9e2')">贪吃蛇</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		onLoad() {
		},
		methods: {
			goMiniApp(appid) {
				uni.navigateToMiniProgram({
					appId: appid,
					envVersion: 'latest'
				}).then(res=> {
					console.log('goMiniApp res', res)
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
	margin: 0 auto;
}
</style>

<template>
	<view>
		<cusNav title="领劵首页" />
		<view class="main_bg_con">
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
				<view class="btn_item" :key="item.appid" v-for="item in gameList" @click="goMiniApp(item.appid)">
					<view class="desc">
						<text>{{item.name}}</text>
						<text>在线玩家：{{item.users}}</text>
					</view>
				</view>
			</view>
			<popup ref="popup">
				<view style="width: 80%;margin: 0 auto;">
				<button type="primary" plain="true" @click="getCoupon">
					马上领取
				</button>
				</view>
			</popup>
		</view>
	</view>
</template>

<script>
	import popup from '@/components/popup.vue'
	import cusNav from '@/components/nav.vue'

	export default {
		components: {
			popup,
			cusNav
		},
		data() {
			return {
				gameList: [
					{
						appid: 'tt2dfc5b41b2d618ae',
						name: '勇者历险记',
						users: 106
					},
					{
						appid: 'tt95d6e36b0afcf314',
						name: '水枪奇兵',
						users: 200
					},
					{
						appid: 'tt65e7135afacd0320',
						name: '摩托车狂飙',
						users: 600
					},
					{
						appid: 'tte9589fe57672f68b',
						name: '我太难了',
						users: 1000
					},
					{
						appid: 'tt2a5d5ce0b577716b',
						name: '斗兽棋123',
						users: 880
					},
					{
						appid: 'tt33a94514ac83c9e2',
						name: '贪吃蛇',
						users: 690
					}
				]
			}
		},
		onShow() {
			this.gameList.map(item => item.users++)
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
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
}
.btn_item { 
	margin-bottom: 10px;
	width: 48%;
	height: 100px;
	background: cornflowerblue;
	position: relative;
	font-size: 12px;
 }
.btn_item .desc {
	position:absolute;
	left: 10px;
	bottom: 10px;
	display: flex;
	flex-direction: column;
	color: #ffffff;
}
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
	color: #ffffff;
}
</style>

<template>
	<view>
		<cusNav title="门店生活圈" />
		<view class="main_bg_con">
			<view class="ad_swiper_wrapper">
				<image :src="banner" style="width: 100%;" mode="widthFix" />
				<!-- <swiper class="swiper" circular :indicator-dots="false" :autoplay="true" :interval="2000" :duration="500">
					<swiper-item>
						<view class="swiper-item">
							<image src="@/static/home/banner.png" />
						</view>
					</swiper-item>
				</swiper> -->
			</view>
			<view class="__title">
				<text>排队无聊，玩一玩</text>
			</view>
			<view class="btn_list">
				<view class="btn_item" :key="item.appid" v-for="item in gameList1" @click="goMiniApp(item.appid)">
					<image :src="item.gameImg" style="width: 100%;" mode="widthFix" />
					<view class="desc">
						<text>{{item.name}}</text>
						<!-- <text class="_font_small">{{item.users}} 人在玩</text> -->
					</view>
				</view>
			</view>
			<view class="banner2">
				<image src="@/static/home/banner2.png" style="width: 100%;" mode="widthFix" />
				<view class="btn" @click="$refs.popup.open()">立即领取</view>
			</view>
			<view class="btn_list">
				<view class="btn_item" :key="item.appid" v-for="item in gameList2" @click="goMiniApp(item.appid)">
					<image :src="item.gameImg" style="width: 100%;" mode="widthFix" />
					<view class="desc">
						<text>{{item.name}}</text>
						<!-- <text class="_font_small">{{item.users}} 人在玩</text> -->
					</view>
				</view>
			</view>
			<popup ref="popup">
				<view class="confirm_con">
					<image src="@/static/confirmbox/get.png" style="width: 345px;" mode="widthFix" />
					<image src="@/static/confirmbox/icon_close.png" @click="$refs.popup.close()" style="width:44px;" mode="widthFix" />
					<view class="_confirm_title">{{shopname.substring(0,8)}}</view>
					<view class="_confirm_main">
						<view class="__tips">
							<image src="@/static/confirmbox/icon_colck.png" style="width: 18px;vertical-align:middle;margin: -6px 6px 0 0;" mode="widthFix" />
							<text>{{topCoupon.title}}</text>
						</view>
						<view class="__price">
							<text style="font-size: 40px;"><text style="font-size: 16px;">¥</text>{{topCoupon.faceValue}}</text>
						</view>
						<view class="__tips" style="margin-top: 0;">
							<text>满{{topCoupon.threshold}}减{{topCoupon.faceValue}}</text>
						</view>
						<view class="__get" @click="getCoupon">
						</view>
					</view>
				</view>
			</popup>
		</view>
	</view>
</template>

<script>
	import popup from '@/components/popup.vue'
	import cusNav from '@/components/nav.vue'
	import { couponList, couponGet, shopDetail } from '@/api'
	import { IMGHOST as imageHost, IMGVER as imageVer } from '@/config'

	export default {
		components: {
			popup,
			cusNav
		},
		data() {
			return {
				banner: `${imageHost}/banner.png?${imageVer}`,
				shopname: '',
				shopId: 1,
				topCoupon: null,
				gameList1: [
					{
						appid: 'tt2dfc5b41b2d618ae',
						name: '勇者历险记',
						users: 106,
						gameImg: `${imageHost}/game2.png?${imageVer}`
					},
					{
						appid: 'tt95d6e36b0afcf314',
						name: '水枪奇兵',
						users: 200,
						gameImg: `${imageHost}/game6.png?${imageVer}`
					},
					{
						appid: 'tt65e7135afacd0320',
						name: '摩托车狂飙',
						users: 600,
						gameImg: `${imageHost}/game4.png?${imageVer}`
					}
				],
				gameList2: [
					{
						appid: 'tte9589fe57672f68b',
						name: '我太难了',
						users: 1000,
						gameImg: `${imageHost}/game5.png?${imageVer}`
					},
					{
						appid: 'tt2a5d5ce0b577716b',
						name: '斗兽棋123',
						users: 880,
						gameImg: `${imageHost}/game3.png?${imageVer}`
					},
					{
						appid: 'tt33a94514ac83c9e2',
						name: '贪吃蛇',
						users: 690,
						gameImg: `${imageHost}/game1.png?${imageVer}`
					}
				]
			}
		},
		onShow() {
			this.gameList.map(item => item.users++)
		},
		onLoad(options) {
			if(options.shopId) {
				this.shopId = options.shopId
			}
			uni.showLoading({
				title: '加载中…'
			})
			// if(options.status == 2) {
			// 	uni.redirectTo({
			// 		url: `/pages/enterprise/coupon?shopname=${this.shopname}`
			// 	})
			// }
		},
		mounted() {
			shopDetail(this.shopId, (res)=> {
				if(res.data.success == true) {
					this.shopname = res.data.result.result.name
				}
			})
			couponList(this.shopId,(res) => {
				if(res.data.success == true) {
					if(res.data.result == null) {
						uni.hideLoading()
						return
					}
					this.topCoupon = res.data.result
					
					const popupFlag = uni.getStorageSync('show_coupon_popup')
					setTimeout(()=> {
						uni.hideLoading()
						!popupFlag && this.$refs.popup.open()
					}, 1000)
				}
			})
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
				couponGet({
					shopId: this.shopId,
					couponId: this.topCoupon.id,
					source: 1
				},(res) => {
					let msg = '领取成功'
					let flag = false
					if(res.data.success == false) {
						msg = '已经领过该劵'//res.data.message || '领取失败'
						flag = true
					}
					uni.showModal({
						content: msg,
						showCancel: false,
						success: function (res) {
							uni.setStorage({
								key: 'show_coupon_popup',
								data: '1'
							})
							_this.$refs.popup.close()
							flag && uni.switchTab({
								url: '/pages/coupon/list-get'
							})
						}
					})
				})
			}
		}
	}
</script>

<style>
.btn_list {
	width: 95%;
	margin: 0 auto;
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
}
.banner2 {
	width: 93%;
	margin: 0 auto 20rpx auto;
	text-align: center;
	position: relative;
}
.banner2 .btn {
	width: 80px;
	height: 30px;
	border-radius: 15px;
	background-image: linear-gradient(270deg, #FF557A 0%, #FF5828 100%);
	border-radius: 15.4px;
	position: absolute;
	right: 10px;
	top: calc(50% - 15px);
	font-size: 14px;
	color: #ffffff;
	text-align: center;
	line-height: 30px;
}
.btn_item { 
	width: 31%;
	margin-bottom: 10px;
	position: relative;
	font-size: 14px;
 }
.btn_item .desc {
	position:absolute;
	left: 10px;
	bottom: 10px;
	display: flex;
	flex-direction: column;
	color: #ffffff;
}
._font_small {
	font-size: 10px;
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
	width: 95%;
	margin: 0 auto 20rpx auto;
	text-align: center;
}
.__title {
	width: 95%;
	margin: 40rpx auto 30rpx auto;
	font-size: 28rpx;
	color: #ffffff;
}
.confirm_con {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 100px;
	position: relative;
}
._confirm_title {
	position: absolute;
	width: 100%;
	height: 20px;
	top: 20px;
	left: 0;
	text-align: center;
	line-height: 38px;
	color: #FF5830;
	font-weight: bold;
}
._confirm_main {
	position: absolute;
	width: 100%;
	height: 20px;
	top: 80px;
	left: 0;
	color: #FF3748;
	font-size: 12px;
}
._confirm_main .__tips {
	height: 28px;
	width: auto;
	text-align: center;
	line-height: 28px;
	margin-top: 10px;
}
._confirm_main .__price {
	font-weight: bold;
}
._confirm_main .__get {
	width: 100%;
	height: 58px;
	top: 150px;
	left: 0;
	position:absolute;
}
</style>

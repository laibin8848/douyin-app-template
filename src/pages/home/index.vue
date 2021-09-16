<template>
	<view>
		<cusNav title="领券小工具" />
		<view class="main_bg_con">
			<view class="ad_swiper_wrapper">
				<image :src="banner" style="width: 100%;" mode="widthFix" />
			</view>
			<view class="__title">
				<text>推荐店铺</text>
			</view>
			<view class="shop_list">
				<template v-for="item in shopListNet">
					<view class="shop_item" :key="item.id" v-if="item.id" @click="showDialog(item.id)">
						<image :src="`${imageHost}/${item.id}.png?${imageVer}`" style="width: 100%;" mode="widthFix" />
						<view class="desc">
							<text class="desc_inner">{{item.name}}</text>
							<text class="desc_inner">{{item.title}}</text>
						</view>
					</view>
					<view :key="item.id" class="shop_item _empty" v-else></view>
				</template>
			</view>
			<popup ref="popuplist">
				<view class="popup_coupon_list">
				<image class="coupon_list_close" src="@/static/confirmbox/icon_close.png" @click="$refs.popuplist.close()" style="width:34px;" mode="widthFix" />					
				<scroll-view style="height: 500px;" scroll-y="true">
					<view class="list_item" :key="item.code" v-for="item in scanEnterList">
						<!-- <view class="list_item_l">
							<text style="font-size: 36px;font-weight: bold;"><text style="font-size: 18px;">¥</text>{{item.faceValue}}</text>
						</view> -->
						<view class="list_item_r">
							<text style="font-size: 14px;font-weight: bold;">{{item.title}}</text>
							<text style="color: #FF522A;">{{item.enterpriseName || '-'}}</text>
							<text>有效期至{{formatTime(item.endTime)}}</text>
						</view>
						<view class="list_item_b">
							<button @click="doUseCoupon(item.code)" class="__my_btn" type="primary" plain="true" size="mini">使用</button>
						</view>
					</view>
				</scroll-view>
				</view>
			</popup>
			<popup ref="popup">
				<view class="confirm_con">
					<image src="@/static/confirmbox/get.png" style="width: 345px;" mode="widthFix" />
					<image src="@/static/confirmbox/icon_close.png" @click="$refs.popup.close()" style="width:44px;" mode="widthFix" />
					<view class="_confirm_title">{{shopname.replace('的小店', '').substring(0,8)}}</view>
					<view class="_confirm_main">
						<view class="__tips">
							<image src="@/static/confirmbox/icon_colck.png" style="width: 18px;vertical-align:middle;margin: -6px 6px 0 0;" mode="widthFix" />
							<text>{{topCoupon.title}}</text>
						</view>
						<!-- <view class="__price">
							<text style="font-size: 40px;"><text style="font-size: 16px;">¥</text>{{topCoupon.faceValue}}</text>
						</view>
						<view class="__tips" style="margin-top: 0;">
							<text>满{{topCoupon.threshold}}减{{topCoupon.faceValue}}</text>
						</view> -->
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
	import { couponList, couponGet, shopDetail, getShopList, useCouponList, useCoupon } from '@/api'
	import { IMGHOST as imageHost, IMGVER as imageVer } from '@/config'

	export default {
		components: {
			popup,
			cusNav
		},
		data() {
			return {
				action: '',
				imageHost,
				imageVer: imageVer,
				banner: `${imageHost}/banner.png?${imageVer}`,
				shopname: '',
				shopId: "1",
				topCoupon: null,
				shopListNet: [
					{
						id: '1',
						name: "",
						title: "加载中……"
					},
					{
						id: '1',
						name: '',
						title: "加载中……"
					},
					{
						id: '1',
						name: '',
						title: "加载中……"
					},
					{
						id: '1',
						name: '',
						title: "加载中……"
					}
				],
				scanEnterList: [],
				timer: null
			}
		},
		onLoad(options) {
			const _this = this
			setTimeout(()=> {
				options.action == 'useCoupon' && useCouponList({ shopId: this.shopId, status: 0 }, (res)=> {
					if(res.data.code == 'E000') {
						this.scanEnterList = res.data.result || []
						if(this.scanEnterList.length == 0) {
							uni.showToast({
								title: '无可用优惠劵',
								duration: 2000
							})
						} else {
							_this.$refs.popuplist.open()
						}
					} else {
						uni.showToast({
							title: '无可用优惠劵',
							duration: 2000
						})
					}
				})
			}, 2000)
			getShopList((res)=> {
				_this.shopListNet = res.data.result.records || []
				if(_this.shopListNet.length%2 > 0) {
					_this.shopListNet.push({
						id: ''
					})
				}
			})
			if(options.shopId) {
				this.shopId = options.shopId
			}
		},
		methods: {
			formatTime(time) {
				return time.split(' ')[0]
			},
			openDialog() {
				if(this.topCoupon) {
					this.$refs.popup.open()
				}
			},
			showDialog(shopId) {
				uni.showLoading({
					title: '加载中…'
				})
				shopDetail(shopId, (res)=> {
					if(res.data.success == true) {
						this.shopname = res.data.result.result.name
					}
				})
				couponList(shopId,(res) => {
					if(res.data.success == true) {
						if(res.data.result == null) {
							uni.hideLoading()
							return
						}
						this.topCoupon = res.data.result
						setTimeout(()=> {
							uni.hideLoading()
							this.$refs.popup.open()
						}, 1000)
					}
				})
			},
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
			},
			doUseCoupon(code) {
				const _this = this
				uni.showModal({
					title: '提示',
					content: '确定核销该优惠劵',
					success: function (res) {
						if (res.confirm) {
							useCoupon({code}, res=> {
								if(res.data.code == 'E000') {
									uni.showToast({
										title: '消劵成功！',
										duration: 2000
									})
									_this.$refs.popuplist.close()
								} else {
									uni.showToast({
										title: res.data.message,
										duration: 2000
									})
								}
							})
						}
					}
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
.shop_list {
	width: 95%;
	margin: 0 auto;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
}
.shop_item { 
	width: 48%;
	margin-bottom: 10px;
	position: relative;
	font-size: 14px;
	background: #fafafa;
	border-radius:4px;
	position: relative;
 }
 ._empty { background: none !important; }
.shop_item image {
	border-top-right-radius:4px;
    border-top-left-radius:4px;
}
.shop_item .desc {
	/* position:absolute; */
	/* left: 0;
	bottom: -20px; */
	width: 100%;
	height: auto;
	background: #fafafa;
	border-bottom-right-radius:4px;
    border-bottom-left-radius:4px;
	display: flex;
	flex-direction: column;
	padding: 14px 0 10px 0;
	/* margin-top: -10px; */
	font-size: 12px;
	color: #333;
	position:absolute;
	bottom: 0;
}
.shop_item .desc_inner {
	text-indent: 10px;
	width: 100%;
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
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
	margin: 30rpx auto 30rpx auto;
	font-size: 14px;
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
	top: 120px;
	left: 0;
	color: #FF3748;
	font-size: 16px;
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
	top: 110px;
	left: 0;
	position:absolute;
}
.popup_coupon_list {
	width: 90%;
	height: auto;
	background: #fffafa;
	margin: 50px auto 0 auto;
	border: 1px #FF5830 solid;
	border-radius: 10px;
	position: relative;
	display: flex;
	flex-direction: column;
	padding-bottom: 10px;
}
.popup_coupon_list .list_item {
	width: 88%;
	background: #FFFFFF;
	box-shadow: 4px 0 8px 0 rgba(0,0,0,0.10);
	margin: 10px auto 0 auto;
	border-radius: 10px;
	align-items: center;
	display: flex;
	font-size: 12px;
	padding: 10px;
}
.popup_coupon_list .list_item .list_item_l{
	color: #FF522A;
	width: 100px;
	overflow: hidden;
}
.popup_coupon_list .list_item .list_item_r {
	display: flex;
	flex-direction: column;
	line-height: 22px;
	text-align: left;
	flex: 1;
	padding-left: 6px;
	/* border-left: 1px #E5E5E5 dashed; */
	position: relative;
}
/* .popup_coupon_list .list_item .list_item_r::after {
	width: 20px;
	height: 20px;
	border-radius: 10px;
	background: #fffafa;
	position: absolute;
	top: -20px;
	left: -10px;
	content: '';
	display: block;
}
.popup_coupon_list .list_item .list_item_r::before {
	width: 20px;
	height: 20px;
	border-radius: 10px;
	background: #fffafa;
	position: absolute;
	bottom: -20px;
	left: -10px;
	content: '';
	display: block;
} */
.coupon_list_close {
	top: -16px;
	right: -12px;
	position: absolute;
}
.__my_btn {
	border-radius: 4px;
	background-image: linear-gradient(270deg, #FF557A 0%, #FF5828 100%);
}
</style>

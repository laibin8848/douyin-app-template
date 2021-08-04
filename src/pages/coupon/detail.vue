<template>
	<view>
		<cusNav title="我的卡劵" height="240px" :needback="true" />
		<view class="main_bg_con" style="min-height: auto;">
			<view class="qr_box">
				<view class="qr_box_con">
					<view class="title_box">
						<text class="__main_title">{{couponObj.title || ''}}</text>
						<text>满{{couponObj.threshold}}减{{couponObj.faceValue}}</text>
					</view>
					<view class="sp_border">
						<view class="_right"></view>
						<view class="_left"></view>
					</view>
					<view class="code_box">券码：{{couponObj.qrCode || ''}}</view>
					<view>
						<canvas style="margin: 0 auto;width: 120px;height: 120px;" class='canvas' canvas-id="myQrcode"></canvas>
					</view>
					<view class="fit_bottom">可用时间：{{formatTime(couponObj.startTime || '')}} 至 {{formatTime(couponObj.endTime || '')}}</view>
				</view>
			</view>
			<view class="__bottom_desc">
				<view class="_block">
					<text class="__title">适用范围</text>
					<text class="__con" style="border-bottom: 1px solid #F1F1F1;">
						{{couponObj.description2 || ''}}
					</text>
				</view>
				<view class="_block">
					<text class="__title">使用须知</text>
					<text class="__con">
						{{couponObj.description3 || ''}}
					</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import cusNav from '@/components/nav.vue'
	import QRCode from '@/common/qrcode.js'
	import { couponDetail, couponStatus } from '@/api'
	import moment from 'moment'
	let timmer = null

	export default {
		components: {
			cusNav
		},
		data() {
			return {
				couponId: null,
				couponObj: null
			}
		},
		onLoad(options) {
			this.couponId = options.couponId
			timmer = setInterval(()=> {
				couponStatus(this.couponObj.qrCode || '', (res)=> {
					if(res.data.success == true) {
						if(res.data.result != 0) {
							clearInterval(timmer)
							uni.showModal({
								content: '优惠券核销成功！',
								showCancel: false,
								success: function () {
									uni.switchTab({
										url: '/pages/coupon/list-get'
									})
								}
							})
						}
					}
				})
			}, 2000)
		},
		beforeDestroy() {
			clearInterval(timmer)
		},
		mounted() {
			uni.showLoading({
				title: '加载中……'
			})
			couponDetail(this.couponId, (res)=> {
				uni.hideLoading()
				this.couponObj = res.data.result
				new QRCode('myQrcode', {
					text: this.couponObj.qrCode || '',
					width: 120,
					height: 120,
					colorDark: "#333333",
					colorLight: "#FFFFFF",
					correctLevel: QRCode.CorrectLevel.H
				})
			})
		},
		methods: {
			formatTime(time) {
				return moment(time).format('YYYY-MM-DD')
			}
		}
	}
</script>

<style>
	.qr_box {
		width: 100%;
		height: auto;
		z-index: 999;
		position: absolute;
		top: 150px;
	}
	.qr_box_con {
		width: 95%;
		margin: 0 auto;
		height: 366px;
		background: #FFFFFF;
		box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.06);
		border-radius: 6px;
		position: relative;
	}
	.qr_box_con .sp_border {
		border-bottom: 1px dashed #EBEBEB;
		height: 16px;
		width: 100%;
		position: relative;
	}
	.qr_box_con .title_box {
		display: flex;
		flex-direction: column;
		text-align: center;
		color: #333333;
		font-size: 16px;
	}
	.qr_box_con .title_box .__main_title {
		color: #ED4134;
		font-size: 24px;
		padding: 20px 0;
	}
	.qr_box_con .code_box {
		background: #FAFAFA;
		line-height: 36px;
		padding: 0 20px;
		font-size: 12px;
		color: #646566;
		width: 75%;
		margin: 20px auto;
		text-align: center;
	}
	.qr_box_con .fit_bottom {
		background: #FAFAFA;
		line-height: 36px;
		font-size: 12px;
		color: #646566;
		bottom: 0;
		position:absolute;
		border-radius: 6px;
		width: 100%;
		text-indent: 20px;
	}
	
	.qr_box_con .sp_border ._right {
		width: 16px;
		height: 16px;
		background: #243962;
		position: absolute;
		right: -8px;
		border-radius: 16px;
		top: 8px;
	}
	.qr_box_con .sp_border ._left {
		width: 16px;
		height: 16px;
		background: #243962;
		position: absolute;
		left: -8px;
		border-radius: 16px;
		top: 8px;
	}
	.__bottom_desc {
		width: 100%;
		height: 260px;
		background: #FFFFFF;
		margin-top: 310px;
	}
	.__bottom_desc ._block {
		padding: 10px;
		display: flex;
		flex-direction: column;
	}
	.__bottom_desc ._block .__title { font-size: 15px;color: #000;margin-bottom: 10px; }
	.__bottom_desc ._block .__con {
		color: #646566;
		font-size: 12px;
		line-height: 18px;
		padding-bottom: 16px;
	}
</style>

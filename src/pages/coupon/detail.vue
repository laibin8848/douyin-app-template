<template>
	<view>
		<cusNav title="我的卡劵" height="240px" :needback="true" />
		<view class="main_bg_con">
			<view class="qr_box">
				<view class="qr_box_con">
					<view class="title_box">
						<text class="__main_title">10元立减券</text>
						<text>唐宴酒家</text>
					</view>
					<view class="sp_border">
						<view class="_right"></view>
						<view class="_left"></view>
					</view>
					<view class="code_box">券码：0923-0399-9034</view>
					<view>
						<canvas style="margin: 0 auto;width: 120px;height: 120px;" class='canvas' canvas-id="myQrcode"></canvas>
					</view>
					<view class="fit_bottom">可用时间：2021-09-23至2021-09-29</view>
				</view>
			</view>
			<view class="__bottom_desc">
				<view class="_block">
					<text class="__title">适用范围</text>
					<text class="__con" style="border-bottom: 1px solid #F1F1F1;">
						商品和限时超值购商品额外9折优惠。此优惠券可与店内活动优惠同享，不可与其他会员优惠券或其他优惠代码同享，不适用于购买减价商品。此优惠券限使用一次，自兑换之日起30天内有效。
					</text>
				</view>
				<view class="_block">
					<text class="__title">使用须知</text>
					<text class="__con">
						享整单双倍积分特惠。此欢迎礼券可与店内优惠同享，不可与其他会员优惠券以及其他优惠代码同享，周末不能使用，节假日不能使用，发票问题请咨询商家。
					</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import cusNav from '@/components/nav.vue'
	import QRCode from '@/common/qrcode.js'

	export default {
		components: {
			cusNav
		},
		data() {
			return {
			}
		},
		onLoad() {
		},
		mounted() {
			new QRCode('myQrcode', {
				text: "0923-0399-9034",
				width: 120,
				height: 120,
				colorDark: "#333333",
				colorLight: "#FFFFFF",
				correctLevel: QRCode.CorrectLevel.H
			})
		},
		methods: {
		}
	}
</script>

<style>
	.qr_box {
		width: 100%;
		height: auto;
		z-index: 999;
		position: absolute;
		top: 100px;
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
		height: 400px;
		background: #FFFFFF;
		margin-top: 220px;
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

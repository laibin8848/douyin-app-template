<template>
	<view>
		<cusNav title="随机标题" />
		<view class="main_bg_con">
			<view class="btn_list">
				<view class="_block_title">你参与传播的作品:</view>
				<view class="_block_img">
					
				</view>
				<view class="_block_desc">
					<h3>活动介绍</h3>
					根据商家活动不同自定义活动介绍，根据商家活动不同自定义活动介绍，根据商家活动不同自定义活动介绍，根据商家活动不同自定义活动介绍，根据商家活动不同自定义活动介绍，根据商家活动不同自定义活动介绍。
				</view>
				<view class="_block_btn">
					<button class="__my_btn" type="primary" plain="true" size="mini">立即领取</button>
				</view>
			</view>
			<popup ref="popup">
				<view style="width: 80%;margin: 0 auto;">
				<button type="primary" plain="true" @click="goList">
					已领取
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
			cusNav,
			popup
		},
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
._block_title {
	font-family: PingFangSC-Medium;
	font-size: 18px;
	color: #FF6644;
	letter-spacing: 0;
	text-align: center;
	font-weight: 500;
}
._block_img {
	width: 60%;
	height: 250px;
	background: #fafafa;
	margin: 20px auto;
}
._block_desc h3 {
	text-align: center;
	font-size: 18px;
	margin-bottom: 10px;
}
._block_desc {
	font-size: 12px;
	color: #FFFFFF;
	letter-spacing: 0;
	text-align: justify;
	font-weight: 400;
	width: 85%;
	margin: 0 auto;
	position: relative;
	padding: 15px;
}
._block_desc::before {
	content: '';
	opacity: 0.13;
	background: #7D9DD9;
	border-radius: 8px;
	width: 100%;
	height: 100%;
	display: block;
	position:absolute;
	top: 0;
	left: 0;
}
._block_btn { width: 100%;text-align: center; }
.__my_btn {
	margin: 20px auto;
	border-radius: 4px;
	margin-top: 20px;
	background-image: linear-gradient(270deg, #FF557A 0%, #FF5828 100%);
}
</style>

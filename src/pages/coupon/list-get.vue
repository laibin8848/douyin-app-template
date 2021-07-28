<template>
	<view>
		<view class="user_info">
			<view><image class="image" mode="widthFix" :src="avatarUrl" /></view>
			<view><text>{{nickname}}</text></view>
		</view>
		<view class="tabs_con">
			<view class="__tabs">
				全部
				<text class="uni-badge">100</text>
			</view>
			<view class="__tabs">未使用
				<text class="uni-badge">10</text></view>
			<view class="__tabs">已使用
				<text class="uni-badge">50</text></view>
			<view class="__tabs">已过期
				<text class="uni-badge">1</text></view>
		</view>
		<view class="coupon_list">
			<view class="list_item">
				<view class="__item item_p">
					<text class="_big_font"><text class="_small_font">¥</text>10</text>
					<text class="_small_font">满10可用</text>
				</view>
				<view class="__item item_d">
					<text class="_big_font">来客客立减券</text>
					<text class="_small_font">2021/08/01到期</text>
				</view>
				<view class="__item item_b">
					<button type="primary" plain="true" size="mini" @click="goDetail">去使用</button>
				</view>
			</view>
			<view class="list_item">
				<view class="__item item_p">
					<text class="_big_font"><text class="_small_font">¥</text>10</text>
					<text class="_small_font">满10可用</text>
				</view>
				<view class="__item item_d">
					<text class="_big_font">来客客立减券</text>
					<text class="_small_font">2021/08/01到期</text>
				</view>
				<view class="__item item_b">
					<button type="primary" plain="true" size="mini" @click="goDetail">去使用</button>
				</view>
			</view>
			<view class="list_item">
				<view class="__item item_p">
					<text class="_big_font"><text class="_small_font">¥</text>10</text>
					<text class="_small_font">满10可用</text>
				</view>
				<view class="__item item_d">
					<text class="_big_font">来客客立减券</text>
					<text class="_small_font">2021/08/01到期</text>
				</view>
				<view class="__item item_b">
					<button type="primary" plain="true" size="mini" @click="goDetail">去使用</button>
				</view>
			</view>
			<view class="list_item">
				<view class="__item item_p">
					<text class="_big_font"><text class="_small_font">¥</text>10</text>
					<text class="_small_font">满10可用</text>
				</view>
				<view class="__item item_d">
					<text class="_big_font">来客客立减券</text>
					<text class="_small_font">2021/08/01到期</text>
				</view>
				<view class="__item item_b">
					<button type="primary" plain="true" size="mini" @click="goDetail">去使用</button>
				</view>
			</view>
			<view class="list_item">
				<view class="__item item_p">
					<text class="_big_font"><text class="_small_font">¥</text>10</text>
					<text class="_small_font">满10可用</text>
				</view>
				<view class="__item item_d">
					<text class="_big_font">来客客立减券</text>
					<text class="_small_font">2021/08/01到期</text>
				</view>
				<view class="__item item_b">
					<button type="primary" :disabled="true" plain="true" size="mini" @click="goDetail">已使用</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nickname: '',
				avatarUrl: ''
			}
		},
		onLoad() {
			const _this = this
			uni.getUserInfo({
				success(res) {
					if (res) {
						_this.nickname = res.userInfo.nickName
						_this.avatarUrl = res.userInfo.avatarUrl
					}
				}
			})
		},
		methods: {
			goDetail() {
				uni.navigateTo({
					url: '/pages/coupon/detail'
				})
			}
		}
	}
</script>

<style>
	.user_info {
		width: 100%;
		text-align: center;
		display: flex;
		flex-direction: column;
		margin: 50rpx 0 50rpx 0;
	}
	.image {
		width: 150rpx;
		height: 150rpx;
		border-radius: 100rpx;
	}
	.tabs_con {
		width: 90%;
		display: flex;
		justify-content: space-around;
		flex-direction: row;
		margin: 0 auto;
	}
	.__tabs {
		position: relative;
	}
	.__tabs .uni-badge {
		position:absolute;
		top: -10px;
		right: -20px;
		background: deepskyblue;
	}
	.coupon_list {
		width: 90%;
		margin: 0 auto;
	}
	.list_item {
		width: 100%;
		background: #f3f0f0;
		margin-top: 10px;
		display: flex;
		flex-direction: row;
	}
	.__item {
		font-size: 14px;
		display: flex;
		flex-direction: column;
		padding: 20px 0;
	}
	.item_p {
		padding-left: 10px;
		width: 80px;
	}
	.item_d {
		flex: 1;
	}
	.item_b {
		padding-right: 10px;
	}
	._big_font {
		font-size: 20px;
	}
	._small_font {
		font-size: 10px;
		color: #666;
	}
</style>

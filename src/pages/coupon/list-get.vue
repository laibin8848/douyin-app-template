<template>
	<view>
		<cusNav title="我的卡劵" height="240px">
			<view class="user_info">
				<view class="face_name">
					<image class="image" mode="widthFix" :src="avatarUrl" />
					<text>{{nickname}}</text>
				</view>
				<view class="tabs_con">
					<view @click="curStatus = ''" :class="{'__tabs': true, '__active': curStatus == ''}">
						全部
						<text class="uni-badge">{{counts.all}}</text>
					</view>
					<view @click="curStatus = '0'" :class="{'__tabs': true, '__active': curStatus == '0'}">未使用<text class="uni-badge" v-if="counts.status0 > 0">{{counts.status0}}</text></view>
					<view @click="curStatus = '1'" :class="{'__tabs': true, '__active': curStatus == '1'}">已使用<text class="uni-badge" v-if="counts.status1 > 0">{{counts.status1}}</text></view>
					<view @click="curStatus = '2'" :class="{'__tabs': true, '__active': curStatus == '2'}">已过期<text class="uni-badge" v-if="counts.status2 > 0">{{counts.status2}}</text></view>
				</view>
			</view>
		</cusNav>
		<view class="main_bg_con">
			<view class="coupon_list">
				<view style="color: #fff;font-size: 12px;text-align: center;" v-if="list.length == 0">
					暂无数据~
				</view>
				<view class="list_item_wrapper" v-for="(item, index) in list" :key="item.id">
					<view class="list_item" @click="goDetail(item)">
						<view class="__item item_p color_1">
							<text class="_big_b_font"><text class="_small_s_font">¥</text>{{item.faceValue}}</text>
						</view>
						<view class="__item item_d">
							<text class="_big_font color_2">{{item.title}}</text>
							<text class="_small_font color_1">满{{item.threshold}}减{{item.faceValue}}</text>
							<text class="_small_font color_3">{{formatTime(item.endTime)}} 到期</text>
						</view>
						<view class="__item item_b">
							<button :disabled="item.status != 0" :class="{'__my_btn': true,'__my_btn_narmal': item.status == 0, '__my_btn_disabled': item.status != 0}" type="primary" plain="true" size="mini">去使用</button>
						</view>
					</view>
					<view class="__rule">
						<view class="__rule_title" @click="list[index].showrule = !list[index].showrule">
							<text class="flex_1">满足以下条件可用</text>
							<text :class="{'arrow': true, 'arrow_to_up': item.showrule, 'arrow_to_down': !item.showrule}"></text>
						</view>
						<view v-show="item.showrule" class="_rule_text" v-html="item.description1"></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import cusNav from '@/components/nav.vue'
	import { couponMy, couponStatusCount } from '@/api'
	import moment from 'moment'

	export default {
		components: {
			cusNav
		},
		data() {
			return {
				nickname: '',
				avatarUrl: '',
				counts: {
					all: 0,
					status0: 0,
					status1: 0,
					status2: 0
				},
				curStatus: '',
				list: []
			}
		},
		onLoad() {
			const _this = this
			uni.getUserInfo({
				success(res) {
					console.log('getUserInfo', res)
					if (res) {
						_this.nickname = res.userInfo.nickName
						_this.avatarUrl = res.userInfo.avatarUrl
					}
				}
			})
			this.getMyList()
		},
		onShow() {
			this.fetchStatus()
		},
		watch: {
			'curStatus': {
				handler: function(val) {
					this.getMyList()
				}
			}
		},
		methods: {
			async fetchStatus() {
				const status = await couponStatusCount()
				this.counts.all = status.all
				this.counts.status0 = status.status0
				this.counts.status1 = status.status1
				this.counts.status2 = status.status2
			},
			formatTime(time) {
				return moment(time).format('YYYY-MM-DD')
			},
			getMyList() {
				uni.showLoading({
					title: '加载中…'
				})
				couponMy(this.curStatus, (res)=> {
					uni.hideLoading()
					res.data.result.records.map(item=> item.showrule = false)
					this.list = res.data.result.records || []
				})
			},
			goDetail(item) {
				item.status == 0 && 
					uni.navigateTo({
						url: `/pages/coupon/detail?couponId=${item.id}`
					})
			}
		}
	}
</script>

<style>
	.flex_1 { flex: 1; }
	.__rule_title {
		display: flex;
		align-items: center;
		color: #999;
	}
	._rule_text {
		padding: 10px 0;
	}
	.arrow {
		border: solid #999;
		border-width: 0 1px 1px 0;
		display: inline-block;
		padding: 3px;
		font-size: 12px;
		font-weight: bold;
	}
	.arrow_to_down {
		 transform: rotate(45deg);
  		-webkit-transform: rotate(45deg);
	}
	.arrow_to_up {
		 transform: rotate(225deg);
  		-webkit-transform: rotate(225deg);
	}
	.user_info {
		width: 100%;
		position:absolute;
		bottom: 0;
	}
	.face_name {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-left: 60rpx;
		color: #ffffff;
		margin-bottom: 60rpx;
	}
	.face_name .image {
		width: 40px;
		height: 40px;
		border-radius: 36px;
		border: 2px #ffffff solid;
		margin-right: 20rpx;
	}
	.tabs_con {
		width: 90%;
		display: flex;
		justify-content: space-around;
		flex-direction: row;
		margin: 0 auto;
		color: #ffffff;
		font-size: 32rpx;
	}
	.__tabs {
		position: relative;
		line-height: 28px;
	}
	.__active {
		border-bottom: 3px #F54F1E solid;
	}
	.__tabs .uni-badge {
		position:absolute;
		top: -10px;
		right: -20px;
		background: #F25643;
		color: #ffffff;
		font-size: 24rpx;
	}
	.coupon_list {
		width: 90%;
		margin: 0 auto;
	}
	.list_item_wrapper {
		margin-bottom: 10px;
		background: #FFFFFF;
		border-radius: 8px;
		height: auto;
	}
	.list_item_wrapper .__rule {
		border-top: 1px #E5E5E5 dashed;
		color: #666666;
		font-size: 12px;
		font-weight: normal;
		background: #FCFCFC;
		padding: 16px;
		border-radius: 8px;
	}
	.list_item {
		width: 100%;
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
		padding-left: 10px;
	}
	.item_b {
		padding-right: 10px;
	}
	._big_font {
		font-size: 20px;
	}
	._big_b_font {
		font-size: 42px;
	}
	._small_s_font {
		font-size: 22px;
		color: #666;
	}
	._small_font {
		font-size: 12px;
		color: #666;
	}
	.color_1 {
		color: #FF522A;
	}
	.color_2 {
		color: #333333;
	}
	.color_3 {
		color: #666666;
	}
	.__my_btn {
		border-radius: 4px;
		margin-top: 20px;
	}
	.__my_btn_narmal {
		background-image: linear-gradient(270deg, #FF557A 0%, #FF5828 100%);
	}
	.__my_btn_disabled {
		background: #D3D3D3;
	}
</style>

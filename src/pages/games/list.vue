<template>
	<view>
		<view>
			<text>game list</text>
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
			uni.request({
				method: 'GET',
				url: 'https://qywx-dev.gdiiyy.com/gateway/citic-robot-system/system/sys-dict/getDictItemList?dictCode=invite_address'
			}).then(res=> {
				console.log('res', res)
			})
		},
		methods: {

		}
	}
</script>

<style>
</style>

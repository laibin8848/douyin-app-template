<template>
	<view>
		<view v-if="show" class="top_layer_mask"></view>
		<view v-if="show" class="top_layer">
			<slot />
		</view>
	</view>
</template>

<script>
	export default {
		name: 'cus-popup',
		data() {
			return {
                show: false
			}
		},
		methods: {
            open() {
                this.show = true
            },
            close() {
                this.show = false
            }
		}
	}
</script>

<style>
.top_layer {
	width: 100vw;
	height: 200px;
	position:fixed;
	top: 100px;
	left: 0;
	z-index: 998;
	text-align: center;
}
.top_layer_mask {
	width: 100vw;
	height: 100%;
	position:fixed;
	top: 0;
	left: 0;
	background: rgb(0, 0, 0, 0.5);
	z-index: 996;
}
</style>

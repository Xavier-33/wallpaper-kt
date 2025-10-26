<template>
	<view class="user-item">
		<view class="left">
			<uni-icons :type="icon" size="24" color="#28b389"></uni-icons>
			<view class="text">
				<slot>内容区</slot>
			</view>
		</view>
		<view class="right">
			<view v-if="num" class="number">0</view>
			<uni-icons type="right" size="20" color="#aaa"></uni-icons>
		</view>
	</view>
</template>

<script setup>
defineProps({
	icon: {
		type: String,
		required: true,
		default: ""
	},
	num: {
		type: Boolean,
		default: false
	}
})


</script>

<style lang="scss" scoped>
.user-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 30rpx;
	height: 100rpx;
	position: relative;
	// border-bottom: 1px solid #eee;
	border-radius: 5rpx;
	.left {
		display: flex;
		align-items: center;
		.text {
			padding-left: 20rpx;
			font-size: 30rpx;
			color: #666;
		}
	}
	.right {
		width: 100rpx;
		height: 60rpx;
		display: flex;
		align-items: center;
		justify-content: end;
		.number {
			// height: 40rpx;
			line-height: 40rpx;
			// padding-right: 10rpx;
			font-size: 30rpx;
			color: #aaa;
		}
	}
	
}
</style>
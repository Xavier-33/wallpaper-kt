<template>
	<view class="layout">
		<view class="navbar">
			<view class="status-bar" :style="{ height: getStatusBarHight()+'px' }"></view>
			<view class="title-bar"
			 :style="{ height: getTitleBarHeight()+'px', marginLeft: getLeftIconLeft()+'px' }">
				<view><text class="title">标题</text></view>
				<view class="search">
					<uni-icons class="search-icon" type="search" color="#888" size="18"></uni-icons>
					<text class="search-text">搜索</text>
				</view>
			</view>
		</view>
		
		<view class="fill" :style="{ height: getNavBarHeight()+'px' }"></view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { getStatusBarHight, getTitleBarHeight, getNavBarHeight, getLeftIconLeft } from '@/utils/system.js'

</script>

<style lang="scss" scoped>
.layout {
	.navbar {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 10;
		background:
			linear-gradient(to bottom, rgba(0,0,0,0), #fff 400rpx),
			linear-gradient(to right, #beecd8 20%, #f4e2d8);
		.status-bar {
			// border: 1px solid red;
		}
		.title-bar {
			height: 100rpx;
			display: flex;
			align-items: center;
			padding: 0 30rpx;
			// border: 1px solid green;
			.title {
				font-size: 22px;
				font-weight: 700;
				color: $text-font-color-1;
			}
			.search {
				width: 220rpx;
				height: 50rpx;
				border-radius: 60rpx;
				background: rgba(255, 255, 255, 0.4);
				border: 1px solid #fff;
				margin-left: 30rpx;
				color: #999;
				font-size: 28rpx;
				display: flex;
				align-items: center;
				.search-icon {
					margin-left: 5rpx;
				}
				.search-text {
					padding-left: 10rpx;
				}
			}
		}
	}
}
</style>
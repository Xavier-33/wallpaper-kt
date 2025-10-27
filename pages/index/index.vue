<template>
	<view class="layout page-bg">
		<custom-nav-bar title="推荐"></custom-nav-bar>
		<!-- 轮播图 -->
		<view class="banner">
			<swiper circular indicator-dots="true" indicator-color="rgba(255,255,255,0.5)"
			indicator-active-color="#fff" autoplay>
				<swiper-item v-for="item in 3">
					<image src="../../common/images/banner1.jpg" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 公告栏 -->
		<view class="notice">
			<view class="left">
				<uni-icons type="sound-filled" size="20" color="#28b389"></uni-icons>
				<text class="text">公告</text>
			</view>
			<view class="center">
				<swiper vertical autoplay interval="1500" duration="300" circular>
					<swiper-item v-for="item in 4" @click="toDetail">消息内容消息内容消息内容消息内容
					消息内容消息内容消息内容消息内容消息内容消息内容消息内容</swiper-item>
				</swiper>
			</view>
			<view class="right">
				<uni-icons type="right" size="16" color="#333"></uni-icons>
			</view>
		</view>
		<!-- 每日推荐 -->
		<view class="select">
			<common-title>
				<template #name>每日推荐</template>
				<template #custom>
					<view class="day-date">
						<uni-icons type="calendar" size="18" color="@28b389"></uni-icons>
						<view class="day-date-text">
							<uni-dateformat :date="Date.now()" format="dd日"></uni-dateformat>
						</view>
					</view>
				</template>
			</common-title>
			<view class="content">
				<scroll-view scroll-x>
					<view class="box" v-for="item in 8" @click="goPreview">
						<image src="../../common/images/preview_small.webp" mode="aspectFill"></image>
					</view>
				</scroll-view>
			</view>
		</view>
		<!-- 专题精选 -->
		<view class="theme">
			<common-title>
				<template #name>专题精选</template>
				<template #custom>
					<navigator url="" class="theme-more">more+</navigator>
				</template>
			</common-title>
			<view class="theme-content">
				<theme-item v-for="item in 8"></theme-item>
				<theme-item :isMore="true"></theme-item>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';

const bannerList = ref([]);
const dailySpecialList = ref([]);
const AnnouncementsList = ref([]);

// 获取轮播图数据
const getBanner = async () => {
	let res = await apiGetBanner();
	bannerList.value = res.data;
}

// 获取每日推荐
const getDayRandom = async () => {
	let res = await apiGetDayRandom();
	dailySpecialList.value = res.data;
}

// 获取公告栏数据
const getNews = async () => {
	let res = await apiGetNews();
	AnnouncementsList.value = res.data;
}

const goPreview = () => {
	uni.navigateTo({
		url: "/pages/preview/preview"
	})
}

const toDetail = () => {
	uni.navigateTo({
		url: "/pages/notice/detail"
	})
}
</script>

<style lang="scss" scoped>
.layout {
	// padding: 30rpx 0;
	.banner {
		width: 750rpx;
		padding: 30rpx 0;
		swiper {
			width: 750rpx;
			height: 340rpx;
			&-item {
				width: 100%;
				height: 100%;
				padding: 0 30rpx;
				image {
					width: 100%;
					height: 100%;
					border-radius: 10rpx;
				}
			}
		}
	}
	.notice {
		width: 690rpx;
		height: 80rpx;
		line-height: 80rpx;
		margin: 0 auto;
		background: #f9f9f9;
		border-radius: 80rpx;
		display: flex;
		// align-items: center;
		// justify-content: center;
		.left {
			width: 140rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			.text {
				color: $brand-theme-color;
				font-weight: 600;
				font-size: 28rpx;
			}
		}
		.center {
			flex: 1;
			swiper {
				height: 100%;
				&-item {
					height: 100%;
					font-size: 30rpx;
					color: #666;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
		}
		.right {
			width: 70rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	// 每日推荐
	.select {
		padding-top: 50rpx;
		.day-date {
			color: $brand-theme-color;
			display: flex;
			align-items: center;
			.day-date-text {
				margin-left: 10rpx;
			}
		}
		.content {
			width: 700rpx;
			margin: 0 auto;
			// margin-left: 30rpx;
			margin-top: 30rpx;
			scroll-view {
				white-space: nowrap;
				.box {
					width: 200rpx;
				  height: 430rpx;
					display: inline-block;
					margin-right: 15rpx;
					image {
						width: 100%;
						height: 100%;
						border-radius: 10rpx;
					}
				}
				// .box:first-child {
				// 	margin-left: 15rpx;
				// }
				// .box:last-child {
				// 	margin-right: 15rpx;
				// }
			}
		}
	}
	// 专题精选
	.theme {
		padding: 50rpx 0;
		.theme-more {
			font-size: 32rpx;
			color: #888;
			
		}
		.theme-content {
			margin-top: 30rpx;
			padding: 0 30rpx;
			display: grid;
			gap: 15rpx;
			grid-template-columns: repeat(3, 1fr);
		}
	}
}
</style>

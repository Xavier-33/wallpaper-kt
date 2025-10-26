<template>
	<view class="layout page-bg">
		<!-- 头像 -->
		<view class="user-info">
			<view class="avator">
				<image src="../../static/images/my-avatar.png" mode="aspectFill" class="img"></image>
			</view>
			<view class="ip">192.168.100.1</view>
			<view class="address">来自于：福建</view>
		</view>
		<!-- 我的下载 我的评分 联系客服 -->
		<view class="section">
			<navigator url="/pages/classlist/classlist">
				<user-item icon="download-filled"	:num="true">我的下载</user-item>
			</navigator>
			<view class="no-underline"></view>
			<navigator url="/pages/classlist/classlist">
				<user-item icon="star-filled" :num="true">我的评分</user-item>
			</navigator>
			<view class="no-underline"></view>
			<user-item icon="chatboxes-filled">
				联系客服
				<!-- #ifdef MP -->
				<button open-type="contact" class="contact-service">联系客服</button>
				<!-- #endif -->
				<!-- #ifndef MP -->
				<button class="contact-service" @click="clickContact">拨打电话</button>
				<!-- #endif -->
			</user-item>
		</view>
		<!-- 订阅更新 常见问题 -->
		<view class="section">
			<user-item icon="notification-filled">
				订阅更新
			</user-item>
			<view class="no-underline"></view>
			<user-item icon="help-filled">
				常见问题
			</user-item>
		</view>
	</view>
</template>

<script setup>
const clickContact = () => {
	uni.makePhoneCall({
		phoneNumber: "13023940097"
	})
}


</script>

<style lang="scss" scoped>
.layout {
	.user-info {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding: 50rpx 0;
		.avator {
			width: 160rpx;
			height: 160rpx;
			border-radius: 50%;
			overflow: hidden;
			.img {
				width: 100%;
				height: 100%;
			}
		}
		.ip {
			font-size: 44rpx;
			color: #333;
			padding: 20rpx 0 5rpx;
		}
		.address {
			font-size: 28rpx;
			color: #aaa;
		}
	}
	.section {
		width: 690rpx;
		margin: 50rpx auto;
		color: red;
		border: 1px solid #eee;
		border-radius: 10rpx;
		box-shadow: 0 0 30rpx rgba(0, 0, 0, 0.05);
		position: relative;
		.contact-service {
			position: absolute;
			top: 0;
			left: -1rpx;
			width: 100%;
			height: 100rpx;
			opacity: 0;  // 测试调整显示
		}
		background: #fff;
		.no-underline {
			border-bottom: 1px solid #eee;
		}
	}
}
</style>

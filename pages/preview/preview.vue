<template>
	<view class="preview">
		<!-- 图片预览轮播图 -->
		<swiper circular class="swiper">
			<swiper-item v-for="item in classList" :key="item._id" class="swiper-itme">
				<image @click="maskChange" :src="item.picurl" mode="aspectFill" class="img"></image>
			</swiper-item>
		</swiper>
		<!-- 蒙层内容 -->
		<view class="mask" v-show="!maskState">
			<view class="go-back" :style="{ top: getStatusBarHeight()+'px' }" @click="goBack">
				<uni-icons type="back" color="#fff" size="20"></uni-icons>
			</view>
			<view class="count">3 / {{classList.length}}</view>
			<view class="time">
				<uni-dateformat :date="Date.now()" format="hh:mm"></uni-dateformat>
			</view>
			<view class="date">
				<uni-dateformat :date="Date.now()" format="MM月dd日"></uni-dateformat>
			</view>
			<view class="footer">
				<view class="box" @click.stop="clickInfo">
					<uni-icons type="info" size="25"></uni-icons>
					<view class="text">信息</view>
				</view>
				<view class="box">
					<uni-icons type="star" size="25"></uni-icons>
					<view class="text">5分</view>
				</view>
				<view class="box">
					<uni-icons type="download" size="25"></uni-icons>
					<view class="text">下载</view>
				</view>
			</view>
		</view>
		<!-- 蒙层"信息"触发底部弹层 -->
		<view class="test">
			<uni-popup ref="infoPopup" type="bottom">
				<view class="infoPopup">
					<view class="popHeader">
						<view></view>  <!-- 为了布局平衡 -->
						<view class="title">壁纸信息</view>
						<view class="close" @click="clickInfoClose">
							<uni-icons type="closeempty" size="18" 
							color="#999"></uni-icons>
						</view>
					</view>
					<scroll-view scroll-y class="scroll">
						<view class="content">
							<view class="row">
								<text class="label">壁纸ID：</text>
								<text selectable class="value">12312312ADFA</text>
							</view>
							<view class="row">
								<text class="label">分类：</text>
								<text class="value classify_">明星美女</text>
							</view>
							<view class="row">
								<text class="label">发布者：</text>
								<text class="value">咸虾米</text>
							</view>
							<view class="row">
								<text class="label">评分：</text>
								<view class="value roteBox">
									<uni-rate readonly touchable value="3" />
									<text class="score">5分</text>
								</view>
							</view>
							<view class="row">
								<text class="label">摘要：</text>
								<text class="value">NBA再次贡献世界名画，文班亚马封盖杜兰特名场面。图源：微博</text>
							</view>
							<view class="row">
								<text class="label">标签：</text>
								<view class="tags">
									<text class="tag">文班亚马</text> 
									<text class="tag">杜兰特</text>
									<text class="tag">球星</text>
								</view>
							</view>
							<view class="copyright">
								声明:本图片来用户投稿，非商业使用，用于免费学习交流，
								如侵犯了您的权益，您可以拷贝壁纸ID举报至平台，邮箱 513894357@qq.com，
								管理将删除侵权壁纸，维护您的权益。
							</view>
						</view>
					</scroll-view>
				</view>
			</uni-popup>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getStatusBarHeight } from '@/utils/system.js'

const maskState = ref(false);  // 遮罩层状态
const infoPopup = ref(null);
const classList = ref([]);  // 网格数据

// 点击关闭弹窗
const clickInfoClose = () => {
	infoPopup.value?.close();
}

// 测试显示弹窗
// onMounted(() => {
// 	console.log(infoPopup.value);
//  infoPopup.value?.open();
// });

// 点击显示弹窗
const clickInfo = () => {
	infoPopup.value?.open();
}

// 遮罩层点击事件
const maskChange = () => {
	maskState.value = !maskState.value;
}

//返回上一页
const goBack = () => {
	uni.navigateBack();
}

// 获取storage数据转预览图
const storageClassList = uni.getStorageSync("storeClassList") || [];

classList.value = storageClassList.map(item => {
	return {
		...item,
		picurl: item.smallPicurl.replace("_small.webp", ".jpg")
	}
})
console.log(classList.value);
</script>

<style lang="scss" scoped>
.preview {
	width: 100%;
	height: 100vh;
	position: relative;
	.swiper {
		width: 100%;
		height: 100%;
		.img {
			width: 100%;
			height: 100%;
		}
	}
	.mask {
		&>view {
			position: absolute;
			left: 0;
			right: 0;
			margin: auto;
			color: #fff;
			width: fit-content;
		}
		.go-back {
			width: 38px;
			height: 38px;
			background: rgba(0, 0, 0, 0.5);
			left: 30rpx;
			margin-left: 0;
			border-radius: 100px;
			top: 0;
			backdrop-filter: blur(10rpx);
			border: 1rpx solid rgba(255, 255, 255, 0.3);
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.count {
			top: 10vh;
			background: rgba(0, 0, 0, 0.3);
			font-size: 28rpx;
			color: #fff;
			border-radius: 40rpx;
			padding: 8rpx 28rpx;
			backdrop-filter: blur(10rpx);
		}
		.time {
			font-size: 140rpx;
			top: calc(10vh + 80rpx);
			line-height: 1em;
			text-shadow: 0 4rpx rgba(0, 0, 0, 0.3);
		}
		.date {
			font-size: 34rpx;
			top: calc(10vh + 230rpx);
			text-shadow: 0 2rpx rgba(0, 0, 0, 0.3);
		}
		.footer {
			background: rgba(255, 255, 255, 0.8);
			bottom: 10vh;
			width: 65vw;
			height: 120rpx;
			border-radius: 120rpx;
			display: flex;
			align-items: center;
			justify-content: space-around;
			color: $text-font-color-1;
			box-shadow: 0 2rpx 0 rgba(0, 0, 0, 0.1);
			backdrop-filter: blur(20rpx);
			.box {
				text-align: center;
				padding: 2rpx 12rpx;
				.text {
					font-size: 26rpx;
					color: $text-font-color-2;
				}
			}
		}
	}
	.infoPopup {
		background: #fff;
		padding: 30rpx;
		border-radius: 30rpx 30rpx 0 0;
		overflow: hidden;
		.popHeader {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.title {
				color: $text-font-color-2;
				font-size: 26rpx;
			}
			.close {
				// border: 1px solid red;
				padding: 6rpx;
			}
		}
		.scroll {
			max-height: 60vh;
			.content {
				.row {
					display: flex;
					padding: 16rpx 0;
					font-size: 32rpx;
					line-height: 1.7em;
					.label {
						color: $text-font-color-3;
						width: 140rpx;
						text-align: right;
						font-size: 30rpx;
					}
					.value {
						flex: 1;
					}
					.roteBox {
						display: flex;
						align-items: center;
						.score {
							padding-left: 20rpx;
							font-size: 28rpx;
							color: $text-font-color-2;
						}
					}
					.tags {
						display: flex;
						align-items: start;
						justify-content: center;
						flex-wrap: wrap;
						.tag {
							border: 1px solid $brand-theme-color;
							color: $brand-theme-color;
							font-size: 22rpx;
							padding: 10rpx 30rpx;
							border-radius: 40rpx;
							line-height: 1em;
							margin: 0 10rpx 10rpx 0;
						}
					}
					.classify_ {
						color: $brand-theme-color;
					}
				}
				.copyright {
					font-size: 28rpx;
					padding: 20rpx;
					background: #F6F6F6;
					border-radius: 10rpx;
					margin: 20rpx 0;
					line-height: 1.6rem;
				}
			}
		}
	}
}
</style>

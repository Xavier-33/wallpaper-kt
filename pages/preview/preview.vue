<template>
	<view class="preview">
		<!-- 图片预览轮播图 -->
		<swiper circular class="swiper" :current="currentIndex" @change="swiperChange">
			<swiper-item v-for="(item, index) in classList" :key="item._id" class="swiper-itme">
				<image v-if="readedImgs.includes(index)" @click="maskChange" :src="item.picurl" mode="aspectFill" class="img"></image>
			</swiper-item>
		</swiper>
		<!-- 蒙层内容 -->
		<view class="mask" v-show="!maskState">
			<view class="go-back" :style="{ top: getStatusBarHeight()+'px' }" @click="goBack">
				<uni-icons type="back" color="#fff" size="20"></uni-icons>
			</view>
			<view class="count">{{currentIndex+1}} / {{classList.length}}</view>
			<view class="time">
				<uni-dateformat :date="Date.now()" format="hh:mm"></uni-dateformat>
			</view>
			<view class="date">
				<uni-dateformat :date="Date.now()" format="MM月dd日"></uni-dateformat>
			</view>
			<view class="footer">
				<view class="box" @click="clickInfo">
					<uni-icons type="info" size="25"></uni-icons>
					<view class="text">信息</view>
				</view>
				<view class="box" @click="clickScore">
					<uni-icons type="star" size="25"></uni-icons>
					<view class="text">{{currentInfo.score}} 分</view>
				</view>
				<view class="box">
					<uni-icons type="download" size="25"></uni-icons>
					<view class="text">下载</view>
				</view>
			</view>
		</view>
		<!-- 底部弹层,由蒙层"信息"触发 -->
		<view class="test">
			<!-- 壁纸弹层信息 -->
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
								<text selectable class="value">{{currentInfo._id}}</text>
							</view>
							<!-- <view class="row">
								<text class="label">分类：</text>
								<text class="value classify_">明星美女</text>
							</view> -->
							<view class="row">
								<text class="label">发布者：</text>
								<text class="value">{{currentInfo.nickname}}</text>
							</view>
							<view class="row">
								<text class="label">评分：</text>
								<view class="value roteBox">
									<uni-rate readonly touchable :value="currentInfo.score" />
									<text class="score">{{currentInfo.score}}</text>
								</view>
							</view>
							<view class="row">
								<text class="label">摘要：</text>
								<text class="value">{{currentInfo.description}}</text>
							</view>
							<view class="row">
								<text class="label">标签：</text>
								<view class="tags" v-for="item in currentInfo.tabs" :key="item">
									<text class="tag">{{item}}</text> 
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
			<!-- 评分弹层信息 -->
			<uni-popup ref="scorePopup" :is-mask-click="false">
				<view class="scorePopup">
					<view class="popHeader">
						<view></view>  <!-- 为了布局平衡 -->
						<view class="title">{{isScore ? '评分过了~' : '壁纸评分'}}</view>
						<view class="close" @click="clickScoreClose">
							<uni-icons type="closeempty" size="18" 
							color="#999"></uni-icons>
						</view>
					</view>
					<view class="content">
						<uni-rate v-model="userScore" allowHalf="true" :disabled="isScore"></uni-rate>
						<text class="text">{{userScore}}分</text>
					</view>
					<view class="footer">
						<button 
						  @click="submitScore" 
							:disabled="!userScore || isScore" 
							disabled-color="#FFCA3E"
							type="default" 
							size="mini" 
							style="borderColor: #999999;"
							plain
						>确认评分</button>
					</view>
				</view>
			</uni-popup>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { getStatusBarHeight } from '@/utils/system.js'
import { apiSetupScore } from '@/api/apis';

const maskState = ref(false);  // 遮罩层状态
const infoPopup = ref(null);  // 信息弹层
const scorePopup = ref(null);  // 评分弹层
const userScore = ref(5);
const classList = ref([]);  // 网格数据
const currentId = ref(null); // 页面跳转的参数
const currentIndex = ref(0); // 图片的索引值
const readedImgs = ref([]); // 预览时的已读图片
const currentInfo = ref(null); // 获取当前图片的对象信息
const isScore = ref(false);
// 获取storage数据转预览图
const storeClassList = uni.getStorageSync("storeClassList") || [];

// 打开info弹窗
const clickInfo = () => {
	infoPopup.value?.open();
}
// 关闭info弹窗
const clickInfoClose = () => {
	infoPopup.value?.close();
}

// 显示弹层 方便测试
// onMounted(() => {
// 	scorePopup.value?.open();
// })

// 打开评分弹窗
const clickScore = () => {
	if (currentInfo.value.userScore) {
		isScore.value = true;
		userScore.value = currentInfo.value.userScore;
	}
	scorePopup.value?.open();
}
// 关闭评分弹窗
const clickScoreClose = () => {
	scorePopup.value?.close();
	userScore.value = 0;
	isScore.value = false;
}

// 遮罩层状态
const maskChange = () => {
	maskState.value = !maskState.value;
}
// 确认提交评分
const submitScore = async () => {
	uni.showLoading({
		title: "加载中..."
	})
	let { classid, _id:wallId } = currentInfo.value;
	let res = await apiSetupScore({
		classid,
		wallId,
		userScore: userScore.value
	});
	// 成功获取数据后隐藏提示
	uni.hideLoading();
	// 从 storage 中读取数据
	if (res.errCode === 0) {
		uni.showToast({
			title: "评分成功",
			icon: "none"
		})
		classList.value[currentIndex.value].userScore = userScore.value;
		uni.setStorageSync("storeClassList", classList.value);
		clickScoreClose();
	}
}

//返回上一页
const goBack = () => {
	uni.navigateBack();
}

// 取出缓存数据
classList.value = storeClassList.map(item => {
	return {
		...item,
		picurl: item.smallPicurl.replace("_small.webp", ".jpg")
	}
})
// 辅助函数
function readImgsFun() {
	readedImgs.value.push(
		currentIndex.value <= 0 ? classList.value.length-1 : currentIndex.value-1, 
		currentIndex.value,
		currentIndex.value >= classList.value.length-1 ? 0 : currentIndex.value+1
	);
	readedImgs.value = [...new Set(readedImgs.value)];
}
// 页面跳转
onLoad((e) => {
	currentId.value = e.id; // 用id来找数组下标
	currentIndex.value = classList.value.findIndex(item => item._id === currentId.value);
	currentInfo.value = classList.value[currentIndex.value];
	readImgsFun();
	
})
// 跟新预览图的索引值
const swiperChange = (e) => {
	currentIndex.value = e.detail.current;
	currentInfo.value = classList.value[currentIndex.value];
	readImgsFun();
}


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

	.popHeader {  // 弹层的共有样式
		display: flex;
		justify-content: space-between;
		align-items: center;
		.title {
			color: $text-font-color-2;
			font-size: 26rpx;
			padding-left: 0rpx;
		}
		.close {
			// border: 1px solid red;
			padding: 6rpx;
		}
	}
	.infoPopup {
		background: #fff;
		padding: 30rpx;
		border-radius: 30rpx 30rpx 0 0;
		overflow: hidden;
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
	.scorePopup {
		background: #fff;
		border-radius: 20rpx;
		width: 70vw;
		padding: 30rpx;
		.content {
			padding: 30rpx 0;
			display: flex;
			align-items: center;
			justify-content: center;
			.text {
				padding-left: 20rpx;
				color: #FFCA3E;
				width: 80rpx;
				// line-height: 1em;
				text-align: right;
			}
		}
		.footer {
			padding: 10rpx 0;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
}
</style>

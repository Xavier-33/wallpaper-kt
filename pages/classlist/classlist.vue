<template>
	<view class="class-list">
		<!-- 初次加载动画 -->
		<view class="loading-layout" v-show="!classList.length && !noData">
			<uni-load-more status="loading"></uni-load-more>
		</view>
		<!-- 内容区 -->
		<view class="content">
			<navigator
			  url="/pages/preview/preview" class="item" 
				v-for="item in classList" :key="item._id"
			>
				<image :src="item.smallPicurl" mode="aspectFill" class="img"></image>
			</navigator>
		</view>
		<!-- 触底加载动画 -->
		<view class="loading-layout" v-show="classList.length || noData">
			<uni-load-more :status="noData?'noMore':'loading'"></uni-load-more>
		</view>
		<!-- 小程序底部安全区 -->
		<view class="safe-area-inset-bottom"></view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { apiGetWallList } from '@/api/apis.js';
import { onLoad, onReachBottom } from '@dcloudio/uni-app';

// 分类列表数据
const classList = ref([]);
const noData = ref(false);

// 定义 apiGetWallList 参数
const queryParams = {
	pageNum: 1,
	pageSize: 12
};
// 触底更新防抖标识符
let reachBottomTimer = null;

onLoad((e) => {
	console.log(e)
	let { id=null, name=null } = e;
	
	queryParams.classid = id;
	// 修改导航栏标题
	uni.setNavigationBarTitle({
		title: name
	})
	
	// 执行获取分类列表方法
	getWallList(); // setup 比 onLoad 快，要放 onLoad 中执行，不然 id 取不到值
});

onReachBottom(() => {
	if (noData.value) return;
	if (reachBottomTimer) {
		clearTimeout(reachBottomTimer);
	}
	reachBottomTimer = setTimeout(() => {
		queryParams.pageNum++;
		getWallList();
		reachBottomTimer = null;
	}, 100);
});
// 获取分类列表网格数据
const getWallList = async () => {
	let res = await apiGetWallList(queryParams);
	classList.value = [...classList.value, ...res.data];
	if (queryParams.pageSize > res.data.length) noData.value = true;
	uni.setStorageSync("storeClassList", classList.value);
	// console.log(classList.value);
};


</script>

<style lang="scss" scoped>
.class-list {
	.content {
		display: grid;
		grid-template-columns: repeat(3,1fr);
		gap: 5rpx;
		padding: 5rpx;
		.item {
			height: 440rpx;
			.img {
				width: 100%;
				height: 100%;
				display: block;
			}
		}
	}
}
</style>

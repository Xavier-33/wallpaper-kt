<template>
	<view class="class-list">
		<view class="content">
			<navigator
			  url="/pages/preview/preview" class="item" 
				v-for="item in classList" :key="item._id"
			>
				<image :src="item.smallPicurl" mode="aspectFill" class="img"></image>
			</navigator>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { apiGetWallList } from '@/api/apis.js';
import { onLoad } from '@dcloudio/uni-app';

const classList = ref([]);
const queryParams = {};

onLoad((e) => {
	let { id=null, name=null } = e;
	
	queryParams.classid = id;
	console.log(id, name);
	uni.setNavigationBarTitle({
		title: name
	})
	
	// setup 比 onLoad 快，要放 onLoad 中执行，不然 id 取不到值
	getWallList(); 
})

const getWallList = async () => {
	let res = await apiGetWallList(queryParams);
	classList.value = res.data;
	console.log(res);
}


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

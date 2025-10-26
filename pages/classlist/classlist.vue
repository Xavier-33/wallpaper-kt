<template>
	<view class="class-list">
		<view class="content">
			<navigator url="/pages/preview/preview" class="item" v-for="item in 15">
				<image src="@/common/images/preview2.jpg" mode="aspectFill" class="img"></image>
			</navigator>
		</view>
	</view>
</template>

<script setup>

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

<template>
	<view class="layout">
		<button :disabled="isScore">不行</button>
	</view>
</template>

<script setup>
import {ref} from "vue";
const isScore = ref(true);
</script>

<style lang="scss" scoped>

</style>

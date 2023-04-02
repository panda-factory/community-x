<template>
	<view>
		<!-- 头部轮播图 -->
		<banner :list="carousel"></banner>
		<!-- 分类 -->
		<view class="cate-section">
			<view class="item" v-for="item in navList" :key="item._id" @click="navTo(item.link)">
				<image class="icon" :src="item.image"></image>
				<text>{{ item.name }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import banner from './components/banner.vue'
	export default {
		components: {
			banner
		},
		data() {
			return {
				navList: [{
						name: "a"
					},
					{
						name: "b"
					}
				], //导航列表
			}
		},
		methods: {

		}
	}
</script>

<style scoped lang="scss">
	/* 分类 */
	.cate-section {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		padding: 10rpx 16rpx;
		background: #fff;

		.item {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 20%;
			padding: 20rpx 0;
			font-size: 24rpx;
			color: #333;
		}

		.icon {
			width: 84rpx;
			height: 84rpx;
			margin-bottom: 14rpx;
			border-radius: 50%;
		}
	}
</style>
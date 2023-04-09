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
						name: '投票决策',
						link: '/pages/vote/vote'
					}
				], //导航列表
				carousel: [], // 轮播图表
			}
		},
		methods: {
			/**
			 * navigatorTo跳转页面
			 * @param {String} url
			 * @param {Object} options
			 * @param {Boolean} options.login 是否检测登录  
			 */
			navTo(url, options = {}) {
				uni.navigateTo({
					url: url
				})
			}
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
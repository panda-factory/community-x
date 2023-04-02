<template>
	<view>
		<!-- 02. 轮播区 -->
		<view v-if="swiperDatas && swiperDatas.length > 0" class="swiper-area margin-lr-sm border-radius pos-r">
			<!-- 轮播组件 -->
			<swiper class="swiper w-full" :autoplay="autoplay" indicator-dots indicator-color="#f7f7f7" indicator-active-color="#ff6a6c"
				previous-margin="30px" next-margin="30px" circular
				:current="swiperIdx" @change="swiperChange">
				<swiper-item v-for="(item, idx) in swiperDatas" :key="idx" class="swiper-item wh-full box-sizing-b">
					<view class="wh-full animated-all" :style="{ 'transform': `scale(${swiperIdx == idx ? 1 : 0.93})` }" @click.stop="topage(item)">
						<image class="border-radius wh-full" mode="aspectFill" lazy-load :src="item.img" />
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>

<template>
	<view class="mix-page-header" >
		<view 
			class="content row" 
			:style="{
				paddingRight: headerPaddingRight + 'px',
				paddingTop: statusBarHeight + 'px',
				height: navigationBarHeight + statusBarHeight + 'px'
			}"
		>
			<view class="btn center" @click="navTo('/pages/notice/notice')">
				<text class="mix-icon icon-xiaoxi"></text>
				<view class="msg"></view>
			</view>
			<view 
				class="search-wrap center"
				:style="{height: customHeight + 'px'}" 
				@click="navTo('/pages/search/search')"
			>
				<text class="mix-icon icon-sousuo"></text>
				<text>输入关键字搜索</text>
			</view>
			<!-- #ifndef MP -->
			<view class="btn center" @click="scanCode">
				<text class="mix-icon icon-saoma"></text>
			</view>
			<!-- #endif -->
		</view>
		<!-- 占位栏 -->
		<view v-if="showFillView" :style="[{minHeight: navigationBarHeight+statusBarHeight+'px'}]"></view>
	</view>
</template>

<script>
	export default {
		name: 'HomePageHeader',
		data() {
			return {
				
			};
		},
		props: {
			//顶部是否占位
			showFillView: {
				type: Boolean,
				default: true
			}
		},
		computed: {
			statusBarHeight(){
				return this.systemInfo.statusBarHeight
			},
			navigationBarHeight(){
				return this.systemInfo.navigationBarHeight;
			},
			customWidth(){
				return this.systemInfo.custom.width;
			},
			customHeight(){
				return this.systemInfo.custom.height;
			},
			//小程序右侧需要留出气泡空间
			headerPaddingRight(){
				// #ifndef MP
				return 0;
				// #endif
				// #ifdef MP
				return this.customWidth + 20;
				// #endif
			},
		},
		methods: {
			scanCode(){
				uni.scanCode({
					success: res=> {
						const result = res.result;
						if(typeof result === 'string'){
							uni.navigateTo({
								url: '/pages/public/web-view?url=' + result
							})
							return;
						}
						//这里处理自定义逻辑
						
						
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.content{
		position: fixed;
		left: 0;
		top: 0;
		z-index: 95;
		width: 100%;
		background-color: #fff;
	}
	.btn{
		width: 44px;
		height: 40px;
		padding: 5px 12px;
		position: relative;
		
		.mix-icon{
			font-size: 20px;
			color: #333;
		}
		.msg{
			position: absolute;
			right: 7px;
			top: 5px;
			width: 12px;
			height: 12px;
			background-color: $base-color;
			border: 2px solid #fff;
			border-radius: 100px;
			opacity: 0;
			
			&.show{
				opacity: 1;
			}
		}
	}
	.search-wrap{
		flex: 1;
		font-size: 14px;
		color: #999;
		border-radius: 100px;
		background-color: #f2f2f2;
		
		.icon-sousuo{
			margin-right: 6px;
			font-size: 18px;
			color: #999;
		}
	}
</style>

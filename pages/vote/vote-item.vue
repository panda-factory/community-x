<template>
	<view class="vote-item">
			<uni-icons custom-prefix="iconfont" type="cx-icon-ticket" size="24px" color="#007aff"></uni-icons>
		<text class="info-title">{{voteContent.title}}</text>
		<view class="vote-info flex-row" style="flex-direction: row;">
			<uni-icons type="staff-filled" color="#007aff"></uni-icons>
			<text class="info-text">{{voteContent.voteCount}}人投票</text>
		</view>
		<view class="vote-info flex-row" style="flex-direction: row;">
			<uni-icons custom-prefix="iconfont" type="cx-icon-time" color="#007aff"></uni-icons>
			<text class="info-text">时间：{{voteContent.dateTime}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			voteContent: {
				type: Object,
				default: function(e) {
					return {
						title: '',
						voteCount: 0,
						dateTime: ''
					}
				}
			}
		},
		methods: {}
	}
</script>

<style>
	.flex-row {
		flex-direction: row;
	}

	.vote-info {
		flex-direction: row;
		align-items: center;
	}

	.info-text {
		padding-left: 4px;
		margin-right: 20rpx;
		color: #999999;
		font-size: 24rpx;
	}

	.info-title {
		flex: 1;
		margin-top: 6rpx;
		margin-left: 6rpx;
		line-height: 40rpx;
		lines: 3;
		text-overflow: ellipsis;
		font-size: 34rpx;
		color: #555555;
	}
	.vote-item {
		position: relative;
		flex: 1;
		flex-direction: column;
		border-bottom-width: 1rpx;
		border-bottom-style: solid;
		border-bottom-color: #ebebeb;
		padding: 20rpx 30rpx 21rpx 30rpx;
	}
</style>
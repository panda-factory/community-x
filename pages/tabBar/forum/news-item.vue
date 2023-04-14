<template>
    <view class="media-item view">
        <!-- 标题 -->
        <view class="view">
            <text class="media-title">{{options.title}}</text>
            <view v-if="options.imageUrl" class="image-section flex-row" :style="{flexDirection: 'row' }">
                <image class="image-list" v-if="options.imageUrl" :src="options.imageUrl"></image> <text
                    class="info-text">{{options.datetime}}</text>
            </view>
        </view>
        <!-- 注脚 -->
        <view class="media-foot flex-row" style="flex-direction: row;">
            <view class="media-info flex-row" style="flex-direction: row;">
                <text class="info-text">{{options.source}}</text>
                <text class="info-text">{{options.comment_count}}条评论</text>
                <text class="info-text">{{options.datetime}}</text>
            </view>
        </view>
        <!-- 分隔线 -->
		<view class="media-item-line" style="position: absolute;"></view>
    </view>
</template>

<script>
    export default {
        props: {
            options: {
                type: Object,
                default: function(e) {
                    return {
                        // title:
                        // imageUrl:
                    }
                }
            }
        },
        methods: {}
    }
</script>

<style>
    .view {
        flex-direction: column;
    }

    .media-item {
        position: relative;
        flex: 1;
        flex-direction: column;
        /* border-bottom-width: 1rpx;
		border-bottom-style: solid;
		border-bottom-color: #ebebeb; */
        padding: 20rpx 30rpx 21rpx 30rpx;
    }

	.media-item-line {
		position: absolute;
		left: 30rpx;
		right: 30rpx;
		bottom: 0;
		height: 1rpx;
		background-color: #ebebeb;
	}
    .media-title {
        flex: 1;
    }

    .media-title {
        lines: 3;
        text-overflow: ellipsis;
        font-size: 30rpx;
        color: #555555;
    }

    .image-section {
        margin-top: 20rpx;
        flex-direction: row;
        justify-content: space-between;
    }

    .image-list {
        width: 225rpx;
        height: 146rpx;
    }

    .media-foot {
        margin-top: 25rpx;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    .flex-row {
        flex-direction: row;
    }

    .media-info {
        flex-direction: row;
        align-items: center;
    }

    .info-text {
        margin-right: 20rpx;
        color: #999999;
        font-size: 24rpx;
    }
</style>
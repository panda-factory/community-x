<template>
    <view class="media-item view">
        <uni-list :border="false">
           <uni-list-item title="作者" :note="options.dateTime"
           					thumb="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
           					thumb-size="sm"/>
        </uni-list>
        <!-- 标题 -->
        <view class="view">
            <text class="media-title">{{options.title}}</text>
            <view v-if="options.imageUrls && options.imageUrls[0]" class="image-section flex-row"
                :style="{flexDirection: 'row' }">
                <image class="image-list" v-if="options.imageUrls[0]" :src="options.imageUrls[0]"></image> <text
                    class="info-text">{{options.datetime}}</text>
            </view>
        </view>
        <!-- 分隔线 -->
        <view class="media-item-line"></view>
        <!-- 注脚 -->
        <view class="media-foot flex-row">
            <view class="media-foot-ceil">
                <uni-icons type="hand-up" size="24" color="#888888"></uni-icons>
                <text class="info-text">{{options.likeCount}}</text>
            </view>
            <view class="media-foot-ceil">
                <uni-icons type="chat" size="24" color="#888888"></uni-icons>
                <text class="info-text">{{options.commentCount}}</text>
            </view>
            <view class="media-foot-ceil">
                <uni-icons type="redo" size="24" color="#888888"></uni-icons>
                <text class="info-text">{{options.forwardCount}}</text>
            </view>
        </view>
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
                        // imageUrls:
                        // dateTime: 
                        // forwardCount: 100, 转发数
                        // commentCount: 50,  评论数
                        // likeCount: 200     点赞数

                    }
                }
            }
        },
        data() {
            return {
            }
        },
        methods: {},
        created() {
        }
    }
</script>

<style>
    .view {
        flex-direction: column;
        background-color: #ffffff;
    }

    .media-item {
        position: relative;
        flex: 1;
        flex-direction: column;
        padding: 20rpx 30rpx 21rpx 30rpx;
    }

    .media-item-line {
        left: 30rpx;
        right: 30rpx;
        bottom: 0;
        height: 1rpx;
        background-color: #eeeeee;
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
        display: flex;
        margin-top: 25rpx;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    .media-foot-ceil {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
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
        color: #888888;
        font-size: 24rpx;
    }
</style>
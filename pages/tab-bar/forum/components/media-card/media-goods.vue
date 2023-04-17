<template>
    <view class="container">
        <media-tmpl padding="0" spacing="0">
            <template v-slot:cover>
                <view class="custom-cover">
                    <image class="cover-image" mode="aspectFill" :src="options.imageUrls && options.imageUrls[0]">
                    </image>
                    <view class="cover-content">
                        <text class="uni-subtitle uni-white">{{options.title}}</text>
                    </view>
                </view>
            </template>
        </media-tmpl>
    </view>
</template>

<script>
    import mediaTmpl from './media-tmpl.vue';

    export default {
        name: 'MediaCard',
        components: {
            mediaTmpl,
        },
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
        methods: {}
    }
</script>

<style lang="scss">
    .container {
        overflow: hidden;
    }

	.custom-cover {
		flex: 1;
		flex-direction: row;
		position: relative;
	}

	.cover-image {
		flex: 1;
		height: 150px;
	}

	.cover-content {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 40px;
		background-color: rgba($color: #000000, $alpha: 0.4);
		display: flex;
		flex-direction: row;
		align-items: center;
		padding-left: 15px;
		font-size: 14px;
		color: #fff;
	}
</style>
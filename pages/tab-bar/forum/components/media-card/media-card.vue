<template>
    <view class="container">
        <media-tmpl :title="options.nickname" :sub-title="options.dateTime"
            :cover="options.imageUrls && options.imageUrls[0]"
            :thumbnail="options.avatar_file.url"
            @click="onClick">
            <text class="uni-body">{{options.title}}</text>
            <view slot="actions" class="card-actions" @click.stop>
                <view class="card-actions-item" @click="actionsClick('点赞')">
                    <uni-icons type="heart" size="18" color="#999"></uni-icons>
                    <text class="card-actions-item-text">{{options.likeCount}}</text>
                </view>
                <view class="card-actions-item" @click="actionsClick('评论')">
                    <uni-icons type="chatbubble" size="18" color="#999"></uni-icons>
                    <text class="card-actions-item-text">{{options.commentCount}}</text>
                </view>
                <view class="card-actions-item" @click="actionsClick('分享')">
                    <uni-icons type="redo" size="18" color="#999"></uni-icons>
                    <text class="card-actions-item-text">{{options.forwardCount}}</text>
                </view>
            </view>
        </media-tmpl>
    </view>
</template>

<script>
    import mediaTmpl from './media-tmpl.vue';
    let cloudPost = uniCloud.importObject('post');

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
        methods: {
            onClick: function() {
                console.log('gzx onClick: ')
                this.goDetail();
            },
            actionsClick(action) {
                console.log('gzx actionsClick: ' + this.options._id)
                uni.showToast({
                    title: action,
                    icon: 'none'
                });
                if (action === '点赞') {
                    cloudPost.addLike(this.options._id);
                }
            },
            goDetail: function() {
                console.log('gzx goDetail')
                uni.navigateTo({
                    url: './detail/detail?data=' + encodeURIComponent(JSON.stringify(this.options))
                });
            },
        }
    }
</script>

<style lang="scss">
    .container {
        overflow: hidden;
    }

    .card-actions {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        height: 45px;
        border-top: 1px #eee solid;

        .card-actions-item {
            display: flex;
            flex-direction: row;
            align-items: center;

            .card-actions-item-text {
                font-size: 12px;
                color: #666;
                margin-left: 5px;
            }
        }
    }
</style>
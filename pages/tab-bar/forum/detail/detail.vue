<template>
    <view class="container">
        <scroll-view scroll-y style="height: calc(100vh - 100rpx);">
            <!-- 图片 -->
            <swiper class="swiper-box" indicator-dots="true">
                <swiper-item  class="swiper-item" v-for="(imageUrl, index) in imageUrls" :key="index">
                    <view class="swiper-item">
                        <image :src="imageUrl" mode="aspectFit"></image>
                    </view>
                </swiper-item>
            </swiper>

            <!-- 标题 -->
            <view>
                <uni-title type="h2" :title="title"></uni-title>
            </view>
            
            <cx-avatar></cx-avatar>
            <!-- 评论区 -->
            <view>
            <comment-list :commenteds="commenteds"></comment-list>
            </view>
        </scroll-view>

        <view class="input-box">
            <uni-easyinput class="input" suffixIcon="paperplane" v-model="commentInput" placeholder="评论"
                @iconClick="sendComment" />
        </view>
    </view>
</template>

<script>
    import commentList from '@/pages/tab-bar/forum/components/comment/comment-list.vue'
    import cxAvatar from '@/components/avatar/avatar.vue'
    let cloudPost = uniCloud.importObject('post');
    export default {
        components: {
            commentList,
            cxAvatar
        },
        data() {
            return {
                inputParams: '',
                bannerId: '',
                imageUrls: [],
                title: '',
                commentInput: '',
                commenteds: []
            }
        },
        onLoad(options) {
            console.log('gzx detail onLoad: ' + options.data);
            this.inputParams = options.data;
            let data = JSON.parse(decodeURIComponent(options.data));
            this.bannerId = data._id;
            this.imageUrls = data.imageUrls;
            this.title = data.title;

            cloudPost.getDetail(this.bannerId).then(result => {
                console.log('gzx detail onLoad cloudPost.getDetail: ' + JSON.stringify(result));
                this.commenteds = result.commenteds;
            })
        },
        onShareAppMessage() {
            return {
                title: this.title,
                path: '/pages/tab-bar/forum/detail/detail?data=' + this.inputParams,
                imageUrl: this.imageUrls[0]
            }
        },
        methods: {
            async sendComment() {
                let commentBanner = {
                    postId: '6443c5ece1a35c371bbfcecb', // this.bannerId,
                    userId: '6437ff7de1a35cf99fb7c289', // getApp().globalData.userInfo._id,
                    comment: this.commentInput,
                    commentedId: -1
                }

                console.log('gzx sendComment: ' + JSON.stringify(commentBanner))
                let result = await cloudPost.submitComment(commentBanner);
                console.log('gzx sendComment result: ' + JSON.stringify(result))
                this.commenteds = result;
            }
        }
    }
</script>

<style lang="scss">
    .container {
        display: flex;
        flex-direction: column;
        // height: 100vh;
    }

    .swiper-box {
        // height: auto;

        .swiper-item {
            /* #ifndef APP-NVUE */
            display: flex;
            /* #endif */
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            color: #fff;
        }
    }

    .input-box {
        position: fixed;
        bottom: 0;
        align-items: center;
        width: 100%;
        padding: 10px;
        background-color: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        border-radius: 10px;

        .input {
            width: calc(100% - 20px);
            border-radius: 10px;
        }
    }
</style>
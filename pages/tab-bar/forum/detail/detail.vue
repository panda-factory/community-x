<template>
    <view class="container">
        <view class="article-wrapper">
            <view class="article-author">
                <cx-avatar></cx-avatar>
            </view>
            <!-- 图片 -->
            <swiper class="swiper-box" indicator-dots="true">
                <swiper-item class="swiper-item" v-for="(imageUrl, index) in imageUrls" :key="index">
                    <view class="swiper-item-img">
                        <image :src="imageUrl" mode="aspectFit"></image>
                    </view>
                </swiper-item>
            </swiper>

            <!-- 标题 -->
            <view class="article-content">
                <uni-title type="h1" :title="title"></uni-title>
                <text>正文</text>
            </view>
        </view>

        <!-- 评论区 -->
        <view class="comment-wrapper">
            <scroll-view class="comment-scroll" scroll-y>
                <view>
                    <comment-list :commenteds="commenteds"></comment-list>
                </view>
            </scroll-view>
        </view>


        <view class="input-bottom">
            <view class="bottom-wrapper">
                <uni-easyinput class="input" suffixIcon="paperplane" v-model="commentInput" placeholder="评论"
                    @iconClick="sendComment" />

                <uni-icons type="heart"></uni-icons>
            </view>
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

        .article-wrapper {
            background-color: #fff;

            .article-author {}

            .swiper-box {
                height: 300px;

                .swiper-item {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    height: 250px;

                    .swiper-item-img {}
                }
            }

            .article-content {
                padding: 0px 24px;
            }
        }

        .comment-wrapper {

            .comment-scroll {
                height: calc(100vh - 44px); // input-bottom 高度44
            }
        }

        .input-bottom {
            display: flex;
            position: fixed;
            bottom: 0;
            height: 44px;

            .bottom-wrapper {
                display: flex;
                align-items: center;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                border-radius: 10px;
            }
        }
    }
</style>
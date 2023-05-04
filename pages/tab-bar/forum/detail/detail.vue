<template>
    <view class="container">
        <view class="article-wrapper">
            <view v-if="article.authorInfo" class="article-author">
                <cx-avatar :nickname="article.authorInfo.nickname"
                    :avatarUrl="article.authorInfo.avatar_file.url"></cx-avatar>
            </view>
            <!-- 图片 -->
            <swiper class="swiper-box" indicator-dots="true">
                <swiper-item class="swiper-item" v-for="(imageUrl, index) in imageUrls" :key="index">
                    <view class="swiper-item-img">
                        <image :src="imageUrl" mode="aspectFit"></image>
                    </view>
                </swiper-item>
            </swiper>

            <view class="article-content">
                <!-- 标题 -->
                <uni-title type="h1" :title="title"></uni-title>
                <text>正文</text>
                <view class="article-foot">
                    <text class="cx-foot-node">
                        {{article.dateTime}}
                    </text>
                </view>
            </view>
        </view>

        <!-- 评论区 -->
        <view class="comment-wrapper">
            <scroll-view class="comment-scroll" scroll-y>
                <uni-section title="评论" type="line">
                    <uni-list v-if="commenteds.length!==0">
                        <block v-for="(commented, index) in commenteds" :key="index">
                            <uni-list-item>
                                <template v-slot:header>
                                    <cx-avatar>
                                        <view style="display: flex; flex-direction: column;">
                                            <text class="cx-foot-node">{{ commented.comment.nickname }}</text>
                                            <text class="cx-desc-text">{{ commented.comment.comment }}</text>
                                        </view>
                                    </cx-avatar>
                                </template>

                            </uni-list-item>
                        </block>

                    </uni-list>
                    <view v-else class="comment-placeholder">
                        <text class="cx-foot-node">评论点什么吧</text>
                    </view>
                </uni-section>
            </scroll-view>
        </view>


        <view class="bottom-wrapper">
            <view class="input-bottom">
                <uni-easyinput class="input" suffixIcon="paperplane" v-model="commentInput" placeholder="评论"
                    @iconClick="sendComment" />

                <uni-icons type="heart" size="25px"></uni-icons>
            </view>
        </view>
    </view>
</template>

<script>
    import commentList from '@/pages/tab-bar/forum/components/comment/comment-list.vue'
    import cxAvatar from '@/components/avatar/avatar.vue'
    import userInfoMixin from '@/common/mixin/user-info.js'
    let cloudPost = uniCloud.importObject('post');
    export default {
        components: {
            commentList,
            cxAvatar
        },
        mixins: [userInfoMixin],
        data() {
            return {
                inputParams: '',
                bannerId: '',
                imageUrls: [],
                title: '',
                commentInput: '',
                commenteds: [],
                article: {
                    authorInfo: undefined,
                    dateTime: ''
                }
            }
        },
        onLoad(options) {
            console.log('gzx detail onLoad: ' + options.data);
            if (options.data) {
                this.inputParams = options.data;
                let data = JSON.parse(decodeURIComponent(options.data));
                this.bannerId = data._id;
                this.imageUrls = data.imageUrls;
                this.title = data.title;

                cloudPost.getDetail(this.bannerId).then(result => {
                    console.log('gzx detail onLoad cloudPost.getDetail: ' + JSON.stringify(result));
                    this.commenteds = result.commenteds;
                    this.article.dateTime = result.dateTime;
                    this.article.authorInfo = result.authorInfo;
                })
            }
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
                console.log('gzx begin sendComment')
                let commentBanner = {
                    postId: this.bannerId,
                    userId: this.userInfo._id,
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
                padding: 0 16px;
            }

            .article-foot {
                padding: 16px 0;
            }
        }

        .comment-wrapper {
            margin-top: 4px;
            background-color: #fff;

            .comment-scroll {
                height: calc(100vh - 44px); // input-bottom 高度44

                .comment-placeholder {
                    display: flex;
                    min-height: 500px;
                    width: 100%;
                    align-items: center;
                    justify-content: center;

                }
            }

        }

        .bottom-wrapper {
            display: flex;
            position: fixed;
            bottom: 0;
            height: 44px;

            .input-bottom {
                display: flex;
                align-items: center;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                border-radius: 10px;
            }
        }
    }
</style>
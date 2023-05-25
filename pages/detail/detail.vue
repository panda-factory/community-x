<template>
    <view class="container">
        <view class="article-wrapper">
            <view v-if="article.authorInfo" class="article-author">
                <cx-avatar :nickname="article.authorInfo.nickname"
                    :avatarUrl='article.authorInfo.avatar_file ? article.authorInfo.avatar_file.url : ""'></cx-avatar>
            </view>
            <!-- 图片 -->
            <swiper class="swiper-box" indicator-dots="true">
                <swiper-item class="swiper-item" v-for="(imageUrl, index) in article.thumbs" :key="index">
                    <view class="swiper-item-img">
                        <image :src="imageUrl" mode="aspectFit"></image>
                    </view>
                </swiper-item>
            </swiper>

            <view class="article-content">
                <!-- 标题 -->
                <uni-title type="h1" :title="article.title"></uni-title>
                <text>{{ article.content }} </text>
                <view class="article-foot">
                    <text class="cx-foot-node">
                        {{article.last_modify_date}}
                    </text>
                </view>
            </view>
        </view>

        <!-- 评论区 -->
        <view class="comment-wrapper">
            <scroll-view class="comment-scroll" scroll-y>
                <uni-section title="评论" type="line">
                    <uni-list v-if="comments.length!==0">
                        <block v-for="(comment, index) in comments" :key="index">
                            <uni-list-item :clickable="true" @click="replyComment(comment)">
                                <template v-slot:header>
                                    <view>
                                        <cx-avatar>
                                            <view style="display: flex; flex-direction: column;">
                                                <text class="cx-foot-node">{{ comment.authorInfo.nickname }}</text>
                                                <text class="cx-desc-text">{{ comment.comment_content }}</text>
                                            </view>
                                        </cx-avatar>
                                        <uni-list v-for='(reply, index1) in comment.replys' :key='index1'
                                            style="margin-left: 40px;">
                                            <uni-list-item>
                                                <template v-slot:header>
                                                    <cx-avatar avatar-size="small">
                                                        <view style="display: flex; flex-direction: column;">
                                                            <text
                                                                class="cx-foot-node">{{ reply.authorInfo.nickname }}</text>
                                                            <text
                                                                class="cx-desc-text">{{ reply.comment_content }}</text>
                                                        </view>
                                                    </cx-avatar>
                                                </template>
                                            </uni-list-item>
                                        </uni-list>
                                    </view>
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
                <uni-easyinput class="input" suffixIcon="paperplane" v-model="commentInput" :placeholder="placeholder"
                    @iconClick="submitComment" @blur="onBlur" :focus="showInput" />
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
                articleId: '',
                bannerId: '',
                imageUrls: [],
                title: '',
                commentInput: '',
                comments: [],
                article: {},
                showInput: false,
                placeholder: '说点什么',
                replyCommentId: '',
                replyUserId: '',
                submitting: false
            }
        },
        onLoad(options) {
            console.log('gzx detail onLoad: ' + options.data);
            if (options.data) {
                this.articleId = options.data;
                let articleId = decodeURIComponent(options.data);

                cloudPost.getDetail(articleId).then(result => {
                    console.log('gzx detail onLoad cloudPost.getDetail: ' + JSON.stringify(result));
                    this.article = result.article;
                    this.comments = result.comments;
                })
            }
        },
        onShareAppMessage() {
            return {
                title: this.title,
                path: '/pages/tab-bar/forum/detail/detail?data=' + this.articleId,
                imageUrl: this.imageUrls[0]
            }
        },
        methods: {
            submitComment() {
                console.log('gzx begin submitComment : ' + JSON.stringify(this.userInfo))

                this.submitting = true;
                const db = uniCloud.database();
                console.log('gzx submitComment this.replyUserId: ' + this.replyUserId)
                const comment = {
                    article_id: this.article._id,
                    user_id: this.userInfo._id,
                    comment_content: this.commentInput,
                    like_count: 0,
                    comment_type: !this.replyCommentId ? 0 : 1,
                    reply_user_id: !this.replyUserId ? "invalid" : this.replyUserId,
                    reply_comment_id: !this.replyCommentId ? "invalid" : this.replyCommentId
                };
                db.collection('cx-news-comments').add(comment).then((res) => {
                    // res 为数据库查询结果
                    console.log('submitComment res: ' + JSON.stringify(res))
                    cloudPost.getDetail(this.article._id).then(result => {
                        this.comments = result.comments;
                        console.log('gzx cloudPost.getDetail: ' + JSON.stringify(
                            this.comments));
                    })
                }).catch((err) => {
                    console.error(err.message)
                }).finally(() => {
                    this.commentInput = '';
                    this.showInput = false;
                    this.placeholder = '说点什么';
                    this.replyCommentId = '';
                    this.replyUserId = '';
                    this.submitting = false;
                })
            },
            replyComment(comment) {
                console.log('gzx replyComment: ' + JSON.stringify(comment))
                cloudPost.getNicknameFromCommentId(comment._id).then(result => {
                    this.showInput = true;
                    this.placeholder = '回复 @' + result;
                    this.replyCommentId = comment._id;
                    this.replyUserId = comment.user_id;
                }).finally(() => {
                    console.log('gzx replyComment this.replyUserId: ' + this.replyUserId)
                })
            },
            onBlur() {
                setTimeout(() => {
                    this.clearInput()
                    }, 0);
            },
            clearInput() {
                if (!this.submitting) {
                    this.commentInput = '';
                    this.showInput = false;
                    this.placeholder = '说点什么';
                    this.replyCommentId = '';
                    this.replyUserId = '';
                }
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
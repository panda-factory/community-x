<template>
    <view class="container">
        <!-- 标题 -->
        <view>
            <text>{{title}}</text>
        </view>
        <!-- 图片 -->
        <uni-swiper-dot>
            <swiper>
                <swiper-item v-for="(imageUrl, index) in imageUrls" :key="index">
                    <image :src="imageUrl"></image>
                </swiper-item>
            </swiper>
        </uni-swiper-dot>
        <comment-list :commenteds="commenteds"></comment-list>

        <view class="input-box">
            <uni-easyinput suffixIcon="paperplane" v-model="commentInput" placeholder="评论" @iconClick="sendComment" />
        </view>
    </view>
</template>

<script>
    import commentList from '@/pages/tab-bar/forum/components/comment/comment-list.vue'
    let cloudPost = uniCloud.importObject('post');
    export default {
        components: {
            commentList
        },
        data() {
            return {
                inputParams: '',
                bannerId: '',
                imageUrls: [],
                title: '',
                commentInput: '',
                commenteds: [{
                    comment: {
                        userId: '',
                        avatar: '',
                        nickname: 'nickn111ame',
                        comment: 'comment'
                    }
                }],
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

    .input-box {
        display: flex;
        height: 60px;
        align-items: center;
        padding: 10px;
        background-color: #fff;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);

        .input {
            flex: 1;
            height: 40px;
            margin-right: 10px;
            padding: 0 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
    }
</style>
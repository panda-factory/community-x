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
        <comment-list></comment-list>

        <view class="input-box">
            <uni-easyinput suffixIcon="paperplane" v-model="commentInput" placeholder="评论" @iconClick="sendComment"/>
        </view>
    </view>
</template>

<script>
    import commentList from '@/pages/tab-bar/forum/components/comment/comment-list.vue'
    export default {
        components: {
            commentList
        },
        data() {
            return {
                bannerId: '',
                imageUrls: [],
                title: '',
                commentInput: ''
            }
        },
        onLoad(options) {
            console.log('gzx detail onLoad: ' + options.data);
            let data = JSON.parse(options.data);
            this.bannerId = data._id;
            this.imageUrls = data.imageUrls;
            this.title = data.title;
        },
        methods: {
            sendComment: function() {
                let commentBanner = {
                    bannerId: this.bannerId,
                    userId: getApp().globalData.userInfo._id,
                    value: this.commentInput
                }

                console.log('gzx sendComment: ' + JSON.stringify(commentBanner))
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
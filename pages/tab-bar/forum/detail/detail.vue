<template>
    <view>
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
                imageUrls: [],
                title: ''
            }
        },
        onLoad(options) {
            console.log('gzx detail onLoad: ' + options.data);
            let data = JSON.parse(options.data);
            this.imageUrls = data.imageUrls;
            this.title = data.title
        },
        methods: {
        }
    }
</script>

<style>

</style>
<template>
    <view class="container">
            <uni-list v-for="(commented, index) in commenteds" :key="index">
                <comment-item :title="commented.comment.nickname" :note="commented.comment.comment" showArrow
                    :thumb="commented.comment.avatar_file.url"
                    thumb-size="base" rightText="默认" />
            </uni-list>
    </view>
</template>

<script>
    import commentItem from '@/pages/tab-bar/forum/components/comment/comment-item.vue'

    export default {
        components: {
            commentItem
        },
        props: {
            commenteds: {
                type: Array,
            }
        },
        data() {
            return {
                cover: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/094a9dc0-50c0-11eb-b680-7980c8a877b8.jpg',
                avatar: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png',
                extraIcon: {
                    color: '#4cd964',
                    size: '22',
                    type: 'gear-filled'
                }
            };
        },
        methods: {
            onClick(e) {
                console.log('执行click事件', e.data)
                uni.showToast({
                    title: '点击反馈'
                });
            },
            switchChange(e) {
                uni.showToast({
                    title: 'change:' + e.value,
                    icon: 'none'
                });
            }
        }
    };
</script>

<style lang="scss">
    .slot-box {
        /* #ifndef APP-NVUE */
        display: flex;
        /* #endif */
        flex-direction: row;
        align-items: center;
    }

    .slot-image {
        /* #ifndef APP-NVUE */
        display: block;
        /* #endif */
        margin-right: 10px;
        width: 30px;
        height: 30px;
    }

    .slot-text {
        flex: 1;
        font-size: 14px;
        color: #4cd964;
        margin-right: 10px;
    }
</style>
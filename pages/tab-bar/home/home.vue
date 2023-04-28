<template>
    <view>
        <!-- 头部轮播图 -->
        <banner :list="carousel"></banner>
        <!-- 分类 -->
        <view class="cate-section">
            <view class="item" v-for="(item, index) in navList" @click="navTo(item.link)" :key="index">
                <image class="icon" :src="item.image"></image>
                <text>{{ item.name }}</text>
            </view>
        </view>
    </view>
</template>

<script>
    import banner from './components/banner.vue'
    import {
        store,
        mutations
    } from '@/uni_modules/uni-id-pages/common/store.js'
    export default {
        components: {
            banner
        },
        data() {
            return {
                navList: [{
                    name: '投票决策',
                    link: '/pages/vote/vote',
                    image: '/static/cx-images/vote.png'
                }, {
                    name: '物业报修',
                    link: '/pages/vote/vote',
                    image: '/static/cx-images/repair.png'
                }], //导航列表
                carousel: [], // 轮播图表
            }
        },
        methods: {
            /**
             * navigatorTo跳转页面
             * @param {String} url
             * @param {Object} options
             * @param {Boolean} options.login 是否检测登录  
             */
            navTo(url, options = {}) {
                console.log('gzx navTo: ' + url)
                uni.navigateTo({
                    url: url
                })
            }
        },
        onInit() {
        },
        onShow() {
        },
        onReady() {
        }
    }
</script>

<style scoped lang="scss">
    /* 分类 */
    .cate-section {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        padding: 10rpx 16rpx;
        background: #fff;

        .item {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 20%;
            padding: 20rpx 0;
            font-size: 24rpx;
            color: #333;
        }

        .icon {
            width: 84rpx;
            height: 64rpx;
            margin-bottom: 14rpx;
        }
    }
</style>
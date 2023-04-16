<template>
    <view class="tabs">
        <scroll-view id="tab-bar" class="scroll-h" scroll-x="true" :show-scrollbar="false"
            :scroll-into-view="scrollInto">
            <view v-for="(tab,index) in tabBars" :key="tab.id" class="uni-tab-item" :id="tab.id" :data-current="index"
                @click="ontabtap">
                <text class="uni-tab-item-title"
                    :class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{tab.name}}</text>
            </view>
        </scroll-view>
        <swiper class="swiper-box" :current="tabIndex">
            <swiper-item class="swiper-item" style="height:100vh;">
                <scroll-view class="scroll-v" scroll-y>
                    <view class="media-wrapper" v-for="(newsItem,index) in newsList" @click="goDetail(newsItem)">
                        <media-item :options="newsItem"></media-item>
                    </view>
                </scroll-view>
            </swiper-item>
        </swiper>
    </view>
</template>

<script>
    import mediaItem from './news-item.vue';

    let cloudPost = uniCloud.importObject('post');
    // 缓存每页最多
    const MAX_CACHE_DATA = 100;
    // 缓存页签数量
    const MAX_CACHE_PAGE = 3;

    export default {
        components: {
            mediaItem
        },
        data() {
            return {
                newsList: [],
                tabIndex: 0,
                tabBars: [{
                    name: '热门',
                    id: 'guanzhu'
                }, {
                    name: '闲置',
                    id: 'tuijian'
                }, {
                    name: '团购',
                    id: 'redian'
                }, {
                    name: '本地',
                    id: 'bendi'
                }],
                scrollInto: "",
            }
        },
        onShow() {
            cloudPost.getTop().then((res) => {
                console.log(res)
                this.newsList = res.data
            })
        },
        methods: {
            goDetail: function(e) {
                console.log('gzx goDetail')
                let detail = e;
                uni.navigateTo({
                    url: './detail/detail?detailDate=' + encodeURIComponent(JSON.stringify(detail))
                });
            }
        }
    }
</script>

<style>
    page {
        width: 100%;
        min-height: 100%;
        display: flex;
    }

    .tabs {
        flex: 1;
        flex-direction: column;
        overflow: hidden;
    }

    .swiper-box {
        flex: 1;
        width: 100%;
        height: calc(100vh - 100rpx);
    }

    .swiper-item {
        flex: 1;
        flex-direction: row;
    }

    .uni-tab-item {
        /* #ifndef APP-PLUS */
        display: inline-block;
        /* #endif */
        flex-wrap: nowrap;
        padding-left: 34rpx;
        padding-right: 34rpx;
    }

    .uni-tab-item-title {
        color: #555;
        font-size: 30rpx;
        height: 80rpx;
        line-height: 80rpx;
        flex-wrap: nowrap;
        /* #ifndef APP-PLUS */
        white-space: nowrap;
        /* #endif */
    }

    .uni-tab-item-title-active {
        color: #007AFF;
    }

    .scroll-h {
        flex: 1;
        width: 100%;
        height: 100rpx;
        flex-direction: row;

    }

    .scroll-v {
        width: 100%;
        height: 100%;
        flex-direction: column;
    }

    .media-wrapper {
        margin-bottom: 20px;
    }
</style>
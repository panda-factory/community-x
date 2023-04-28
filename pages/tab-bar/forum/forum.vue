<template>
    <view class="container">
        <view class="tabs">
            <!-- <uni-icons class="tabbar" type="plus-filled" color="#007aff" size="30" @click="publish"></uni-icons> -->
            <uni-segmented-control class="tabbar-first" style="width: 200rpx;" :current="topTabIndex" :values="tabbars"
                style-type="text" />
            <uni-icons class="tabbar-last" type="plus-filled" color="#007aff" size="30" @click="publish"></uni-icons>
        </view>
        <scroll-view id="tab-bar" class="scroll-h" scroll-x="true" :show-scrollbar="false"
            :scroll-into-view="scrollInto">
            <view v-for="(tab,index) in category" :key="tab.id" class="uni-tab-item" :id="tab.id" :data-current="index"
                @click="ontabtap">
                <text class="uni-tab-item-title"
                    :class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{tab.name}}</text>
            </view>
        </scroll-view>


        <swiper class="swiper-box" :current="tabIndex" @change="onTabChange">
            <swiper-item class="swiper-item" style="height:100vh;" v-for="(tab,index1) in category" :key="index1">
                <scroll-view class="scroll-v" scroll-y>
                    <view class="media-wrapper" v-for="(newsItem,index2) in newsList" :key="index2">
                        <media-card :options="newsItem"> </media-card>
                    </view>
                </scroll-view>
            </swiper-item>
        </swiper>

    </view>
</template>

<script>
    import mediaCard from './components/media-card/media-card.vue';

    let cloudPost = uniCloud.importObject('post');

    // 缓存每页最多
    const MAX_CACHE_DATA = 100;
    // 缓存页签数量
    const MAX_CACHE_PAGE = 3;

    export default {
        components: {
            mediaCard
        },
        data() {
            return {
                newsList: [],
                tabbars: ['关注', '广场'],
                topTabIndex: 1,
                tabIndex: 0,
                category: [{
                    name: '邻居动态',
                    id: 'guanzhu'
                }, {
                    name: '话题讨论',
                    id: 'tuijian'
                }],
                scrollInto: "",
            }
        },
        onShow() {            
            if (getApp().globalData.loginStatus !== 'success') {
                console.log('gzx forum show 1: ')
                uni.navigateTo({
                    url: "/uni_modules/uni-id-pages/pages/login/login-withoutpwd"
                })
            }
            cloudPost.getTop().then((res) => {
                console.log(res)
                this.newsList = res.data
            })
        },
        methods: {
            onTabChange(e) {
                let index = e.target.current || e.detail.current;
                this.switchTab(index);
            },
            switchTab(index) {
                this.tabIndex = index;
            },
            publish: function() {
                uni.navigateTo({
                    url: '/pages/tab-bar/post/post',
                    complete(e) {
                        console.log('gzx complete')
                    },
                    fail(e) {
                        console.log('gzx fail: ' + JSON.stringify(e))
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
    page {
        width: 100%;
        min-height: 100%;
        display: flex;
    }

    .container {
        flex: 1;
        flex-direction: column;
        overflow: hidden;
    }

    .tabs {
        display: flex;
        justify-content: space-between;
        /* 两端对齐 */
        align-items: center;

        .tabbar-first {
            margin-left: 36%;
        }

        .tabbar-last {
            // margin-left: auto;
        }
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

    .media-wrapper {}
</style>
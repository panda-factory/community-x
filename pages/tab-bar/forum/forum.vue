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
                    <block v-for="(article,index3) in articleList" :key="index3">
                        <uni-card>
                            <template v-slot:title>
                                <cx-avatar :note="article.last_modify_date"></cx-avatar>
                            </template>
                            <image style="width: 100%;" :src="article.thumbs[0]"></image>
                            <text>{{ article.content }}</text>
                            <template v-slot:actions>
                                <view slot="actions" class="card-actions">
                                    <view class="card-actions-item" @click="actionsClick('分享')">
                                        <uni-icons type="redo" size="18" color="#999"></uni-icons>
                                        <text class="card-actions-item-text">分享</text>
                                    </view>
                                    <view class="card-actions-item" @click="actionsClick('点赞')">
                                        <uni-icons type="heart" size="18" color="#999"></uni-icons>
                                        <text class="card-actions-item-text">点赞</text>
                                    </view>
                                    <view class="card-actions-item" @click="actionsClick('评论')">
                                        <uni-icons type="chatbubble" size="18" color="#999"></uni-icons>
                                        <text class="card-actions-item-text">评论</text>
                                    </view>
                                </view>
                            </template>
                        </uni-card>
                    </block>
                </scroll-view>
            </swiper-item>
        </swiper>

    </view>
</template>

<script>
    import {
        getFormattedDate
    } from 'common/js/date';
    import cxAvatar from '@/components/avatar/avatar.vue'

    let cloudPost = uniCloud.importObject('post');

    // 缓存每页最多
    const MAX_CACHE_DATA = 100;
    // 缓存页签数量
    const MAX_CACHE_PAGE = 3;

    export default {
        components: {
            cxAvatar
        },
        data() {
            return {
                newsList: [],
                articleList: [],
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
            console.log('gzx forum show : ' + getApp().globalData.loginStatus)
            if (getApp().globalData.loginStatus !== 'success') {
                uni.navigateTo({
                    url: "/uni_modules/uni-id-pages/pages/login/login-withoutpwd"
                })
            }
            this.getNews();
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
            },
            getNews() {
                const db = uniCloud.database();
                db.collection('cx-news-articles').limit(10).get().then((dataPacket) => {
                    this.articleList = dataPacket.result.data;
                    this.articleList.forEach(item => {
                        item.publish_date = getFormattedDate(item.publish_date);
                        item.last_modify_date = getFormattedDate(item.last_modify_date);
                    })
                    console.log('gzx getNews: ' + JSON.stringify(this.articleList));
                }).catch((err) => {
                    console.error(err.message)
                });
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


    .card-actions {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        height: 45px;
        border-top: 1px #eee solid;

        .card-actions-item {
            display: flex;
            flex-direction: row;
            align-items: center;

            .card-actions-item-text {
                font-size: 12px;
                color: #666;
                margin-left: 5px;
            }
        }
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
</style>
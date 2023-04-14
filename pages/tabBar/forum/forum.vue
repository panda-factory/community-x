<template>
    <view>
        <scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false"
            :scroll-into-view="scrollInto">
            <view v-for="(tab,index) in tabBars" :key="tab.id" class="uni-tab-item" :id="tab.id" :data-current="index"
                @click="ontabtap">
                <text class="uni-tab-item-title"
                    :class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{tab.name}}</text>
            </view>
        </scroll-view>
        <view v-for="(newsItem,index) in newsList" @click="goDetail(newsItem)">
            <media-item :options="newsItem"></media-item>
        </view>
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
                newsList: [{
                    "datetime": "一天前",
                    "article_type": 1,
                    "title": "DCloud完成B2轮融资，uni-app震撼发布!",
                    "imageUrl": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b7c7f970-517d-11eb-97b7-0dc4655d6e68.jpg",
                    "source": "DCloud",
                    "comment_count": 11395
                }, {
                    "datetime": "一天前",
                    "article_type": 1,
                    "title": "DCloud完成B2轮融资，uni-app震撼发布!",
                    "imageUrl": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b7c7f970-517d-11eb-97b7-0dc4655d6e68.jpg",
                    "source": "DCloud",
                    "comment_count": 11395
                }, {
                    "datetime": "一天前",
                    "article_type": 1,
                    "title": "DCloud完成B2轮融资，uni-app震撼发布!",
                    "imageUrl": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b7c7f970-517d-11eb-97b7-0dc4655d6e68.jpg",
                    "source": "DCloud",
                    "comment_count": 11395
                }, {
                    "datetime": "40分钟前",
                    "article_type": 0,
                    "title": "uni-app行业峰会频频亮相，开发者反响热烈!",
                    "source": "DCloud",
                    "comment_count": 639
                }, {
                    "datetime": "40分钟前",
                    "article_type": 0,
                    "title": "uni-app行业峰会频频亮相，开发者反响热烈!",
                    "source": "DCloud",
                    "comment_count": 639
                }, {
                    "datetime": "40分钟前",
                    "article_type": 0,
                    "title": "uni-app行业峰会频频亮相，开发者反响热烈!",
                    "source": "DCloud",
                    "comment_count": 639
                }, ],
                tabIndex: 0,
                tabBars: [{
                    name: '关注',
                    id: 'guanzhu'
                }, {
                    name: '周边',
                    id: 'tuijian'
                }, {
                    name: '热点',
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
				// let detail = {
				// 	author_name: e.author_name,
				// 	cover: e.cover,
				// 	id: e.id,
				// 	post_id: e.post_id,
				// 	published_at: e.published_at,
				// 	title: e.title
				// };
                let detail = e;
				uni.navigateTo({
					url: './detail/detail?detailDate=' + encodeURIComponent(JSON.stringify(detail))
				});
			}
        }
    }
</script>

<style>
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
        width: 750rpx;
        /* #ifdef H5 */
        width: 100%;
        /* #endif */
        height: 80rpx;
        flex-direction: row;
        /* #ifndef APP-PLUS */
        white-space: nowrap;
        /* #endif */
        /* flex-wrap: nowrap; */
        /* border-color: #cccccc;
		border-bottom-style: solid;
		border-bottom-width: 1px; */
    }
</style>
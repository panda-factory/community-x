<template>
    <view class="container">

        <uni-search-bar @confirm="search" :focus="true" :placeholder="searchPlacehold" @blur="blur" @focus="focus"
            @input="input" @cancel="cancel" @clear="clear">
        </uni-search-bar>

        <view class="tag-view">
            <uni-tag text="百货" type="primary" />
            <uni-tag text="家电" type="primary" />
            <uni-tag text="家具" type="primary" />
        </view>
        <view class="row" v-for="(goods,index) in options" :key="index">
            <view class="col">
                <media-goods class="left" :options="goods" />
            </view>
            <view class="col">
                <media-goods class="right" :options="goods" />
            </view>
        </view>

    </view>
</template>

<script>
    import mediaGoods from '../forum/components/media-card/media-goods.vue';

    export default {
        components: {
            mediaGoods
        },
        data() {
            return {
                searchPlacehold: '飞机杯',
                options: [{
                    title: '测试',
                    imageUrls: [
                        'https://mp-d39adc1c-4ce7-4397-833e-f2247d112870.cdn.bspapp.com/cloudstorage/5f6a59dc-993c-4b58-808d-3796044319bd.PNG'
                    ]
                }, {
                    title: '测试',
                    imageUrls: [
                        'https://mp-d39adc1c-4ce7-4397-833e-f2247d112870.cdn.bspapp.com/cloudstorage/5f6a59dc-993c-4b58-808d-3796044319bd.PNG'
                    ]
                }, {
                    title: '测试',
                    imageUrls: [
                        'https://mp-d39adc1c-4ce7-4397-833e-f2247d112870.cdn.bspapp.com/cloudstorage/5f6a59dc-993c-4b58-808d-3796044319bd.PNG'
                    ]
                }, {
                    title: '测试',
                    imageUrls: [
                        'https://mp-d39adc1c-4ce7-4397-833e-f2247d112870.cdn.bspapp.com/cloudstorage/5f6a59dc-993c-4b58-808d-3796044319bd.PNG'
                    ]
                }, {
                    title: '测试',
                    imageUrls: [
                        'https://mp-d39adc1c-4ce7-4397-833e-f2247d112870.cdn.bspapp.com/cloudstorage/5f6a59dc-993c-4b58-808d-3796044319bd.PNG'
                    ]
                }, {
                    title: '测试',
                    imageUrls: [
                        'https://mp-d39adc1c-4ce7-4397-833e-f2247d112870.cdn.bspapp.com/cloudstorage/5f6a59dc-993c-4b58-808d-3796044319bd.PNG'
                    ]
                }, {
                    title: '测试',
                    imageUrls: [
                        'https://mp-d39adc1c-4ce7-4397-833e-f2247d112870.cdn.bspapp.com/cloudstorage/5f6a59dc-993c-4b58-808d-3796044319bd.PNG'
                    ]
                }, {
                    title: '测试',
                    imageUrls: [
                        'https://mp-d39adc1c-4ce7-4397-833e-f2247d112870.cdn.bspapp.com/cloudstorage/5f6a59dc-993c-4b58-808d-3796044319bd.PNG'
                    ]
                }]
            }
        },
        methods: {

        }
    }
</script>

<style lang="scss">
    .container {
        overflow: hidden;

        .tag-view {
            margin-right: 10px;
        }

        .row {
            display: flex;
            flex-wrap: wrap;
            margin: -10rpx;
            /* 为了抵消uni-card中的padding，这里设置为-10rpx */

            .col {
                width: 50%;
                // padding: 10rpx;
                /* 为了与上面的margin相抵消，这里设置为10rpx */
                box-sizing: border-box;
            }

            .left {
                // padding-right: 5px;
            }

            .right {
                // padding-left: 5px;
            }
        }
    }
</style>
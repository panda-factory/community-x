<template>
    <view class="media-card"
        :class="{ 'media-card--full': isFull, 'media-card--shadow': isShadow,'media-card--border':border}"
        :style="{'margin':isFull?0:margin,'padding':spacing,'box-shadow':isShadow?shadow:''}">
        <!-- 卡片标题 -->
        <slot name="title">
            <view v-if="title || extra" class="media-card__header">
                <view class="media-card__header-box" @click="onClick('title')">
                    <view v-if="thumbnail" class="media-card__header-avatar">
                        <image class="media-card__header-avatar-image" :src="thumbnail" mode="aspectFit" />
                    </view>
                    <view class="media-card__header-content">
                        <text class="media-card__header-content-title media-ellipsis">{{ title }}</text>
                        <text v-if="title&&subTitle"
                            class="media-card__header-content-subtitle media-ellipsis">{{ subTitle }}</text>
                    </view>
                </view>
                <view class="media-card__header-extra" @click="onClick('extra')">
                    <text class="media-card__header-extra-text">{{ extra }}</text>
                </view>
            </view>
        </slot>
        <!-- 封面 -->
        <slot name="cover">
            <view v-if="cover" class="media-card__cover">
                <image class="media-card__cover-image" mode="widthFix" @click="onClick('cover')" :src="cover"></image>
            </view>
        </slot>
        <!-- 卡片内容 -->
        <view class="media-card__content" :style="{padding:padding}" @click="onClick('content')">
            <slot></slot>
        </view>
        <view class="media-card__actions" @click="onClick('actions')">
            <slot name="actions"></slot>
        </view>
    </view>
</template>

<script>
    /**
     * Card 卡片
     * @description 卡片视图组件
     * @tutorial https://ext.dcloud.net.cn/plugin?id=22
     * @property {String} title 标题文字
     * @property {String} subTitle 副标题
     * @property {Number} padding 内容内边距
     * @property {Number} margin 卡片外边距
     * @property {Number} spacing 卡片内边距
     * @property {String} extra 标题额外信息
     * @property {String} cover 封面图（本地路径需要引入）
     * @property {String} thumbnail 标题左侧缩略图
     * @property {Boolean} is-full = [true | false] 卡片内容是否通栏，为 true 时将去除padding值
     * @property {Boolean} is-shadow = [true | false] 卡片内容是否开启阴影
     * @property {String} shadow 卡片阴影
     * @property {Boolean} border 卡片边框
     * @event {Function} click 点击 Card 触发事件
     */
    export default {
        name: 'UniCard',
        emits: ['click'],
        props: {
            title: {
                type: String,
                default: ''
            },
            subTitle: {
                type: String,
                default: ''
            },
            padding: {
                type: String,
                default: '10px'
            },
            margin: {
                type: String,
                default: '15px'
            },
            spacing: {
                type: String,
                default: '0 10px'
            },
            extra: {
                type: String,
                default: ''
            },
            cover: {
                type: String,
                default: ''
            },
            thumbnail: {
                type: String,
                default: ''
            },
            isFull: {
                // 内容区域是否通栏
                type: Boolean,
                default: false
            },
            isShadow: {
                // 是否开启阴影
                type: Boolean,
                default: true
            },
            shadow: {
                type: String,
                default: '0px 0px 3px 1px rgba(0, 0, 0, 0.08)'
            },
            border: {
                type: Boolean,
                default: true
            }
        },
        methods: {
            onClick(type) {
                this.$emit('click', type)
            }
        }
    }
</script>

<style lang="scss">
    $media-border-3: #EBEEF5 !default;
    $media-shadow-base: 0 0px 6px 1px rgba($color: #a5a5a5, $alpha: 0.2) !default;
    $media-main-color: #3a3a3a !default;
    $media-base-color: #6a6a6a !default;
    $media-secondary-color: #909399 !default;
    $media-spacing-sm: 8px !default;
    $media-border-color: $media-border-3;
    $media-shadow: $media-shadow-base;
    $media-card-title: 15px;
    $media-cart-title-color: $media-main-color;
    $media-card-subtitle: 12px;
    $media-cart-subtitle-color: $media-secondary-color;
    $media-card-spacing: 10px;
    $media-card-content-color: $media-base-color;

    .media-card {
        margin: $media-card-spacing;
        padding: 0 $media-spacing-sm;
        border-radius: 4px;
        overflow: hidden;
        font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
        background-color: #fff;
        flex: 1;

        .media-card__cover {
            position: relative;
            margin-top: $media-card-spacing;
            flex-direction: row;
            overflow: hidden;
            border-radius: 4px;

            .media-card__cover-image {
                flex: 1;
                // width: 100%;
                /* #ifndef APP-PLUS */
                vertical-align: middle;
                /* #endif */
            }
        }

        .media-card__header {
            display: flex;
            border-bottom: 1px $media-border-color solid;
            flex-direction: row;
            align-items: center;
            padding: $media-card-spacing;
            overflow: hidden;

            .media-card__header-box {
                /* #ifndef APP-NVUE */
                display: flex;
                /* #endif */
                flex: 1;
                flex-direction: row;
                align-items: center;
                overflow: hidden;
            }

            .media-card__header-avatar {
                width: 40px;
                height: 40px;
                overflow: hidden;
                border-radius: 5px;
                margin-right: $media-card-spacing;

                .media-card__header-avatar-image {
                    flex: 1;
                    width: 40px;
                    height: 40px;
                }
            }

            .media-card__header-content {
                /* #ifndef APP-NVUE */
                display: flex;
                /* #endif */
                flex-direction: column;
                justify-content: center;
                flex: 1;
                // height: 40px;
                overflow: hidden;

                .media-card__header-content-title {
                    font-size: $media-card-title;
                    color: $media-cart-title-color;
                    // line-height: 22px;
                }

                .media-card__header-content-subtitle {
                    font-size: $media-card-subtitle;
                    margin-top: 5px;
                    color: $media-cart-subtitle-color;
                }
            }

            .media-card__header-extra {
                line-height: 12px;

                .media-card__header-extra-text {
                    font-size: 12px;
                    color: $media-cart-subtitle-color;
                }
            }
        }

        .media-card__content {
            padding: $media-card-spacing;
            font-size: 14px;
            color: $media-card-content-color;
            line-height: 22px;
        }

        .media-card__actions {
            font-size: 12px;
        }
    }

    .media-card--border {
        border: 1px solid $media-border-color;
    }

    .media-card--shadow {
        position: relative;
        /* #ifndef APP-NVUE */
        box-shadow: $media-shadow;
        /* #endif */
    }

    .media-card--full {
        margin: 0;
        border-left-width: 0;
        border-left-width: 0;
        border-radius: 0;
    }

    /* #ifndef APP-NVUE */
    .media-card--full:after {
        border-radius: 0;
    }

    /* #endif */
    .media-ellipsis {
        /* #ifndef APP-NVUE */
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        /* #endif */
        /* #ifdef APP-NVUE */
        lines: 1;
        /* #endif */
    }
</style>
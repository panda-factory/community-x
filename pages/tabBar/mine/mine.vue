<template>
    <view class="mine-center">
        <view class="userInfo" @click.capture="toUserInfo">
            <!-- 存在头像，则显示，否则显示本地默认 -->
            <cloud-image width="150rpx" height="150rpx" v-if="hasLogin&&userInfo.avatar_file&&userInfo.avatar_file.url"
                :src="userInfo.avatar_file.url"></cloud-image>
            <view v-else class="defaultAvatarUrl">
                <uni-icons color="#ffffff" size="50" type="person-filled" />
            </view>

            <view class="logo-title">
                <text class="uer-name" v-if="hasLogin">{{userInfo.nickname||userInfo.username||userInfo.mobile}}</text>
                <text class="uer-name" v-else>未登录</text>
            </view>
        </view>

        <uni-grid class="grid" :column="4" :showBorder="false" :square="true">
            <uni-grid-item class="item" v-for="(item,index) in gridList" @click.native="tapGrid(index)" :key="index">
                <uni-icons class="icon" color="#007AFF" :type="item.icon" size="26"></uni-icons>
                <text class="text">{{item.text}}</text>
            </uni-grid-item>
        </uni-grid>


        <uni-list class="center-list" v-for="(sublist , index) in ucenterList" :key="index">
            <uni-list-item v-for="(item,i) in sublist" :title="item.title"></uni-list-item>
        </uni-list>
    </view>
</template>

<script>
    const uniIdCo = uniCloud.importObject('uni-id-co');
    import {
        store,
        mutations
    } from '@/uni_modules/uni-id-pages/common/store.js'
    export default {
        data() {
            return {
                gridList: [{
                        "text": '测试',
                        "icon": "chat"
                    },
                    {
                        "text": '测试',
                        "icon": "cloud-upload"
                    },
                    {
                        "text": '测试',
                        "icon": "contact"
                    },
                    {
                        "text": '测试',
                        "icon": "download"
                    }
                ],
                ucenterList: [
                    [{
                        "title": '设置'
                    }, ]
                ]
            }
        },
        methods: {
            loginWithoutPwd() {
                uni.navigateTo({
                    url: "/uni_modules/uni-id-pages/pages/login/login-withoutpwd"
                })
            },
            toUserInfo() {
                if (this.hasLogin) {
                    uni.navigateTo({
                        url: '/uni_modules/uni-id-pages/pages/userinfo/userinfo'
                    })
                } else {
                    this.loginWithoutPwd();
                }
            },
        },
        created() {},
        async onLoad() {
            console.log('gzx onLoad store: ' + JSON.stringify(store))
        },
        computed: {
            hasLogin() {
                return store.hasLogin;
            },
            userInfo() {
                return store.userInfo
            }
        }
    }
</script>

<style lang="scss" scoped>
    view {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
    }

    .mineCenter {
        flex-direction: column;
        background-color: #f8f8f8;
    }

    .defaultAvatarUrl {
        width: 150rpx;
        height: 150rpx;
        background-color: #007aff;
        border-radius: 100%;
        justify-content: center;
        align-items: center;
    }

    .userInfo {
        // padding: 20rpx;
        padding-top: 60px;
        background-image: url(../../../static/uni-center/headers.png);
        flex-direction: column;
        align-items: center;
    }

    .logo-title {
        flex: 1;
        align-items: center;
        justify-content: space-between;
        flex-direction: row;
    }

    .uer-name {
        height: 100rpx;
        line-height: 100rpx;
        font-size: 38rpx;
        color: #FFFFFF;
    }

    .grid {
        background-color: #FFFFFF;
        margin-bottom: 6px;
    }

    .uni-grid .text {
        font-size: 16px;
        height: 25px;
        line-height: 25px;
        color: #817f82;
    }

    .uni-grid .item ::v-deep .uni-grid-item__box {
        justify-content: center;
        align-items: center;
    }
</style>
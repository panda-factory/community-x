<template>
    <view class="avatar-container">
        <!-- 头像 -->
        <view class="avatar-wrapper">
            <image v-if="avatarUrl" class="header-circle" :class="['avatar-size--' + avatarSize]" :src="avatarUrl">
            </image>
            <view v-else class="header-circle default-avatar" :class="['avatar-size--' + avatarSize]">
                <uni-icons type="person" :size="iconSize"></uni-icons>
            </view>
        </view>

        <!-- 昵称 -->
        <view class="nickname-wrapper">
            <slot>
                <text class="cx-desc-text" v-if="nickname">{{ nickname }}</text>
                <text class="cx-foot-node" v-if="note">{{ note }}</text>
            </slot>
        </view>
    </view>
</template>

<script>
    export default {
        props: {
            avatarUrl: {
                type: String,
                default: ''
            },
            avatarSize: {
                type: String,
                default: 'default'
            },
            nickname: {
                type: String,
                default: '国振雄'
            },
            note: {
                type: String,
                default: '国振雄'
            },
        },
        computed: {
            iconSize() {
                switch (this.avatarSize) {
                    case 'default': {
                        return '45px';
                    }
                    case 'small': {
                        return '25px';
                    }
                }
            }
        }
    }
</script>

<style lang="scss">
    $avatar-size-small: 25px;
    $avatar-size-default: 45px;

    .avatar-container {
        display: flex;
        flex-direction: row;
        // padding: $list-item-pd;
        // padding-left: $uni-spacing-row-lg;
        overflow: hidden;

        align-items: center;
    }

    .avatar-wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 5px;

        .header-circle {
            margin: 1px;
            border-radius: 50%;
        }

        .default-avatar {
            display: flex;
            align-items: center;
            background-color: #BEBEBE;
        }

        .avatar-size--default {
            height: $avatar-size-default;
            width: $avatar-size-default;
        }

        .avatar-size--small {
            height: $avatar-size-small;
            width: $avatar-size-small;
        }
    }




    .nickname-wrapper {
        display: flex;
        flex-direction: column;
    }
</style>
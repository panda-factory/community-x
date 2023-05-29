<template>
    <view class="cx-container">
        <uni-notice-bar show-icon scrollable text="提醒：请勿发布广告、涉政、涉黄、涉暴以及侵犯他人合法权益的言论。共同遵守社区文明公约，讨论事情对事不对人，不欢迎人身攻击。" />
        <uni-data-select v-model="categoryId" :localdata="categories" :clear="false"></uni-data-select>

        <view class="text-content">
            <uni-easyinput v-model="title" :inputBorder="false" placeholder="填写标题"
                :placeholderStyle="placeholderStyle"></uni-easyinput>
            <uni-easyinput v-model="content" :inputBorder="false" placeholder="和大家分享点什么......"></uni-easyinput>

        </view>
        <uni-file-picker v-model="imageUrls" ref="selectedFiles" :auto-upload="false" limit="9"></uni-file-picker>

        <view class="option-container">
            <uni-list>
                <uni-list-item title="所在位置" show-arrow>
                    <template v-slot:header>
                        <uni-icons type="location"></uni-icons>
                    </template>
                </uni-list-item>
                <uni-list-item title="游客不可见">

                    <template v-slot:header>
                        <uni-icons type="auth"></uni-icons>
                    </template>
                    <template v-slot:footer>
                        <switch checked style="height: 30rpx;transform:scale(0.6) ;" />
                    </template>
                </uni-list-item>
            </uni-list>

        </view>

        <view class="bottom-bt">
            <button type="primary" style="width: 60%;" @click="submit">发布帖子</button>
        </view>
    </view>
</template>

<script>
    import {
        getFormattedDate
    } from 'common/js/date';

    import userInfoMixin from '@/common/mixin/user-info.js'

    let cloudPost = uniCloud.importObject('post');
    let cxId = uniCloud.importObject('cx-id');
    export default {
        mixins: [userInfoMixin],
        data() {
            return {
                title: '',
                content: '',
                imageUrls: [],
                imageOptions: {
                    filePath: '',
                    cloudPath: ''
                },
                placeholderStyle: "font-weight: bold;font-size:20px",
                categories: [{
                    text: '邻居动态',
                    value: '646b7cbd09e2989198acf527'
                }, {
                    text: '失物招领',
                    value: '-1'
                }],
                categoryId: '646b7cbd09e2989198acf527'
            }
        },
        onShow() {
            console.log('gzx post onshow: ' + JSON.stringify(this.userInfo))
        },
        methods: {
            onTitleInput: function(event) {
                this.title = event.detail.value;
            },
            async submit() {
                const db = uniCloud.database();

                let thumbs = [];
                await this.$refs.selectedFiles.upload();
                this.imageUrls.forEach(element => {
                    thumbs.push(element.fileID);
                })

                db.collection('cx-news-articles').add({
                    title: this.title,
                    content: this.content,
                    thumbs: thumbs,
                    category_id: this.categoryId
                }).then((res) => {
                    // res 为数据库查询结果
                    console.log('submit res: ' + JSON.stringify(res))
                }).catch((err) => {
                    console.error(err.message)
                }).finally(() => {
                    uni.navigateBack();
                })
            }
        }
    }
</script>

<style lang="scss">
    .text-content {
        margin-bottom: 50rpx;
    }

    .option-container {
        margin-top: 100rpx;
    }

    .bottom-bt {
        display: flex;
        align-items: center;
        padding: 15rpx;
        flex-direction: column;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        box-shadow: 16px 16px 32px grey;
        background-color: #ffffff;
    }
</style>
<template>
    <view class="cx-container">
        <uni-notice-bar show-icon scrollable text="提醒：请勿发布广告、涉政、涉黄、涉暴以及侵犯他人合法权益的言论。共同遵守社区文明公约，讨论事情对事不对人，不欢迎人身攻击。"/>

        <view class="text-content">
            <uni-easyinput v-model="title" :inputBorder="false" placeholder="填写标题"
                :placeholderStyle="placeholderStyle"></uni-easyinput>
            <uni-easyinput v-model="description" :inputBorder="false" placeholder="和大家分享点什么......"></uni-easyinput>

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
                        <switch checked style="height: 30rpx;transform:scale(0.6) ;"/>
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
    let cloudPost = uniCloud.importObject('post');
    let cxId = uniCloud.importObject('cx-id');
    export default {
        data() {
            return {
                title: '',
                description: '',
                imageUrls: [],
                imageOptions: {
                    filePath: '',
                    cloudPath: ''
                },
                placeholderStyle: "font-weight: bold;font-size:20px",

            }
        },
        methods: {
            onTitleInput: function(event) {
                this.title = event.detail.value;
            },
            async submit() {
                console.log('gzx submit imageUrls: ' + JSON.stringify(getApp().globalData.userInfo))


                let data = {
                    userId: getApp().globalData.userInfo._id,
                    title: this.title,
                    imageUrls: [],
                    dateTime: getFormattedDate(),
                };


                await this.$refs.selectedFiles.upload();

                console.log('gzx submit 2: ' + this.imageUrls.length)
                console.log('gzx submit 3: ' + JSON.stringify(this.imageUrls))
                this.imageUrls.forEach(element => {
                    data.imageUrls.push(element.fileID);
                })

                console.log('gzx submit data: ' + JSON.stringify(data))
                let result = await cloudPost.submit(data);
                console.log('gzx submit result: ' + JSON.stringify(result))
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
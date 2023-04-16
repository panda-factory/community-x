<template>
    <view >
        <view @click="chooseImage">
            <text class="wrapper">选择图片</text>
        </view>
        <view >
            <input @input="onTitleInput" focus="true" placeholder="主题"></input>
        </view>
        <view class="wrapper"  @click="submit">发布</view>
    </view>
</template>

<script>
    let cloudPost = uniCloud.importObject('post');
    export default {
        data() {
            return {
                title: '',
                imageUrl: '',
                datetime: '',
                imageOptions: {
                    filePath: '',
                    cloudPath: ''
                }
            }
        },
        methods: {
            onTitleInput: function(event) {
                this.title = event.detail.value;
            },
            async submit() {
                console.log('gzx submit: ' + JSON.stringify(this.imageOptions))
                console.log('gzx submit title: ' + this.title)
                let data = {
                    title: this.title
                };

                await uniCloud.uploadFile({
                    ...this.imageOptions,
                    onUploadProgress(e) {
                        console.log(e)
                    }
                }).then((res) => {
                    data.imageUrl = res.fileID;
                })
                console.log('gzx submit data: ' + JSON.stringify(data))
                let result = await cloudPost.submit(data);
                console.log('gzx submit result: ' + JSON.stringify(result))
            },
            chooseImage() {
                let that = this;
                uni.chooseImage({
                    count: 6, //默认9
                    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album'], //从相册选择
                    success: function(res) {
                        console.log('chooseImage ' + JSON.stringify(res.tempFilePaths));
                        const path = res.tempFilePaths[0];
                        // #ifdef H5
                        let ext
                        ext = res.tempFiles[0].name.split('.').pop()
                        const options = {
                            filePath: path,
                            cloudPath: Date.now() + '.' + ext
                        }
                        that.imageOptions = options;
                        // #endif
                        // #ifndef H5
                        uni.getImageInfo({
                            src: path,
                            success(info) {
                                console.log('gzx getImageInfo success: ' + JSON
                                    .stringify(info))
                                const options = {
                                    filePath: path,
                                    cloudPath: Date.now() + '.' + info.type
                                        .toLowerCase()
                                }
                                that.imageOptions = options;
                            },
                            fail(err) {
                                new Error(err.errMsg || '未能获取图片类型')
                            }
                        })
                        // #endif
                    }
                });
                // }).then((options) => {
                //     console.log('gzx upload options: ' + JSON.stringify(options))
                //     uni.showLoading({
                //         title: '文件上传中...'
                //     })
                //     return uniCloud.uploadFile({
                //         ...options,
                //         onUploadProgress(e) {
                //             console.log(e)
                //         }
                //     })
                // }).then(res => {
                //     uni.hideLoading()
                //     console.log(res);
                //     uni.showModal({
                //         content: '图片上传成功，fileId为：' + res.fileID,
                //         showCancel: false
                //     })
                // }).catch((err) => {
                //     uni.hideLoading()
                //     console.log(err);
                //     if (err.message !== 'Fail_Cancel') {
                //         uni.showModal({
                //             content: `图片上传失败，错误信息为：${err.message}`,
                //             showCancel: false
                //         })
                //     }
                // })
            }
        }
    }
</script>

<style>
    .wrapper {
		font-size: 20px;
        background-color: #FFFFFF;
    }
</style>
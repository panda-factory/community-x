<template>
    <view>
        <uni-file-picker v-model="imageUrls" ref="selectedFiles" :auto-upload="false" limit="9"
            title="最多选择9张图片"></uni-file-picker>
        <view>
            <uni-easyinput v-model="title" placeholder="填写标题" :placeholderStyle="placeholderStyle"></uni-easyinput>
        </view>
        <uni-easyinput v-model="description" placeholder="说说此刻的想法"></uni-easyinput>

        <view class="wrapper" @click="submit">发布</view>
    </view>
</template>

<script>
    let cloudPost = uniCloud.importObject('post');
    export default {
        data() {
            return {
                title: '',
                description: '',
                imageUrl: '',
                datetime: '',
                imageOptions: {
                    filePath: '',
                    cloudPath: ''
                },
                imageUrls: [],
                placeholderStyle: "font-weight: bold;font-size:20px",
            }
        },
        methods: {
            onTitleInput: function(event) {
                this.title = event.detail.value;
            },
            async submit() {
                console.log('gzx submit 1: ' + JSON.stringify(this.imageOptions))
                // console.log('gzx submit imageUrls: ' + JSON.stringify(this.$refs.selectedFiles))


                let data = {
                    title: this.title
                };


                await this.$refs.selectedFiles.upload();
                console.log('gzx submit 2: ' + this.imageUrls.length)
                console.log('gzx submit 3: ' + JSON.stringify(this.imageUrls))
                data.imageUrl = this.imageUrls[0].fileID;

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
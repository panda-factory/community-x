<template>
    <view>
        <uni-file-picker v-model="imageUrls" ref="selectedFiles" :auto-upload="false" limit="9"
            title="最多选择9张图片"></uni-file-picker>
        <view>
            <uni-easyinput v-model="title" placeholder="填写标题" :placeholderStyle="placeholderStyle"></uni-easyinput>
        </view>
        <uni-easyinput v-model="description" placeholder="说说此刻的想法"></uni-easyinput>

			<button type="primary" @click="submit">发布</button>
    </view>
</template>

<script>
    let cloudPost = uniCloud.importObject('post');
    export default {
        data() {
            return {
                title: '',
                description: '',
                imageUrls: [],
                datetime: '',
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
                console.log('gzx submit 1: ' + JSON.stringify(this.imageOptions))
                // console.log('gzx submit imageUrls: ' + JSON.stringify(this.$refs.selectedFiles))


                let data = {
                    title: this.title,
                    imageUrls: []
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

<style>
    .wrapper {
        font-size: 20px;
        background-color: #FFFFFF;
    }
</style>
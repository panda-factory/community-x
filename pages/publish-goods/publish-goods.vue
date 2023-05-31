<template>
    <view class="cx-container">
        <uni-forms labelWidth="80px">
            <uni-forms-item label="名称" required>
                <uni-easyinput placeholder="请填写" />
            </uni-forms-item>

            <uni-forms-item label="所在地" required>
                <uni-easyinput placeholder="选择小区" :disabled="true" suffixIcon="forward" />
            </uni-forms-item>

            <uni-forms-item label="详细地址">
                <uni-easyinput placeholder="请填写" />
            </uni-forms-item>

            <uni-forms-item label="原价" required>
                <uni-easyinput placeholder="请填写" />
            </uni-forms-item>

            <uni-forms-item label="转让价" required>
                <uni-easyinput placeholder="请填写" />
            </uni-forms-item>

            <uni-forms-item label="联系方式" required>
                <uni-easyinput placeholder="请填写" />
            </uni-forms-item>
        </uni-forms>

        <uni-easyinput type="textarea" placeholder="详细描述"></uni-easyinput>

        <uni-file-picker v-model="imageUrls" ref="selectedFiles" :auto-upload="false" limit="9" mode="grid"></uni-file-picker>

        <view class="bottom-bt">
            <button type="primary" style="width: 60%;" @click="submit">发布帖子</button>
        </view>
    </view>
</template>

<script>
    let cloudMall = uniCloud.importObject('mall');
    export default {
        data() {
            return {
                imageUrls: [],
                itemDesc: ''
            };
        },
        methods: {
            async submit() {
                const db = uniCloud.database();

                let bannerImgs = [];
                await this.$refs.selectedFiles.upload();
                this.imageUrls.forEach(element => {
                    bannerImgs.push(element.fileID);
                })

                db.collection('cx-mall-items').add({
                    name: '1',
                    price: 10,
                    items_desc: 'thumbs',
                    items_thumb: bannerImgs[0],
                    items_banner_imgs: bannerImgs
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
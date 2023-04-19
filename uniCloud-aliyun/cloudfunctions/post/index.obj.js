// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
const db = uniCloud.database();
const postData = db.collection('post-data')
const userDatas = db.collection('uni-id-users')
module.exports = {
    _before: function() { // 通用预处理器

    },
    /**
     * 提交
     * @param {string} param1 参数1描述
     * @returns {object} 返回值描述
     */
    async submit(data) {
        // 参数校验，如无参数则不需要
        if (!data) {
            return {
                errCode: 'PARAM_IS_NULL',
                errMsg: '参数不能为空'
            }
        }
        let banner = {
            userId: data.userId ? data.userId : '',
            title: data.title ? data.title : '',
            imageUrls: data.imageUrls ? data.imageUrls : [],
            dateTime: data.dateTime ? data.dateTime : '',
            forwardCount: data.forwardCount ? data.forwardCount : 0,
            commentCount: data.commentCount ? data.commentCount : 0,
            likeCount: data.likeCount ? data.likeCount : 0,
        }
        // 业务逻辑
        postData.add(banner);
        // 返回结果
        return {
            banner //请根据实际需要返回值
        }
    },

    /**
     * 获取
     * @param {string} param1 参数1描述
     * @returns {object} 返回值描述
     */
    async getTop() {
        let topData = await postData.limit(10).get()
        let result = await Promise.all(topData.data.map(async (item) => {
            console.log('item: ' + JSON.stringify(item));
            let data = await userDatas.where({
                _id: item.userId
            }).get();
            console.log(JSON.stringify(data));
            item.nickname = data.data[0].nickname;
            return item;
        }))
        console.log('gzx Cloud: ' + JSON.stringify(result));
        return topData;
    },
}
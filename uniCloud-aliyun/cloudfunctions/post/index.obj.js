
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
            commenteds: [],
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
     * 提交评论
     * @param {object} banner {postId,userId,value}
     * @returns {object} 返回值描述
     */
    async submitComment(banner) {
        // 参数校验，如无参数则不需要
        if (!banner) {
            return {
                errCode: 'PARAM_IS_NULL',
                errMsg: '参数不能为空'
            }
        }
        // 业务逻辑
        let rawData = await postData.doc(banner.postId).get();
        let post = rawData.data[0];
        let comment = {
            userId: banner.userId,
            nicknameId: 0,
            comment: banner.comment
        }
        if (banner.commentedId === -1) {
            let commented = {
                comment: comment,
                commenteds: []
            };
            post.commenteds.push(commented);
            delete post._id;
            console.log('gzx submitComment: ' + JSON.stringify(post))
            // 更新数据库
            await postData.doc(banner.postId).update(post).then(res => {
                console.log('更新成功：' + res);
            }).catch(err => {
                console.error('更新失败：' + err);
            });
        }
        // 返回结果
        
        const commenteds = await Promise.all(post.commenteds.map(async (commented) => {
            commented.comment = await formatCommentReturn(commented.comment);
            return commented;
        }));
        return commenteds;
    },

    /**
     * 获取
     * @param {string} param1 参数1描述
     * @returns {object} 返回值描述
     */
    async getTop() {
        let dataPacket = await db.collection('cx-news-articles').limit(10).get();
        let articleList = dataPacket.data;

        let authorInfoList = await Promise.all(articleList.map(async (article) => {
            console.log('article: ' + JSON.stringify(article));
            let userInfoPacket = await userDatas.where({
                _id: article.user_id
            }).get();
            console.log(JSON.stringify(userInfoPacket));
            let authorInfo = {};
            authorInfo.nickname = userInfoPacket.data[0].nickname;
            authorInfo.avatar_file = userInfoPacket.data[0].avatar_file;
            return authorInfo;
        }))
        console.log('gzx getTop authorInfoList: ' + JSON.stringify(authorInfoList));

        authorInfoList.forEach((authorInfo, index) => {
            articleList[index].authorInfo = authorInfo;
        });
        
        console.log('gzx getTop: ' + JSON.stringify(articleList));
        return articleList;
    },

    /**
     * 获取
     * @param {string} param1 参数1描述
     * @returns {object} 返回值描述
     */
    async getDetail(id) {
        let dataPacket = await db.collection('cx-news-articles').doc(id).get();
        let article = dataPacket.data[0];
        console.log('gzx Cloud getDetail: ' + JSON.stringify(article));

        let userInfoPacket = await userDatas.where({
            _id: article.user_id
        }).get();
        console.log(JSON.stringify(userInfoPacket));
        let authorInfo = {};
        authorInfo.nickname = userInfoPacket.data[0].nickname;
        authorInfo.avatar_file = userInfoPacket.data[0].avatar_file;

        article.authorInfo = authorInfo;

        let comments = await getComments(id);
        return {article, comments};
    },

    /**
     * 获取
     * @param {string} param1 参数1描述
     * @returns {object} 返回值描述
     */
    async addLike(postId) {
        let postRawData = await postData.doc(postId).get();
        let post = postRawData.data[0];
        post.likeCount++;
        console.log('gzx Cloud getDetail: ' + JSON.stringify(post));

        delete post._id;
        await postData.doc(postId).update(post).then(res => {
            console.log('更新成功：' + res);
        }).catch(err => {
            console.error('更新失败：' + err);
        });
        return;
    },
}

async function getUserInfo(userId) {
    let rawUserData = await userDatas.doc(userId).get();
    let userInfo = rawUserData.data[0];
    let result = {};
    
    result.nickname = userInfo.nickname;
    result.avatar_file = userInfo.avatar_file;
    
    return result;
}

async function getComments(articleId) {
    let dataPacket = await db.collection('cx-news-comments').where({
        article_id: articleId
    }).get();
    let comments = dataPacket.data;

    const commenteds = await Promise.all(comments.map(async (comment) => {
        comment.authorInfo = await getUserInfo(comment.user_id);
        return comment;
    }));
    console.log('gzx getComments: ' + JSON.stringify(commenteds));
    return commenteds;
}

async function formatCommentReturn(comment) {
    let rawUserData = await userDatas.doc(comment.userId).get();
    let userInfo = rawUserData.data[0];
    comment.nickname = userInfo.nickname;
    comment.avatar_file = userInfo.avatar_file;
    return comment;
}
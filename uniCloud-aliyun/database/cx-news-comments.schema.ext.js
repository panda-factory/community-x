// schema扩展相关文档请参阅：https://uniapp.dcloud.net.cn/uniCloud/jql-schema-ext.html

const db = uniCloud.database();
const dbCmd = db.command
module.exports = {   
    trigger: {
        afterCreate: async function({
            collection,
            operation,
            addDataList
        } = {}) {
            console.log('gzx trigger afterCreate: ' + collection + ', operation: ' + operation)
            addDataList.forEach((comment) => {
                db.collection('cx-news-articles').doc(comment.article_id).update({
                    comment_count: dbCmd.inc(1)
                });                
            })
        }
        
    }
}

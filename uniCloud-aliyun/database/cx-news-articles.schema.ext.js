// schema扩展相关文档请参阅：https://uniapp.dcloud.net.cn/uniCloud/jql-schema-ext.html

const db = uniCloud.database();
module.exports = {
    trigger: {
        beforeCreate: async function({
            collection,
            operation,
            docId,
            addDataList
        } = {}) {
            console.log('gzx trigger afterCreate: ' + collection + ', operation: ' + operation)
            console.log('gzx trigger afterCreate addDataList: ' + JSON.stringify(addDataList))
            addDataList.forEach((article) => {
                article.publish_date = getFormattedDate(article.publish_date);
                article.last_modify_date = getFormattedDate(article.last_modify_date);
            })
        }
    }
}

function getFormattedDate(timestamp){
    const date = timestamp ? new Date(timestamp) : new Date();
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
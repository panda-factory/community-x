<script>
    import uniIdPageInit from '@/uni_modules/uni-id-pages/init.js';
    export default {
        globalData: {
            userInfo: {}
        },
        onLaunch: function() {
            console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！')
            console.log('App Launch')
            uniIdPageInit();
            

        },
        onShow: function() {
            console.log('App Show')
        },
        onHide: function() {
            console.log('App Hide')
        },
    }
</script>

<style lang="scss">
    /*每个页面公共css */
    @import '@/uni_modules/uni-scss/index.scss';
    @import url("./common/css/common.css");
    @import url("./common/css/text-style.css");
    @import url("./common/css/icon.css");
    /* #ifndef APP-NVUE */
    @import '@/static/customicons.css';
    @import "@/static/cx-icons/iconfont.css";

    // 设置整个项目的背景色
    page {
        background-color: #f5f5f5;
    }

    /* #endif */
    .example-info {
        font-size: 14px;
        color: #333;
        padding: 10px;
    }
</style>
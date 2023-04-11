<script>
    export default {
        globalData: {
            userName: 'text'
        },
        onLaunch: function() {
            console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！')
            console.log('App Launch')
            let provider;
            uni.getProvider({
                service: 'oauth',
                success: function(res) {
                    console.log(res.provider)
                    provider = res.provider;
                    if (~res.provider.indexOf('qq')) {
                        uni.login({
                            provider: 'qq',
                            success: function(loginRes) {
                                console.log(JSON.stringify(loginRes));
                            }
                        });
                    }
                }
            });
            uni.login({
                provider: provider,
                success: function(authResult, code) {
                    console.log('authResult.code', authResult.code)
                    uni.getUserInfo({
                        provider: provider,
                        success: function(infoRes) {
                            console.log('用户昵称为：' + infoRes.userInfo.nickName);
                            uni.setStorageSync('userName', infoRes.userInfo.nickName);
                        }
                    });
                    uni.getUserProfile({
                        lang: 'zh_CN',
                        desc: '用户登录', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，
                        success: (res) => {
                            console.log('gzx getUserProfile: ' + JSON.stringify(res
                                .userInfo))
                        },
                        fail: (err) => {
                            console.error('getUserProfile fail', err)
                        }
                    })
                    // const request = require('request');
                    const appid = 'wx54a787e1704772d3';
                    const secret = 'f95b8b63d8b89f9d899b891c7e704ff1';
                    const url =
                        `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${authResult.code}&grant_type=authorization_code`


                    // uni.request({
                    //     url:url,
                    //     method:'GET',
                    //     success(res) {
                    //         console.log('gzx uni.request: ' + JSON.stringify(res))
                    //     }
                    // })
                    //   request.get(url, (error, response, body) => {
                    //       console.log('gzx request')
                    //   })
                },

                fail: function(err) {
                    console.error('login fail', err)
                }
            })
        },
        onShow: function() {
            console.log('App Show')
        },
        onHide: function() {
            console.log('App Hide')
        }
    }
</script>

<style lang="scss">
    /*每个页面公共css */
    @import '@/uni_modules/uni-scss/index.scss';
    @import url("./common/css/common.css");
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
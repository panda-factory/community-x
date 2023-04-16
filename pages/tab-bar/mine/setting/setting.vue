<template>
    <view>
        <!-- 退出/登录 按钮 -->
        <view class="bottom-back">
            <button type="default" @click="logout">退出登录</button>
        </view>
    </view>
</template>

<script>
	import {
		store,
		mutations
	} from '@/uni_modules/uni-id-pages/common/store.js'
    
    export default {
        data() {
            return {

            }
        },
        methods: {
			async logout(){
				if(this.hasLogin){
					await mutations.logout()
				}
			},

        },
		computed: {
			hasLogin(){
				return store.hasLogin
			},
		},
    }
</script>

<style>

</style>
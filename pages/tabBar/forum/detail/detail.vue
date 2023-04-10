<template>
    <view>
        
    </view>
</template>

<script>
    export default {
        data() {
            return {
                
            }
        },
        methods: {
            
                onLoad(event) {
                    // TODO 后面把参数名替换成 payload
                    const payload = event.detailDate || event.payload;
                    console.log('gzx: ' + payload)
                }
        }
    }
</script>

<style>

</style>

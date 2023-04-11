<template>
	<view>
		{{userName}}
	</view>
</template>

<script>
	export default {
		data() {
            let userName = uni.getStorageSync('userName');
			return {
				userName: userName
			}
		},
		methods: {
			
		},
        created() {
        }
	}
</script>

<style>

</style>

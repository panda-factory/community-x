<template>
	<view>
		<button type="primary" @click="createVote">发起投票</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			createVote() {
				uni.navigateTo({
					url: '/pages/vote/create'
				})
			}
		}
	}
</script>

<style>

</style>
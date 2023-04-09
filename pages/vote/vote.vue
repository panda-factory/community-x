<template>
	<view>
		<view v-for="(item, index) in voteContents">
			<voteItem :voteContent="voteContents[index]"></voteItem>
		</view>
		<button type="primary" @click="createVote">发起投票</button>
	</view>
</template>

<script>
	import voteItem from './vote-item.vue';
	export default {
		components: {
			voteItem
		},
		data() {
			return {
				voteContents: []
			}
		},
		methods: {
			createVote() {
				uni.navigateTo({
					url: '/pages/vote/create'
				})
			},
			recvVoteCommit(content) {
				console.log('gzx recvVoteCommit: ' + JSON.stringify(content))
				this.voteContents.push({
					title: content.title,
					voteCount: 0,
					dateTime: `${content.startDate}~${content.endDate}`
				})
			}
		},
		created() {
			uni.$on('commit', this.recvVoteCommit)
		},
	}
</script>

<style>
</style>
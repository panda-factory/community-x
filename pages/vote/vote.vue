<template>
    <view class="cx-vote-wrapper">
        <view>
            <view v-for="(item, index) in voteContents">
                <voteItem :voteContent="voteContents[index]"></voteItem>
            </view>
        </view>
        <view class="buttom-container">
            <button type="primary" @click="createVote">发起投票</button>
        </view>
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
    .cx-vote-wrapper {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-bottom: 20px;
    }

    .buttom-container {
        width: 80%;
        position: fixed;
        bottom: 20px;
        left: 10%;
        right: 10%;
    }

    .buttom-btn {
        bottom: 0;
        text-align: center;
        width: 80%;
    }
</style>
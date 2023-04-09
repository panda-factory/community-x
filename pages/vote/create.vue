<template>
	<view>
		<view class="cx-vote-wrapper">
			<!-- 投票主题 -->
			<view class="cx-input-wrapper">
				<input class="cx-input-title cx-input cx-vote-div" focus="true" placeholder="投票主题"
					@input="onTitleInput"></input>
			</view>
			<!-- 补充描述 -->
			<view class="cx-input-wrapper">
				<input class="cx-input-desc cx-input cx-vote-div" placeholder="补充描述(选填)"></input>
			</view>
			<!-- 选项列表 -->
			<view v-for="(item, index) in options">
				<view class="cx-input-wrapper">
					<uni-icons type="minus-filled" color="#e64340" @click="minusOption(index)"></uni-icons>
					<input class="cx-input-option cx-input cx-vote-div" placeholder="选项"
						@input="onOptionInput($event, index)" :value="options[index]"></input>
				</view>
			</view>
			<!-- 添加选项 -->
			<view class="cx-input-wrapper" @click="addOption">
				<uni-icons type="plus-filled" color="#007aff"></uni-icons>
				<text class="cx-input-option cx-input-option-ext">添加选项</text>
			</view>
		</view>

		<view class="cx-vote-wrapper">
			<view class="cx-vote-setting-item">
				<view class="cx-vote-setting-cell cx-vote-div">
					<text>截止日期</text>
					<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
						<view>{{date}}</view>
					</picker>

					<picker mode="time" :value="time" start="09:01" end="21:01" @change="bindTimeChange">
						<view class="uni-input">{{time}}</view>
					</picker>
				</view>
			</view>
			<view class="cx-vote-setting-item">
				<view class="cx-vote-setting-cell">
					<text>投票规则</text>
					<view>匿名投票</view>
					<switch style="transform:scale(0.7)" @change="anonymousSwitch"/>
				</view>
			</view>
		</view>
		<!-- 提交投票 -->
		<view class="cx-vote-wrapper">
			<button type="primary" @click="commitVote()">完成</button>
		</view>
	</view>
</template>

<script>
	function getDate(type) {
		const date = new Date();

		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();

		if (type === 'end') {
			month = month + 5;
		} else if (type == 'time') {
			let time = date.toLocaleString('en-US', {
				hour12: false,
				hour: '2-digit',
				minute: '2-digit'
			}); // 格式化时间
			return time
		}
		month = month > 9 ? month : '0' + month;;
		day = day > 9 ? day : '0' + day;

		return `${year}-${month}-${day}`;
	}
	export default {
		data() {
			return {
				voteTitle: '',
				date: getDate({
					format: true
				}),
				startDate: getDate(),
				endDate: getDate('end'),
				time: getDate('time'),
				options: ['', ''],
				anonymous: false
			}
		},
		methods: {
			onTitleInput: function(event) {
				this.voteTitle = event.detail.value;
			},
			onOptionInput: function(event, index) {
				this.options[index] = event.detail.value
			},
			minusOption(index) {
				console.log('gzx: ' + index)
				console.log('gzx befor: ' + this.options)
				if (this.options.length > 1) {
					this.options.splice(index, 1);
				}
				console.log('gzx after: ' + this.options)
			},
			addOption() {
				this.options.push('');
			},
			anonymousSwitch: function (e) {
				this.anonymous = e.detail.value;
			},
			commitVote() {
				let voteContent = {
					title: this.voteTitle,
					desc: '',
					options: this.options,
					startDate: this.startDate,
					endDate: this.endDate,
					time: this.time,
					anonymous: this.anonymous
				}

				uni.$emit('commit', voteContent);
				uni.navigateBack();
			}
		}
	}
</script>

<style>
	.cx-vote-wrapper {
		margin-bottom: 20px;
		padding-top: 13px;
		background-color: #FFFFFF;
	}

	.cx-input-wrapper {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		padding: 8px 13px;
		flex-direction: row;
		flex-wrap: nowrap;
		background-color: #FFFFFF;
	}

	.cx-input {
		height: 28px;
		line-height: 28px;
		padding: 0px;
		flex: 1;
		background-color: #FFFFFF;
	}

	.cx-vote-div {
		border-bottom: 2rpx solid #D8D8D8;
	}

	.cx-input-title {
		font-size: 20px;
		font-weight: bold;
	}

	.cx-input-desc {
		font-size: 16px;
	}

	.cx-input-option {
		font-size: 14px;
	}

	.cx-input-option-ext {
		color: dodgerblue;
		padding-bottom: 10px;
	}

	.cx-vote-setting-item {
		padding: 8px 13px;
	}

	.cx-vote-setting-cell {
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
</style>
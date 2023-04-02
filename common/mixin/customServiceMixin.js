export default{
	methods: {
		//app打开客服
		/* openAppService(){
			const {
				wxService,
				thirdService
			} = this.$config.customerService;
			if(thirdService.url){
				this.navTo('/pages/public/service')
			}else{
				plus.share.getServices(res=> {
					const wxServiceObj = res.find(item=> item.id === 'weixin');
					wxServiceObj.openCustomerServiceChat({
						corpid: wxService.corpid,
						url: wxService.url
					}, suc=>{
						console.log('suc ====>', suc);
					}, err=>{
						console.log('err ====>', err);
					})
					
				})
			}
		}, */
		openAppService(){
			const {
				wxService,
				thirdService
			} = this.$config.customerService;
			uni.showActionSheet({
				itemList: ['微信客服演示', '第三方在线客服演示', '仅为演示，实际使用二选一'],
				success: res=>{
					if(res.tapIndex === 0){
						plus.share.getServices(res=> {
							const wxServiceObj = res.find(item=> item.id === 'weixin');
							wxServiceObj.openCustomerServiceChat({
								corpid: wxService.corpid,
								url: wxService.url
							}, suc=>{
								console.log('suc ====>', suc);
							}, err=>{
								console.log('err ====>', err);
							})
							
						})
					}else if (res.tapIndex === 1){
						this.navTo('/pages/public/service')
					}
				}
			})
		},
	},
}
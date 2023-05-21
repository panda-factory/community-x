<template>
    <view>
        <uni-indexed-list :options="list" @click="onSelect" />
    </view>
</template>

<script>
    import {
        getProvince,
        getCity,
        getRegion,
        getStreet,
        getCommunity
    } from '@/common/js/communityList'
    export default {
        data() {
            return {
                list: getProvince(),
                level: 0,
                province: '',
                city: '',
                region: '',
                street: '',
                community: ''
            }
        },
        methods: {
            onSelect(data) {
                console.log('gzx select: ' + JSON.stringify(data))
                console.log('gzx level: ' + this.level)
                switch (this.level) {
                    case 0: {
                        this.province = data.item.name;
                        this.list = getCity(this.province)
                        this.level++;
                        break;
                    }
                    case 1: {
                        this.city = data.item.name;
                        this.list = getRegion(this.city)
                        this.level++;
                        break;
                    }
                    case 2: {
                        this.region = data.item.name;
                        this.list = getStreet(this.region)
                        this.level++;
                        break;
                    }
                    case 3: {
                        this.street = data.item.name
                        this.list = getCommunity(this.street)
                        this.level++;
                        break;
                    }
                    case 4: {
                        this.community = data.item.name;
                        this.level++;
                        break;
                    }
                }
            }
        }
    }
</script>

<style>

</style>
import {
    store
} from '@/uni_modules/uni-id-pages/common/store.js'
export default {

    computed: {
        userInfo() {
            return store.userInfo;
        }
    },
}
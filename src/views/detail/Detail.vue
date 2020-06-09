<!--  -->
<template>
    <div id='detail'>
        <detail-nav-bar></detail-nav-bar>
        <detail-swiper :top-images='topImages' />
    </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import {getDetail} from "../../network/detail"

import DetailSwiper from './childComps/DetailSwiper'



export default {
    name: 'Detail',
    components: {
        DetailNavBar,
        DetailSwiper
    },
    data() {
//这里存放数据
        return {
            iid: null,
            topImages: []
        };
    },
    methods: {

    },

    created() {
        this.iid = this.$route.params.iid

        //根据iid请求数据
        getDetail(this.iid).then((res) => {
            console.log(res)
            this.topImages = res.result.itemInfo.topImages
            console.log(this.topImages)

        })
    },

}
</script>

<style scoped>

</style>
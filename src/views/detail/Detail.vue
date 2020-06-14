<!--  -->
<template>
    <div id='detail'>
        <detail-nav-bar class="detail-nav" @detailCurrentIndex='detailCurrentIndex'
        ref="nav"/>
        <scroll class="content" ref="scroll" :probeType='3'
        @scroll='position'>
            <detail-swiper :top-images='topImages' />
            <detail-base-info :goods="goods"/>
            <detail-shop-info :shop="shop" />
            <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
            <detail-param-info :param-info="paramInfo" ref="param"/>
            <detail-comment-info :commentInfo='commentInfo' ref="comment"></detail-comment-info>
            <goods-list :goods='recommends' ref="recommend" />
        </scroll>
        <detail-bottom-bar @addToCart='addToCart'/>
        <back-top @click.native="backClick" v-show="isShowBackTop"/>
    </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'
import BackTop from '../../components/content/backTop/BackTop'

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "../../network/detail"
import {debounce} from '../../common/utils'

import Scroll from '../../components/common/scroll/Scroll'
import GoodsList from '../../components/content/goods/GoodsList'
import {itemListenerMixin} from '../../common/mixin'



export default {
    name: 'Detail',
    components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailCommentInfo,
        DetailBottomBar,
        BackTop,
        Scroll,
        DetailParamInfo,
        GoodsList
    },
    mixins:[itemListenerMixin],
    data() {
//这里存放数据
        return {
            iid: null,
            topImages: [],
            goods: {},
            shop: {},
            detailInfo: {},
            refresh: null,
            paramInfo: {},
            commentInfo: {},
            recommends: [],
            elOffsetTop: [],
            elOffsetTopY: null,
            currentIndex: 0,
            isShowBackTop: false,
            
        };
    },
    methods: {
        imageLoad() {
            this.newRefresh()

            this.elOffsetTopY()
            
        },
        //获取点击nav的下标
        detailCurrentIndex(index) {
            this.$refs.scroll.scrollTo(0,-this.elOffsetTop[index])
        },
        position(position) {
            const positionY = -position.y
            // let length = this.elOffsetTop.length
            // for (let i = 0;i < length;i++) {
            //     if (this.currentIndex !== i 
            //     && ((i < length - 1 && positionY >= this.elOffsetTop[i] && positionY < this.elOffsetTop[i+1])
            //     || (i === length - 1 && positionY >= this.elOffsetTop[i]))) {
            //         this.currentIndex = i
            //         console.log(i)
            //         this.$refs.nav.currentIndex = i
            //     }
            // }            
            let length = this.elOffsetTop.length -1
            for (let i = 0;i < length;i++) {
                if (this.currentIndex !== i 
                && ( positionY >= this.elOffsetTop[i] && positionY < this.elOffsetTop[i+1])) {
                    this.currentIndex = i
                    this.$refs.nav.currentIndex = i
                }
                
            }
            this.isShowBackTop = positionY > 1000

        },
        backClick() {
            this.$refs.scroll.scrollTo(0,0)
        },
        addToCart() {
            //创建商品信息对象
            const cartObj = {}
            cartObj.iid = this.iid
            cartObj.imgURL = this.topImages[0]
            cartObj.title = this.goods.title
            cartObj.desc = this.goods.desc;
            cartObj.Price = this.goods.realPrice;

            //把数据交给Vuex，添加到购物车
            // this.$store.commit('addCart',cartObj)
            this.$store.dispatch('addCart',cartObj).then(res => {
                // console.log(this.$toast)
                //toast 弹窗
                this.$toast.toastShow(res)
            })
        }
    },

    created() {
        this.iid = this.$route.params.iid

        //根据iid请求数据
        getDetail(this.iid).then((res) => {
            //获取轮播图数据
            const data = res.result
            this.topImages = data.itemInfo.topImages

            //获取商品信息
            this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

            //获取店铺信息
            this.shop = new Shop(data.shopInfo)
            // 保存商品的详情数据
            this.detailInfo = data.detailInfo;
            // 获取参数的信息
            this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
            //获取用户评论信息
            if(data.rate.cRate) {
                this.commentInfo = data.rate.list[0]
            }
            getRecommend().then((res) => {
                this.recommends = res.data.list
            })
        })
        //防抖处理
        this.elOffsetTopY = debounce(() => {
            this.elOffsetTop = []
            this.elOffsetTop.push(0)
            this.elOffsetTop.push(this.$refs.param.$el.offsetTop - 44)
            this.elOffsetTop.push(this.$refs.comment.$el.offsetTop - 44)
            this.elOffsetTop.push(this.$refs.recommend.$el.offsetTop - 44)
            this.elOffsetTop.push(Number.MAX_VALUE)
        },300)
    },
    mounted() {
        
    },
    destroyed() {
        //this.$bus.off('itemImageLoad',this.itemImageListener)
    }

}
</script>

<style scoped>
#detail {
    position: relative;
    z-index: 10;
    background-color: #fff;

    height: 100vh;
}
.content {
    height: calc(100% - 100px);
    overflow: hidden;
}
.detail-nav {
    position: relative;
    z-index: 10;
    background-color: #fff;
}
</style>
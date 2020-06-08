<template>
<div id="home">
  <nav-bar class="home-nav">
    <div slot="center">购物街</div>
  </nav-bar>
  
  <BScroll class="content" ref="scroll" :probe-type="3"
  @scroll="contentScroll" @pullingUp='loadMore'>
    <home-swiper :banners='banners'/>
    <home-recommend-view :recommends='recommends' />
    <feature-view/>
    <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick"/>
    <goods-list :goods='goods[currentType].list' />
  </BScroll>
  <back-top @click.native="backClick" v-show="isShowBackTop"/>
</div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar'
import TabControl from '../../components/content/tabControl/TabControl'
import GoodsList from '../../components/content/goods/GoodsList'
import BScroll from '../../components/common/scroll/Scroll'
import BackTop from '../../components/content/backTop/BackTop'

import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommendView from './childComps/HomeRecommendView'
import FeatureView from './childComps/FeatureView'

import {getHomeMullData,getHomeGoods} from "../../network/home"

  export default {
    name: "Home",
    components: {
      NavBar,
      TabControl,
      GoodsList,
      BScroll,
      BackTop,
      HomeSwiper,
      HomeRecommendView,
      FeatureView
    },
    data() {
      return{
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0,list: []},//流行
          'new': {page: 0,list: []},//新款
          'sell': {page: 0,list: []},//精选
        },
        currentType: 'pop',
        isShowBackTop: false
      }
    },
    created() {
      //请求数据,加this才是调用methods中方法
      this.getHomeMullData()
      //请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    methods: {
      //自定义事件监听
      tabClick(index) {
        console.log(index)
        switch(index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
          
        }
        
      },
      //网络请求
      getHomeMullData() {
        getHomeMullData().then(res =>{
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res =>{
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

        this.$refs.scroll.finishPullUp()
        this.$refs.scroll.scroll.refresh()//重新计算better-scroll

      })
      },
      backClick() {
        //console.log(this.$refs.scroll)
        this.$refs.scroll.scrollTo(0,0)
      },
      contentScroll(position) {
        console.log(position.y)
        this.isShowBackTop = (-position.y) > 1000
      },
      loadMore() {
        //console.log('加载更多')
        this.getHomeGoods(this.currentType)
      }

    },
  }
</script>

<style scoped>
#home{
  padding-top: 44px;
  height: 100vh;
  position: relative;
  
}
/* .content{
 height: calc(100% - 49px);
 overflow: hidden;
} */
.content{
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;
  z-index: 10;
  left: 0;
  right: 0;
  top: 0;
}
.tab-control{
  /* position: sticky; */
  top: 40px;
  z-index: 3;
}
</style>

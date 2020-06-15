<template>
  <div class="category">
    <nav-bar class="category-nav">
    <div slot="center">商品分类</div>
  </nav-bar>
  <tab-menu :categories='categories' @selectItem ='selectItem'/>
  <scroll class="category-scroll" ref="scroll">
    <category-tab-content :subcategories='showSubcategory'/>
      <tab-control  :titles="['流行','新款','精选']"
      @tabClick='tabClick'/>
    <goods-list :goods='showCategoryDetail'/>
  </scroll>
  </div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar'
import TabMenu from './childComps/TabMenu'
import CategoryTabContent from './childComps/CategoryTabContent'

import Scroll from '../../components/common/scroll/Scroll'
import TabControl from '../../components/content/tabControl/TabControl'
import GoodsList from '../../components/content/goods/GoodsList'
import {getCategory,getSubcategory,getCategoryDetail} from '../../network/category'
import {itemListenerMixin} from '../../common/mixin'
  export default {
    name: "Category",
    components: {
      NavBar,
      TabMenu,
      CategoryTabContent,
      Scroll,
      TabControl,
      GoodsList
    },
    mixins:[itemListenerMixin],
    data() {
      return {
        //分类数据
        categories: [],
        //分类子项数据，
        categoryData: {},
        //当前点击的数据。-1是用于判断，是否数据还没有请求过来就传递过去一个空值
        currentIndex: -1,
        currentType: 'pop'
      }
    },
    methods: {
      _getCategory() {
        getCategory().then(res => {
          //初始化分类数据
          this.categories = res.data.category.list
          // 2.初始化每个类别的子数据
          for (let i = 0; i < this.categories.length; i++) {
            this.categoryData[i] = {
              subcategories: {},
              categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }
            }
          }
          // 3.请求第一个分类的数据
          this._getSubcategories(0)
        })
      },
      _getSubcategories(index) {
        this.currentIndex = index;
        const mailKey = this.categories[index].maitKey;
        getSubcategory(mailKey).then(res => {
          this.categoryData[index].subcategories = res.data
          this.categoryData = {...this.categoryData}
          this._getCategoryDetail('pop')
          this._getCategoryDetail('sell')
          this._getCategoryDetail('new')
        })
      },
      _getCategoryDetail(type) {
		    // 1.获取请求的miniWallkey
        const miniWallkey = this.categories[this.currentIndex].miniWallkey;
        // 2.发送请求,传入miniWallkey和type
		    getCategoryDetail(miniWallkey, type).then(res => {
		      // 3.将获取的数据保存下来
		      this.categoryData[this.currentIndex].categoryDetail[type] = res
          this.categoryData = {...this.categoryData}
        })
      },
      selectItem(index) {
        this._getSubcategories(index)
      },
      tabClick(index) {
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
      }
    },
    computed: {
      showSubcategory() {
        if (this.currentIndex === -1) return {}
        return this.categoryData[this.currentIndex].subcategories
      },
      showCategoryDetail() {
		    if (this.currentIndex === -1) return []
		    return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
      }
    },
    created() {
      this._getCategory()
    },
    activated() {//被 keep-alive 缓存的组件激活时调用。
      this.$refs.scroll.refresh()
    },
  }
</script>

<style scoped>
.category-nav {
  background-color: var(--color-tint);
  color: #fff;
}
.category-scroll {
  position: absolute;
  top: 44px;
  left: 100px;
  right: 0px;
  height: calc(100vh - 44px - 49px);
  overflow: hidden;
}
</style>

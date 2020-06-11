import {debounce} from './utils'

export const itemListenerMixin = {
    data() {
        return {
            itemImageListener: null,
            newRefresh: null
        }
    },
    mounted() {
        //图片加载完成的监听
          this.newRefresh = debounce(this.$refs.scroll.refresh,50)
          this.itemImageListener = () => {this.newRefresh()}//重新计算better-scroll
          this.$bus.$on('itemImageLoad',this.itemImageListener)
      },
}
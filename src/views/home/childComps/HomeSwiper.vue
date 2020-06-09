<template>
<div>
  <Swiper>
    <SwiperItem v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad(index)" >
      </a>
    </SwiperItem>
  </Swiper>
</div>
</template>

<script>
import {Swiper, SwiperItem} from '../../../components/common/swiper'

export default {
    name: "HomeSwiper",
    props: {
        banners: {
            type: Array,
            default() {
                return []
            }
        }
    },
    components: {
        Swiper, 
        SwiperItem
    },

    methods: {
      imageLoad(index) {//第二张图片加载完，结构已经完成
        if (index === 1) {
          this.$emit('swiperImageLoad')
        }
        
      }
    }
}
</script>
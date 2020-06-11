<!--  -->
<template>
    <div class='goods-item' @click="itemClick">
        <img :src="showImage" alt="" @load="imageLoad">
        <div class="goods-info">
        <p>{{goodsItem.title}}</p>
        <span class="price">{{goodsItem.price}}</span>
        <span class="collect">{{goodsItem.cfav}}</span>
        </div>
    </div>
</template>

<script>

export default {
    name: 'GoodsListItem',
    props: {
        goodsItem:{
            type: Object,
            default(){
                return {}
            }
        }
    },

    components: {},
    data() {
//这里存放数据
        return {};
    },
    computed: {
      showImage() {
        return this.goodsItem.image || this.goodsItem.show.img
        //疑问，为何顺序是固定的。猜测home页面缓存没有销毁,存在但为空值？？？
        //Detail界面数据关闭销毁，打开请求，故没有缓存之类
      }
    },
    methods: {
      imageLoad() {
        this.$bus.$emit('itemImageLoad')
      },
      itemClick() {
        this.$router.push('/detail/' + this.goodsItem.iid)
      },
    }
}
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;

    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("../../../assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
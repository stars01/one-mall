<template>
  <div>
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list/>
    <bottom-bar/>
  </div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar'
import CartList from './childComps/CartList'
import BottomBar from './childComps/BottomBar'

import {mapGetters} from 'vuex'

  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      BottomBar
    },
    computed: {
      ...mapGetters(['cartLength'])
    },
  }
</script>

<style scoped>
.nav-bar {
  background-color: #ff81c0;
  color: #fff;
}
</style>

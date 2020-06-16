<template>
    <div id="list">
      <div>
        <div><img src="../../../assets/img/profile/message.svg" alt="">我的消息</div>
        <div><img src="../../../assets/img/profile/pointer.svg" alt="">积分商城</div>
        <div><img src="../../../assets/img/profile/vip.svg" alt="">会员卡</div>
      </div>
      <div>
        <div><img src="../../../assets/img/profile/cart.svg" alt="">我的购物车</div>
        <div><img src="../../../assets/img/profile/shopping.svg" alt="">下载APP</div>
      </div>
    </div>
</template>

<script>
	export default {
		name: "ListView",
	}
</script>

<style scoped>
#list>div {
  border: 0 solid #e9e9e9;
  border-top-width: 14px;
}
#list img {
  width: 26px;
  margin: 0 10px;
  position: relative;
  top: 7px;
  
}
#list>div>div {
  border: 0 solid #e9e9e9;
  border-top-width: 1px;
  height: 40px;
  line-height: 40px;
  /* padding: 7px 7px; */
}
</style>

<template>
  <div id="user-info">
    <div class="user-info-left"><img src="../../../assets/img/profile/avatar.svg" alt="" ></div>
    <div class="user-info-center">登录/注册</div>
    <div class="user-info-right">
      <img src="../../../assets/img/common/arrow-left.svg" alt="" >
    </div>
  </div>
</template>

<script>
	export default {
		name: "UserInfo"
	}
</script>

<style scoped>
#user-info {
  display: flex;
  height: 130px;
  background-color: var(--color-tint);

  box-shadow: 0 -1px 1px rgba(134, 134, 134, 0.3);
}
.user-info-left {
  width: 130px;

}
.user-info-left img {
  width: 130px;
}
.user-info-center {
  flex: 1;
  line-height: 130px;
  font-size: 18px;
  padding-left: 10px;
  color: #fff;
}
.user-info-right {
  width: 40px;
}
.user-info-right img {
  width: 40px;
  padding-top: 40px;
  
}
</style>

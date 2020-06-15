<template>
  <div class="profile">
    <nav-bar class="profile-nav">
    <div slot="center">个人信息</div>
  </nav-bar>
  <user-info/>
  <div class="money">
    <div>
      <p><span class="balance">{{moeny1.toFixed(2)}}</span>元</p>
      <p>我的余额</p>
    </div>
    <div class="money-center">
      <p><span class="balance">{{moeny2}}</span>个</p>
      <p>我的优惠</p>
    </div>
    <div>
      <p><span class="balance">{{moeny3}}</span>分</p>
      <p>我的积分</p>
    </div>
  </div>
  </div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar'

import UserInfo from './childComps/UserInfo'

  export default {
    name: "Profile",
    data() {
      return {
        moeny1:0,
        moeny2:0,
        moeny3:0
      }
    },
    components: {
      NavBar,
      UserInfo
    }
  }
</script>

<style scoped>
.profile-nav {
  background-color: var(--color-tint);
  color: #fff;
}

.money {
  display: flex;

}
.money div {
  flex: 1;
  text-align: center;
  font-size: 14px;
  line-height: 22px;
  padding: 12px 0;


}
.balance {
  color: #ff5555;
  font-size: 24px;
}
.money-center {
  border:0 solid #c4c4c4;
  border-width: 0 1px;
}
</style>

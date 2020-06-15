<!--  -->
<template>
    <div class='category-tab-content'>
        <div :key="index" class="category-detail-item" v-for="(item, index) in subcategories.list">
            <a :href="item.link"><img :src="item.image" alt="" /></a>
            <p>{{ item.title }}</p>
        </div>
    </div>
</template>

<script>

export default {
    name: 'CategoryTabContent',
    props: {
        subcategories:Object
    },
    data() {
        return {};
    },
    methods: {

    },
}
</script>

<style scoped>
.category-tab-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 10px;
}

.category-detail-item {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 80px;
  height: 100px;
  margin-bottom: 10px;
}

.category-detail-item img {
  width: 65px;
  margin-bottom: 7px;
}

.category-detail-item p {
  font-size: 14px;
}
</style>
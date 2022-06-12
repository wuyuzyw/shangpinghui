<template>
  <div>
    <ListContainer/>
    <TodayRecommend/>
    <MyRank/>
    <MyLike/>
    <MyFloor v-for="item in FloorList" :key="item.id" :floor="item"/>
    <MyBrand/>
  </div>
</template>

<script>
import ListContainer from './ListContainer'
import TodayRecommend from './TodayRecommend'
import MyRank from './Rank'
import MyLike from './Like'
import MyFloor from './Floor'
import MyBrand from './Brand'
import { mapState } from 'vuex'
export default {
  name: 'MyHome',
  components: {
    ListContainer,
    TodayRecommend,
    MyRank,
    MyLike,
    MyFloor,
    MyBrand
  },
  created () {
    this.$store.dispatch('home/floor')
  },
  computed: {
    ...mapState('home', ['FloorList'])
  }
}
</script>

<style>

</style>

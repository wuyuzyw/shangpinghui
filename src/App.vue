<template>
  <div>
    <MyHeader/>
    <TypeNav v-if="!$route.meta.hide"/>
    <router-view></router-view>
    <MyFooter/>
  </div>
</template>

<script>
import MyHeader from './components/Header'
import MyFooter from './components/Footer'
import TypeNav from './components/type_nav'
export default {
  name: 'App',
  components: {
    MyHeader,
    MyFooter,
    TypeNav
  }
}
</script>

<style>

</style>

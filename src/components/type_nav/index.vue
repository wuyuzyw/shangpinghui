<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseout="setId" @mouseover="show">
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
          <div class="sort" v-show="$route.meta.show || isShow">
            <div class="all-sort-list2">
              <div
                class="item"
                v-for="item in categoryList"
                :key="item.categoryId"
                @mouseover="changeId(item.categoryId)"
                @click="search"
              >
                <h3
                  :class="{
                    Bgcolor: currentId == item.categoryId ? true : false,
                  }"
                >
                  <a href="javascript:;" ref="c1" :Id="item.categoryId">{{
                    item.categoryName
                  }}</a>
                </h3>
                <div
                  class="item-list clearfix"
                  :style="
                    currentId == item.categoryId
                      ? { display: 'block' }
                      : { display: 'none' }
                  "
                >
                  <div class="subitem">
                    <dl
                      class="fore"
                      v-for="item in item.categoryChild"
                      :key="item.categoryId"
                    >
                      <dt>
                        <a href="javascript:;" ref="c2" :Id="item.categoryId">{{
                          item.categoryName
                        }}</a>
                      </dt>
                      <dd>
                        <em
                          v-for="item in item.categoryChild"
                          :key="item.categoryId"
                        >
                          <a
                            href="javascript:;"
                            ref="c3"
                            :Id="item.categoryId"
                            >{{ item.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'TypeNav',
  data () {
    return {
      currentId: 0,
      isShow: false
    }
  },
  created () {
    this.$store.dispatch('home/categoryList')
  },
  computed: {
    ...mapState('home', ['categoryList'])
  },
  methods: {
    changeId (id) {
      this.currentId = id
    },
    setId () {
      this.currentId = 0
      if (this.$route.name !== 'home') {
        this.isShow = false
      }
    },
    show () {
      if (this.$route.name !== 'home') {
        this.isShow = true
      }
    },
    search (e) {
      const location = {
        name: 'search',
        query: {
          categoryName: e.target.innerText
        }
      }
      if (this.$route.params) {
        location.params = this.$route.params
      }
      if (this.$refs.c1.includes(e.target)) {
        location.query.category1Id = e.target.getAttribute('Id')
        this.$router.push(location)
      } else if (this.$refs.c2.includes(e.target)) {
        location.query.category2Id = e.target.getAttribute('Id')
        this.$router.push(location)
      } else {
        location.query.category3Id = e.target.getAttribute('Id')
        this.$router.push(location)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .Bgcolor {
          background-color: skyblue;
        }
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            _height: 200px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
      }
    }
    .sort-enter,
    .sort-leave-to {
      opacity: 0;
    }
    .sort-enter-to {
      opacity: 1;
    }
    .sort-enter-active,
    .sort-leave-active {
      transition: all .5s linear;
    }
  }
}
</style>

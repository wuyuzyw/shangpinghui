<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="item in cartInfoList" :key="item.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" v-model="item.isChecked" @change="changeChecked(item)">
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl">
            <div class="item-msg">{{item.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{item.skuPrice}}.00</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="numCheck('-1',item)">-</a>
            <input autocomplete="off" type="text" :value="item.skuNum" minnum="1" class="itxt" @change="numCheck('0',item,$event.target.value)">
            <a href="javascript:void(0)" class="plus" @click="numCheck('1',item)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{item.skuNum*item.skuPrice}}.00</span>
          </li>
          <li class="cart-list-con7">
            <a href="javascript:;" class="sindelet" @click="deleteCart(item.skuId)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :disabled="this.cartInfoList.length===0?true:false" :checked="checkAll" @change="isCheck">
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:;" @click="deleteAll">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{tradeNum}}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ sumPrice }}.00</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="$router.push('/trade')">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import _ from 'lodash'
export default {
  name: 'ShopCart',
  created () {
    this.getList()
  },
  methods: {
    getList () {
      return this.$store.dispatch('shopCart/shopCartList')
    },
    async changeChecked (item) {
      let isChecked = 1
      isChecked = item.isChecked ? '1' : '0'
      try {
        await this.$store.dispatch('shopCart/changeCart', {
          skuId: item.skuId,
          isChecked: isChecked
        })
        this.getList()
      } catch (error) {
        console.log(error.message)
      }
    },
    async isCheck (e) {
      try {
        const isOne = e.target.checked ? 1 : 0
        await this.$store.dispatch('shopCart/changAll', isOne)
        this.getList()
      } catch (error) {
        alert(error.message)
      }
    },
    numCheck: _.throttle(async function (state, item, endvalue) {
      let disNum = 0
      switch (state) {
        case '1':
          disNum = 1
          break
        case '-1':
          disNum = item.skuNum > 1 ? -1 : 0
          break
        case '0':
          if (isNaN(endvalue * 1) || endvalue < 1) {
            disNum = 0
          } else {
            disNum = parseInt(endvalue - item.skuNum)
          }
      }
      try {
        await this.$store.dispatch('detail/addToCart', { skuNum: disNum, skuId: item.skuId })
        this.getList()
      } catch (error) {
        console.log(error.message)
      }
    }, 500, { trailing: false }),
    async deleteCart (skuId) {
      try {
        await this.$store.dispatch('shopCart/deleteCart', skuId)
        this.getList()
      } catch (error) {
        console.log(error.message)
      }
    },
    async deleteAll () {
      try {
        await this.$store.dispatch('shopCart/deleteAll')
        this.getList()
      } catch (error) {
        alert(error.message)
      }
    }
  },
  computed: {
    ...mapGetters('shopCart', ['shopCartList']),
    cartInfoList () {
      return this.shopCartList.cartInfoList || []
    },
    tradeNum () {
      return this.cartInfoList.filter((item) => {
        return item.isChecked === 1
      }).length
    },
    sumPrice () {
      return this.cartInfoList.reduce((total, item) => {
        total += item.skuNum * item.skuPrice
        return total
      }, 0)
    },
    checkAll () {
      if (this.cartInfoList.length === 0) { return false } else { return this.cartInfoList.every((item) => { return item.isChecked === 1 }) }
    }
  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: 'Microsoft YaHei';
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>

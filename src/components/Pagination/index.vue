<template>
  <div class="pagination">
    <button :disabled="pageNo==1" @click="$emit('getPage',pageNo-1)">上一页</button>
    <button v-if="startNumAndEndNum.start>1" @click="$emit('getPage',1)">1</button>
    <button v-if="startNumAndEndNum.start>2">···</button>
    <template v-for="(item,index) in startNumAndEndNum.end">
      <button v-if="item>=startNumAndEndNum.start" :key="index" :class="{active:pageNo==item}" @click="item!=pageNo&&$emit('getPage',item)">{{item}}</button>
    </template>
    <button v-if="startNumAndEndNum.end<totalPages-1">···</button>
    <button v-if="startNumAndEndNum.end<totalPages" @click="$emit('getPage',totalPages)">{{totalPages}}</button>
    <button :disabled="pageNo==totalPages" @click="$emit('getPage',pageNo+1)">下一页</button>

    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
export default {
  name: 'MyPagination',
  props: ['continus', 'pageSize', 'total', 'pageNo'],
  computed: {
    totalPages () {
      return Math.ceil(this.total / this.pageSize)
    },
    startNumAndEndNum () {
      let start = 0
      let end = 0
      if (this.totalPages < this.continus) {
        start = 1
        end = this.totalPages
      } else {
        start = this.pageNo - parseInt(this.continus / 2)
        end = this.pageNo + parseInt(this.continus / 2)
        if (start < 1) {
          start = 1
          end = this.continus
        }
        if (end > this.totalPages) {
          start = this.totalPages - this.continus + 1
          end = this.totalPages
        }
      }
      return { start, end }
    }
  }
}
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>

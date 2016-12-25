<template>
<div class="rank">
<div class="header">
    <mu-appbar title="VueDemo Music">
      <mu-icon-button icon='search' @click="searchW" slot="right"/>
    </mu-appbar>
</div>
<div class="list-wrapper">
  <Itemlist :api="listApi"></Itemlist>
</div>
</div>
</template>
<script>
import api from '../api/api.js'
import Itemlist from './ItemList'
export default {
  data () {
    return {
      currentSong: {
        'id': 0
      },
      listApi: api.getPlayList('542032543')
    }
  },
  components: {
    Itemlist
  },
  methods: {
    searchW () {
      // 触发父组件紧监听的事件
      this.$emit('searchW')
    }
  }

}
</script>
<style scopoed>
   .header {
    width: 100%;
    top:0;
    position: fixed;
    z-index: 9999;
  }
  .indexStyle {
    padding-left: 10px;
    font-size: 18px;
    font-weight: bolder;
  }
  .mu-item-title {
    white-space:nowrap;
    height: 1.7rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .list-wrapper {
    margin-top: 56px;
  }
  .center {
    display: block!important;
    margin: 50% auto 0;
  }
</style>

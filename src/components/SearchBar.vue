<template>
<div class="search-bar">
<mu-appbar>
  <mu-icon-button icon='keyboard_arrow_left' slot="left" @click="back"/>
  <form @submit.prevent="searchSong(words)" id="searchForm">
  <mu-text-field hintText="请输入歌曲关键字" v-model="words"/>
  </form>
</mu-appbar>
 <Itemlist :api="listApi" :role="role"></Itemlist>
</div>
</template>
<script>
import api from '../api/api.js'
import Itemlist from './ItemList'
export default {
  data () {
    return {
      words: '',
      listApi: '',
      role: 'search'
    }
  },
  components: {
    Itemlist
  },
  created () {

  },
  methods: {
    searchSong (s) {
      this.listApi = api.searchSong(s)
    },
    back () {
      // 触发父组件监听的返回事件
      this.$emit('back')
    }
  }
}
</script>
<style lang="less" scopoed>
#searchForm {
.mu-text-field-hint {
    color: fade(#FFF, 54%);
  }
  .mu-text-field-input {
    color: #FFF;
  }
  .mu-text-field-focus-line {
    background-color: #FFF;
  }
}
.search__input {
  outline: none;
  height: 35px;
  color: #fff;
  border:none;
  background: transparent;
}
</style>

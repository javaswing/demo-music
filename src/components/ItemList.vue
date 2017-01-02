<template>
  <div>
  <mu-circular-progress :size="60" class="center" v-if="isloading"/>
    <mu-list :value="value" v-show="!isloading" @change="change">
      <div v-for="(item, index) in lists">
       <mu-list-item  :disableRipple="true" :value="index + 1" :title="item.name" @click="Player(item, index)" :describeText="item.ar[0].name" >
        <span slot="left" v-if="" class="indexStyle">{{index + 1}}</span>
      </mu-list-item>
      <mu-divider inset/>
    </mu-list>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'item-list',
  props: {
    role: {
      type: String,
      default: 'list'
    },
    api: {
      type: String
    },
    words: {
      type: ''
    }
  },
  data () {
    return {
      lists: [],
      isloading: false,
      currentPlay: false,
      value: 0
    }
  },
  created () {
    if (this.role === 'list') this.loadData()
  },
  watch: {
    api (val, oldVal) {
      this.loadData()
    }
  },
  methods: {
    loadData () {
      this.isloading = true
      this.$http.get(this.api).then((res) => {
        if (this.role === 'list') {
          this.lists = res.data.playlist.tracks
        } else if (this.role === 'search') {
          this.lists = res.data.result.songs
        }
        this.isloading = false
      }, (res) => {
        console.log('jsonp fail')
      })
    },
    change (val) {
      this.value = val
    },
    Player (song) {
      // 传递数据给play组件
      // 为了统一数据模型防止接口改变，这里对自定义的数据模型赋值
      var audio = {}
      audio.id = song.id  // id
      audio.singer = song.ar[0].name // 演唱者
      audio.album_pic = song.al.picUrl
      audio.name = song.name
      // 通过Vuex改变状态
      this.$store.commit('addToList', audio)
      this.$store.commit('setAudio')
    }
  },
  computed: {
    ...mapGetters([
      'currentIndex'
    ])
  }
}
</script>
<style scopoed>
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

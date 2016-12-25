<template>
<div class="foot">
    <div class="player-mini">
      <div class="mini-content">
          <audio  :src="audio.location"  @timeupdate="updateTime"  @canplay="canPlaySong" @error="loadError" @ended="endPlayNext" autoplay id="audioPlay"></audio>
          <div class="cover">
              <mu-circular-progress v-show="loading" :size="40"/>
              <img class="xmplogo" @click="showDetail" v-show="!loading" :src="audio.album_pic" alt="当我在这里">
          </div>
          <div class="info">
              <div class="name xmpname" @click="showDetail">{{audio.name}}</div>
              <div class="artist xmpartist" @click="showDetail">{{audio.singer}}</div>
              <div class="control">
                 <mu-icon-button icon="fast_rewind" :size="32" @click="playPrev"/>
                 <mu-icon-button :icon="play"  @click="toggleStatus" :size="32">
                 </mu-icon-button>
                 <mu-icon-button icon="fast_forward" @click="playNext" :size="32"/>
              </div>
          </div>
          <div class="pro">
          <div class="pro-load proload" :style="{'-webkit-transform':'translateX(' + loadedTime +'%)' }"></div>
          <div class="pro-play proplay" :style="{'-webkit-transform':'translateX(' + playerTime +'%)' }"></div> </div>
      </div>
      <!-- 播放列表 -->
      <mu-toast v-if="toast" :message="toastMsg" @close="hideToast"/>
    </div>
</div>
</template>
<script>
import bus from '../bus.js'
import api from '../api/api.js'
export default {
  data () {
    return {
      audio: {
        'id': 0,
        'name': '标题',
        'singer': '演唱者',
        'album_pic': 'static/defaultD.png',
        'lyric': '',
        'location': '',
        'album': ''
      },
      loading: false,
      first: true,
      status: true,
      play: 'play_circle_outline',
      currentTime: 0,
      durationTime: 0,
      songList: [],  // 播放器的播放列表
      currentIndex: 0, // 当前播放歌曲在列表中的位置
      bufferedTime: 0,
      bottomSheet: false,
      sheetStyle: 'songlist',
      listStyle: 'listStyle',
      toast: false,   // 歌曲加载出错时的提示
      toastMsg: '',
      toastTimer: ''
    }
  },
  created () {
    var vm = this
    // 监听Rank组件发送的播放音乐事件
    bus.$on('player', function (song) {
      vm.audio = song
      vm.loading = true
      vm.loadSongSrc(song.id)
      vm.play = 'pause_circle_outline'
      vm.status = false
      vm.currentTime = 0
      vm.durationTime = 0
      vm.bufferedTime = 0
      var flag = false
      var songIndex = 0
      vm.songList.forEach(function (element, index) { // 利用歌曲ID的唯一性检测
        if (element.id === song.id) {
          flag = true
          songIndex = index
        }
      })
      if (flag) { // 检测到有这首歌
        vm.currentIndex = songIndex + 1
      } else {
        vm.currentIndex = vm.songList.push(song)
      }
    })
    // 监听PlayDetail发送的音乐播放事件
    bus.$on('playEvent', function (isPlay) {
      vm.toggleStatus()
    })
    // 监听PlayerDetail发送的上一首
    bus.$on('prev', function () {
      vm.playPrev()
      vm.sendMsgD()
    })

    // 监听PlayerDetail发送的下一首
    bus.$on('next', function () {
      vm.playNext()
      vm.sendMsgD()
    })

    // 监听PalyerDetail发的改变时间事件
    bus.$on('changeTime', function (precentage) {
      document.getElementById('audioPlay').currentTime = vm.durationTime * precentage
      vm.currentTime = vm.durationTime * precentage
    })
  },
  methods: {
    toggleStatus () {
      if (this.status) {
        this.play = 'pause_circle_outline'
        document.getElementById('audioPlay').play()
      } else {
        this.play = 'play_circle_outline'
        document.getElementById('audioPlay').pause()
      }
      this.status = !this.status
    },
    // 当数据加载到能播放时
    canPlaySong () {
      this.loading = false
    },
    // 歌曲加载出错时
    loadError () {
      if (document.getElementById('audioPlay').currentSrc) { // 判断是否有歌词正加载
        this.loading = false
        this.toast = true
        this.toastMsg = '当前歌曲地址有错误！'
        if (this.toastTimer) clearTimeout(this.toastTimer)
        this.toastTimer = setTimeout(() => { this.toast = false }, 2000)
      }
    },
    hideToast () {
      this.toast = false
      if (this.toastTimer) clearTimeout(this.toastTimer)
    },
    // 当前歌曲播放完时，从列表加载下一首
    playNext () {
      console.log('next')
      if (this.songList.length > 0) { // 是否有歌曲
        this.currentIndex++
        if (this.currentIndex > this.songList.length) { // 超出列表
          this.currentIndex = 1
        }
        this.audio = this.songList[this.currentIndex - 1]
      } else {
        this.toast = true
        this.toastMsg = '请先选择歌曲'
        if (this.toastTimer) clearTimeout(this.toastTimer)
        this.toastTimer = setTimeout(() => { this.toast = false }, 2000)
      }
    },
    playPrev () {
      if (this.songList.length > 0) { // 是否有歌曲
        this.currentIndex--
        if (this.currentIndex <= 0) { // 超出列表
          this.currentIndex = this.songList.length
        }
        this.audio = this.songList[this.currentIndex - 1]
      } else {
        this.toast = true
        this.toastMsg = '请先选择歌曲'
        if (this.toastTimer) clearTimeout(this.toastTimer)
        this.toastTimer = setTimeout(() => { this.toast = false }, 2000)
      }
    },
    // 解决在播放详情页自动播放完数据未变化的问题
    endPlayNext () {
      this.playNext()
      this.sendMsgD()
    },
    // 更新进度条事件
    updateTime () {
      var vm = this
      this.currentTime = parseInt(document.getElementById('audioPlay').currentTime)
      this.durationTime = parseInt(document.getElementById('audioPlay').duration)
      if (document.getElementById('audioPlay').onprogress) {  // 防止在未加载完成时，切歌出现的错误
        this.bufferedTime = parseInt(document.getElementById('audioPlay').buffered.end(0))
      }
      bus.$emit('transferTime', vm.currentTime, vm.durationTime, vm.bufferedTime)
    },
    showDetail () {
      var vm = this
      // 触发父组件监听的事件
      this.$emit('detail')
      // 触发PlayDetail组件监听的打开界面事件
      bus.$emit('openDetail', vm.audio, vm.status, vm.currentTime, vm.durationTime, vm.bufferedTime)
    },
    sendMsgD () {
      var vm = this
      bus.$emit('openDetail', vm.audio, vm.status, vm.currentTime, vm.durationTime, vm.bufferedTime)
    },
    loadSongSrc (id) {
      this.$http.get(api.getSong(id)).then((res) => {
        this.audio.location = res.data.data[0].url
        this.loading = false
      }, (res) => {
        console.log('jsonp fail')
      })
    }
  },
  computed: {
    loadedTime () {
      return this.bufferedTime / this.durationTime * 100
    },
    playerTime () {
      return this.currentTime / this.durationTime * 100
    }
  }
}
</script>
<style lang="less" scopoed>
 @import "../../node_modules/muse-ui/less/vars.less";
  .foot {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 998;
  }
.player-mini {
    width: 100%;
    height: 6rem;
    position: relative;
    background-color: rgba(255,255,255,.9);
    color: #333333;
}
.player-mini .mini-content .cover {
    margin-top: .3rem;
    width: 5rem;
    height: 5rem;
    overflow: hidden;
    float: left;
    padding: .3rem;
}
.player-mini .mini-content .cover img {
    width: 100%;
    height: 100%;
}
.player-mini .mini-content .info {
    overflow: hidden;
    padding: .5rem;
    height: 5rem;
    position: relative;
    line-height: 2rem;
}
.player-mini .mini-content .info .name {
    font-size: 1.6rem;
}
.player-mini .mini-content .info .name, .player-mini .mini-content .info .artist {
    margin-right: 13rem;
    overflow: hidden;
    display: block;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 2.4rem;
}
.player-mini .mini-content .info .artist {
    color: #8a8a8a;
    font-size: 1.4rem;
}
.player-mini .mini-content .info .name, .player-mini .mini-content .info .artist {
    margin-right: 13rem;
    overflow: hidden;
    display: block;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 2.4rem;
}
/*按钮*/
.player-mini .mini-content .info .control {
    position: absolute;
    height: 48px;
    right: 0;
    top: 50%;
    margin-top: -24px;
    color:  @primaryColor;
}

/*进度条*/
.player-mini .mini-content .pro {
    width: 100%;
    height: .2rem;
    position: absolute;
    left: 0;
    bottom: 0;
    background-color: rgba(255,255,255,.5);
}
.player-mini .mini-content .pro-load, .player-mini .mini-content .pro-play {
    width: 100%;
    height: .2rem;
    position: absolute;
    left: -100%;
}
.player-mini .mini-content .pro-load {
    background-color: rgba(220, 217, 217, 0.4);
}
.player-mini .mini-content .pro-play {
    background-color:  @primaryColor;
}
.songlist {
  height: 260px;
  overflow: auto;
}
.songlist-title {
  position: fixed;
  background: #fff;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid rgba(0,0,0,.12);
  text-align: center;
}
</style>


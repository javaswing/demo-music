<template>
<div class="foot">
    <div class="player-mini">
      <div class="mini-content">
          <audio :src="audio.location" @timeupdate="updateTime"  @canplay="canPlaySong" @error="loadError" @ended="playNext" autoplay id="audioPlay">
          </audio>
          <div class="cover">
              <mu-circular-progress v-show="loading" :size="40"/>
              <img class="xmplogo" @click="showDetail" v-show="!loading" :src="audio.album_pic" :alt="audio.name">
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
          <div class="pro-load proload" :style="{'-webkit-transform':'translateX(' + bufferedTime +'%)' }"></div>
          <div class="pro-play proplay" :style="{'-webkit-transform':'translateX(' + prCurrentTime +'%)' }"></div> </div>
      </div>
      <!-- 播放列表 -->
    </div>
</div>
</template>
<script>
import api from '../api/api.js'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      loading: false,
      play: 'play_circle_outline',
      bottomSheet: false,
      sheetStyle: 'songlist',
      listStyle: 'listStyle'
    }
  },
  watch: {
    audio (val) {
      if (!val.location) {
        this.loadSongSrc(val.id)
      }
    },
    playing (val) {
      if (val) {
        // DOMException: The element has no supported sources.
        // https://developers.google.com/web/updates/2016/03/play-returns-promise?hl=en
        this.play = 'pause_circle_outline'
        var playPromise = document.getElementById('audioPlay').play()
        // In browsers that don’t yet support this functionality,
        // playPromise won’t be defined.
        if (playPromise !== undefined) {
          playPromise.then(function () {
            // Automatic playback started!
          /* eslint-disable */
          }).catch(function (error) {
            // Automatic playback failed.
            // Show a UI element to let the user manually start playback.
          })
          /* eslint-enable */
        }
      } else {
        this.play = 'play_circle_outline'
        document.getElementById('audioPlay').pause()
      }
    }
  },
  methods: {
    toggleStatus () {
      if (this.playing) {
        this.$store.commit('pause')
      } else {
        this.$store.commit('play')
      }
    },
    // 当数据加载到能播放时
    canPlaySong () {
      this.loading = false
    },
    // 歌曲加载出错时
    loadError () {
      if (document.getElementById('audioPlay').currentSrc) { // 判断是否有歌词正加载
        this.loading = false
      }
    },
    // 当前歌曲播放完时，从列表加载下一首
    playNext () {
      this.$store.commit('playNext')
    },
    playPrev () {
      this.$store.commit('playPrev')
    },
    // 更新进度条事件
    updateTime () {
      var vm = this
      var time = parseInt(document.getElementById('audioPlay').currentTime)
      // 防止在未加载完成时，切歌出现的错误
      // Failed to execute 'end' on 'TimeRanges':
      document.getElementById('audioPlay').onprogress = function () {
        vm.$store.commit('updateBufferedTime', parseInt(document.getElementById('audioPlay').buffered.end(0)))
      }
      this.$store.commit('updateDurationTime', parseInt(document.getElementById('audioPlay').duration))
      if (this.change) {
        document.getElementById('audioPlay').currentTime = this.tmpCurrentTime
        this.$store.commit('setChange', false)
      } else {
        this.$store.commit('updateCurrentTime', time)
      }
    },
    showDetail () {
      this.$emit('detail')
    },
    loadSongSrc (id) {
      if (id === 0) return
      this.$http.get(api.getSong(id)).then((res) => {
        this.$store.commit('setLocation', res.data.data[0].url)
        this.$store.commit('play')
        this.loading = true
      }, (res) => {
        console.log('jsonp fail')
      })
    }
  },
  filters: {
    pre (time) {
      return time / this.durationTime * 100
    }
  },
  computed: {
    ...mapGetters([
      'currentTime',
      'bufferedTime',
      'tmpCurrentTime',
      'prCurrentTime',
      'audio',
      'playing',
      'change'
    ])
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


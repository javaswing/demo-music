<template>
 <section class="main">
  <div class="content">
    <div class="player">
      <div class="player-inner">
        <mu-appbar :title="audio.name + '-' +audio.singer">
        <mu-icon-button icon='keyboard_arrow_left' @click="back" slot="left"/>
        <mu-icon-button icon='more_horiz' slot="right"/>
      </mu-appbar>
        <div class="cover h5p-pause" :class="{'h5p-roll': isPlay}">
          <img :src="audio.album_pic" class="img1" :alt="audio.name">
        </div>
        <div id="lyric" class="lyric lrc">
          <div class="lrc-inner" style="transition: -webkit-transform 0.3s ease-out; transform-origin: 0px 0px 0px;" :style="{'transform':' translate3d(0px,'+ lrcOffset +'px, 0px)'}">
            <p v-for="(item, index) in afterLrc" :id="'line-'+index" :key="index">{{item.txt}}</p>
          </div>
        </div>
        <div class="pro">
          <div class="pro-wrap">
            <mu-slider v-model="playerTime" @change="changeTime" :disabled="!sliderStatus" class="song-slider"/>
          </div>
          <div class="time">
            <time id="cur">{{currentTime | time}}</time>
            <time id="total">{{durationTime | time}}</time>
          </div>
        </div>
        <div class="control-bar">
           <i class="control-btn btn-prev btn-sm" @click="prev"></i>
           <i class="control-btn btn-play btn-lg" @click="togglePlayer" :class="{'btn-pause':isPlay}"></i>
           <i class="control-btn btn-next btn-sm" @click="next"></i>
        </div>
      </div>
      <div class="mask">
       <div class="album-cover" :style="{'background-image':'url(' + audio.album_pic + ')'}"></div>
        <div class="cover-mask" style="opacity:0.6;"></div>
      </div>
    </div>
  </div>
 </section>
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
        'location': '',
        'album': ''
      },
      lyric: '',
      afterLrc: [],
      isPlay: false,
      currentTime: 0,
      durationTime: 0,
      bufferedTime: 0,
      lrcIndex: 0,
      sliderStatus: false
    }
  },
  created () {
    var vm = this
    // 监听Play组件发送的事件
    bus.$on('openDetail', function (song, status, currentTime, durationTime, bufferedTime) {
      vm.isPlay = !status
      vm.audio = song
      if (song.id > 0) {
        vm.sliderStatus = true
      }
      vm.currentTime = currentTime
      vm.durationTime = durationTime
      vm.bufferedTime = bufferedTime
      vm.loadLrc(song.id)
    })

    // 监听Play组件发送的时间更新事件
    bus.$on('transferTime', function (currentTime, durationTime, bufferedTime) {
      vm.currentTime = currentTime
      vm.durationTime = durationTime
      vm.bufferedTime = durationTime
    })
  },
  methods: {
    back () {
      // 触发返回事件
      this.$emit('back')
    },
    // 播放和暂停事件
    togglePlayer () {
      var vm = this
      this.isPlay = !this.isPlay
      // 触发Play组件监听的播放事件
      bus.$emit('playEvent', vm.isPlay)
    },
    prev () {
      bus.$emit('prev')
    },
    next () {
      bus.$emit('next')
    },
    changeTime (value) { // 改变播放时间事件
      var precentage = value / 100
      this.currentTime = this.durationTime * precentage
      // 发送给Palyer组件
      bus.$emit('changeTime', precentage)
    },
    loadLrc (id) {
      this.afterLrc = [{'txt': '正在加载中...'}]
      if (!id) {
        this.afterLrc = [{'txt': '这里显示歌词哦！'}]
        return
      }
      this.$http.get(api.getLrc(id)).then((res) => {
        // 1、先判断是否有歌词
        if (res.data.nolyric) {
          this.afterLrc = [{'txt': '(⊙０⊙) 暂无歌词'}]
        } else {
          this.lyric = res.data.lrc.lyric
          this.getLrc()
        }
      }, (res) => {
        console.log('lrc fail')
      })
    },
    getLrc () {
      if (this.lyric) {
        var lyrics = this.lyric.split('\n')
        var lrcObj = []
        /*eslint-disable */
        var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g
        /*eslint-enable */
        // 思路：1、把歌词进行处理以时间和歌词组成一个对象，放入afterLrc数组中
        // 2、在computed方法中根据当前的时间进行匹配歌词，然后查找在数据中的位置计算offset值
        for (var i = 0; i < lyrics.length; i++) {
          var timeRegExpArr = lyrics[i].match(timeReg)
          if (!timeRegExpArr) continue
          var txt = lyrics[i].replace(timeReg, '')
          // 处理时间
          for (var k = 0; k < timeRegExpArr.length; k++) {
            var array = {}
            var t = timeRegExpArr[k]
            /*eslint-disable */
            var min = Number(String(t.match(/\[\d*/i)).slice(1))
            var sec = Number(String(t.match(/\:\d*/i)).slice(1))
            /*eslint-enable */
            var time = min * 60 + sec
            array.time = time
            array.txt = txt
            lrcObj.push(array)
          }
        }
        this.afterLrc = lrcObj
      }
    }
  },
  filters: {
    // 时间字符格式化
    time (value) {
      var length = Math.floor(parseInt(value))
      var minute = Math.floor(value / 60)
      if (minute < 10) {
        minute = '0' + minute
      }
      var second = length % 60
      if (second < 10) {
        second = '0' + second
      }
      return minute + ':' + second
    }
  },
  computed: {
    playerTime () {
      return this.currentTime / this.durationTime * 100
    },
    lrcOffset () {
      if (this.afterLrc) {
        // 1、根据时间获得歌词
        var current = Math.round(this.currentTime)
        // 2、根据时间得到歌词
        for (var i = 0; i < this.afterLrc.length; i++) {
          if (this.afterLrc[i].time === current) this.lrcIndex = i
        }
        return -(this.lrcIndex) * 58
      }
    }
  }
}
</script>
<style scopoed lang="less">
  .content {
    overflow: hidden;
    min-height: 100%;
  }

   .player .song-tit .name {
      overflow: hidden;
      display: block;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  .player {
    height: 100%;

    .player-inner {
      position: relative;
      z-index: 2;
      box-sizing: border-box;
    }
    .song-tit {
      color: #fff;
      padding-top: 2rem;
      padding-bottom: 2rem;
      text-align: center;
      line-height: 20px;

      .name {
        font-size: 1.4rem;
      }

      .singer a:extend(.player .song-tit .name ) {
          text-decoration: none;
          color: #fff;
      }
    }
    .mu-appbar-title {text-align: center;font-size: 14px;}
    .mu-appbar {
      background-color: transparent;
      margin-bottom: 15px;
    }
    .mu-paper-1 {box-shadow: none;}
    .cover {
      max-width: 60%;
      min-height: 80px;
      margin: 0 auto;

      .img1 {
        width: 100%;
        border-radius: 50%;
        box-shadow: 0 0 15px rgba(255, 255, 255, 0.5)
      }
    }
    .h5p-pause {
      -webkit-animation-play-state: paused;
      animation-play-state: paused;
    }
    .h5p-roll {
      -webkit-animation: Circle 10s linear infinite 0s forwards;
      animation: Circle 10s linear infinite 0s forwards;
    }

    .lyric {
      color: #999;
      text-align: center;
      margin: 10px 20px 0;
      line-height: 22px;
      font-size: 13px;
    }
    .lrc {
      height: 42px;
      overflow: hidden;
      position: relative;
    }
    .lrc-inner {
      position: absolute;
      left: 10px;
      right: 10px;
      overflow: hidden;
      p {
        overflow: hidden;
        height: 42px;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 16px;
        color: #fff;
        text-align: center;
      }
    }

    .pro {
      position: relative;
    }
    .pro-wrap {
      margin: 0 5rem;
      padding: 2rem 0 1rem;
      position: relative;
      margin-bottom: 1rem;
    }
    .time {
      color: #fff;
      font-size: 12px;
      time {
        width: 3rem;
        height: 1.2rem;
        line-height: 1.2rem;
        position: absolute;
        top: 50%;
        margin-top: -.1rem;
        opacity: .5;
      }
      #cur {
        left: 1rem;
      }
      #total {
        right: 1rem;
      }
    }
    .song-slider {
      margin-bottom:0;
    }
    .control-bar {
      overflow: hidden;
      padding: 0 10px;
      text-align: center;
      width: 100%;
    }

    .control-btn {
      display: block;
      float: left;
      width: 33.3%;
      height:96px;
    }
    .btn-sm {

    }
    .btn-lg {

    }
    .btn-prev {
      background: url('../../static/prev.png') no-repeat center;
      background-size:60%;
    }
    .btn-next {
      background: url('../../static/next.png') no-repeat center;
      background-size:60%;
    }
    .btn-play {
      background: url('../../static/play.png') no-repeat center;
      background-size:90%;
    }
    .btn-pause {
      background: url('../../static/pause.png') no-repeat center;
      background-size:90%;
    }

    // 背景
    .mask {
      width: 100%;
      height: 100%;
      overflow: hidden;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;
    }

    .album-cover {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 2;
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center;
      filter: blur(1.2rem);
      -webkit-filter: blur(1.2rem);
      -webkit-transform: scale(1.05);
    }
    .cover-mask {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 3;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,.8);
    }

  }


  // 封面动画
@-webkit-keyframes Circle {
    from{
        -webkit-transform: rotate(0deg);
    }
    to{
        -webkit-transform: rotate(360deg);
    }
}
@keyframes Circle {
    from{
        transform: rotate(0deg);
    }
    to{
        transform: rotate(360deg);
    }
}
</style>

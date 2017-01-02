import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    audio: {
      'id': 0,
      'name': '标题',
      'singer': '演唱者',
      'album_pic': 'static/defaultD.png',
      'lyric': '',
      'location': '',
      'album': ''
    },
    currentIndex: 0, // 当前播放的歌曲位置
    playing: false, // 是否正在播放
    loading: false, // 是否正在加载中
    songList: [],    // 播放列表
    currentTime: 0,
    tmpCurrentTime: 0,
    durationTime: 0,
    bufferedTime: 0,
    change: false   // 判断是更改的时间还是播放的时间
  },
  getters: {
    audio: state => state.audio,
    playing: state => state.playing,
    durationTime: state => state.durationTime,
    currentIndex: state => state.currentIndex,
    tmpCurrentTime: state => state.tmpCurrentTime,
    change: state => state.change,
    currentTime: state => state.currentTime,
    prCurrentTime: state => {
      return state.currentTime / state.durationTime * 100
    },
    bufferedTime: state => {
      return state.bufferedTime / state.durationTime * 100
    }
  },
  mutations: {
    play (state) {
      state.playing = true
    },
    pause (state) {
      state.playing = false
    },
    setAudio (state) {
      state.audio = state.songList[state.currentIndex - 1]
    },
    setChange (state, flag) {
      state.change = flag
    },
    setLocation (state, location) {
      state.audio.location = location
    },
    updateCurrentTime (state, time) {
      state.currentTime = time
    },
    updateDurationTime (state, time) {
      state.durationTime = time
    },
    updateBufferedTime (state, time) {
      state.bufferedTime = time
    },
    changeTime (state, time) {
      state.tmpCurrentTime = time
    },
    playNext (state) { // 播放下一曲
      state.currentIndex++
      if (state.currentIndex > state.songList.length) {
        state.currentIndex = 1
      }
      state.audio = state.songList[state.currentIndex - 1]
    },
    playPrev (state) { // 播放上一曲
      state.currentIndex--
      if (state.currentIndex < 1) {
        state.currentIndex = state.songList.length
      }
      state.audio = state.songList[state.currentIndex - 1]
    },
    addToList (state, item) {
      var flag = false
      state.songList.forEach(function (element, index) { // 检测歌曲重复
        if (element.id === item.id) {
          flag = true
          console.log('index:' + index)
          state.currentIndex = index + 1
        }
      })
      if (!flag) {
        state.songList.push(item)
        state.currentIndex = state.songList.length
      }
    }
  }
})
export default store

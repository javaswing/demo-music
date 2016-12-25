<template>
<div id="app">
  <transition>
  <SearchBar @back="toggleSearch" v-if="searchShow&&!detailShow"></SearchBar>
  </transition>
  <transition>
    <Rank v-show="!searchShow&&!detailShow" @searchW="toggleSearch"></Rank>
  </transition>
  <Player v-show="!detailShow" @detail="toggleDetail"></Player>
  <transition name="slide-fade">
    <PlayerDetail v-show="detailShow" @back="toggleDetail"></PlayerDetail>
  </transition>
</div>
</template>
<script>
import SearchBar from './components/SearchBar'
import Rank from './components/Rank'
import Player from './components/Player'
import PlayerDetail from './components/PlayerDetail'
export default {
  data () {
    return {
      searchShow: false,
      detailShow: false
    }
  },
  components: {
    Rank,
    SearchBar,
    Player,
    PlayerDetail
  },
  methods: {
    toggleSearch () {
      this.searchShow = !this.searchShow
    },
    toggleDetail () {
      this.detailShow = !this.detailShow
    }
  }
}
</script>
<style scopoed>
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-active {
    transform: translateY(20px);
    opacity: 0;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>

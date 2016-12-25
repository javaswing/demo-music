// 请求的域名
const _baseUrl = 'https://api.imjad.cn/cloudmusic'

export default {
  getSong (id) {
    return _baseUrl + '?id=' + id
  },
  getLrc (id) {
    return _baseUrl + '?type=lyric&id=' + id
  },
  getDetail (id) {
    return _baseUrl + '?type=detail&id=' + id
  },
  getPlayList (id) {
    return _baseUrl + '?type=playlist&id=' + id
  },
  getMv (id) {
    return _baseUrl + '?type=mv&id=' + id
  },
  searchSong (word) {
    return _baseUrl + '?type=search&s=' + word
  }
}

## demo-music react hook版本

> 使用 `typescript`开发，版本依赖如下:

- `"react": "^17.0.1"`
- ` "react-dom": "^17.0.1"`
- `"typescript": "^4.1.3"`


## 核心
- redux部分使用了 `redux-toolkit`进行简化编写
- audio部分使用了 `react-use-audio-player`插件进行编写

## 运行
请先确认本地已经安装了docker，后台服务是通过docker镜像启用。执行以下shell脚本
```shell
docker pull binaryify/netease_cloud_music_api

docker run -d -p 9000:3000 --name netease_cloud_music_api    binaryify/netease_cloud_music_api

# 安装依赖
yarn
# 之后启动项目
yarn start
```

## todo
- [ ] 列表`scroll-view`组件的封装
- [ ] 播放器列表的功能的实现及mini模式组件
- [ ] `play-list`组件功能的完善
- [ ] 真机模式下的详细调试

## 运行图

## 鸣谢
 - [NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)

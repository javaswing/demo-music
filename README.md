## demo-music react hook版本

> 使用 `typescript`开发，版本依赖如下:

- `"react": "^17.0.1"`
- ` "react-dom": "^17.0.1"`
- `"typescript": "^4.1.3"`


## redux 部分

### player 播放器配置

- `playerModel` 播放模式
- `playerList` 播放列表
- `currentSongId` 当前播放歌曲 ID,信息从 playList 中获取
- `nextSongId` 下一个播放歌 ID
- `prevSongId` 上一个播放 ID

## QA

- [目前版本的 create-react-app 安装 node-sass 最新版本出错](https://exerror.com/error-node-sass-version-5-0-0-is-incompatible-with-4-0-0/)

- 歌词进度显示不是很准确是因为，原来的歌词时间也不准

- 如果想让`typescript-plugin-css-modules`这个插件生效，请在打开`TSX`文件时，选择当前 workspace 中的 ts 版本
- 另外如果`typescript-plugin-css-modules`中的`classnameTransform`使用的是`camelCaseOnly`,需要在 webpack 中进行配置

```js
modules: {
  exportLocalsConvention: "camelCase",
  getLocalIdent: getCSSModuleLocalIdent,
}
```

## 说明

- 为`scss`生成的`*.d.ts`描述文件在`react-app-env.d.ts`中,目前对于引入的`style`文件的提示使用的是[`typescript-plugin-css-modules`](https://github.com/mrmckeb/typescript-plugin-css-modules)插件,目前仅支持`*.module.scss`类文件提示（暂时不会生成`*.d.ts`）文件，也能实现智能提示

## docker 运行服务端
```shell
docker pull binaryify/netease_cloud_music_api

docker run -d -p 9000:3000 --name netease_cloud_music_api    binaryify/netease_cloud_music_api
```

## 其它

- [`react-app-env.d.ts`](https://github.com/lizhongzhen11/dailyGain/issues/36)
- [使用 SASS 生成 CSS 模块的 TypeScript 定义](https://skovy.dev/generating-typescript-definitions-for-css-modules-using-sass/)
- [Increasing the Value of CSS Modules with Typescript](https://spin.atomicobject.com/2020/06/22/css-module-typescript/)
- [css modules in Typescript](https://codepen.io/codiechanel/post/css-modules-in-typescript)

## 鸣谢
 - [NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)

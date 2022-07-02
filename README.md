# YouTube Live Sync

Firefox向け。YouTubeのライブ配信・プレミア公開の配信時の実時間を表示します。

## ビルド方法

1. `git clone https://github.com/chika3742/yt-live-sync.git`
2. `yarn install` or `npm install`
3. `yarn build` or `npm run build` (余計なZipファイルが出来ます)

## Firefoxへの適用方法

1. [about:debugging#/runtime/this-firefox](about:debugging#/runtime/this-firefox)を開きます。
2. 「一時的なアドオンを読み込む」をクリックします。
3. manifest.jsonなど適当なファイルを選択します。

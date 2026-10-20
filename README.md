# Random RE Visualizer

[ブラウザで使う](https://tools.oz-coden.com/random-re-visualizer/)

正規表現に一致するサンプル文字列をランダムに5件生成します。`randexp.js`を同梱し、生成処理はWeb Workerで実行します。

## 実行方法

1. このリポジトリをクローンまたはダウンロードし、フォルダ構成を保ちます。
2. リポジトリのルートで `python -m http.server 8000` を実行します（Python 3が必要です）。
3. ブラウザで `http://localhost:8000/` を開きます。

実行時は静的なHTML・CSS・JavaScriptだけを使います。Node.jsやAPIサーバー、ビルド工程は不要です。入力内容の処理はブラウザ内で行います。

## 仕様

パターンは2048文字まで、生成結果は1件1万文字までです。1.5秒を超えた処理は停止します。後読みなど、生成ライブラリが扱えない構文はエラーになります。構文上有効でも、一致候補を生成できるとは限りません。

## 共通UI

`vendor/ui/` は [oz-coden.com-ui-web](https://github.com/oz-coden/oz-coden.com-ui-web) の配布用コピーです。利用するコミットとファイルハッシュは `shared-ui.json` に記録しています。個別のレイアウトは `style.css` で管理します。

共通UIを更新する場合は、共通UIリポジトリの `scripts/sync-ui.mjs` を使い、取り込んだファイルとメタデータをコミットしてください。配布用コピーを同梱しているため、実行時に共通UIリポジトリへアクセスする必要はありません。

## 外部ライブラリ

randexp 0.5.3とその依存関係を `vendor/randexp/` に同梱しています。MITライセンスの通知は同ディレクトリの `THIRD-PARTY-NOTICES.txt` にあります。

## ソースの来歴

初期実装は [oz-coden.github.io](https://github.com/oz-coden/oz-coden.github.io) のコミット `dfc7c0a29396e2114d73e99dd17d494f7ab1c5ee` にあるツールを元にしています。このリポジトリで単独実行・変更できます。

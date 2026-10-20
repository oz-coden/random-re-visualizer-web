# Random RE Visualizer

日本語の説明は[目次](#目次)から読めます。

## Table of Contents

1. [Summary](#summary)
2. [Background of Development](#background-of-development)
3. [Features](#features)
4. [Requirements, Dependencies](#requirements-dependencies)
5. [Installation](#installation)
6. [LICENSE](#license)
7. [CREDIT](#credit)

## Summary

A browser-based tool that generates five random sample strings matching a regular expression. It includes a quick reference for basic regular expression syntax.

[Playground Is Here!](https://tools.oz-coden.com/random-re-visualizer/)

## Background of Development

The aim is to help explore regular expressions by viewing concrete examples of matching strings alongside a syntax reference.

## Features

- Random matching samples  
  Enter a pattern and flags to generate five examples with randexp.js. Each candidate is checked against JavaScript's RegExp before display; results may contain duplicates.
- Web Worker execution  
  Generation runs in a worker, and the application stops the worker after a 1.5-second timeout.
- Input and output limits  
  Limit pattern length to 2,048 and each result to 10,000 JavaScript string code units. Excessively large or deeply nested generation plans are rejected.
- Regular expression quick reference  
  Review common syntax such as character classes, repetitions, anchors and alternatives.
- Shared navigation and themes  
  Use the common tool header and light or dark theme.

## Requirements, Dependencies

- A current web browser with JavaScript and Web Workers enabled.
- Serve the application over HTTP or HTTPS. Opening `index.html` directly as a `file://` URL can prevent the worker from loading.

The user interface is in Japanese. Shared UI assets are included in this repository. Python 3 is only needed for the example local server command below; an equivalent static HTTP server can also be used.

## Installation

1. Clone or download this repository, keeping the directory structure intact.
2. Start a static HTTP server from the repository root. For example, with Python 3:

   ```sh
   python -m http.server 8000
   ```

3. Open `http://localhost:8000/` in your browser.

The application files are at the repository root. Running the application requires only static HTML, CSS and JavaScript; no Node.js runtime, API server or build step is required.

Pattern processing and sample generation run entirely in the browser. The application does not upload patterns or results, or save them for restoration after reloading. randexp.js and its dependencies are bundled locally rather than fetched from a CDN.

### Usage

1. Enter a regular expression in **正規表現パターン**, without surrounding `/` delimiters. For example: `^[A-Z]{3}-[0-9]{4}$`.
2. Enter JavaScript regular expression flags, such as `i`, in **フラグ** if needed. Leave the field empty when no flags are required.
3. Click **一致する候補を生成する** and read the five strings under **生成結果**. Click again to generate another set.

Generation is limited by the syntax supported by randexp.js and its parser. Some JavaScript constructs, including lookbehind, are unsupported. A syntactically valid expression may still fail to produce a matching candidate. Unbounded repetitions are bounded during generation, and the results do not enumerate all possible matches.

### Development and publication

Application-specific behavior and layout are in `script.js` and `style.css`. Shared styles, navigation and themes are bundled in `vendor/ui/` from [oz-coden.com-ui-web](https://github.com/oz-coden/oz-coden.com-ui-web). The source commit and file hashes are recorded in `shared-ui.json`, so the application does not fetch the shared UI repository at runtime.

To update the bundled UI, clone the shared UI repository alongside this repository. From this application's root, run `node ../oz-coden.com-ui-web/scripts/sync-ui.mjs . COMMIT_SHA`, replacing `COMMIT_SHA` with the full 40-character commit SHA to use. Commit the updated `vendor/ui/` files and `shared-ui.json`. This maintenance command requires Node.js 22 or later and an internet connection.

This repository checks JavaScript syntax on push and pull requests. With Node.js 22 or later, run the same checks locally:

```sh
node --check script.js
node --check vendor/ui/ui.js
node --check generator-worker.js
```

The hosted application is assembled and published through [tools.oz-coden.com](https://github.com/oz-coden/tools.oz-coden.com). Its publication workflow applies the shared UI to all tools and runs browser integration checks. See that repository for deployment instructions.

## LICENSE

This project is released under the [MIT License](LICENSE). Bundled third-party libraries retain their own copyright and MIT license notices; see [CREDIT](#credit).

## CREDIT

Shared styles, navigation and themes: [oz-coden.com-ui-web](https://github.com/oz-coden/oz-coden.com-ui-web).

The following MIT-licensed libraries are bundled in `vendor/randexp/`:

- randexp 0.5.3 — Copyright (C) 2011 by fent
- ret 0.2.2 — Copyright (C) 2011 by fent
- drange 1.1.1 — Copyright (c) 2014 David Tudury

Full license notices are in [THIRD-PARTY-NOTICES.txt](vendor/randexp/THIRD-PARTY-NOTICES.txt).

---

# Random RE Visualizer

## 目次

1. [概要](#概要)
2. [開発背景](#開発背景)
3. [機能](#機能)
4. [前提・依存](#前提依存)
5. [導入方法](#導入方法)
6. [ライセンス](#ライセンス)
7. [クレジット](#クレジット)

## 概要

正規表現に一致するサンプル文字列をランダムに5件生成するブラウザ用ツールです。基本的な正規表現の構文を確認できるクイックガイドも備えています。

[Playgroundはこちら！](https://tools.oz-coden.com/random-re-visualizer/)

## 開発背景

構文の説明と実際に一致する文字列の例を並べて確認し、正規表現を学習・検討しやすくすることを目的としています。

## 機能

- 一致するサンプルの生成  
  パターンとフラグを指定し、randexp.jsで5件の候補を生成します。表示前にJavaScriptのRegExpで一致を確認します。候補同士が重複する場合があります。
- Web Workerでの実行  
  生成処理をWorker内で実行し、1.5秒でタイムアウトした場合はWorkerを停止します。
- 入出力の制限  
  JavaScript文字列のコードユニット数で、パターンは2048、生成結果は1件1万を上限とします。生成に必要な長さや入れ子が過大なパターンも拒否します。
- 正規表現クイックガイド  
  文字クラス・繰り返し・アンカー・選択などの基本構文を確認できます。
- 共通ナビゲーションとテーマ  
  共通ヘッダーとライト・ダークテーマを利用できます。

## 前提・依存

- JavaScriptとWeb Workerが有効な最新のWebブラウザ。
- HTTPまたはHTTPSでの配信。`index.html`を`file://`で直接開くと、Workerを読み込めない場合があります。

画面の言語は日本語です。共通UIのファイルはこのリポジトリに同梱しています。Python 3は下記のローカルサーバーのコマンドを使う場合に必要で、同等の静的HTTPサーバーでも実行できます。

## 導入方法

1. このリポジトリをクローンまたはダウンロードし、フォルダ構成を保ちます。
2. リポジトリのルートで静的HTTPサーバーを起動します。Python 3を利用する場合は、次のコマンドを実行します。

   ```sh
   python -m http.server 8000
   ```

3. ブラウザで`http://localhost:8000/`を開きます。

アプリ本体はリポジトリのルートにあります。実行には静的なHTML・CSS・JavaScriptだけを使い、Node.jsの実行環境・APIサーバー・ビルド工程は不要です。

パターンの処理と候補の生成はブラウザ内で行います。パターンや結果をアップロードしたり、再読み込み後に復元するために保存したりする処理はありません。randexp.jsと依存ライブラリは同梱しており、CDNから読み込む必要はありません。

### 使い方

1. **正規表現パターン**に、前後の`/`を付けずに入力します。例：`^[A-Z]{3}-[0-9]{4}$`。
2. 必要に応じて**フラグ**に`i`などのJavaScriptの正規表現フラグを指定します。不要な場合は空欄にします。
3. **一致する候補を生成する**を押し、**生成結果**に表示される5件の文字列を確認します。もう一度押すと再生成します。

生成できる構文はrandexp.jsとそのパーサーの対応範囲に限られます。後読みなど、一部のJavaScriptの構文には対応していません。構文上有効な正規表現でも、一致候補を生成できない場合があります。上限のない繰り返しも生成時には範囲を制限し、すべての一致候補を列挙するものではありません。

### 開発と公開

アプリ固有の処理は`script.js`、レイアウトは`style.css`で管理します。共通のスタイル・ナビゲーション・テーマ切り替えは、[oz-coden.com-ui-web](https://github.com/oz-coden/oz-coden.com-ui-web)から`vendor/ui/`へ同梱しています。取得元のコミットとファイルハッシュは`shared-ui.json`に記録しており、実行時に共通UIリポジトリへアクセスする必要はありません。

同梱の共通UIを更新するには、このリポジトリと同じ親フォルダに共通UIリポジトリをクローンします。このアプリのルートで`node ../oz-coden.com-ui-web/scripts/sync-ui.mjs . COMMIT_SHA`を実行し、`COMMIT_SHA`を取り込む版の40桁のコミットSHAに置き換えてください。更新された`vendor/ui/`のファイルと`shared-ui.json`をコミットします。この保守用コマンドには、Node.js 22以降とインターネット接続が必要です。

このリポジトリでは、pushとプルリクエスト時にJavaScriptの構文を検査します。Node.js 22以降を利用すると、同じ検査をローカルでも実行できます。

```sh
node --check script.js
node --check vendor/ui/ui.js
node --check generator-worker.js
```

公開用のアプリは、[tools.oz-coden.com](https://github.com/oz-coden/tools.oz-coden.com)で組み立てて配信します。公開処理では、全ツールに共通UIを適用し、ブラウザでの統合検査を行います。公開手順は同リポジトリを参照してください。

## ライセンス

This project is released under the [MIT License](LICENSE). Bundled third-party libraries retain their own copyright and MIT license notices; see [CREDIT](#credit).

## クレジット

共通のスタイル・ナビゲーション・テーマ：[oz-coden.com-ui-web](https://github.com/oz-coden/oz-coden.com-ui-web)。

`vendor/randexp/`には、次のMITライセンスのライブラリを同梱しています。

- randexp 0.5.3 — Copyright (C) 2011 by fent
- ret 0.2.2 — Copyright (C) 2011 by fent
- drange 1.1.1 — Copyright (c) 2014 David Tudury

ライセンス通知の全文は[THIRD-PARTY-NOTICES.txt](vendor/randexp/THIRD-PARTY-NOTICES.txt)にあります。

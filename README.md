<div id="top"></div>

## 使用技術一覧

<!-- シールド一覧 -->
<!-- 該当するプロジェクトの中から任意のものを選ぶ-->
<p style="display: inline">
  <!-- フロントエンドのフレームワーク一覧 -->
  <img src="https://img.shields.io/badge/-Node.js-000000.svg?logo=node.js&style=for-the-badge">
  <!-- バックエンドのフレームワーク一覧 -->
  <!-- バックエンドの言語一覧 -->
  <!-- ミドルウェア一覧 -->
  <!-- インフラ一覧 -->
  <img src="https://img.shields.io/badge/-Docker-EEE.svg?logo=docker&style=for-the-badge">
  <img src="https://img.shields.io/badge/-githubactions-FFFFFF.svg?logo=github-actions&style=for-the-badge">
  <img src="https://img.shields.io/badge/-githubpages-222222.svg?logo=githubpages&style=for-the-badge">
</p>

## 目次

1. [プロジェクトについて](#プロジェクトについて)
2. [環境](#環境)
3. [ディレクトリ構成](#ディレクトリ構成)
4. [開発環境構築](#開発環境構築)
5. [トラブルシューティング](#トラブルシューティング)

<!-- READMEの作成方法のドキュメントのリンク -->
<br />
<div align="right">
    <a href="READMEの作成方法のリンク"><strong>READMEの作成方法 »</strong></a>
</div>
<br />
<!-- Dockerfileのドキュメントのリンク -->
<div align="right">
    <a href="Dockerfileの詳細リンク"><strong>Dockerfileの詳細 »</strong></a>
</div>
<br />
<!-- プロジェクト名を記載 -->

## プロジェクト名

OpenAPi Docs

<!-- プロジェクトについて -->

## プロジェクトについて

OpenApi に基づいた API 仕様書を記述し、ホットリロードによって自動更新します。更新した API 仕様書は web サーバーで確認したり、mock サーバーで挙動を確認したりできます。</br>
また、GithubActions と GithubPages を活用して API 仕様書を自動的に公開することで開発効率の向上を図ることができます。

<!-- プロジェクトの概要を記載 -->

  <p align="left">
    <br />
    <!-- プロジェクト詳細にBacklogのWikiのリンク -->
    <a href="Backlogのwikiリンク"><strong>プロジェクト詳細 »</strong></a>
    <br />
    <br />

<p align="right">(<a href="#top">トップへ</a>)</p>

## 環境

<!-- 言語、フレームワーク、ミドルウェア、インフラの一覧とバージョンを記載 -->

| 言語・フレームワーク | バージョン   |
| -------------------- | ------------ |
| Node.js              | 特に指定なし |
| Docker               | 特に指定なし |

その他のパッケージのバージョンは package.json を参照（最低限の機能のため、特に指定なし）

<p align="right">(<a href="#top">トップへ</a>)</p>

## ディレクトリ構成

<!-- Treeコマンドを使ってディレクトリ構成を記載 -->

```
❯ tree -a -I "node_modules" -L 2
.
├── README.md
├── build.sh　　　　　　　　　　　　 　　# API仕様書のhtmlファイルを生成するスクリプト
├── docker-compose.yml
├── docs                              # API仕様書が格納されているディレクトリ。自動生成されたファイルが出力される
│   ├── admin
│   │   ├── index.html
│   │   └── openapi.yml
│   ├── admin-agent
│   │   ├── index.html
│   │   └── openapi.yml
│   └── order
│       ├── index.html
│       └── openapi.yml
├── lint.sh                           # root.ymlに対して静的解析を実施するスクリプト
├── merge.sh                          # API仕様書のymlファイルを生成するスクリプト
├── openapi                           # APIを記述するディレクトリ。開発時はここを編集する
│   ├── admin
│   │   ├── components
│   │   ├── paths
│   │   └── root.yml                  # 管理ポータルサイトのAPI仕様書のrootファイル
│   ├── admin-agent
│   │   ├── components
│   │   ├── paths
│   │   └── root.yml                  # 顧客管理サイトのAPI仕様書のrootファイル
│   └── order
│       ├── components
│       ├── paths
│       └── root.yml                  # 業務サイトのAPI仕様書のrootファイル
├── package-lock.json
├── package.json
├── redocly.yml                       # redoclyの設定ファイル。GithubActions等で必要
├── sample_readme.md
└── watch-bundle.js                   # ディレクトリを監視し、ホットリロードを実行するjsファイル
```

<p align="right">(<a href="#top">トップへ</a>)</p>

## 開発環境構築

<!-- コンテナの作成方法、パッケージのインストール方法など、開発環境構築に必要な情報を記載 -->

### docker コンテナの構築

docker-compose.yml によって、自動的に 5 つのコンテナが立ち上がります。
（swagger-ui 1 + モックサーバー 3 + proxy サーバー 1）

- イメージのビルド

  `docker compose build`

- コンテナ起動

  `docker compose up -d`

- コンテナ停止・削除

  `docker compose down`

### 起動するコンテナの詳細

| コンテナ名       | 役割                               | port | URL                   |
| ---------------- | ---------------------------------- | ---- | --------------------- |
| admin-mock       | 管理ポータルサイトのモックサーバー | 4010 | http://localhost:4010 |
| admin-agent-mock | 顧客管理サイトのモックサーバー     | 4011 | http://localhost:4011 |
| order-mock       | 業務サイトのモックサーバー         | 4012 | http://localhost:4012 |
| swagger-ui       | API 仕様書の表示                   | 3030 | http://localhost:3030 |
| proxy-caddy      | プロキシサーバー                   | 8180 | http://localhost:8180 |

### swagger-ui の使いかた

[localhost:3030](localhost:3030) にアクセスすると、swagger-ui によって API 仕様書が確認できます</br>
デフォルトは admin-api.yml が表示されますが、画面右上の「Explore」から任意の API 仕様書を選択することで、API 仕様書を切り替えて表示できます</br>

### モックサーバーの使い方

Vue の設定ファイル(.env ファイル?)の接続先を対象のコンテナの URL に変更し、再起動します</br>
または、API 仕様書に記載の任意のモックサーバーとその URL を選択して、proxy 宛にリクエストを送ります</br>
API を投げるとモックサーバーへ API 通信が投げられるので、API 仕様書で記述してある sample データのレスポンスが返却されます</br>
スキーマ駆動開発時は BE の処理が未完成の場合があるため、返却されるモックデータをもとにその後の挙動を確認してください。※API 仕様書が書かれていることが前提

### ホットリロードによる API 仕様書の開発

`watch-bundle.js`を動かすことによって、openapi 配下のディレクトリを監視し、変更があった場合は自動で分割された yml ファイルを 結合 してくれます。

- chokidar のインストール

`npm install -g chokidar`

- watch-bundle.js の起動

`node watch-bundle.js`

### シェルスクリプト（lint / merge / build）

redocly/cli の公式 Docker イメージを使い、変更した API 仕様書を 静的解析、結合することができます。</br>
watch-bundle.js を起動している場合は自動で結合した yml ファイルが作成されますが、手動の実行や html ファイルが必要な場合はこちらから実行できます。

- lint

  `./lint.sh $arg1 $arg2 $arg3`

- merge

  `./merge.sh $arg1 $arg2 $arg3`

- bundle（html ファイルの生成）

  `./bundle.sh $arg1 $arg2 $arg3`

※ シェルスクリプト実行時には、対象となるディレクトリ名を引数として 3 つまで指定できます。</br>
本プロジェクトでは、order, admin, admin-agent から指定できます。引数が未指定の時は 3 つの引数が自動的に指定されます。

## トラブルシューティング

### permission denied

権限がないとシェルスクリプトが実行できません。下記コマンドでシェルスクリプトファイルに実行権限を与えてください

`chmod +x hoge.sh`

### docker daemon is not running

Docker Desktop が起動できていないので起動させましょう

### Ports are not available: address already in use

別のコンテナもしくはローカル上ですでに使っているポートがある可能性があります
<br>
下記記事を参考にしてください
<br>
[コンテナ起動時に Ports are not available: address already in use が出た時の対処法について](https://qiita.com/shun198/items/ab6eca4bbe4d065abb8f)

<p align="right">(<a href="#top">トップへ</a>)</p>

# Web Application 3
このレポジトリは Web Application 3 という授業の提出課題用です。.

## 課題： サーバーサイドのWebアプリケーション
## 作品名： 感情トラッカー (Emotion Tracker)

## 作品名の説明： 日々の感情、その強さ、きっかけ（トリガー）を記録し、自分の心の変化を可視化するアプリケーションです！。

## 頑張った所や、工夫した所、見どころなど：

### フルスタック構成：フロントエンド（React）だけでなく、Node.js/Express を用いたバックエンドサーバーを自作し、APIの設計を行いました。

### セキュリティ：APIキーなどの機密情報をフロントエンドに置かず、サーバーサイド（ローカルの場合は.env、デプロイバーションはRender上の環境変数）で管理することで、安全に Supabase データベースと通信する構造にしました。

### CRUD機能：感情の、記録（Create）、取得（Read）、削除（Delete）という、Webアプリケーションの基本となる機能を一通り実装しました。修正（Update）は必要ないと考え、実装しませんでした。

### 更なる改善案：LLMを統合して感情が動苦パターンを分析してまとめてくれる機能を実装したら面白そうだと思いました。

### WebアプリケーションのURL： https://emotion-tracker-jp.onrender.com

### GitHubのURL：　https://github.com/akimi-yano/Web_Application_3

---

## 概要：
名前は、感情トラッカー (Full-stack Express/React App)　です。
React + Node.js (Express) + Supabase で構築した、常駐型サーバーによる感情記録アプリです。

## 構成：
```
Web_Application_3/
├── src/
│   ├── main.jsx        # Reactの起動エントリーポイント
│   ├── App.jsx         # メイン画面・UIコンポーネント
│   └── api.js          # フロントからバックエンドへのAPI通信
├── index.html          # アプリケーションのベースとなるHTML
├── server.js           # バックエンド (Node.js/Express サーバー)
├── supabase_schema.sql # データベースのテーブル定義書 (SQL)
├── package.json        # プロジェクト設定・依存ライブラリ一覧
├── package-lock.json   # インストール済みパッケージのバージョン固定ファイル
├── vite.config.js      # Vite設定 (Proxy設定含む)
└── .gitignore          # 秘密情報 (.env) や node_modules の除外設定
```

## セットアップ手順
### 1. データベース (Supabase) の準備

#### 1. Supabase でプロジェクトを作成。

#### 2. ダッシュボードの SQL Editor で、本リポジトリの supabase_schema.sql を実行し emotions テーブルを作成。

#### 3. Settings > API から以下をメモ。

- Project URL
- Secret Key

### 2. ローカル環境での実行
#### 1. パッケージのインストール: 
`npm install`

#### 2. 環境変数の設定
ルートディレクトリに `.env` ファイルを作成し、以下を記入。

```
SUPABASE_URL=あなたのProject_URL
SUPABASE_KEY=あなたのservice_role_key
PORT=3001
```

#### 3. 実行（2つのターミナルを使用）

- ターミナル1（サーバー）: `node server.js`
- ターミナル2（フロント）: `npm run dev`

### 3. Render へのデプロイ
#### 1. GitHubにプッシュ。

#### 2. Render で Web Service を作成し、GitHubと連携。

#### 3. 設定画面で以下を入力：

- Build Command: `npm install; npm run build`

- Start Command: `node server.js`

- Environment Variables に .env と同じ内容（SUPABASE_URL, SUPABASE_KEY）を登録。

#### 環境変数 (Server-side)

| 変数名 | 説明 |
| :--- | :--- |
| `SUPABASE_URL` | Supabase の API Endpoint URL |
| `SUPABASE_KEY` | Supabase の Secret API Key |
| `PORT` | サーバーが待受けるポート番号 (既定: 3001) |


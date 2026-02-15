# Pyxel JavaScript Port (Node.js + Express + Vanilla.js + Electron)

前回の雛形から継続して、**PythonコードをJavaScriptへ移行する実処理**を拡張しました。

## 構成

- `backend/server.js` - REST APIサーバー
- `backend/pythonToJsConverter.js` - Python→JavaScript変換ロジック
- `frontend/` - Vanilla.js UI
- `electron/main.js` - デスクトップ起動
- `scripts/migrate_selected.js` - 変換対象をまとめて生成するバッチスクリプト
- `migrated/` - 変換済み JavaScript 出力

## REST API（バックエンドはRESTのみ）

- `GET /api/health`
- `POST /api/convert`
  - body: `{ "pythonCode": "..." }`
  - 単体コードの変換結果を返却
- `POST /api/migrate`
  - body: `{ "sourceDir": "...", "outputDir": "..." }`
  - `sourceDir` 以下の `.py` を再帰探索して `.js` を生成

## 使い方

```bash
cd js-port
npm install
npm start
```

ブラウザで `http://localhost:8787` を開くと、
- 単一コード変換
- ディレクトリ一括変換
を実行できます。

## Electron

```bash
cd js-port
npm install
npm run electron
```

Electron はバックエンド起動後に `GET /api/health` をポーリングし、準備完了後に画面を開きます。

## 変換をさらに進める（今回追加）

```bash
cd js-port
npm run migrate:selected
```

このコマンドで以下を `js-port/migrated/` に出力します。

- `python/pyxel/examples/*.py` → `migrated/python/pyxel/examples/*.js`
- `python/pyxel` 直下の主要 `.py` → `migrated/python/pyxel/*.js`
- `wasm/gamepad.py`, `wasm/import_hook.py` → `migrated/wasm/*.js`
- 変換集計レポート → `migrated/MIGRATION_REPORT.json`

## 変換の注意

- 生成されるJSは**自動変換の叩き台**です。
- クラス/関数/制御構文などを機械変換しますが、Python固有仕様（動的属性、内包表記、デコレータ等）は手修正が必要です。
- 各出力ファイル先頭に `Manual review required` コメントを付与しています。

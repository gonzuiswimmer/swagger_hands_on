#!/bin/bash

# 引数が1つも渡されなかった場合、デフォルト値を設定
if [ $# -eq 0 ];then
  ARGS=("order" "admin" "admin-agent")
else
  ARGS=("$@")
fi

# 引数の数をチェック(最大3つまで)
if [ $# -gt 3 ]; then
  echo "Error: 最大3つの引数までしか受け取れません"
  exit
fi

# カレントディレクトリを取得
CURRENT_DIR=$(pwd)
for DIR in "${ARGS[@]}"; do
  TARGET_DIR="${CURRENT_DIR}/openapi/${DIR}"
  if [ ! -d "$TARGET_DIR" ];then
    echo "Error: ディレクトリが存在しません -> ${TARGET_DIR}"
    exit
  fi

  echo "${DIR} : 実行中..."
  docker run --rm -v "${CURRENT_DIR}":/spec redocly/cli lint /spec/openapi/"${DIR}"/root.yml
done

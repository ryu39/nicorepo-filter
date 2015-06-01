# ニコレポフィルタユーザースクリプト

[ニコニコ動画]( http://www.nicovideo.jp/ )のマイページに表示されるニコレポを、特定の種類の記事だけにフィルタするユーザースクリプトです。
FirefoxではGreasemonkeyで、ChromeではTampermonkeyで使用可能です。

本ユーザースクリプトでは、設定画面の作成にあたって[GM_config]( https://github.com/sizzlemctwizzle/GM_config )を利用させて頂いています。


## インストール
### Firefox
1. [Greasemonkey]( https://addons.mozilla.org/ja/firefox/addon/greasemonkey/ )をFirefoxのアドオンとして追加します。
2. [本スクリプト]( https://github.com/ryu39/nicorepo-filter/raw/master/nicorepo-filter.user.js )のページを開きます。Greasemonkeyのダイアログが開くので[インストール]を選択して下さい。

### Chrome
1. [Tampermonkey]( https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo )をChromeの拡張機能として追加します。
2. [本スクリプト]( https://github.com/ryu39/nicorepo-filter/raw/master/nicorepo-filter.user.js )のページを開きます。Tampermonkeyの画面が開くので[インストール]を選択して下さい。


## 利用方法
1. [ニコニコ動画 マイページ]( http://www.nicovideo.jp/my/top )を開きます。
2. Greasemonkeyの場合、ツールバーのアイコン横のメニュー、もしくは[ツール] > [Greasemonkey] から [ユーザースクリプトコマンド] > [ニコレポフィルタの設定] を選択して下さい。  Tampermonkeyの場合、アイコンをクリック後、[ニコレポフィルタの設定]を選択して下さい。
3. 設定画面が開くので表示させたくない記事の種類のチェックを外して、[Save]ボタンを押して下さい。その後、[Close]ボタンを押して設定画面を閉じて下さい。
4. [F5]キーを押す等してマイページを再読み込みして下さい。記事がフィルタされていれば成功です。


## 今後の改善予定
* フィルタできる記事の種類の追加
* 記事に対するコメントの非表示


# 不具合報告・ご要望など
[@hommax39]( https://twitter.com/hommax39 )へツイート下さい。Pull Requestも歓迎です(やったことも受けたこともないのですが…)。

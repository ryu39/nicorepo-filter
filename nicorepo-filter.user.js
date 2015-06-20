// ==UserScript==
// @name        nicorepo-filter
// @namespace   hommax39.com
// @description ニコニコ動画のマイページのニコレポをフィルタするユーザースクリプトです。
// @noframes
// @match       http://www.nicovideo.jp/my
// @match       http://www.nicovideo.jp/my/top
// @match       http://www.nicovideo.jp/my/top/*
// @require     https://openuserjs.org/src/libs/sizzle/GM_config.js
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_registerMenuCommand
// @version     1.0.1
// @updateURL   https://github.com/ryu39/nicorepo-filter/raw/master/nicorepo-filter.user.js
// ==/UserScript==

// Configuration page
GM_config.init(
{
  'id': 'nicorepo-filter',
  'fields':
  {
    // 動画
    'log-user-video-upload':
    {
      'label': '投稿',
      'section': ['動画'],
      'type': 'checkbox',
      'default': true
    },
    'log-user-video-round-number-of-view-counter':
    {
      'label': 'キリ番',
      'type': 'checkbox',
      'default': true
    },
    'log-user-video-review':
    {
      'label': '動画レビュー',
      'type': 'checkbox',
      'default': true
    },
    // マイリスト
    'log-user-mylist-add':
    {
      'label': '動画',
      'section': ['マイリスト'],
      'type': 'checkbox',
      'default': true
    },
    'log-user-mylist-add-blomaga':
    {
      'label': 'ブロマガ',
      'type': 'checkbox',
      'default': true
    },
    'log-user-mylist-add-manga-episode':
    {
      'label': 'マンガ',
      'type': 'checkbox',
      'default': true
    },
    // 生放送
    'log-user-live-broadcast':
    {
      'label': '開始',
      'section': ['生放送'],
      'type': 'checkbox',
      'default': true
    },
    'log-user-live-reserve':
    {
      'label': '予約',
      'type': 'checkbox',
      'default': true
    },
    'log-user-live-video-introduced':
    {
      'label': '紹介',
      'type': 'checkbox',
      'default': true
    },
    // イラスト
    'log-user-seiga-image-upload':
    {
      'label': '投稿',
      'section': ['イラスト'],
      'type': 'checkbox',
      'default': true
    },
    'log-user-seiga-image-clip':
    {
      'label': 'クリップ',
      'type': 'checkbox',
      'default': true
    },
    // ブロマガ
    'log-user-register-chblog':
    {
      'label': '投稿',
      'section': ['ブロマガ'],
      'type': 'checkbox',
      'default': true
    },
    // ニコニ広告
    'log-user-uad-advertise':
    {
      'label': '宣伝',
      'section': ['ニコニ広告'],
      'type': 'checkbox',
      'default': true
    },
    // スタンプ
    'log-user-action-stamp':
    {
      'label': '取得',
      'section': ['スタンプ'],
      'type': 'checkbox',
      'default': true
    },
    // コミュニティ
    'log-community-video-upload':
    {
      'label': '動画',
      'section': ['コミュニティ'],
      'type': 'checkbox',
      'default': true
    },
    'log-community-live-broadcast':
    {
      'label': '生放送',
      'type': 'checkbox',
      'default': true
    },
    // その他
    'log-reslist':
    {
      'label': 'ニコレポコメント',
      'section': ['全般'],
      'type': 'checkbox',
      'default': true
    }
  }
});
GM_registerMenuCommand("ニコレポフィルタの設定", function() { GM_config.open(); });

// User Script funcitons
exportFunction(function() {
  // Objectのままだとうまく値が渡せなかったため、JSONに変換
  return JSON.stringify(GM_config);
}, unsafeWindow, {defineAs: 'gm_config'});

// Content Page scripts

// 以下のfunctionを対象ページに埋め込んで、即時実行させる。
var execute_function = function($){
  // 要素がremoveされたイベントを検知するため、jQueryのspecialEventの機能を使用
  // see http://stackoverflow.com/questions/2200494/jquery-trigger-event-when-an-element-is-removed-from-the-dom
  $.event.special.destroyed = {
    remove: function (o) {
      if (o.handler) {
        o.handler();
      }
    }
  };

  var GM_config = JSON.parse(gm_config());
  deny_elem_selectors = [];
  for (prop in GM_config.fields) {
    if (!GM_config.fields.hasOwnProperty(prop)) {
      continue;
    }
    if (!GM_config.fields[prop].value) {
      deny_elem_selectors.push('div.' + prop);
    }
  }
  // 最後に読み込んだニコレポの一覧で、フィルターにヒットする記事を非表示にする。
  function hide_denied_elements() {
    $.each(deny_elem_selectors, function (i, selector) {
      $('div.nicorepo-page > div.timeline').last().find(selector).each(function (j, elem) {
        $(elem).hide();
      }
      );
    });
  }
  // 「過去のニコレポを見る」リンク押下時にユーザースクリプトを再実行させる。
  function add_event_to_next_page_link() {
    $('div.next-page').not('.loading').on('destroyed', function () {
      hide_denied_elements();
      add_event_to_next_page_link();
    });
  }

  // 初回のページ表示時に1回だけ実行。以降は、「過去のニコレポを見る」リンク押下時に再実行させる。
  hide_denied_elements();
  add_event_to_next_page_link();
};
var script = document.createElement('script');
script.setAttribute("type", "application/javascript");
script.textContent = '(' + execute_function + ')(jQuery);';
document.body.appendChild(script);
// スクリプト実行後、不要なスクリプトは削除しておく
document.body.removeChild(script);

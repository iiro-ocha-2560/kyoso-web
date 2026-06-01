// ========== ページ読み込み完了時の処理 ==========

// ページが完全に読み込まれたら実行
document.addEventListener('DOMContentLoaded', function() {
    // スクロールアニメーションの初期化
    observeElements();
    
    // スムーズスクロールの設定
    setupSmoothScroll();
    
    // モバイル対応の初期化
    initializeMobileSupport();
});


// ========== モバイルサポート（タッチデバイス対応） ==========

function initializeMobileSupport() {
    // ボタンのタッチ時間を短縮するため、アクティブ状態を追加
    const buttons = document.querySelectorAll('button');
    buttons.forEach(function(button) {
        button.addEventListener('touchstart', function() {
            this.style.opacity = '0.8';
        });
        button.addEventListener('touchend', function() {
            this.style.opacity = '1';
        });
    });
    
    // リンクのタッチ対応
    const links = document.querySelectorAll('a');
    links.forEach(function(link) {
        link.addEventListener('touchstart', function() {
            this.style.opacity = '0.7';
        });
        link.addEventListener('touchend', function() {
            this.style.opacity = '1';
        });
    });
}


// ========== スクロール時のアニメーション ==========

// 要素がビューポート内に入ったかをチェックして、アニメーションを実行
function observeElements() {
    // 'Intersection Observer API'を使用（スクロール時に要素の表示状態を監視）
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            // 要素がビューポート内に入った時
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        // ビューポートに50%以上入ったら発火
        threshold: 0.5
    });

    // カードなど、アニメーションさせたい要素を監視
    const cards = document.querySelectorAll('.feature-card, .learning-card');
    cards.forEach(function(card) {
        observer.observe(card);
    });
}


// ========== スムーズスクロール ==========

// リンククリック時にスムーズにスクロール
function setupSmoothScroll() {
    // ナビゲーションリンクと「詳しく見る」ボタンを取得
    const links = document.querySelectorAll('a[href^="#"], .cta-button');
    
    links.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // リンク先のID（例：#features）を取得
            let targetId = this.getAttribute('href');
            if (!targetId) return;
            
            // 対象の要素を取得
            let targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            // スムーズにスクロール
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
}


// ========== スムーズスクロール関数（他から呼び出し用） ==========

// HTMLのボタンから直接呼び出される関数
function smoothScroll(targetId) {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}


// ========== ボタンクリック時の処理 ==========

// ページ読み込み後、ボタンにイベントリスナーを追加
document.addEventListener('DOMContentLoaded', function() {
    // 「オープンキャンパスに申し込む」ボタン
    const primaryButton = document.querySelector('.primary-button');
    if (primaryButton) {
        primaryButton.addEventListener('click', function() {
            // アラート表示（実際にはリンク遷移やモーダル表示など）
            alert('ご応募ありがとうございます！\nオープンキャンパスの詳細情報をメールでお送りします。');
        });
    }

    // 「もっと詳しく知る」ボタン
    const secondaryButton = document.querySelector('.secondary-button');
    if (secondaryButton) {
        secondaryButton.addEventListener('click', function() {
            // この場所に、詳細ページへのリンクやモーダル表示などを追加
            alert('詳細情報ページに移動します。\n（現在はデモ版のため表示されません）');
        });
    }
});


// ========== スクロール時のナビゲーション ハイライト ==========

// ページをスクロールした時に、現在のセクションに対応するナビゲーションリンクをハイライト
window.addEventListener('scroll', function() {
    // ナビゲーションリンクを取得
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // 各セクションをチェック
    const sections = {
        '#features': document.getElementById('features'),
        '#learning': document.getElementById('learning'),
        '#message': document.getElementById('message')
    };

    for (let [linkId, section] of Object.entries(sections)) {
        if (section) {
            // セクションの位置をチェック
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            // 現在のスクロール位置がセクション内か判定
            if (window.scrollY >= sectionTop - 100 && 
                window.scrollY < sectionTop + sectionHeight - 100) {
                
                // 対応するナビゲーションリンクをハイライト
                navLinks.forEach(function(link) {
                    link.style.opacity = '0.7';
                });
                
                const activeLink = document.querySelector('a[href="' + linkId + '"]');
                if (activeLink) {
                    activeLink.style.opacity = '1';
                }
            }
        }
    }
});


// ========== ウィンドウサイズ変更時の処理 ==========

// レスポンシブデザイン対応：ウィンドウサイズ変更時に調整
let resizeTimer;
window.addEventListener('resize', function() {
    // デバウンス処理：リサイズイベントが頻繁に発火するため、少し遅延させて処理
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // 必要に応じてここに処理を追加
        console.log('ウィンドウサイズが変更されました。');
    }, 250);
});


// ========== ダークモード対応（オプション） ==========

// システムのダークモード設定に対応
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // ダークモードが有効な場合の処理（ここに追加可能）
    console.log('ダークモード対応の処理がここに入ります');
}

// ダークモード設定の変更を監視
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    console.log('ダークモード設定が変更されました:', e.matches);
});


// ========== 初期化完了のログ ==========

// 開発者が確認用（F12のコンソールで確認可能）
console.log('Webサイトの初期化が完了しました。共創工学部へようこそ！');
console.log('モバイル対応：有効');
console.log('タッチデバイス対応：有効');


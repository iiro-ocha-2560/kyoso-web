// ========== ページ読み込み完了時の処理 ==========

// ページが完全に読み込まれたら実行
document.addEventListener('DOMContentLoaded', function() {
    // スクロールアニメーションの初期化
    observeElements();
    
    // スムーズスクロールの設定
    setupSmoothScroll();
});


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


// ========== 初期化完了のログ ==========

// 開発者が確認用（F12のコンソールで確認可能）
console.log('Webサイトの初期化が完了しました。共創工学部へようこそ！');

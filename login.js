// DOM要素の取得
const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('error-message');

// HTMLエスケープ（XSS対策）
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// エラーメッセージを表示
function showError(message) {
    errorMessage.textContent = escapeHtml(message);
    errorMessage.style.display = 'block';
}

// エラーメッセージを非表示
function hideError() {
    errorMessage.style.display = 'none';
}

// メールアドレスのバリデーション
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// パスワードのバリデーション
function validatePassword(password) {
    // 最低6文字以上
    return password.length >= 6;
}

// ログイン処理
function handleLogin(email, password) {
    // バリデーション
    if (!validateEmail(email)) {
        showError('有効なメールアドレスを入力してください');
        return;
    }

    if (!validatePassword(password)) {
        showError('パスワードは6文字以上で入力してください');
        return;
    }

    // ログイン成功時の処理（画面実装のみのため、シンプルな処理）
    // ローカルストレージにユーザー情報を保存
    const user = {
        email: email,
        loginTime: new Date().toISOString()
    };

    localStorage.setItem('currentUser', JSON.stringify(user));

    // Todoアプリ画面にリダイレクト
    window.location.href = 'index.html';
}

// フォーム送信イベント
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    hideError();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    handleLogin(email, password);
});

// 入力フィールドにフォーカスがあたったらエラーを非表示
emailInput.addEventListener('focus', hideError);
passwordInput.addEventListener('focus', hideError);

// ページ読み込み時に既にログイン済みかチェック
window.addEventListener('DOMContentLoaded', () => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        // 既にログイン済みの場合はTodoアプリ画面にリダイレクト
        // window.location.href = 'index.html';
        // コメントアウト：画面確認のため自動リダイレクトは無効化
    }
});

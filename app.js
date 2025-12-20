// DOM要素の取得
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// ローカルストレージからTodoを読み込む
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Todoを保存する
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Todoをレンダリングする
function renderTodos() {
    todoList.innerHTML = '';

    if (todos.length === 0) {
        todoList.innerHTML = '<li class="empty-message">タスクがありません</li>';
        return;
    }

    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;

        li.innerHTML = `
            <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
            <span class="todo-text">${escapeHtml(todo.text)}</span>
            <button class="delete-btn">削除</button>
        `;

        // チェックボックスのイベント
        const checkbox = li.querySelector('.todo-checkbox');
        checkbox.addEventListener('change', () => toggleTodo(index));

        // 削除ボタンのイベント
        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => deleteTodo(index));

        todoList.appendChild(li);
    });
}

// HTMLエスケープ（XSS対策）
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Todoを追加する
function addTodo(text) {
    todos.push({
        text: text,
        completed: false
    });
    saveTodos();
    renderTodos();
}

// Todoの完了状態を切り替える
function toggleTodo(index) {
    todos[index].completed = !todos[index].completed;
    saveTodos();
    renderTodos();
}

// Todoを削除する
function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
}

// フォーム送信イベント
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (text) {
        addTodo(text);
        todoInput.value = '';
        todoInput.focus();
    }
});

// 初期レンダリング
renderTodos();

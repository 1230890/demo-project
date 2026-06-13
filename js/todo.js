// ===== 简易待办清单模块 =====
// 在页面卡片底部追加：输入框 + 添加按钮 + 待办列表
document.addEventListener('DOMContentLoaded', function () {
    var container = document.querySelector('.container');

    // ============================
    //  待办清单
    // ============================

    // 外层容器（与计数器风格统一，带分隔线）
    var todoSection = document.createElement('div');
    todoSection.className = 'todo-section';

    // 标题
    var todoTitle = document.createElement('p');
    todoTitle.className = 'counter-title'; // 复用计数器标题样式
    todoTitle.textContent = '待办清单';
    todoSection.appendChild(todoTitle);

    // 输入行：输入框 + 添加按钮
    var inputRow = document.createElement('div');
    inputRow.className = 'todo-input-row';

    var todoInput = document.createElement('input');
    todoInput.type = 'text';
    todoInput.className = 'todo-input';
    todoInput.placeholder = '输入新的待办事项...';
    todoInput.maxLength = 100;

    var addBtn = document.createElement('button');
    addBtn.className = 'todo-add-btn';
    addBtn.textContent = '添加';

    inputRow.appendChild(todoInput);
    inputRow.appendChild(addBtn);
    todoSection.appendChild(inputRow);

    // 待办列表（ul）
    var todoList = document.createElement('ul');
    todoList.className = 'todo-list';
    todoSection.appendChild(todoList);

    // ----- 空状态提示 -----
    function updateEmptyState() {
        if (todoList.children.length === 0) {
            var emptyTip = document.createElement('li');
            emptyTip.className = 'todo-empty';
            emptyTip.textContent = '暂无待办事项';
            todoList.appendChild(emptyTip);
        } else {
            // 有内容时移除空提示
            var emptyEl = todoList.querySelector('.todo-empty');
            if (emptyEl) emptyEl.remove();
        }
    }

    // ----- 添加待办 -----
    function addTodo() {
        var text = todoInput.value.trim();
        if (!text) {
            alert('请输入待办内容后再添加');
            todoInput.focus();
            return;
        }

        // 创建单条待办项（li）
        var item = document.createElement('li');
        item.className = 'todo-item';

        var textSpan = document.createElement('span');
        textSpan.className = 'todo-text';
        textSpan.textContent = text;

        var deleteBtn = document.createElement('button');
        deleteBtn.className = 'todo-delete-btn';
        deleteBtn.setAttribute('aria-label', '删除');
        deleteBtn.innerHTML = '&times;';

        // 点击删除：移除整条待办，并更新空状态
        deleteBtn.addEventListener('click', function () {
            item.remove();
            updateEmptyState();
        });

        item.appendChild(textSpan);
        item.appendChild(deleteBtn);
        todoList.appendChild(item);

        // 清空输入框并聚焦，方便连续添加
        todoInput.value = '';
        todoInput.focus();
        updateEmptyState();
    }

    // ----- 事件绑定 -----
    addBtn.addEventListener('click', addTodo);

    // 回车键快捷添加
    todoInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            addTodo();
        }
    });

    // 插入页面 & 初始化空状态
    container.appendChild(todoSection);
    updateEmptyState();
});

// ===== 简易待办清单模块（ES6 重构版） =====
//
// 依赖：config.js（必须先加载，提供 CONFIG.TODO / CONFIG.APP 常量）
//
// 【改动 1】外层包裹 IIFE（立即调用函数表达式）
//   - 原先仅靠 DOMContentLoaded 回调隐式形成函数作用域
//   - 现在用 IIFE 显式隔离，即使未来去掉事件监听也不会泄漏任何变量到 window
//   - 同时启用严格模式，捕获静默错误（如给未声明变量赋值）
(() => {
  "use strict";

  // 【改动 2】所有 var → const / let
  //   - const：绑定后不再重新赋值的引用（DOM 节点、函数引用等）
  //   - let：仅用于确实需要重赋值的场景（本模块无此需求，全部 const）
  //   - 好处：消除 var 的变量提升陷阱，const 还能防止意外重新赋值

  const buildTodoModule = () => {
    // 【配置抽离】选择器统一从 CONFIG.APP 读取
    const container = document.querySelector(CONFIG.APP.containerSelector);
    if (!container) return;

    // ---- 构建 DOM 结构 ----

    // 外层容器（与计数器风格统一，带分隔线）
    const todoSection = document.createElement("div");
    todoSection.className = "todo-section";

    // 标题 —— 复用计数器标题样式
    // 【配置抽离】文案从 CONFIG.TODO.title 读取
    const todoTitle = document.createElement("p");
    todoTitle.className = "counter-title";
    todoTitle.textContent = CONFIG.TODO.title;
    todoSection.appendChild(todoTitle);

    // 输入行：输入框 + 添加按钮
    const inputRow = document.createElement("div");
    inputRow.className = "todo-input-row";

    const todoInput = document.createElement("input");
    todoInput.type = "text";
    todoInput.className = "todo-input";
    // 【配置抽离】占位提示、最大长度从 CONFIG.TODO 读取
    todoInput.placeholder = CONFIG.TODO.placeholder;
    todoInput.maxLength = CONFIG.TODO.maxLength;

    const addBtn = document.createElement("button");
    addBtn.className = "todo-add-btn";
    // 【配置抽离】按钮文案从 CONFIG.TODO 读取
    addBtn.textContent = CONFIG.TODO.addBtnText;

    inputRow.append(todoInput, addBtn); // 【改动 3】append() 替代多次 appendChild()，支持一次插入多个节点
    todoSection.appendChild(inputRow);

    // 待办列表（ul）
    const todoList = document.createElement("ul");
    todoList.className = "todo-list";
    todoSection.appendChild(todoList);

    // ---- 核心逻辑 ----

    // 【改动 4】function 声明 → const + 箭头函数
    //   箭头函数没有自己的 this/arguments，更适合纯回调场景，也更简洁
    const addTodo = () => {
      const text = todoInput.value.trim();
      const rawText = todoInput.value;

      // 【配置抽离】空输入 / 纯空格 分别提示不同文案
      if (!rawText) {
        alert(CONFIG.TODO.emptyAlert);
        return todoInput.focus();
      }
      if (!text) {
        alert(CONFIG.TODO.spacesAlert);
        return todoInput.focus();
      }

      const item = document.createElement("li");
      item.className = "todo-item";

      const textSpan = document.createElement("span");
      textSpan.className = "todo-text";
      textSpan.textContent = text;

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "todo-delete-btn";
      // 【配置抽离】无障碍标签、图标从 CONFIG.TODO 读取
      deleteBtn.setAttribute("aria-label", CONFIG.TODO.deleteLabel);

      // 【改动 5】innerHTML '&times;' → textContent
      //   - 避免浏览器做 HTML 解析，纯文本赋值更安全、性能更好
      // 【配置抽离】图标字符从 CONFIG.TODO.deleteIcon 读取
      deleteBtn.textContent = CONFIG.TODO.deleteIcon;

      deleteBtn.addEventListener("click", () => item.remove());

      item.append(textSpan, deleteBtn); // 同改动 3，批量插入
      todoList.appendChild(item);

      todoInput.value = "";
      todoInput.focus();
    };

    // ---- 事件绑定 ----

    // 【改动 6】回调统一使用箭头函数，保持风格一致
    addBtn.addEventListener("click", addTodo);
    todoInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") addTodo();
    });

    container.appendChild(todoSection);
  };

  // 页面 DOM 就绪后初始化模块
  // 【改动 7】整体包裹在 IIFE 内，DOMContentLoaded 监听器也被隔离
  //   外部无法访问 buildTodoModule 及任何内部变量，作用域彻底封闭
  document.addEventListener("DOMContentLoaded", buildTodoModule);
})();

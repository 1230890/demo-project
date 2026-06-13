// ===== 弹窗按钮模块 =====
// 依赖：lodash（通过 <script> 标签全局引入，暴露 _ 变量）

// 箭头函数改写：DOMContentLoaded 回调使用箭头函数
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(CONFIG.APP.containerSelector);
  if (!container) return;

  // ============================
  //  弹窗按钮（已有功能）
  // ============================
  const btn = document.createElement("button");
  btn.textContent = "点击我";
  btn.className = "alert-btn";

  // ============================
  //  Lodash 字符串处理测试
  //  演示：用 lodash 方法处理字符串，将结果展示在弹窗中
  // ============================

  // 原始测试字符串
  const rawText = "hello world from lodash";

  // _.capitalize()  —— 首字母大写：'Hello world from lodash'
  const capitalized = _.capitalize(rawText);

  // _.upperCase()    —— 全大写并空格分隔：'HELLO WORLD FROM LODASH'
  const upperCased = _.upperCase(rawText);

  // _.kebabCase()    —— 短横线命名：'hello-world-from-lodash'
  const kebabCased = _.kebabCase(rawText);

  // _.truncate()     —— 截断超长文本（默认 30 字符，末尾加 '...'）
  const truncated = _.truncate(
    "这是一段非常长的文本内容，用于测试 lodash 的截断功能是否正常工作",
    { length: 20 },
  );

  // 箭头函数改写：按钮点击回调
  //   原先：btn.addEventListener('click', function () { alert('...'); });
  //   现在：点击后弹窗展示 lodash 处理结果
  btn.addEventListener("click", () => {
    alert(
      `你好！欢迎来到我的页面 🎉\n\n` +
        `--- Lodash 字符串测试 ---\n` +
        `原值：${rawText}\n` +
        `capitalize：${capitalized}\n` +
        `upperCase：${upperCased}\n` +
        `kebabCase：${kebabCased}\n` +
        `truncate：${truncated}`,
    );
  });

  container.appendChild(btn);
});

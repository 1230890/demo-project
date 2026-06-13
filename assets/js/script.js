// ===== 页面加载完成后执行 =====
// 【箭头函数改写 1】DOMContentLoaded 回调：普通函数 → 箭头函数
//   原先：document.addEventListener('DOMContentLoaded', function () { ... });
document.addEventListener('DOMContentLoaded', () => {
    // 获取容器元素
    var container = document.querySelector('.container');

    // ============================
    //  弹窗按钮（已有功能）
    // ============================
    var btn = document.createElement('button');
    btn.textContent = '点击我';
    btn.className = 'alert-btn';

    // 【箭头函数改写 2】按钮点击回调：单行语句可省略 {} 和 return
    //   原先：btn.addEventListener('click', function () { alert('...'); });
    btn.addEventListener('click', () => alert('你好！欢迎来到我的页面 🎉'));
    container.appendChild(btn);
});

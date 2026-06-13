// ===== 简易计数器模块 =====
// 独立封装：在页面卡片底部追加计数器区域（标题 + 数字显示 + -1/+1 按钮）
// 依赖：config.js（必须先加载，提供 CONFIG.COUNTER / CONFIG.APP 常量）

// 箭头函数改写：DOMContentLoaded 回调使用箭头函数
document.addEventListener('DOMContentLoaded', () => {
    // 【配置抽离】选择器统一从 CONFIG.APP 读取
    const container = document.querySelector(CONFIG.APP.containerSelector);
    if (!container) return;

    // 计数器状态 —— 闭包私有变量，外部无法直接访问
    // 【配置抽离】初始值从 CONFIG.COUNTER.initial 读取
    let counterValue = CONFIG.COUNTER.initial;

    // 创建计数器外层容器
    const counterSection = document.createElement('div');
    counterSection.className = 'counter-section';

    // 标题 —— 【配置抽离】文案从 CONFIG.COUNTER.title 读取
    const counterTitle = document.createElement('p');
    counterTitle.className = 'counter-title';
    counterTitle.textContent = CONFIG.COUNTER.title;
    counterSection.appendChild(counterTitle);

    // 数字显示区域
    const counterDisplay = document.createElement('span');
    counterDisplay.className = 'counter-display';
    counterDisplay.textContent = counterValue;
    counterSection.appendChild(counterDisplay);

    // 按钮行
    const counterActions = document.createElement('div');
    counterActions.className = 'counter-actions';

    // -1 按钮 —— 【配置抽离】按钮文案从 CONFIG.COUNTER 读取
    const decrementBtn = document.createElement('button');
    decrementBtn.textContent = CONFIG.COUNTER.decrementLabel;
    decrementBtn.className = 'counter-btn';

    // +1 按钮
    const incrementBtn = document.createElement('button');
    incrementBtn.textContent = CONFIG.COUNTER.incrementLabel;
    incrementBtn.className = 'counter-btn';

    // 箭头函数改写 3：-1 按钮点击回调
    //   原先：decrementBtn.addEventListener('click', function () { ... });
    //   这里有多行语句（if + 赋值），不能省略 {}
    // 【配置抽离】最小值 → CONFIG.COUNTER.minCount，步长 → CONFIG.COUNTER.step
    decrementBtn.addEventListener('click', () => {
        if (counterValue > CONFIG.COUNTER.minCount) {
            counterValue -= CONFIG.COUNTER.step;
            counterDisplay.textContent = counterValue;
        }
    });

    // 箭头函数改写 4：+1 按钮点击回调
    //   原先：incrementBtn.addEventListener('click', function () { ... });
    // 【配置抽离】步长 → CONFIG.COUNTER.step，最大值 → CONFIG.COUNTER.maxCount
    incrementBtn.addEventListener('click', () => {
        if (counterValue < CONFIG.COUNTER.maxCount) {
            counterValue += CONFIG.COUNTER.step;
            counterDisplay.textContent = counterValue;
        }
    });

    // 将按钮插入 DOM
    counterActions.appendChild(decrementBtn);
    counterActions.appendChild(incrementBtn);
    counterSection.appendChild(counterActions);
    container.appendChild(counterSection);
});

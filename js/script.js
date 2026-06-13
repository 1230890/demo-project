// ===== 页面加载完成后执行 =====
document.addEventListener('DOMContentLoaded', function () {
    // 获取容器元素
    var container = document.querySelector('.container');

    // ============================
    //  弹窗按钮（已有功能）
    // ============================
    var btn = document.createElement('button');
    btn.textContent = '点击我';
    btn.className = 'alert-btn';
    btn.addEventListener('click', function () {
        alert('你好！欢迎来到我的页面 🎉');
    });
    container.appendChild(btn);

    // ============================
    //  简易计数器
    // ============================
    var counterValue = 0;

    // 创建计数器外层容器
    var counterSection = document.createElement('div');
    counterSection.className = 'counter-section';

    // 标题
    var counterTitle = document.createElement('p');
    counterTitle.className = 'counter-title';
    counterTitle.textContent = '计数器';
    counterSection.appendChild(counterTitle);

    // 数字显示区域
    var counterDisplay = document.createElement('span');
    counterDisplay.className = 'counter-display';
    counterDisplay.textContent = counterValue;
    counterSection.appendChild(counterDisplay);

    // 按钮行
    var counterActions = document.createElement('div');
    counterActions.className = 'counter-actions';

    // -1 按钮
    var decrementBtn = document.createElement('button');
    decrementBtn.textContent = '-1';
    decrementBtn.className = 'counter-btn';

    // +1 按钮
    var incrementBtn = document.createElement('button');
    incrementBtn.textContent = '+1';
    incrementBtn.className = 'counter-btn';

    // -1 按钮：点击减少数字（最小为 0）
    decrementBtn.addEventListener('click', function () {
        if (counterValue > 0) {
            counterValue -= 1;
            counterDisplay.textContent = counterValue;
        }
    });

    // +1 按钮：点击增加数字
    incrementBtn.addEventListener('click', function () {
        counterValue += 1;
        counterDisplay.textContent = counterValue;
    });

    // 将按钮插入 DOM
    counterActions.appendChild(decrementBtn);
    counterActions.appendChild(incrementBtn);
    counterSection.appendChild(counterActions);
    container.appendChild(counterSection);
});

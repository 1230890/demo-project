// ===== 全局配置 =====
// 集中管理项目常量，供各业务模块引用
// 修改此处即可全局生效，无需逐个文件查找替换
//
// ⚠ 必须在所有业务脚本（count.js / todo.js / script.js）之前加载

const CONFIG = Object.freeze({

    // ---------- 页面基础配置 ----------
    APP: Object.freeze({
        containerSelector: '.container', // 主卡片容器选择器
        copyrightYear: 2026,             // 页脚版权年份
    }),

    // ---------- 计数器 ----------
    COUNTER: Object.freeze({
        initial: 0,          // 初始值
        minCount: 0,         // 计数器最小数值（不可低于此值）
        maxCount: 3,       // 计数器最大数值（不可超过此值）
        step: 1,             // 每次加减的步长
        title: '计数器',     // 模块标题文案
        decrementLabel: '-1', // 减少按钮文案
        incrementLabel: '+1', // 增加按钮文案
    }),

    // ---------- 待办清单 ----------
    TODO: Object.freeze({
        title: '待办清单',                 // 模块标题文案
        placeholder: '输入新的待办事项...', // 输入框占位提示
        maxLength: 100,                    // 单条待办最大字符数
        addBtnText: '添加',                // 添加按钮文案
        emptyAlert: '请输入待办内容后再添加',  // 空输入（长度为 0）时的提示文案
        spacesAlert: '待办内容不能为纯空格',   // 纯空格输入时的提示文案
        deleteIcon: '×',                   // 删除按钮图标
        deleteLabel: '删除',               // 删除按钮无障碍标签
    }),
});

// 显式挂载到 window，确保所有后续加载的业务脚本都能通过 window.CONFIG 访问
// 注：const 在普通 <script> 中创建的是全局词法绑定，不会自动成为 window 属性
window.CONFIG = CONFIG;

export { trackButton, trackFormInput, trackScroll, trackPageLoad, trackApiPerformance, trackError, trackStayTime }

// 用于记录或发送跟踪数据到服务器的函数
function trackEvent(eventType: string, details: { [key: string]: unknown }) {
    console.log(`Event: ${eventType}`, details); // 在控制台打印事件类型和详情
    // 上报到服务端。
    // fetch('/测试接口地址',{ method: 'POST', body: JSON.stringify({ eventType, details }) });
}

// 跟踪按钮点击事件（应用场景：监控按钮点击量、表单提交）
function trackButton(id: string){
    const controller = new AbortController(), signal = controller.signal
    const button: HTMLElement | null  = document.getElementById(id); // 获取按钮元素
    button?.addEventListener('click', function () {
        trackEvent('button_click', { buttonId: id, timestamp: Date.now() }); // 记录点击事件并添加按钮ID和时间戳
    }, { signal });
    return ()=>{ controller.abort('abort trackButton') }
}

 // 监控输入字段聚焦事件（应用场景：监控表单输入字段聚焦）
function trackFormInput(inputSelector: string){
const inputFields: NodeListOf<Element> = document.querySelectorAll(inputSelector)
    inputFields.forEach((field) => {
        if(field instanceof HTMLInputElement){
            field.addEventListener('focus', function () {   
                trackEvent('input_focus', {
                    fieldName: field.name,
                    fieldType: field.type,
                    timestamp: Date.now()
                })
            })
        }
    })
}

// 跟踪页面滚动事件
function trackScroll(){
    const controller = new AbortController(), signal = controller.signal
    window.addEventListener('scroll', function () {
        trackEvent('page_scroll', { scrollY: window.scrollY, timestamp: Date.now() }); // 记录滚动事件并添加滚动位置和时间戳
    }, { signal });
    return ()=>{ controller.abort('abort trackScroll') }
}

// 测量页面加载时间（应用场景：监控页面访问量）
function trackPageLoad(){
    window.addEventListener('load', function () {
        const pageLoadTime = performance.now(); // 获取页面加载完成后的时间（毫秒）
        trackEvent('page_load', { duration: pageLoadTime }); // 记录页面加载事件，并包含加载耗时数据
    });
}

// 测量 API 调用的耗时
function trackApiPerformance(fn: Promise<unknown>) {
    const start = performance.now(); // 记录 API 调用的开始时间

    fn.then(() => {
        const duration = performance.now() - start; // 计算 API 调用的耗时
        trackEvent('api_call', { duration: duration, endpoint: '/api_url' }); // 记录 API 调用事件，并包含耗时和接口地址
    });
}

// 使用 window.onerror 实现基础的错误跟踪
function trackError(){
    const controller = new AbortController, signal = controller.signal
    window.addEventListener('error', function (e) {
        const { message, filename, lineno, colno, error } = e
        console.log(e)
        // 捕获 JavaScript 错误信息，并通过 trackEvent 函数记录
        trackEvent('js_error', {
            message: message,      // 错误信息
            filename: filename,        // 错误发生的文件
            lineno: lineno,        // 错误所在的行号
            colno: colno,          // 错误所在的列号
            error: error ? error.stack : '', // 错误的堆栈信息（如果有）
            timestamp: Date.now()  // 时间戳
        });
    }, { signal })
    return ()=>{ controller.abort() }
}

// 跟踪用户在页面特定区域的停留时间
function trackStayTime(id: string){
    let sectionStartTime = 0; // 记录进入区域的时间
    const sectionElement: HTMLElement | null = document.getElementById(id); // 获取目标区域的 DOM 元素

    // 当用户鼠标进入该区域时触发
    sectionElement?.addEventListener('mouseenter', function () {
        sectionStartTime = Date.now(); // 记录进入区域的时间戳
    });

    // 当用户鼠标离开该区域时触发
    sectionElement?.addEventListener('mouseleave', function () {
        const timeSpent = Date.now() - sectionStartTime; // 计算停留时间
        // 极短时间视为无意经过
        if(timeSpent > 100){
            trackEvent('time_spent', { sectionId: id, duration: timeSpent }); // 上报停留时间和区域标识
        }
    });
}

// 使用第三方服务 Sentry 进行错误跟踪, 适合用于捕获更多类型的异常并进行详细的错误分析 (dsn 配置唯一的项目标识)
// Sentry.init({ dsn: 'https://examplePublicKey@o0.ingest.sentry.io/0' }); // 初始化 Sentry
// Sentry.captureException(new Error('在这里描述错误内容')); // 捕获并上报自定义错误
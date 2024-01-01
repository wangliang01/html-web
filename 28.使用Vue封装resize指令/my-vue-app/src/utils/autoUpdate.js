let lastScripts
// 自动检测更新
export async function autoUpdate() {
    // 使用fetch拿到首页的html字符串
    const html = await fetch('https://www.saintic.com/')
        .then(response => response.text())

    // 使用正则拿到所有script标签
    const scripts = html.match(/<script[^>]*>([\s\S]*?)<\/script>/g)

    // 比较前后脚本，如果有不同，则提示更新
    if (!lastScripts) {
        lastScripts = scripts
    }
    // 比较两个数组的每一项，当有一项不相同，则表示有变化，提示更新
    else if (lastScripts && lastScripts.some((item, index) => item !== scripts[index])) {
        console.log('检测到新版本，请刷新页面！')
        lastScripts = scripts
    } else {
        console.log('没有检测到新版本')
    }

}


let DURATION = 2000
function init() {
    setTimeout(() => {
        autoUpdate()
        init()
    }, DURATION)
}


init()

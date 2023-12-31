// 使用Vue3写一个size-ob指令
const map = new WeakMap();
const observer = new ResizeObserver(entries => {
    entries.forEach(entry => {
        console.log(entry)
        let cb  = map.get(entry.target);
        if (!cb) return;
        const box = entry.borderBoxSize[0]
        cb({
            width: box.inlineSize,
            height: box.blockSize
        });
    });
});
const sizeOb = {
    mounted(el, binding) {
        console.log('mounted sizeOb')
        observer.observe(el);
        map.set(el, binding.value);
    },
    unmounted(el) {
        observer.unobserve(el);
    }
};


export default sizeOb;


export const vResize: any = {
    mounted: (element: any, binding: any) => {
        const onResizeCallback = binding.value;
        window.addEventListener('resize', () => {
            const width = document.documentElement.clientWidth;
            const height = document.documentElement.clientHeight;
            onResizeCallback({ width, height });
        })
    }
}
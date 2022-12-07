import type { Directive, DirectiveBinding } from "vue";

export const vResize: Directive = {
  mounted: (element: HTMLElement, binding: DirectiveBinding) => {
    const onResizeCallback: any = binding.value;
    window.addEventListener('resize', () => {
      const width: number = document.documentElement.clientWidth;
      const height: number = document.documentElement.clientHeight;
      onResizeCallback({ width, height });
    });
  },
};

// 防抖
export const debounce = (fn: () => void, time: number) => {
  let timeout: number | undefined
  return function (this: any, ...args: any) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn.apply(this, args)
    }, time)
  }
};

// px 转为 vw 的函数
export const vw = (px: number) => {
  const designWidth = 1920;
  return px / designWidth * document.documentElement.clientWidth;
};

// px 转为 vh 的函数
export const vh = (px: number) => {
  const designHeight = 1080;
  return px / designHeight * document.documentElement.clientHeight;
};

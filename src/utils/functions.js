//입력을 받을 때 debounce를 사용하여 일정 시간이 지난 후에 함수가 호출되도록 설정
export const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
};
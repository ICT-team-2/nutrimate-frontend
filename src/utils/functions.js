//입력을 받을 때 debounce를 사용하여 일정 시간이 지난 후에 함수가 호출되도록 설정
export const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
};

export const convertDateToUrlParam = (date = new Date()) => {
  return date.toISOString().split('T')[0].split('-').join('');
};

export const convertUrlParamToDate = (urlParam) => {
  return new Date(urlParam.replace(/(\d{4})(\d{2})(\d{2})/, '$1.$2.$3'));
};
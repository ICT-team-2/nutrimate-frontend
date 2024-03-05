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

/**
 * @description convert base64 to File
 * @param base_data {string} base64 data
 * @param filename {string} file name
 * @returns {module:buffer.File | File}
 */

export const base64toFile = (base_data, filename) => {
  let arr = base_data.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};
export const videoIdParser = (url: string) => {
  if (url.startsWith('https://www.youtube.com/')) {
    /** 재생목록 안에 있는 주소 파싱 */
    if (url.includes('&list')) {
      return url.split('&list')[0].split('watch?v=')[1];
    } else {
      return url.split('watch?v=')[1];
    }
  }
};

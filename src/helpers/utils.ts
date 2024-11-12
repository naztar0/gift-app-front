export const formatNumberK = (num: number) => {
  if (num >= 1000) {
    return `${(num / 1000).toFixed()}K`;
  }
  return num;
};

export const formatNumberT = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

export const utfChar = (s: string) => {
  if (!s) return '';
  return (s.codePointAt(0) || 0) >= 0xD800 ? s[0] + s[1] : s[0].toUpperCase();
};

export const formatDate = (s: string, preposition: string) => {
  const date = new Date(s);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString().slice(-2);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${day}.${month}.${year} ${preposition} ${hours}:${minutes}`;
};

export const maxSplit = (str: string, delimiter: string, max: number) => {
  const parts = str.split(delimiter);
  if (max >= parts.length - 1) {
    return parts;
  }
  const result = parts.slice(0, max);
  result.push(parts.slice(max).join(delimiter));
  return result;
};

export const getFps = async () => {
  return new Promise((resolve: (value: number) => void) => {
    let lastTime = performance.now();
    let frameCount = 0;
    let frameTime = 0;
    let updateFpsLimit = 500;
    let fps = 1;

    const update = () => {
      const currentTime = performance.now();
      frameTime += currentTime - lastTime;
      lastTime = currentTime;
      frameCount++;
      if (frameTime >= 1000) {
        fps = Math.max(fps, frameCount);
        frameCount = 0;
        frameTime = 0;
      }
      if (fps !== 1) {
        updateFpsLimit--;
      }
      if (updateFpsLimit > 0) {
        requestAnimationFrame(update);
      } else {
        resolve(fps);
      }
    };
    update();
  });
};

  // デコード関数
  export function base64urlToBuffer(base64urlString) {
    const padding = '='.repeat((4 - base64urlString.length % 4) % 4);
    const base64 = (base64urlString + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; i++) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray.buffer;
  }

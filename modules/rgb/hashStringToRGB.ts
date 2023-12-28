function hashStringToRGB(str: string) {
    // 문자열을 해싱하여 32비트 정수로 변환
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
    }
    
    // 해시 값을 사용하여 RGB 값을 생성
    const r = (hash & 0xFF0000) >> 16; // 빨간색 성분
    const g = (hash & 0x00FF00) >> 8;  // 녹색 성분
    const b = hash & 0x0000FF;         // 파란색 성분
    return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
  }
  export default hashStringToRGB;
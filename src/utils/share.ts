declare global {
  interface Window {
    Kakao?: any;
  }
}

export function ensureKakaoLoaded(appKey: string) {
  if (typeof window === 'undefined') return;
  if (window.Kakao && window.Kakao.isInitialized?.()) return;
  const script = document.createElement('script');
  script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js';
  script.integrity = 'sha384-TiNhIYwppHJs+TQ1vN7WABRItUbB3VxFBW0Yj3teK0r8xjPJmUKmU3mYXN6rtJw8';
  script.crossOrigin = 'anonymous';
  script.async = true;
  script.onload = () => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(appKey);
    }
  };
  document.head.appendChild(script);
}

export function shareKakaoFeed(options: {
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
}) {
  if (!window.Kakao) return;
  window.Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: options.title,
      description: options.description,
      imageUrl: options.imageUrl,
      link: { mobileWebUrl: options.linkUrl, webUrl: options.linkUrl }
    },
    buttons: [
      {
        title: '보러가기',
        link: { mobileWebUrl: options.linkUrl, webUrl: options.linkUrl }
      }
    ]
  });
}



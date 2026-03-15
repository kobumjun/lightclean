/**
 * 사이트 전역 설정 — 실서비스 전에 여기 값들만 교체하면 됩니다.
 */

export const siteConfig = {
  /** 브랜드명 */
  brandName: "번개배관케어",

  /** 대표번호 (placeholder) */
  phone: "000-0000-0000",
  /** tel: 링크용 (하이픈 제거) */
  phoneTel: "00000000000",

  /** 카카오톡 상담 링크 (placeholder) */
  kakaoUrl: "https://placeholder-kakao.com",

  /** 간편상담 신청 페이지 경로 */
  consultPath: "/consult",

  /** 사업자 정보 (placeholder) */
  business: {
    companyName: "(주)번개배관케어",
    representative: "대표자명",
    registrationNumber: "000-00-00000",
    address: "서울특별시 OO구 OO로 000 OO빌딩 000호",
    phone: "000-0000-0000",
  },

  /** 운영시간 placeholder */
  operatingHours: "연중무휴 24시간 출동",

  /** 메뉴 (라벨 ↔ 경로) */
  menus: [
    { label: "번개배관케어(홈)", href: "/" },
    { label: "하수구막힘", href: "/drain-clog" },
    { label: "싱크대막힘", href: "/sink-clog" },
    { label: "변기막힘", href: "/toilet-clog" },
    { label: "악취제거", href: "/odor-removal" },
    { label: "누수탐지", href: "/leak-detection" },
    { label: "작업후기", href: "/reviews" },
  ] as const,

  /** 서비스 타입 옵션 (후기/상담용) */
  serviceTypes: [
    "하수구막힘",
    "싱크대막힘",
    "변기막힘",
    "악취제거",
    "누수탐지",
  ] as const,

  /** 간편상담 제출 후 연결 방식 placeholder (실제 구현 시 tel/sms/kakao 등) */
  consultSubmitRedirect: {
    type: "tel" as "tel" | "sms" | "kakao" | "none",
    value: "000-0000-0000", // tel이면 번호, sms면 번호 등
  },

  /** 광고 유입 안내 팝업 (B안: 프론트만, DB/로그 저장 없음) */
  adPopup: {
    /** 팝업 기능 사용 여부 */
    enableAdPopup: true,
    /** true: 항상 표시(관리자/개발 확인용), false: referrer 또는 utm 존재 시에만 표시 */
    alwaysShowAdPopup: false,
    /** true: 세션 동안 한 번만 표시 후 sessionStorage로 숨김, false: 조건 맞을 때마다 표시 */
    adPopupShowOnce: true,
    /** 팝업 제목 */
    adPopupTitle: "광고 유입 안내",
    /** 팝업 설명 문구 (2줄 권장) */
    adPopupDescription:
      "광고 또는 외부 링크를 통해 접속하신 경우, 아래 유입 정보를 참고하실 수 있습니다. 상담 문의 시 접속 정보를 함께 전달하시면 확인에 도움이 됩니다.",
    /** 복사 완료 시 토스트 문구 */
    adPopupCopyToast: "주소가 클립보드에 복사되었습니다.",
  },
} as const;

export type ServiceType = (typeof siteConfig.serviceTypes)[number];

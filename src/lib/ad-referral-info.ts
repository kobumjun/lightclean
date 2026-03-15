/**
 * 광고 유입 정보 파싱 (클라이언트 전용, B안 — DB/저장 없음)
 * 브라우저에서만 호출하세요.
 */

export interface AdReferralInfo {
  /** 현재 접속 주소 (full URL) */
  currentUrl: string;
  /** 이전 유입 주소 (document.referrer) */
  referrer: string;
  /** utm_source */
  utmSource: string;
  /** utm_medium */
  utmMedium: string;
  /** utm_campaign */
  utmCampaign: string;
  /** utm_term (있을 때만 표시용) */
  utmTerm: string;
  /** utm_content */
  utmContent: string;
  /** 접속 시각 (한국어 포맷) */
  accessTime: string;
  /** referrer 존재 여부 */
  hasReferrer: boolean;
  /** utm 파라미터 하나라도 있는지 (utm_source/medium/campaign/term) */
  hasUtm: boolean;
  /** referrer가 현재 사이트와 다른 도메인인지 (외부 유입) */
  isExternalReferrer: boolean;
}

const EMPTY_LABEL = "없음";
const DIRECT_LABEL = "직접 접속";

function getParam(params: URLSearchParams, key: string): string {
  const v = params.get(key);
  if (v == null || v.trim() === "") return "";
  return v.trim();
}

/**
 * 현재 페이지의 유입 정보를 수집합니다.
 * window/document 사용하므로 브라우저 환경에서만 호출하세요.
 */
export function getAdReferralInfo(): AdReferralInfo | null {
  if (typeof window === "undefined" || typeof document === "undefined") return null;

  const params = new URLSearchParams(window.location.search);
  const utmSource = getParam(params, "utm_source");
  const utmMedium = getParam(params, "utm_medium");
  const utmCampaign = getParam(params, "utm_campaign");
  const utmTerm = getParam(params, "utm_term");
  const utmContent = getParam(params, "utm_content");

  /** utm_source, utm_medium, utm_campaign, utm_term 중 하나라도 있으면 true (utm_content 제외) */
  const hasUtm = !!(utmSource || utmMedium || utmCampaign || utmTerm);
  const rawReferrer = document.referrer || "";
  const hasReferrer = rawReferrer.length > 0;

  let isExternalReferrer = false;
  if (hasReferrer) {
    try {
      const referrerHost = new URL(rawReferrer).host;
      isExternalReferrer = referrerHost !== window.location.host;
    } catch {
      isExternalReferrer = false;
    }
  }

  const referrerDisplay = hasReferrer ? rawReferrer : DIRECT_LABEL;

  const now = new Date();
  const accessTime = now.toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return {
    currentUrl: window.location.href,
    referrer: referrerDisplay,
    utmSource: utmSource || EMPTY_LABEL,
    utmMedium: utmMedium || EMPTY_LABEL,
    utmCampaign: utmCampaign || EMPTY_LABEL,
    utmTerm: utmTerm || "",
    utmContent: utmContent || EMPTY_LABEL,
    accessTime,
    hasReferrer,
    hasUtm,
    isExternalReferrer,
  };
}

/**
 * 팝업 표시 여부:
 * - URL에 utm_source, utm_medium, utm_campaign, utm_term 중 하나라도 있을 때
 * - 또는 document.referrer가 존재하고, referrer 도메인이 현재 사이트와 다를 때(외부 유입)
 * 직접 접속(referrer 없음)이면 표시하지 않음.
 */
export function shouldShowAdPopup(info: AdReferralInfo | null): boolean {
  if (!info) return false;
  return info.hasUtm || (info.hasReferrer && info.isExternalReferrer);
}

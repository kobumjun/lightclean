# 나중에 바꿔야 할 값 목록

실서비스·외주 납품 전에 아래 항목을 반드시 확인하고 교체하세요.

---

## 1. 사이트 설정 (`src/lib/site-config.ts`)

| 항목 | 설명 | 현재 |
|------|------|------|
| `brandName` | 브랜드명 | 번개배관케어 |
| `phone` | 대표번호 (표시용) | 000-0000-0000 |
| `phoneTel` | tel: 링크용 (하이픈 제거) | 00000000000 |
| `kakaoUrl` | 카카오톡 상담 링크 | placeholder |
| `consultPath` | 간편상담 페이지 경로 | /consult |
| `business.companyName` | 사업자 상호 | (주)번개배관케어 |
| `business.representative` | 대표자명 | 대표자명 |
| `business.registrationNumber` | 사업자등록번호 | 000-00-00000 |
| `business.address` | 주소 | placeholder |
| `business.phone` | 사업자 연락처 | 000-0000-0000 |
| `operatingHours` | 운영시간 문구 | 연중무휴 24시간 출동 |
| `consultSubmitRedirect` | 제출 후 연결 방식 (tel/sms/kakao/none) 및 값 | type: "tel", value: "000-0000-0000" |

**방법:** `src/lib/site-config.ts` 파일을 열어 위 값들을 실제 정보로 한 번에 수정하면 됩니다.

---

## 2. 환경 변수 (`.env` / `.env.local`)

| 변수 | 설명 | 필수 |
|------|------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 프로젝트 URL | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key | ✅ |
| `ADMIN_PASSWORD` | 관리자 비밀번호 (숫자 등) | ✅ (MVP용) |

`.env.example`을 복사해 `.env.local`을 만든 뒤 실제 값으로 채우세요.

---

## 3. Supabase 설정

- **테이블:** `supabase-schema.sql`을 Supabase SQL Editor에서 실행해 `reviews`, `consultations` 테이블 및 RLS를 생성하세요.
- **Storage:** Dashboard > Storage에서 bucket `review-images`를 생성하고, 관리자 업로드를 위해 해당 bucket에 대한 업로드 정책(예: anon 또는 인증 사용자 insert 허용)을 설정하세요.
- **consultations 조회:** 상담 신청 내역은 Supabase Dashboard에서 `consultations` 테이블로 조회할 수 있습니다. (필요 시 관리자 페이지에서 조회 기능 추가 가능)

---

## 4. 광고 접근 안내 팝업

- **문구:** `src/components/PopupNotice.tsx`에서 "광고 접근 안내" 제목과 본문 텍스트를 실제 안내 문구로 수정하세요.
- **도메인 복사:** 버튼 동작은 그대로 두거나, 복사 후 토스트 메시지 등을 추가해도 됩니다.

---

## 5. 간편상담 제출 후 동작

- **현재:** 제출 시 `siteConfig.consultSubmitRedirect`에 따라 `tel:` / `sms:` / 카카오 링크로 이동하거나, DB 저장 후 `/consult?done=1`로 이동합니다.
- **실제 문자 발송:** 원하면 백엔드(API Route 또는 Server Action)에서 SMS API(예: 알리고, NHN 등)를 연동해 실제 문자 발송을 추가할 수 있습니다. 상담 데이터는 이미 `consultations` 테이블에 저장됩니다.

---

## 6. 관리자 인증 (보안 강화)

- **현재:** 숫자 비밀번호 1개 + sessionStorage 기반 MVP입니다.
- **추후:** NextAuth, Supabase Auth 등 정식 인증으로 교체 시 `src/app/actions/admin-auth.ts`, `src/components/AdminGuard.tsx`, `src/app/admin/page.tsx`만 수정하면 됩니다.

---

## 7. 이미지 최적화 (선택)

- 후기 이미지가 Supabase Storage 등 외부 URL일 때 Next.js Image 최적화를 쓰려면 `next.config.ts`의 `images.remotePatterns`에 사용 중인 Supabase 호스트(예: `xxx.supabase.co`)를 추가하세요.
- 현재는 `<img>` 사용으로 설정 없이 동작합니다.

---

## 8. 메타·SEO

- 각 페이지의 `metadata`(title, description)는 이미 설정되어 있습니다. 실제 브랜드·서비스에 맞게 문구만 다듬으면 됩니다.
- `src/app/layout.tsx`의 기본 title/description도 `siteConfig.brandName`을 쓰고 있어, 브랜드명 변경 시 자동 반영됩니다.

---

이 목록을 기준으로 한 번씩 교체하면 실서비스·납품용으로 바로 사용할 수 있습니다.

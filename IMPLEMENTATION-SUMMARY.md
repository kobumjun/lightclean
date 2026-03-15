# 번개배관케어 — 구현 전략 요약

## 1. 전체 구현 전략 요약

- **프레임워크:** Next.js 16 App Router + TypeScript + Tailwind CSS
- **데이터·파일:** Supabase(DB + Storage). 후기·상담 데이터는 Supabase, 후기 이미지는 Storage bucket `review-images` 사용
- **관리자:** MVP 수준 비밀번호 1개(env `ADMIN_PASSWORD`) + sessionStorage 기반 접근. 추후 NextAuth/Supabase Auth 등으로 교체 가능하도록 모듈화
- **설정:** 연락처·사업자정보·메뉴 등은 `src/lib/site-config.ts` 한 곳에서 관리해 실서비스 전 한 번에 교체 가능
- **레이아웃:** 공통 Header(PC 네비 + 모바일 햄버거), Footer, 하단 고정 FloatingCTA(전화·카카오). 메인은 히어로~FAQ까지 랜딩형 섹션 구성
- **서비스 페이지:** 5개(하수구/싱크대/변기/악취/누수)는 각각 섹션 순서·강조(테이블/카드/리스트)를 다르게 해 “복붙” 느낌 최소화
- **후기:** 목록(/reviews), 상세(/reviews/[slug]), 관리자에서 CRUD + 다중 이미지 업로드( Supabase Storage )
- **간편상담:** 폼 제출 시 DB 저장 + 제출 후 연결은 `siteConfig.consultSubmitRedirect`에 따라 tel/sms/kakao 또는 완료 페이지로 처리(실제 SMS 발송은 미구현, placeholder)

---

## 2. 파일/폴더 구조

```
src/
├── app/
│   ├── actions/
│   │   ├── admin-auth.ts      # 관리자 비밀번호 검증
│   │   ├── consultation.ts   # 상담 신청 저장
│   │   ├── reviews.ts        # 후기 CRUD, 목록/상세 조회
│   │   └── upload.ts         # 후기 이미지 다중 업로드 (Storage)
│   ├── admin/
│   │   ├── layout.tsx        # AdminGuard 래핑
│   │   ├── page.tsx          # 로그인(비밀번호)
│   │   └── reviews/
│   │       ├── page.tsx      # 후기 목록(수정/삭제/공개토글)
│   │       ├── new/page.tsx  # 새 후기 작성(다중 이미지)
│   │       └── [id]/edit/page.tsx  # 후기 수정
│   ├── consult/
│   │   ├── layout.tsx        # 메타데이터
│   │   └── page.tsx          # 간편상담 폼 / 완료 화면
│   ├── reviews/
│   │   ├── page.tsx          # 작업후기 목록
│   │   └── [slug]/page.tsx   # 후기 상세
│   ├── drain-clog/
│   ├── sink-clog/
│   ├── toilet-clog/
│   ├── odor-removal/
│   ├── leak-detection/
│   ├── layout.tsx            # 루트 레이아웃(Header/Footer/FloatingCTA)
│   ├── page.tsx              # 메인(히어로~FAQ + 팝업)
│   └── globals.css
├── components/
│   ├── Header.tsx
│   ├── MobileMenu.tsx
│   ├── Footer.tsx
│   ├── FloatingCTA.tsx
│   ├── SectionTitle.tsx
│   ├── ReviewCard.tsx
│   ├── ReviewGallery.tsx
│   ├── ConsultationForm.tsx
│   ├── PopupNotice.tsx       # 광고 접근 안내 팝업
│   └── AdminGuard.tsx
├── lib/
│   ├── site-config.ts       # 브랜드/연락처/메뉴/사업자정보
│   └── supabase/
│       ├── client.ts         # 브라우저용 createClient
│       └── server.ts         # 서버용 createClient (re-export)
└── types/
    └── database.ts          # ReviewRow, ConsultationRow 등

supabase-schema.sql           # reviews, consultations 테이블 + RLS + trigger
.env.example
REPLACE-LATER.md              # 실서비스 전 교체할 값 정리
```

---

## 3. 필요한 환경 변수 목록

| 변수 | 용도 | 필수 |
|------|------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 프로젝트 URL | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key | ✅ |
| `ADMIN_PASSWORD` | 관리자 로그인 비밀번호 (MVP) | ✅ |

---

## 4. Supabase 테이블/스토리지 설계

- **reviews:** id, title, slug(unique), summary, content, service_type, location_text, thumbnail_url, image_urls(text[]), is_published, created_at, updated_at. RLS: 공개(is_published=true)만 SELECT 허용.
- **consultations:** id, name, phone, inquiry_type, message, privacy_agreed, created_at. RLS: INSERT만 허용(조회는 Dashboard/관리자용).
- **Storage:** bucket `review-images` (public 권장). 업로드 정책: MVP에서는 anon INSERT 허용 가능.

자세한 SQL은 `supabase-schema.sql` 참고.

---

## 5. UI 컴포넌트 설계

- **Header:** 로고, PC 네비(메뉴 링크), CTA(간편상담/전화), 모바일 햄버거 → MobileMenu
- **MobileMenu:** 슬라이드 메뉴, 메뉴 링크 + 간편상담/전화 버튼
- **Footer:** 사업자정보·연락처·주소·카카오( site-config 기반 )
- **FloatingCTA:** 하단 고정 전화 버튼 + 카카오 버튼 (모바일/PC 모두)
- **SectionTitle:** 섹션 제목 + 선택 subtitle
- **ReviewCard:** 썸네일, 제목, 요약, 날짜 → /reviews/[slug] 링크
- **ReviewGallery:** 다중 이미지 슬라이더(메인 + 썸네일 목록)
- **ConsultationForm:** 이름/연락처/상담유형/문의/개인정보동의, 제출 시 Server Action + redirect
- **PopupNotice:** 광고 접근 안내, sessionStorage로 닫음 유지, 도메인 복사 버튼
- **AdminGuard:** sessionStorage 기반 관리자 여부 확인, 비인증 시 /admin 리다이렉트

---

## 6. 페이지별 구현 포인트

| 경로 | 포인트 |
|------|--------|
| `/` | 히어로, 서비스 카드, 출동 프로세스, 강점, 자주 발생 문제, 작업 범위, 신뢰 요소, 후기 미리보기, 간편상담 배너, FAQ. 첫 진입 시 PopupNotice. |
| `/drain-clog` ~ `/leak-detection` | 각각 다른 섹션 순서·카드/테이블/리스트 조합. 공통: 헤드라인, 증상·원인·방치 시 문제, 프로세스, 작업 사례, FAQ, 다른 서비스 링크. |
| `/reviews` | 공개 후기 카드 그리드. ReviewCard 사용. |
| `/reviews/[slug]` | ReviewGallery + 본문. 메타데이터 동적. |
| `/consult` | ConsultationForm. done=1이면 완료 메시지. |
| `/admin` | 비밀번호 폼 → 검증 후 sessionStorage + /admin/reviews 이동. |
| `/admin/reviews` | 목록 테이블, 공개/비공개 토글, 수정/삭제. |
| `/admin/reviews/new` | 제목/요약/본문/서비스유형/지역/공개여부 + 다중 이미지 업로드 → upload 액션 후 createReview. |
| `/admin/reviews/[id]/edit` | 기존 이미지 표시·삭제 + 새 이미지 추가, 나머지 필드 수정. |

위 내용까지 반영된 실제 코드는 저장소의 해당 경로에 모두 포함되어 있습니다.

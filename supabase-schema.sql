-- ============================================================
-- Supabase 스키마 (번개배관케어)
-- Supabase Dashboard > SQL Editor에서 실행
-- ============================================================

-- reviews 테이블
CREATE TABLE IF NOT EXISTS public.reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  summary text NOT NULL DEFAULT '',
  content text NOT NULL DEFAULT '',
  service_type text NOT NULL DEFAULT '',
  location_text text NOT NULL DEFAULT '',
  thumbnail_url text,
  image_urls text[] DEFAULT '{}',
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- slug 인덱스 (상세 페이지 조회용)
CREATE INDEX IF NOT EXISTS idx_reviews_slug ON public.reviews(slug);
CREATE INDEX IF NOT EXISTS idx_reviews_is_published_created_at ON public.reviews(is_published, created_at DESC);

-- consultations 테이블 (간편상담 신청)
CREATE TABLE IF NOT EXISTS public.consultations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  inquiry_type text NOT NULL DEFAULT '',
  message text NOT NULL DEFAULT '',
  privacy_agreed boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- RLS 정책 (공개 후기만 읽기 허용)
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;

-- 누구나 공개된 후기만 조회 가능
CREATE POLICY "Public can read published reviews"
  ON public.reviews FOR SELECT
  USING (is_published = true);

-- MVP: anon으로 후기 INSERT 허용 (관리자 페이지에서 사용, 추후 인증으로 제한 권장)
CREATE POLICY "Allow insert reviews"
  ON public.reviews FOR INSERT
  WITH CHECK (true);

-- MVP: anon으로 후기 UPDATE/DELETE 허용 (관리자 페이지에서 사용)
CREATE POLICY "Allow update reviews"
  ON public.reviews FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow delete reviews"
  ON public.reviews FOR DELETE
  USING (true);

-- consultations는 서버/관리자만 조회 가능하도록 할 경우 추가 정책 필요.
-- MVP에서는 anon key로 insert 허용해 상담 신청 받고, 조회는 dashboard에서 service role 사용 권장.
CREATE POLICY "Anyone can insert consultation"
  ON public.consultations FOR INSERT
  WITH CHECK (true);

-- Storage bucket: review-images
-- Supabase Dashboard > Storage > New bucket > 이름: review-images, Public 체크 권장.
-- Policies에서 "Allow public uploads" 또는 다음 정책 추가:
--   Policy name: Allow anon upload
--   Allowed operation: INSERT
--   Target: review-images
--   USING: (true)  -- MVP용. 추후 인증 사용자만 허용하도록 변경 가능.

-- updated_at 자동 갱신 (reviews)
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS reviews_updated_at ON public.reviews;
CREATE TRIGGER reviews_updated_at
  BEFORE UPDATE ON public.reviews
  FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();

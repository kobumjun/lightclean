import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: "간편상담 신청",
  description: `이름·연락처·증상을 적어 주시면 ${siteConfig.brandName}에서 빠르게 연락드립니다.`,
};

export default function ConsultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

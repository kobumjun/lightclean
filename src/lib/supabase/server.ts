import { createClient as createSupabaseClient } from "./client";

/**
 * 서버 컴포넌트/Server Action에서 사용할 Supabase 클라이언트.
 * 현재는 브라우저와 동일한 클라이언트 사용. 추후 createServerClient 등으로 교체 가능.
 */
export function createServerClient() {
  return createSupabaseClient();
}

/** Server Action 등에서 import 시 createClient 이름으로 사용 가능하도록 re-export */
export const createClient = createServerClient;

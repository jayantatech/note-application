// globals.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    PORT?: string;
    SUPABASE_URLL?: string;
    SUPABASE_ANON_KEYY?: string;
  }
}

export interface Env {
  DB: D1Database;
  ASSETS: Fetcher;
}

export default {
  async fetch(): Promise<Response> {
    return new Response("Code-Game API");
  },
} satisfies ExportedHandler<Env>;

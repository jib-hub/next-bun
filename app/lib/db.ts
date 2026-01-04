import "server-only";

let _db: any = null;

export function getDb() {
  if (_db) return _db;

  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set (runtime)");
  }

  const SQLClass = (Bun as any).SQL;
  _db = new SQLClass(url);

  return _db;
}
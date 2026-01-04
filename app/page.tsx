export const dynamic = "force-dynamic"; // keeps it always server-rendered

async function getUsers() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/users`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch users");
  const data = await res.json();
  return data.users as Array<{ id: number; email: string; name: string; created_at: string }>;
}

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <main style={{ padding: 24 }}>
      <h1>Users</h1>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} — {u.email} — {new Date(u.created_at).toLocaleString()}
          </li>
        ))}
      </ul>
    </main>
  );
}
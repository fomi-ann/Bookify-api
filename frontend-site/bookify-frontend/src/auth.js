export async function getMe() {
  const res = await fetch("http://localhost:8080/users/sessions/me", {
    credentials: "include"
  });

  if (!res.ok) return null;

  return await res.json();
}

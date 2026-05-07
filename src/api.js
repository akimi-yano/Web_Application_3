// localならlocalhost、そうでなければ Render の URL を使うようにします
const BASE_URL = window.location.hostname === 'localhost' 
  ? "http://localhost:3001/api" 
  : "https://emotion-tracker-eqhm.onrender.com/api";

export async function getEmotions() {
  const res = await fetch(`${BASE_URL}/emotions`);
  if (!res.ok) throw new Error("取得失敗");
  return res.json();
}

export async function createEmotion(data) {
  const res = await fetch(`${BASE_URL}/emotions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("保存失敗");
  return res.json();
}

export async function deleteEmotion(id) {
  const res = await fetch(`${BASE_URL}/emotions/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("削除失敗");
  return res.json();
}

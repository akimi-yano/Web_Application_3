import React, { useState, useEffect } from "react";
import { getEmotions, createEmotion, deleteEmotion } from "./api";

const EMOTIONS = [
  { label: "嬉しい", icon: "😊" },
  { label: "悲しい", icon: "😢" },
  { label: "怒り", icon: "😠" },
  { label: "不安", icon: "😰" },
  { label: "驚き", icon: "😲" },
  { label: "感謝", icon: "🙏" },
  { label: "達成感", icon: "🎉" },
  { label: "疲れ", icon: "😴" },
];

const TRIGGERS = [
  "仕事", "人間関係", "家族", "恋愛",
  "体調", "お金", "趣味", "その他",
];

export default function App() {
  const [records, setRecords] = useState([]);
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [intensity, setIntensity] = useState(5);
  const [selectedTrigger, setSelectedTrigger] = useState(null);
  const [memo, setMemo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRecords();
  }, []);

  async function fetchRecords() {
    try {
      const data = await getEmotions();
      setRecords(data);
    } catch (e) {
      setError("記録の取得に失敗しました");
    }
  }

  async function handleSave() {
    if (!selectedEmotion) return;
    setLoading(true);
    setError(null);
    try {
      await createEmotion({
        emotion: selectedEmotion,
        intensity,
        trigger: selectedTrigger,
        memo: memo.trim() || null,
      });
      setSelectedEmotion(null);
      setIntensity(5);
      setSelectedTrigger(null);
      setMemo("");
      await fetchRecords();
    } catch (e) {
      setError("保存に失敗しました");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteEmotion(id);
      setRecords((prev) => prev.filter((r) => r.id !== id));
    } catch (e) {
      setError("削除に失敗しました");
    }
  }

  function formatDate(iso) {
    const d = new Date(iso);
    return `${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`;
  }

  const emotionIcon = (label) => EMOTIONS.find((e) => e.label === label)?.icon ?? "💭";

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "1.5rem 1rem", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: 22, fontWeight: 500, marginBottom: 4 }}>感情トラッカー</h1>
      <p style={{ fontSize: 14, color: "#888", marginBottom: 24 }}>
        今、何を感じていますか？
      </p>

      {error && (
        <div style={{ background: "#fff0f0", border: "0.5px solid #ffcccc", borderRadius: 8, padding: "10px 12px", marginBottom: 16, fontSize: 13, color: "#cc3333" }}>
          {error}
        </div>
      )}

      {/* 感情選択 */}
      <div style={{ background: "#fff", border: "0.5px solid #e0e0e0", borderRadius: 12, padding: "1.25rem", marginBottom: 12 }}>
        <p style={{ fontSize: 12, fontWeight: 500, color: "#888", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.06em" }}>感情</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
          {EMOTIONS.map(({ label, icon }) => (
            <button
              key={label}
              onClick={() => setSelectedEmotion(label)}
              style={{
                padding: "10px 4px",
                border: selectedEmotion === label ? "1.5px solid #4a90e2" : "0.5px solid #e0e0e0",
                borderRadius: 8,
                background: selectedEmotion === label ? "#e8f0fc" : "#fff",
                color: selectedEmotion === label ? "#1a5bbf" : "#666",
                cursor: "pointer",
                textAlign: "center",
                fontSize: 13,
              }}
            >
              <span style={{ fontSize: 20, display: "block", marginBottom: 4 }}>{icon}</span>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* 強度 */}
      <div style={{ background: "#fff", border: "0.5px solid #e0e0e0", borderRadius: 12, padding: "1.25rem", marginBottom: 12 }}>
        <p style={{ fontSize: 12, fontWeight: 500, color: "#888", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.06em" }}>強度</p>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 14, color: "#888", minWidth: 32 }}>弱い</span>
          <input type="range" min={1} max={10} step={1} value={intensity} onChange={(e) => setIntensity(Number(e.target.value))} style={{ flex: 1 }} />
          <span style={{ fontSize: 14, color: "#888", minWidth: 32, textAlign: "right" }}>強い</span>
          <span style={{ fontSize: 18, fontWeight: 500, minWidth: 24, textAlign: "right" }}>{intensity}</span>
        </div>
      </div>

      {/* トリガー */}
      <div style={{ background: "#fff", border: "0.5px solid #e0e0e0", borderRadius: 12, padding: "1.25rem", marginBottom: 12 }}>
        <p style={{ fontSize: 12, fontWeight: 500, color: "#888", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.06em" }}>きっかけ（任意）</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 12 }}>
          {TRIGGERS.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTrigger(selectedTrigger === t ? null : t)}
              style={{
                padding: "8px 4px",
                border: selectedTrigger === t ? "1.5px solid #34a853" : "0.5px solid #e0e0e0",
                borderRadius: 8,
                background: selectedTrigger === t ? "#e6f4ea" : "#fff",
                color: selectedTrigger === t ? "#1e7e34" : "#666",
                cursor: "pointer",
                fontSize: 12,
                textAlign: "center",
              }}
            >
              {t}
            </button>
          ))}
        </div>
        <textarea
          placeholder="詳しくメモ（任意）"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 12px",
            border: "0.5px solid #e0e0e0",
            borderRadius: 8,
            fontSize: 14,
            fontFamily: "sans-serif",
            resize: "vertical",
            minHeight: 72,
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* 保存ボタン */}
      <button
        onClick={handleSave}
        disabled={!selectedEmotion || loading}
        style={{
          width: "100%",
          padding: 12,
          border: "none",
          borderRadius: 8,
          background: selectedEmotion ? "#111" : "#ccc",
          color: "#fff",
          fontSize: 15,
          fontWeight: 500,
          cursor: selectedEmotion ? "pointer" : "not-allowed",
          marginBottom: 32,
        }}
      >
        {loading ? "保存中..." : "記録する"}
      </button>

      {/* 記録一覧 */}
      <h2 style={{ fontSize: 16, fontWeight: 500, marginBottom: 12 }}>記録</h2>
      <div style={{ background: "#fff", border: "0.5px solid #e0e0e0", borderRadius: 12, padding: "0 1.25rem" }}>
        {records.length === 0 ? (
          <p style={{ textAlign: "center", padding: "2rem 0", color: "#aaa", fontSize: 14 }}>まだ記録がありません</p>
        ) : (
          records.map((r) => (
            <div key={r.id} style={{ display: "flex", gap: 12, padding: "12px 0", borderBottom: "0.5px solid #f0f0f0" }}>
              <span style={{ fontSize: 24, flexShrink: 0 }}>{emotionIcon(r.emotion)}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 14, fontWeight: 500 }}>{r.emotion}</span>
                  <span style={{ fontSize: 12, color: "#888" }}>強度 {r.intensity}</span>
                  {r.trigger && (
                    <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 99, background: "#f0f0f0", color: "#666" }}>{r.trigger}</span>
                  )}
                  <span style={{ fontSize: 12, color: "#bbb", marginLeft: "auto" }}>{formatDate(r.created_at)}</span>
                </div>
                {r.memo && <p style={{ fontSize: 13, color: "#666", margin: 0 }}>{r.memo}</p>}
              </div>
              <button
                onClick={() => handleDelete(r.id)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#ccc", fontSize: 16, flexShrink: 0, alignSelf: "flex-start" }}
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

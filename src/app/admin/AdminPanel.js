"use client";
import { useState } from "react";

export default function AdminPanel() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);

  const fetchMessages = async (pw) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw || password }),
      });
      if (!res.ok) throw new Error(res.status === 401 ? "Wrong password" : "Server error");
      const data = await res.json();
      setMessages(data.messages);
      setAuthed(true);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleRead = async (id, read) => {
    await fetch("/api/admin", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, id, read: !read }),
    });
    setMessages(msgs => msgs.map(m => m._id === id ? { ...m, read: !read } : m));
  };

  const deleteMsg = async (id) => {
    if (!confirm("Delete this message?")) return;
    await fetch("/api/admin", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, id }),
    });
    setMessages(msgs => msgs.filter(m => m._id !== id));
    if (selected === id) setSelected(null);
  };

  const unreadCount = messages.filter(m => !m.read).length;

  if (!authed) {
    return (
      <div style={styles.loginWrap}>
        <div style={styles.loginCard}>
          <div style={styles.loginLogo}>L</div>
          <h1 style={styles.loginTitle}>Admin Access</h1>
          <p style={styles.loginSub}>Enter admin password to view messages</p>
          {error && <div style={styles.error}>{error}</div>}
          <form onSubmit={(e) => { e.preventDefault(); fetchMessages(); }} style={styles.loginForm}>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              style={styles.input}
              autoFocus
            />
            <button type="submit" style={styles.loginBtn} disabled={loading}>
              {loading ? "Checking..." : "Login →"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const selectedMsg = messages.find(m => m._id === selected);

  return (
    <div style={styles.wrap}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <div style={styles.brandRow}>
            <div style={styles.brandMark}>L</div>
            <span style={styles.brandText}>LUMARIX</span>
          </div>
          <p style={styles.sidebarLabel}>Contact Messages</p>
        </div>

        <div style={styles.statsRow}>
          <div style={styles.statCard}>
            <span style={styles.statNum}>{messages.length}</span>
            <span style={styles.statLabel}>Total</span>
          </div>
          <div style={{ ...styles.statCard, ...(unreadCount > 0 ? styles.statCardActive : {}) }}>
            <span style={styles.statNum}>{unreadCount}</span>
            <span style={styles.statLabel}>Unread</span>
          </div>
        </div>

        <button onClick={() => fetchMessages()} style={styles.refreshBtn}>
          ↻ Refresh
        </button>

        <div style={styles.msgList}>
          {messages.length === 0 && <p style={styles.empty}>No messages yet</p>}
          {messages.map(m => (
            <div
              key={m._id}
              onClick={() => { setSelected(m._id); if (!m.read) toggleRead(m._id, false); }}
              style={{
                ...styles.msgItem,
                ...(selected === m._id ? styles.msgItemActive : {}),
                ...(m.read ? {} : styles.msgItemUnread),
              }}
            >
              <div style={styles.msgItemHeader}>
                <span style={styles.msgName}>{m.name}</span>
                {!m.read && <span style={styles.unreadDot}></span>}
              </div>
              <span style={styles.msgType}>{m.projectType}</span>
              <span style={styles.msgDate}>{new Date(m.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
            </div>
          ))}
        </div>
      </aside>

      {/* Main content */}
      <main style={styles.main}>
        {selectedMsg ? (
          <div style={styles.detail}>
            <div style={styles.detailHeader}>
              <div>
                <h2 style={styles.detailName}>{selectedMsg.name}</h2>
                <p style={styles.detailMeta}>{selectedMsg.contact} · {selectedMsg.projectType}</p>
                <p style={styles.detailDate}>
                  {new Date(selectedMsg.createdAt).toLocaleString("en-IN", { dateStyle: "full", timeStyle: "short" })}
                </p>
              </div>
              <div style={styles.detailActions}>
                <button onClick={() => toggleRead(selectedMsg._id, selectedMsg.read)} style={styles.actionBtn}>
                  {selectedMsg.read ? "Mark Unread" : "Mark Read"}
                </button>
                <button onClick={() => deleteMsg(selectedMsg._id)} style={styles.deleteBtn}>
                  Delete
                </button>
              </div>
            </div>
            <div style={styles.detailBody}>
              <p style={styles.detailLabel}>Project Details</p>
              <p style={styles.detailMessage}>{selectedMsg.message}</p>
            </div>
            <div style={styles.detailFooter}>
              <a href={`mailto:${selectedMsg.contact}`} style={styles.replyBtn}>
                ✉ Reply via Email
              </a>
              <a href={`tel:${selectedMsg.contact}`} style={styles.replyBtnGhost}>
                📞 Call
              </a>
            </div>
          </div>
        ) : (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>✉</div>
            <h3 style={styles.emptyTitle}>Select a message</h3>
            <p style={styles.emptySub}>Choose a message from the sidebar to view details</p>
          </div>
        )}
      </main>
    </div>
  );
}

const styles = {
  /* Login */
  loginWrap: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0a0a0a", fontFamily: "'Inter', system-ui, sans-serif", padding: 20 },
  loginCard: { width: "100%", maxWidth: 400, textAlign: "center", padding: 40, borderRadius: 20, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(10px)" },
  loginLogo: { width: 64, height: 64, margin: "0 auto 20px", display: "grid", placeItems: "center", background: "#FF2020", borderRadius: 16, fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.8rem", color: "#fff", boxShadow: "0 0 40px rgba(255,32,32,0.3)" },
  loginTitle: { fontFamily: "'Bebas Neue',sans-serif", fontSize: "2rem", color: "#fff", letterSpacing: ".05em", margin: 0 },
  loginSub: { color: "#999", fontSize: ".9rem", margin: "8px 0 24px" },
  loginForm: { display: "grid", gap: 14 },
  input: { padding: "14px 16px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", color: "#fff", fontSize: ".95rem", outline: "none", fontFamily: "inherit" },
  loginBtn: { padding: "14px", borderRadius: 12, border: "none", background: "#FF2020", color: "#fff", fontWeight: 700, fontSize: ".95rem", cursor: "pointer", boxShadow: "0 4px 20px rgba(255,32,32,0.3)" },
  error: { padding: "10px 16px", borderRadius: 10, background: "rgba(255,32,32,0.1)", border: "1px solid rgba(255,32,32,0.3)", color: "#FF2020", fontSize: ".85rem", marginBottom: 8 },

  /* Layout */
  wrap: { display: "grid", gridTemplateColumns: "340px 1fr", minHeight: "100vh", background: "#0a0a0a", color: "#fff", fontFamily: "'Inter', system-ui, sans-serif" },

  /* Sidebar */
  sidebar: { borderRight: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", background: "#0d0d0d", height: "100vh", position: "sticky", top: 0, overflow: "hidden" },
  sidebarHeader: { padding: "24px 20px 16px" },
  brandRow: { display: "flex", alignItems: "center", gap: 10, marginBottom: 16 },
  brandMark: { width: 32, height: 32, display: "grid", placeItems: "center", background: "#FF2020", borderRadius: 8, fontFamily: "'Bebas Neue',sans-serif", fontSize: ".9rem", color: "#fff" },
  brandText: { fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.2rem", letterSpacing: ".08em" },
  sidebarLabel: { color: "#666", fontSize: ".75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".1em" },

  statsRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, padding: "0 20px 16px" },
  statCard: { padding: "12px", borderRadius: 10, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", textAlign: "center" },
  statCardActive: { borderColor: "rgba(255,32,32,0.3)", background: "rgba(255,32,32,0.06)" },
  statNum: { display: "block", fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.6rem", color: "#FF2020" },
  statLabel: { fontSize: ".7rem", color: "#666", textTransform: "uppercase", letterSpacing: ".08em" },

  refreshBtn: { margin: "0 20px 12px", padding: "10px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)", background: "transparent", color: "#999", fontSize: ".82rem", cursor: "pointer", fontFamily: "inherit" },

  msgList: { flex: 1, overflowY: "auto", padding: "0 12px 12px" },
  empty: { color: "#555", textAlign: "center", padding: 40, fontSize: ".9rem" },
  msgItem: { padding: "14px 16px", borderRadius: 12, marginBottom: 4, cursor: "pointer", transition: "background .2s", border: "1px solid transparent" },
  msgItemActive: { background: "rgba(255,32,32,0.08)", borderColor: "rgba(255,32,32,0.2)" },
  msgItemUnread: { borderLeft: "3px solid #FF2020" },
  msgItemHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 },
  msgName: { fontWeight: 600, fontSize: ".92rem" },
  unreadDot: { width: 8, height: 8, borderRadius: "50%", background: "#FF2020", display: "inline-block" },
  msgType: { display: "block", fontSize: ".78rem", color: "#888" },
  msgDate: { display: "block", fontSize: ".72rem", color: "#555", marginTop: 4 },

  /* Main */
  main: { display: "flex", alignItems: "center", justifyContent: "center", padding: 32, minHeight: "100vh" },
  emptyState: { textAlign: "center" },
  emptyIcon: { fontSize: "3rem", marginBottom: 16, opacity: 0.2 },
  emptyTitle: { fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.6rem", marginBottom: 8 },
  emptySub: { color: "#666", fontSize: ".9rem" },

  /* Detail */
  detail: { width: "100%", maxWidth: 700 },
  detailHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32, flexWrap: "wrap", gap: 16 },
  detailName: { fontFamily: "'Bebas Neue',sans-serif", fontSize: "2rem", letterSpacing: ".03em", margin: 0 },
  detailMeta: { color: "#FF2020", fontSize: ".88rem", fontWeight: 500, marginTop: 4 },
  detailDate: { color: "#666", fontSize: ".8rem", marginTop: 4 },
  detailActions: { display: "flex", gap: 8 },
  actionBtn: { padding: "8px 16px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", color: "#ccc", fontSize: ".8rem", cursor: "pointer", fontFamily: "inherit" },
  deleteBtn: { padding: "8px 16px", borderRadius: 8, border: "1px solid rgba(255,32,32,0.3)", background: "rgba(255,32,32,0.08)", color: "#FF2020", fontSize: ".8rem", cursor: "pointer", fontFamily: "inherit" },

  detailBody: { padding: "28px", borderRadius: 16, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", marginBottom: 24 },
  detailLabel: { color: "#666", fontSize: ".75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 12 },
  detailMessage: { color: "#ddd", fontSize: "1rem", lineHeight: 1.8, whiteSpace: "pre-wrap" },

  detailFooter: { display: "flex", gap: 12 },
  replyBtn: { display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 10, background: "#FF2020", color: "#fff", fontWeight: 600, fontSize: ".9rem", textDecoration: "none", boxShadow: "0 4px 20px rgba(255,32,32,0.3)" },
  replyBtnGhost: { display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 10, background: "transparent", color: "#ccc", fontWeight: 600, fontSize: ".9rem", textDecoration: "none", border: "1px solid rgba(255,255,255,0.1)" },
};

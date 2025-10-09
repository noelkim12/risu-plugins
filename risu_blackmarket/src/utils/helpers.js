export const escapeHTML = (s = "") =>
  s.replace(
    /[&<>'"]/g,
    (m) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[
      m
    ])
  );

export function parseHash() {
  const h = location.hash.replace(/^#/, "") || "/";
  const parts = h.split("/").filter(Boolean); // ["edit","3"] 또는 []
  if (parts.length === 0) return { path: "/", params: {} };
  if (parts[0] === "edit" && parts[1])
    return { path: "/edit/:id", params: { id: Number(parts[1]) } };
  return { path: "/", params: {} };
}

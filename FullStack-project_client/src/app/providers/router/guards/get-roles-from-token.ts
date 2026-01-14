export function getRolesFromToken(token: string): string[] {
  try {
    const payloadPart = token.split(".")[1];
    if (!payloadPart) return [];

    const base64 = payloadPart.replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
        .join("")
    );

    const payload = JSON.parse(json);

    const roleClaim =
      payload.role ??
      payload.roles ??
      payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    if (!roleClaim) return [];

    const roles = Array.isArray(roleClaim) ? roleClaim : [roleClaim];

    return roles
      .filter(Boolean)
      .map((r: string) => String(r).toUpperCase().trim());
  } catch {
    return [];
  }
}

export function getToken(): string | null {
  return localStorage.getItem("token");
}

export function hasAnyRole(userRoles: string[], needed: string[]) {
  const set = new Set(userRoles.map((x) => x.toUpperCase()));
  return needed.some((r) => set.has(r.toUpperCase()));
}

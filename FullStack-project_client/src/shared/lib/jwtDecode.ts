import { jwtDecode } from "jwt-decode";

export type JwtClaims = {
  sub?: string;
  roles: string[];
  exp?: number;
};

type RawJwt = {
  sub?: string;
  exp?: number;
  role?: string | string[];
  roles?: string | string[];
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?:
    | string
    | string[];
};

export function decodeJwt(token: string): JwtClaims | null {
  try {
    const decoded = jwtDecode<RawJwt>(token);

    const rawRoles =
      decoded.roles ??
      decoded.role ??
      decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    const roles = Array.isArray(rawRoles)
      ? rawRoles
      : rawRoles
      ? [rawRoles]
      : [];

    return {
      sub: decoded.sub,
      exp: decoded.exp,
      roles,
    };
  } catch {
    return null;
  }
}

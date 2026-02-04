import { adminAuth } from "@/lib/firebase-admin";

type VerifyResult = {
  ok: boolean;
  reason?: string;
  email?: string;
  uid?: string;
};

function normalizeEmail(email?: string | null) {
  return email ? email.toLowerCase() : "";
}

function parseList(value?: string | null) {
  if (!value) return [];
  return value
    .split(/[,\n;]/g)
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function verifyAdminRequest(req: Request): Promise<VerifyResult> {
  const requiredToken = process.env.ADMIN_TOKEN;
  const tokenHeader = req.headers.get("x-admin-token");
  if (requiredToken && tokenHeader === requiredToken) {
    return { ok: true };
  }

  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return { ok: false, reason: "Yetki tokeni yok." };
  }

  if (!adminAuth) {
    if (process.env.NODE_ENV === "development") {
      // Yerel geliştirmede token doğrulamasını atla (UI zaten giriş gerektirir).
      return { ok: true };
    }
    return { ok: false, reason: "Firebase admin aktif değil." };
  }

  try {
    const idToken = authHeader.slice(7);
    const decoded = await adminAuth.verifyIdToken(idToken);
    const allowedUids = parseList(process.env.ADMIN_UID);
    const allowedEmails = parseList(process.env.ADMIN_EMAIL).map((email) =>
      normalizeEmail(email)
    );

    if (!allowedUids.length && !allowedEmails.length && !requiredToken) {
      return { ok: false, reason: "Yönetici allowlist tanımlı değil." };
    }

    if (allowedUids.length && !allowedUids.includes(decoded.uid)) {
      return { ok: false, reason: "UID yetkisiz." };
    }

    if (allowedEmails.length) {
      const email = normalizeEmail(decoded.email);
      if (!email || !allowedEmails.includes(email)) {
        return { ok: false, reason: "E-posta yetkisiz." };
      }
    }

    return { ok: true, email: decoded.email, uid: decoded.uid };
  } catch (error) {
    return { ok: false, reason: "Token doğrulanamadı." };
  }
}

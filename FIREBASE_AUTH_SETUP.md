# Firebase Admin Login System

## Overview

The admin login system now uses **Firebase Authentication** for secure admin access. This replaces the previous session-based approach and provides enterprise-grade security with Firebase's proven authentication infrastructure.

## Features

✅ **Email/Password Authentication** - Using Firebase Auth  
✅ **Secure Token Management** - httpOnly cookies for JWT tokens  
✅ **Automatic Route Protection** - AuthProvider redirects unauthorized users  
✅ **Session Persistence** - Auth state maintained across page reloads  
✅ **Logout with Token Cleanup** - Secure session termination  

## Architecture

```
User Login (email/password)
    ↓
Firebase Auth Service (lib/firebase/auth.ts)
    ↓
API Endpoint (/api/admin/auth/login)
    ↓
httpOnly Cookie + localStorage
    ↓
Auth Context Provider (AuthProvider)
    ↓
Protected Admin Routes (/admin)
```

## Setup Instructions

### 1. Create Firebase Admin User

In Firebase Console (enzora-website project):

1. Go to **Authentication** → **Users**
2. Click **Add user**
3. Enter admin email and temporary password
4. Complete sign-up

### 2. Environment Variables

Already configured in `.env.local`. See `.env.example` for the template structure.

**Note:** Never commit `.env.local` to Git - it contains sensitive Firebase credentials!
Use `.env.example` for version control instead.

## File Structure

```
lib/
├── firebase/
│   ├── auth.ts          # Firebase Auth functions (login, logout, getCurrentUser)
│   └── client.ts        # Firebase app initialization (exports app and db)
├── auth-context.tsx     # React Context for auth state management

app/
├── admin/
│   ├── layout.tsx       # Wraps admin routes with AuthProvider
│   ├── login/
│   │   └── page.tsx     # Login UI page
│   └── page.tsx         # Admin dashboard (now checks useAuth())
└── api/admin/auth/
    ├── login/
    │   └── route.ts     # POST /api/admin/auth/login
    └── logout/
        └── route.ts     # POST /api/admin/auth/logout
```

## API Endpoints

### POST /api/admin/auth/login

**Request:**
```json
{
  "email": "admin@enzora.com",
  "password": "password123"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "user": {
    "uid": "firebase-uid-12345",
    "email": "admin@enzora.com"
  }
}
```

**Response (Error - 401):**
```json
{
  "error": "Invalid email or password"
}
```

**Cookies Set:**
- `firebase_token` - httpOnly JWT token (24 hours)
- `admin_uid` - User ID for client-side checks (24 hours)

### POST /api/admin/auth/logout

**Request:** No body required

**Response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

**Cookies Cleared:**
- `firebase_token` - Cleared
- `admin_uid` - Cleared

## Usage in Components

### Protected Page Example

```tsx
"use client";
import { useAuth } from "@/lib/auth-context";

export default function AdminPage() {
  const { user, loading, logout } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return null; // AuthProvider redirects to login

  return (
    <div>
      <p>Welcome, {user.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Login Component Example

```tsx
const handleLogin = async (email: string, password: string) => {
  const response = await fetch("/api/admin/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    const data = await response.json();
    localStorage.setItem("admin_user", JSON.stringify(data.user));
    // Redirect to /admin
  }
};
```

## Security Features

### ✅ Token Security
- Firebase JWT tokens are cryptographically signed
- Tokens expire after 24 hours
- Tokens stored in httpOnly cookies (immune to XSS)

### ✅ Route Protection
- AuthProvider checks `firebase_token` cookie presence
- Unauthorized access to `/admin/*` redirects to `/admin/login`
- Protected routes require valid authentication

### ✅ Session Management
- Single source of truth: Firebase Auth
- Logout clears all authentication data
- Cookies cleared on logout

### ✅ CORS & CSRF
- All auth endpoints use POST with Content-Type validation
- SameSite=Lax prevents cross-site cookie abuse

## Testing the Login

### Local Development

1. Navigate to `http://localhost:3000/admin/login`
2. Enter your Firebase admin email and password
3. You'll be redirected to `/admin` dashboard
4. Admin email displayed in header
5. Click "Logout" to end session

### Production (Vercel)

1. Navigate to `https://enzora-website.vercel.app/admin/login`
2. Same login flow as local development
3. Secure cookies sent over HTTPS only

## Troubleshooting

### Issue: "Invalid email or password"
- Verify user exists in Firebase Console → Authentication → Users
- Check email spelling
- Firebase Auth is case-sensitive for emails

### Issue: Login button doesn't respond
- Check browser console for errors
- Verify `.env.local` has correct Firebase credentials
- Check network tab for POST request to `/api/admin/auth/login`

### Issue: Logged in but redirected to login
- Clear cookies: `document.cookie = "firebase_token=; path=/; max-age=0"`
- Clear localStorage: `localStorage.clear()`
- Hard refresh browser (Ctrl+Shift+R)

### Issue: Logout doesn't work
- Check POST request to `/api/admin/auth/logout` succeeds
- Verify cookies are cleared in browser DevTools
- Clear localStorage manually if needed

## Future Enhancements

1. **Email Verification** - Require verified emails for admin access
2. **Multi-Factor Authentication (MFA)** - 2FA via SMS or authenticator app
3. **Admin User Management** - Create/edit/delete admin users from dashboard
4. **Session Timeout** - Auto-logout after 30 minutes of inactivity
5. **Audit Logging** - Log all admin login attempts
6. **Role-Based Access** - Different permission levels for different admins

## Related Files

- [Order Management API](/IMPLEMENTATION_SUMMARY.md) - Admin orders API
- [Firebase Configuration](/lib/firebase/client.ts) - Firebase setup
- [Admin Dashboard](/app/admin/page.tsx) - Main admin page

## Support

For Firebase authentication issues:
- [Firebase Auth Docs](https://firebase.google.com/docs/auth)
- [Firebase Console](https://console.firebase.google.com) → enzora-website project
- Check Firebase Auth error codes in browser console

# Email Routes Mapping - Frontend ↔ Backend

This document maps the email links sent by the backend to the frontend routes.

## ✅ Route Mapping Table

| Email Purpose | Backend Sends | Frontend Route | Component | Status |
|--------------|---------------|----------------|-----------|--------|
| **Account Confirmation** | `/auth/confirm-email?token=xxx` | `/auth/confirm-email` | ConfirmEmail | ✅ Match |
| **Password Reset** | `/auth/reset-password?token=xxx` | `/auth/reset-password` | ForgotPassword | ✅ Match |
| **Unlock Account** | `/auth/unlock-account?token=xxx` | `/auth/unlock-account` | ForgotPassword | ✅ Match |
| **Email Update Confirmation** | `/auth/confirm-email-update?token=xxx` | `/auth/confirm-email-update` | ConfirmEmail | ✅ Match |
| **Revert Email Change** | `/auth/revert-email?token=xxx` | `/auth/revert-email` | ConfirmEmail | ✅ Match |

## 📧 Email Templates (Backend)

Located in: `restaurant-auth/src/mail/templates/`

1. **confirm-email.html** → Sends link to `/auth/confirm-email?token=xxx`
2. **reset-password.html** → Sends link to `/auth/reset-password?token=xxx`
3. **unlock-account.html** → Sends link to `/auth/unlock-account?token=xxx`
4. **confirm-email-update.html** → Sends link to `/auth/confirm-email-update?token=xxx`
5. **revert-email.html** → Sends link to `/auth/revert-email?token=xxx`

## 🎯 Frontend Routes (Complete List)

Located in: `restaurant-frontend/src/routes.tsx`

### Public Routes
- `/` → HomePage
- `/login` → Login
- `/register` → Register
- `/forgot-password` → ForgotPassword (request reset form)

### Auth Flow Routes (Token-based)
- `/auth/confirm-account` → ConfirmAccount (legacy, kept for compatibility)
- `/auth/confirm-email` → ConfirmEmail
- `/auth/reset-password` → ForgotPassword (with token)
- `/auth/unlock-account` → ForgotPassword (unlock with token)
- `/auth/confirm-email-update` → ConfirmEmail (email update)
- `/auth/revert-email` → ConfirmEmail (revert email)

### Protected Routes (Require Login)
- `/profile` → Profile (CLIENT, ADMIN)
- `/client` → ClientDashboard (CLIENT)
- `/client/menu` → Menu (CLIENT)
- `/client/orders` → ClientOrders (CLIENT)
- `/client/new-order` → Menu (CLIENT)
- `/admin` → AdminDashboard (ADMIN)
- `/admin/orders` → AdminOrders (ADMIN)

## 🔄 Component Behavior

### ForgotPassword Component
Handles 4 scenarios based on URL:

1. **`/forgot-password`** (no token)
   - Shows email input form
   - Button: "Send Reset Link"
   - Mutation: `REQUEST_PASSWORD_RESET`

2. **`/auth/reset-password?token=xxx`** (with token)
   - Shows new password form
   - Button: "Reset Password"
   - Mutation: `RESET_PASSWORD`

3. **`/auth/unlock-account`** (no token)
   - Shows email input form
   - Button: "Send Unlock Link"
   - Mutation: `REQUEST_UNLOCK`

4. **`/auth/unlock-account?token=xxx`** (with token)
   - Shows unlock button
   - Button: "Unlock Account"
   - Mutation: `UNLOCK_ACCOUNT`

### ConfirmEmail Component
Handles 3 scenarios based on URL:

1. **`/auth/confirm-email?token=xxx`**
   - Confirms initial account registration
   - Mutation: `CONFIRM_EMAIL`

2. **`/auth/confirm-email-update?token=xxx`**
   - Confirms new email address
   - Mutation: `CONFIRM_EMAIL_UPDATE`

3. **`/auth/revert-email?token=xxx`**
   - Reverts to old email address
   - Mutation: `CONFIRM_EMAIL_UPDATE` (same as update)

## 🔧 Backend Configuration

File: `restaurant-auth/src/mail/mail.service.ts`

```typescript
private readonly baseUrl = required('BASE_URL'); // e.g., http://localhost:5173
```

All email links are generated as:
```typescript
const url = `${this.baseUrl}/auth/${token}`;
```

Where `token` includes the route path, for example:
- `confirm-email?token=xxx`
- `reset-password?token=xxx`
- `unlock-account?token=xxx`

Final URL becomes: `http://localhost:5173/auth/reset-password?token=xxx`

## ✅ Verification Checklist

- ✅ All 5 email templates send correct route paths
- ✅ Frontend has matching routes for all email links
- ✅ Components handle token extraction from query params
- ✅ Components call correct GraphQL mutations
- ✅ All mutations defined in `graphql/mutations/auth.ts`
- ✅ Success/error messages displayed to user
- ✅ Automatic redirect to login after success
- ✅ TypeScript compilation successful
- ✅ Production build successful (523KB)

## 🧪 Testing URLs

For local testing with token `TEST_TOKEN_123`:

- Account Confirmation: `http://localhost:5173/auth/confirm-email?token=TEST_TOKEN_123`
- Password Reset: `http://localhost:5173/auth/reset-password?token=TEST_TOKEN_123`
- Unlock Account: `http://localhost:5173/auth/unlock-account?token=TEST_TOKEN_123`
- Email Update: `http://localhost:5173/auth/confirm-email-update?token=TEST_TOKEN_123`
- Revert Email: `http://localhost:5173/auth/revert-email?token=TEST_TOKEN_123`

## 🐛 Previous Issue (FIXED)

**Problem**: User received email with link:
```
http://localhost:5173/auth/reset-password?token=xxx
```
But frontend returned 404 because route was `/forgot-password` only.

**Solution**: Added `/auth/reset-password` route that uses the same `ForgotPassword` component which detects the token and shows the password reset form instead of the email request form.

---

**Last Updated**: December 5, 2025
**Status**: All Routes Working ✅

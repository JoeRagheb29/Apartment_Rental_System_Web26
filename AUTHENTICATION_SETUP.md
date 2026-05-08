# Authentication System Setup Guide

## ✅ What We've Implemented

### 1. **AuthContext** (`contexts/AuthContext.jsx`)

A centralized authentication context that manages:

- User login state (`isLoggedIn`)
- User data (`user`)
- Loading state (`loading`)
- Login handler (`handleLogin`)
- Logout handler (`handleLogout`)

**Features:**

- Persists auth data in `localStorage`
- Automatically checks for existing token on app load
- Provides auth state to entire application

### 2. **App Wrapper** (`App.jsx`)

- Wraps the entire main with `AuthProvider`
- Passes `isLoggedIn` state to `PrivateRoute` for route protection

### 3. **Navigation Bar** (`components/Navbar.jsx`)

Shows different content based on authentication:

**Unauthenticated Users:**

- ✅ Login Button
- ✅ Register Button

**Authenticated Users:**

- ✅ Profile Icon/Link
- ✅ Logout Button
- ✅ Dashboard link appears (only for authenticated users)

### 4. **Login Component** (`Auth/Login.jsx`)

- Uses `handleLogin` from AuthContext
- Stores token and user data in localStorage
- Automatically redirects based on role (owner → dashboard, tenant → home)

### 5. **Register Component** (`Auth/Register.jsx`)

- Uses `handleLogin` from AuthContext
- Auto-logs in user after registration
- Redirects based on role selected

## 📦 How It Works

### User Flow:

1. **Unauthenticated State:**

   ```
   User sees → Login & Register buttons → Navbar shows auth buttons
   ```

2. **After Login/Registration:**

   ```
   Token stored in localStorage → handleLogin() called →
   isLoggedIn = true → Navbar updates → Profile & Logout appear
   ```

3. **Page Refresh:**

   ```
   App loads → AuthContext checks localStorage →
   Restores previous state if valid token exists
   ```

4. **Logout:**
   ```
   Logout clicked → handleLogout() called →
   localStorage cleared → isLoggedIn = false →
   Navbar updates to show Login/Register buttons
   ```

## 🔒 Protected Routes

Protected routes are handled by `PrivateRoute` component with `isLoggedIn` prop:

- `/dashboard` - Only authenticated users
- `/profile` - Only authenticated users

## 💾 Data Stored in localStorage

```javascript
// After successful login/registration:
localStorage.userToken; // JWT token
localStorage.user; // JSON stringified user object
```

## 🎨 Navbar Button States

### Before Login:

```jsx
<Link to="/login" className={styles.loginBtn}>Login</Link>
<Link to="/register" className={styles.registerBtn}>Register</Link>
```

### After Login:

```jsx
<Link to="/profile" className={styles.profileIcon}>👤</Link>
<button className={styles.logoutBtn} onClick={onLogout}>Logout</button>
```

## 📝 Usage in Components

To use authentication in any component:

```jsx
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

function MyComponent() {
  const { isLoggedIn, user, handleLogout } = useContext(AuthContext);

  if (!isLoggedIn) {
    return <p>Please log in first</p>;
  }

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
```

## 🧪 Testing

1. **Test Unauthenticated State:**
   - Fresh browser/cleared localStorage
   - Should see Login & Register buttons only

2. **Test Login:**
   - Click Login button
   - Submit credentials
   - Should see Profile icon & Logout button
   - localStorage should have token and user data

3. **Test Logout:**
   - Click Logout button
   - Should redirect to home
   - Should see Login & Register buttons again

4. **Test Page Refresh:**
   - After login, refresh page
   - Should remain logged in
   - State should persist

5. **Test Protected Routes:**
   - Try accessing `/dashboard` or `/profile` without login
   - Should redirect to login page

## 🚀 Next Steps

1. Update backend to return `{ token, user }` on successful login/registration
2. Implement auto-logout on token expiration
3. Add refresh token mechanism
4. Implement role-based access control (RBAC)
5. Add password reset functionality

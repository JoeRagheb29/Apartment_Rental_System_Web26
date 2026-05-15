# Loading & Skeleton Components Guide

## 📋 Components Available

### 1. **LoadingScreen** - Full App Loading Screen

Shows when the app is initializing or checking authentication.

**Location:** `src/components/LoadingScreen.jsx`

**Usage:**

- Automatically shown during app initialization
- Displays bouncing logo, spinner, and progress bar
- Fullscreen overlay

**Features:**

- 🏠 Animated logo
- ⚙️ Spinning loader
- 📊 Animated progress bar
- 💬 Loading text

---

### 2. **SkeletonLoader** - Page Content Skeleton

**Location:** `src/components/SkeletonLoader.jsx`

**Available Exports:**

#### a) **SkeletonCard** - Single Card Skeleton

```jsx
import { SkeletonCard } from "../components/SkeletonLoader";

function MyComponent() {
  return <SkeletonCard />;
}
```

#### b) **SkeletonApartmentGrid** - Grid of Cards

```jsx
import { SkeletonApartmentGrid } from '../components/SkeletonLoader';

function ApartmentsPage() {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading ? (
        <SkeletonApartmentGrid count={6} />
      ) : (
        // Your actual content
      )}
    </>
  );
}
```

#### c) **SkeletonHero** - Large Hero Section

```jsx
import { SkeletonHero } from "../components/SkeletonLoader";

function HomePage() {
  return <SkeletonHero />;
}
```

#### d) **SkeletonList** - List Items

```jsx
import { SkeletonList } from "../components/SkeletonLoader";

function ListPage() {
  return <SkeletonList count={5} />;
}
```

---

## 🚀 How It Works

### App Initialization Flow:

```
App Starts
    ↓
AuthProvider initialized
    ↓
Loading state = true (checking localStorage)
    ↓
LoadingScreen displayed (fullscreen)
    ↓
Auth check complete
    ↓
Loading state = false
    ↓
AppContent renders (Router, Pages, etc.)
```

### Page-Level Loading Flow:

```
User navigates to page
    ↓
API request starts
    ↓
isLoading = true
    ↓
Show SkeletonLoader (matches page layout)
    ↓
API data arrives
    ↓
isLoading = false
    ↓
Render actual content
```

---

## 📝 Example Implementation

### Home Page with Skeleton

```jsx
import { useState, useEffect } from 'react';
import { SkeletonApartmentGrid, SkeletonHero } from '../components/SkeletonLoader';

function Home() {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Fetch apartments
    setTimeout(() => {
      setApartments([...]);
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {loading ? <SkeletonHero /> : <HeroCarousel />}

      {loading ? (
        <SkeletonApartmentGrid count={6} />
      ) : (
        // Your actual apartments grid
      )}
    </>
  );
}
```

### Apartments List Page

```jsx
import { useState, useEffect } from "react";
import { SkeletonList } from "../components/SkeletonLoader";

function Apartments() {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch apartments
  }, []);

  return loading ? <SkeletonList count={6} /> : <ApartmentsList />;
}
```

---

## 🎨 Visual Features

### LoadingScreen Animations:

- ✨ Bouncing logo (2s loop)
- ⚙️ Spinning wheel (1s rotation)
- 📊 Animated progress bar (2s)
- 💫 Pulsing text

### Skeleton Animations:

- 🌊 Shimmer effect (left to right)
- 💨 Subtle pulse effect
- Matches content layout
- Smooth transitions

---

## ⚙️ Customization

### Change Loading Screen Duration

**In `AuthContext.jsx`:**

```javascript
// Currently: Checks localStorage immediately
// Could add artificial delay for demo:
setTimeout(() => {
  setLoading(false);
}, 2000); // 2 second loading
```

### Customize Colors

**In `LoadingScreen.module.css`:**

```css
.loadingContainer {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  /* Change these colors */
}
```

### Change Skeleton Count

```jsx
<SkeletonApartmentGrid count={9} /> {/* Show 9 skeletons */}
<SkeletonList count={10} /> {/* Show 10 list items */}
```

---

## 📱 Responsive

Both components are fully responsive:

- Desktop: Full layout
- Tablet: Adjusted spacing
- Mobile: Single column for skeletons

---

## 🔗 Integration Points

1. **App Initialization** - AuthContext loading state
2. **Page Data Fetching** - Each page's loading state
3. **API Calls** - While waiting for data
4. **User Authentication** - During token verification

---

## 💡 Best Practices

✅ Always show skeleton while loading  
✅ Match skeleton layout to actual content  
✅ Use appropriate skeleton type  
✅ Keep loading animations smooth  
✅ Provide feedback to users

❌ Don't show loading screen for quick loads (<500ms)  
❌ Don't use mismatched skeleton layouts  
❌ Don't make animations too distracting

---

## 🐛 Troubleshooting

**Skeleton not disappearing?**

- Check loading state is being set to false
- Verify conditional rendering

**Loading screen stuck?**

- Check AuthContext loading state
- Verify localStorage is accessible

**Skeleton layout doesn't match content?**

- Update skeleton to match page layout
- Use correct skeleton component

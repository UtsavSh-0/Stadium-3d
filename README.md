# Omnya Lab Stadium - Interactive 3D Football Booking Experience

A premium digital football stadium where users can explore, select seats, and experience cinematic views.

## Features

- **Interactive 3D Stadium**: Explore a realistic football stadium in 3D
- **Seat Selection**: Step-by-step seat selection (Stand → Tier → Block → Row → Seat)
- **Cinematic Camera**: Smooth camera transitions from aerial view to seat perspective
- **Digital Tickets**: Generate personalized tickets with actual seat-view screenshots
- **VIP Skybox**: Upgrade to exclusive VIP viewing lounge
- **Lighting Presets**: View the stadium in daylight, golden hour, evening, or night

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **Three.js & React Three Fiber** - 3D rendering
- **GSAP** - Smooth animations and camera transitions
- **Zustand** - State management
- **Tailwind CSS** - Styling
- **Supabase** - Backend (optional, for bookings)
- **Lucide React** - Icons

## Project Structure

```
src/
├── components/      # Reusable UI components
├── three/           # 3D models and components
│   ├── Stadium/     # Stadium structure
│   ├── Seats/       # Seat instancing system
│   ├── Pitch/       # Football pitch
│   ├── Roof/        # Stadium roof
│   ├── Skyboxes/    # VIP skyboxes
│   ├── Lighting/    # Lighting presets
│   └── Cameras/     # Camera controls
├── pages/           # Main pages
├── store/           # Zustand stores
├── services/        # API services
├── hooks/           # Custom hooks
├── utils/           # Utility functions
└── assets/          # Images, models, etc.
```

## Installation

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Environment Variables

Create a `.env.local` file for Supabase integration:

```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## License

MIT
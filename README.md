# Nahom Merhatsyon - 3D Futuristic Portfolio

A luxurious black and gold portfolio website with Matrix-style themes, featuring immersive 3D interfaces and futuristic visuals.

## 📌 Features

- 🔮 Interactive 3D elements using Three.js/React Three Fiber
- 🖥️ Matrix-inspired digital rain effects
- 📱 Fully responsive design for all devices
- ⚡ High-performance animations and transitions
- 🎨 Custom shaders and particle effects
- 🎬 Video showcases of projects
- 🎭 3D timeline and interactive sections

## 🧰 Tech Stack

- **Frontend**: React + TypeScript
- **3D Rendering**: Three.js, React Three Fiber, Drei
- **Animation**: Framer Motion, GSAP
- **Styling**: TailwindCSS
- **State Management**: Zustand/Jotai
- **Build Tool**: Vite

## 🚀 Getting Started

### Prerequisites

- Node.js (v16.0 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/nahom-portfolio.git
cd nahom-portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and visit:
```
http://localhost:5173
```

## 🏗️ Project Structure

```
/
├── src/               # Source files
│   ├── assets/        # Static assets
│   │   ├── fonts/     # Custom fonts
│   │   ├── images/    # Images and textures
│   │   ├── models/    # 3D models
│   │   ├── shaders/   # GLSL shaders
│   │   └── videos/    # Project videos
│   ├── components/    # React components
│   │   ├── layout/    # Layout components
│   │   ├── three/     # Three.js components
│   │   └── ui/        # UI components
│   ├── scenes/        # 3D scene definitions
│   ├── store/         # State management
│   └── utils/         # Utility functions
├── public/            # Public assets
└── index.html         # Entry HTML file
```

## 🔧 Development

### Custom Styling

The project uses TailwindCSS with custom variables defined in `src/index.css` for the black and gold theme.

### 3D Scene Customization

You can customize the 3D scene in `src/scenes/MainScene.tsx`.

### Adding New Projects

Add new projects by updating the projects array in `src/components/layout/sections/ProjectsSection.tsx`.

## 📦 Building for Production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

## 🌐 Deployment

This project can be deployed on Vercel, Netlify, or any static site hosting:

```bash
npm run build
npm run preview
```

## 🎨 Design Inspiration

Inspired by [David Hckh Portfolio](https://www.david-hckh.com) with a unique luxurious black and gold theme with Matrix-style effects.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Nahom Merhatsyon**
- Full-Stack Developer
- AI Prompt Engineer
- Video Editor 

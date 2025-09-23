# AI Tutorial Hub

A modern, responsive website similar to sabrina.dev, built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🎯 **Modern Design**: Clean, professional UI with responsive layout
- 📚 **Tutorial System**: Featured tutorials with categories and difficulty levels
- 🛠️ **AI Tools Section**: Interactive tools and resources
- 📧 **Newsletter Signup**: Email subscription with success states
- 📱 **Mobile Responsive**: Optimized for all device sizes
- ⚡ **Fast Performance**: Built with Next.js 14 and optimized for speed

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

Make sure you have Node.js 18+ installed on your system.

### Installation

1. **Install Node.js** (if not already installed):
   - Visit [nodejs.org](https://nodejs.org/) and download the LTS version
   - Or use a package manager like Homebrew: `brew install node`

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page
├── components/
│   ├── Header.tsx       # Navigation header
│   ├── Hero.tsx         # Hero section
│   ├── StatsSection.tsx # Statistics display
│   ├── FeaturedTutorials.tsx # Tutorial cards
│   ├── ToolsSection.tsx # AI tools showcase
│   ├── NewsletterSignup.tsx # Email subscription
│   └── Footer.tsx       # Site footer
├── lib/                 # Utility functions
└── types/               # TypeScript types
```

## Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:
```javascript
colors: {
  primary: {
    // Your custom colors
  }
}
```

### Content
- Update tutorial data in `FeaturedTutorials.tsx`
- Modify tools in `ToolsSection.tsx`
- Change hero content in `Hero.tsx`

### Styling
- Global styles in `src/app/globals.css`
- Component-specific styles using Tailwind classes

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

- **Netlify**: Connect GitHub repo and deploy
- **Railway**: Use the Next.js template
- **DigitalOcean**: Use App Platform

## Next Steps

1. **Add Content Management**: Integrate a CMS like Sanity or Contentful
2. **Implement Authentication**: Add user accounts with NextAuth.js
3. **Create Tutorial Pages**: Build individual tutorial pages
4. **Add Search**: Implement search functionality
5. **Database Integration**: Connect to a database for dynamic content
6. **Email Service**: Integrate with Mailchimp or ConvertKit for newsletters

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project for your own AI tutorial website!


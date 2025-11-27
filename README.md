# Diina N. Shatipamba - Portfolio Website

A modern, animated, mobile-first React portfolio website for Diina N. Shatipamba, a Fisheries & Marine Science Graduate and Field Researcher from Namibia.

## 🌊 Features

- **Modern UI/UX**: Clean, minimal design with ocean-themed colors
- **Fully Responsive**: Optimized for mobile, tablet, and desktop
- **Smooth Animations**: Powered by Framer Motion
- **Blog with CMS**: Contentful integration for easy content management
- **Contact Form**: EmailJS integration for direct messaging
- **Downloadable CV & Certificates**: Direct access to documents

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Layout.jsx
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── sections/
│   │       ├── Hero.jsx
│   │       ├── About.jsx
│   │       ├── Education.jsx
│   │       ├── Experience.jsx
│   │       ├── Skills.jsx
│   │       └── Activities.jsx
│   ├── config/
│   │   └── env.js
│   ├── data/
│   │   ├── personalData.js
│   │   ├── educationData.js
│   │   ├── experienceData.js
│   │   ├── skillsData.js
│   │   └── eventsData.js
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Blog.jsx
│   │   ├── BlogPost.jsx
│   │   └── Contact.jsx
│   ├── services/
│   │   └── contentful.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── Certifications and CV/    # Your documents
├── Pictures/                 # Your images
├── .env.example
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## ⚙️ Configuration

### EmailJS Setup (Contact Form)

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Create an email service and template
3. Copy `.env.example` to `.env`
4. Fill in your EmailJS credentials:
   ```
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

### Contentful CMS Setup (Blog)

1. Create an account at [Contentful](https://www.contentful.com/)
2. Create a new space
3. Create a content type called `blogPost` with these fields:
   - `title` (Short text)
   - `slug` (Short text, unique)
   - `excerpt` (Short text)
   - `content` (Long text, Markdown)
   - `coverImage` (Media)
   - `tags` (Short text, list)
4. Add your credentials to `.env`:
   ```
   VITE_CONTENTFUL_SPACE_ID=your_space_id
   VITE_CONTENTFUL_ACCESS_TOKEN=your_access_token
   ```

## 📝 Updating Content

### Personal Information
Edit `src/data/personalData.js`

### Education & Certificates
Edit `src/data/educationData.js`

### Experience
Edit `src/data/experienceData.js`

### Skills
Edit `src/data/skillsData.js`

### Activities/Events
Edit `src/data/eventsData.js`

### Adding Event Images
1. Add images to the `Pictures/` folder
2. Update `eventsData.js` with the image path:
   ```js
   {
     id: 1,
     title: 'Beach Cleanup',
     image: '/Pictures/beach-cleanup.jpg',
     // ... other fields
   }
   ```

## 🏗️ Build for Production

```bash
npm run build
```

The built files will be in the `dist/` folder.

## 🎨 Customization

### Colors
Edit the color palette in `tailwind.config.js`:
- `primary` - Main blue tones
- `teal` - Accent teal tones
- `ocean` - Additional ocean colors

### Fonts
Currently using:
- **Inter** - Body text
- **Poppins** - Headings

## 📄 License

© 2024 Diina N. Shatipamba. All rights reserved.

---

Made with 💙 in Namibia
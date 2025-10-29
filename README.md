# Elevate for Humanity LMS

> **A full-stack workforce development platform built with React 19, Vite 6, Supabase, and Stripe Connect**  
> Supports DOL/DWD Apprenticeships, ETPL funding, AI-driven course creation, and autonomous operations.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/elevateforhumanity/fix2)
[![License](https://img.shields.io/badge/license-Proprietary-red.svg)](LICENSE)
[![Production Ready](https://img.shields.io/badge/status-production%20ready-brightgreen.svg)](https://elevateforhumanity.org)

## 🎯 Overview

Elevate for Humanity is an **enterprise-grade Learning Management System (LMS)** designed for workforce development, apprenticeship programs, and government-aligned training. Built with modern web technologies and featuring autonomous operations, AI-powered content generation, and comprehensive compliance tracking.

### Key Features

- ✅ **106+ Industry Certifications** - Healthcare, IT, Construction, Business
- ✅ **92% Job Placement Rate** - Proven outcomes tracking
- ✅ **DOL/DOE/DWD Compliant** - Government program ready
- ✅ **ETPL Provider** - WIOA funding eligible
- ✅ **Autonomous Operations** - Self-healing autopilot system
- ✅ **AI-Powered** - Content generation and tutoring
- ✅ **Mobile Apps** - iOS and Android via Capacitor
- ✅ **Revenue Sharing** - Stripe Connect for instructors

## 🚀 Tech Stack

### Frontend
- **React 19** - Latest React with concurrent features
- **Vite 6** - Lightning-fast build tool
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **Zustand** - State management

### Backend & Services
- **Supabase** - PostgreSQL database + authentication + storage
- **Netlify** - Hosting + 17 serverless functions
- **Cloudflare Workers** - Edge computing for AI/automation
- **Stripe Connect** - Payment processing + revenue sharing

### Mobile
- **Capacitor** - Native iOS/Android apps

### DevOps
- **GitHub Actions** - CI/CD automation
- **Autopilot System** - 25+ automated task types
- **Health Monitoring** - Real-time system checks

## 📊 Platform Statistics

- **150+ React Components** - Modular, reusable architecture
- **133 TypeScript Files** - Type-safe codebase
- **17 Serverless Functions** - Netlify Functions for backend logic
- **3 Cloudflare Workers** - Edge computing for AI/automation
- **25+ Autopilot Tasks** - Automated infrastructure management
- **4 Storage Buckets** - Supabase storage for files
- **100+ Routes** - Comprehensive page coverage
- **430+ Accessibility Improvements** - WCAG 2.1 AA committed

## 🎓 Use Cases

- **Workforce Development** - Career training and upskilling
- **Apprenticeship Programs** - DOL-compliant tracking
- **Government Training** - WIOA, ETPL, DWD programs
- **Corporate Training** - Employee development
- **Non-Profit Education** - IRS VITA, career services
- **Educational Institutions** - Online learning platforms

## 🔑 Key Technologies

**React LMS** • **Workforce Platform** • **Supabase SaaS** • **Education** • **Government Compliance** • **Apprenticeship Programs** • **AI Learning System** • **Stripe Connect** • **ETPL Provider** • **WIOA Programs** • **Career Training** • **Job Placement** • **Mobile Learning** • **Autonomous Operations**

## 📖 Documentation

- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Complete deployment guide for Netlify + Supabase
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Guidelines for contributing
- **[IP_PROTECTION_COMPLETE.md](IP_PROTECTION_COMPLETE.md)** - Intellectual property protection
- **[COMPREHENSIVE_HEALTH_REPORT.md](COMPREHENSIVE_HEALTH_REPORT.md)** - System health status

## 📁 What's Included

This repository contains essential configuration files that ensure proper VS Code and environment setup in Gitpod:

### `.gitpod.yml`

The main Gitpod configuration file that:

- Specifies the Docker image to use
- Defines startup tasks and initialization scripts
- Lists VS Code extensions to install automatically
- Configures port forwarding
- Sets up GitHub prebuilds for faster workspace starts

### `.vscode/settings.json`

VS Code workspace settings that:

- Enable format on save
- Configure code formatting preferences
- Set up code actions (auto-fix, organize imports)
- Configure default formatters for different file types
- Set terminal and Git preferences

### `.vscode/extensions.json`

Recommended VS Code extensions including:

- ESLint for JavaScript/TypeScript linting
- Prettier for code formatting
- GitLens for enhanced Git capabilities
- Python support
- Docker support
- YAML support
- GitHub Copilot and Pull Request integration

### Additional Configuration Files

#### `.editorconfig`

Ensures consistent coding styles across different editors and IDEs:

- Character encoding (UTF-8)
- Line endings (LF)
- Indentation style and size
- Trailing whitespace handling

#### `.prettierrc`

Code formatting configuration for Prettier:

- Semicolons, quotes, and trailing commas
- Print width and tab width
- Line endings

#### `.eslintrc.json`

JavaScript/TypeScript linting rules:

- Code style enforcement
- Best practices
- Error prevention

#### `.gitignore`

Common patterns to exclude from version control:

- Dependencies (node_modules, vendor)
- Build outputs (dist, build)
- IDE files
- Environment variables
- Temporary files

#### `.github/workflows/validate.yml`

GitHub Actions workflow that automatically validates:

- YAML syntax in `.gitpod.yml` and templates
- JSON syntax in VS Code configuration files
- Presence of essential documentation

## 🔧 How to Use This Template

### For New Repositories

1. **Copy configuration files to your repository:**

   ```bash
   # Copy .gitpod.yml
   cp .gitpod.yml /path/to/your/repo/

   # Copy .vscode directory
   cp -r .vscode /path/to/your/repo/
   ```

2. **Customize for your project:**
   - Edit `.gitpod.yml` to add your project-specific setup commands
   - Modify the `init` task to install dependencies (npm install, pip install, etc.)
   - Adjust port configurations based on your application
   - Add or remove VS Code extensions in both files

3. **Commit and push:**
   ```bash
   git add .gitpod.yml .vscode/
   git commit -m "Add Gitpod and VS Code configuration"
   git push
   ```

### For Existing Repositories

If you already have `.gitpod.yml` or `.vscode` configuration:

1. **Merge configurations carefully** - Don't overwrite existing settings
2. **Test in Gitpod** - Open your repository in Gitpod to verify everything works
3. **Adjust as needed** - Each project may have unique requirements

## 🛠️ Customization Guide

### Adding Project Dependencies

Edit the `init` section in `.gitpod.yml`:

```yaml
tasks:
  - name: Setup Environment
    init: |
      # Node.js project
      npm install

      # Python project
      pip install -r requirements.txt

      # Multiple commands
      npm install
      npm run build
```

### Configuring Ports

Add ports your application uses:

```yaml
ports:
  - port: 3000
    onOpen: open-browser # Options: notify, open-browser, open-preview, ignore
    visibility: public # Options: public, private
```

### Adding VS Code Extensions

Edit `.vscode/extensions.json` or add to `.gitpod.yml`:

```yaml
vscode:
  extensions:
    - publisher.extension-name
```

## 🐛 Common Issues and Solutions

### Issue: Extensions not installing automatically

**Solution:** Ensure extension IDs are correct in both `.gitpod.yml` and `.vscode/extensions.json`

### Issue: Workspace initialization fails

**Solution:** Check the `init` commands in `.gitpod.yml` for errors. View logs in Gitpod terminal.

### Issue: Port not accessible

**Solution:** Verify port configuration in `.gitpod.yml` and ensure your app is listening on `0.0.0.0` not `localhost`

### Issue: Formatting not working

**Solution:** Install the Prettier extension and ensure it's set as the default formatter in settings.json

## 📚 Resources

- [Gitpod Documentation](https://www.gitpod.io/docs)
- [Gitpod .gitpod.yml Reference](https://www.gitpod.io/docs/references/gitpod-yml)
- [VS Code Settings Reference](https://code.visualstudio.com/docs/getstarted/settings)
- [VS Code Extension Marketplace](https://marketplace.visualstudio.com/vscode)

## 🤝 Contributing

Feel free to submit issues or pull requests to improve this template configuration.

## 🏆 Certifications & Compliance

- ✅ **Buy Black Certified** - Supporting Black-owned businesses
- ✅ **Veteran-Owned Business** - Supporting veterans
- ✅ **WCAG 2.1 AA Accessibility** - Committed to accessibility
- ✅ **DOL/DOE/DWD Compliant** - Government program ready
- ✅ **ETPL Provider** - Eligible Training Provider List
- ✅ **IRS VITA Program** - Tax preparation training

## 🌐 Live Platform

**Production:** [https://elevateforhumanity.org](https://elevateforhumanity.org)

### Quick Links
- [Browse Programs](https://elevateforhumanity.org/programs)
- [Student Dashboard](https://elevateforhumanity.org/lms)
- [Verify Certificate](https://elevateforhumanity.org/verify)
- [Legal & Terms](https://elevateforhumanity.org/legal/terms)

## 📞 Contact

**Elevate for Humanity**  
9465 Counselors Row, Suite 200  
Indianapolis, IN 46240

- **Website:** [elevateforhumanity.org](https://elevateforhumanity.org)
- **Email:** info@elevateforhumanity.org
- **Phone:** (317) 314-3757
- **Legal:** legal@elevateforhumanity.org

### Social Media
- [Facebook](https://www.facebook.com/elevateforhumanity)
- [LinkedIn](https://www.linkedin.com/company/elevate-for-humanity)
- [YouTube](https://www.youtube.com/@elevateforhumanity)
- [Instagram](https://www.instagram.com/elevateforhumanity)

## 📝 License

**Proprietary License** - Copyright © 2024-2025 Elevate for Humanity. All rights reserved.

This software is confidential and proprietary. No part may be copied, reproduced, distributed, or transmitted without prior written permission. See [LICENSE](LICENSE) for full terms.

For licensing inquiries: legal@elevateforhumanity.org

---

**Built with ❤️ for workforce development and community empowerment**

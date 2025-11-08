# .gitpod.Dockerfile
# Production-ready development environment for Elevate for Humanity
FROM gitpod/workspace-full:latest

# Install Node.js 20.11.1 (matches production)
USER gitpod
RUN bash -c ". .nvm/nvm.sh && nvm install 20.11.1 && nvm use 20.11.1 && nvm alias default 20.11.1"

# Install system dependencies for Puppeteer and Chrome
USER root
RUN apt-get update && apt-get install -y \
    chromium \
    chromium-driver \
    fonts-liberation \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libatspi2.0-0 \
    libcups2 \
    libdbus-1-3 \
    libdrm2 \
    libgbm1 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libwayland-client0 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxkbcommon0 \
    libxrandr2 \
    xdg-utils \
    jq \
    && rm -rf /var/lib/apt/lists/*

# Set Chrome path for Puppeteer
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Switch back to gitpod user
USER gitpod

# Enable corepack and install pnpm
RUN bash -c ". .nvm/nvm.sh && corepack enable && corepack prepare pnpm@9.7.0 --activate"

# Install global tools
RUN bash -c ". .nvm/nvm.sh && npm install -g \
    linkinator@latest \
    @lhci/cli@latest \
    netlify-cli@latest \
    vercel@latest \
    wrangler@latest \
    typescript@latest \
    prettier@latest \
    eslint@latest"

# Set up Git configuration
RUN git config --global user.name "Gitpod User" && \
    git config --global user.email "gitpod@elevateforhumanity.org"

# Create workspace directories
RUN mkdir -p /home/gitpod/.local/share/pnpm

# Set environment variables
ENV NODE_ENV=development
ENV PNPM_HOME=/home/gitpod/.local/share/pnpm
ENV PATH=$PNPM_HOME:$PATH

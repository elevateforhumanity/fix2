# .gitpod.Dockerfile
FROM gitpod/workspace-full:latest

# Node & pnpm
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - \
 && sudo apt-get install -y nodejs jq \
 && corepack enable \
 && corepack prepare pnpm@9.12.2 --activate

# Link checker + Lighthouse CLI
RUN npm i -g linkinator@6 @lhci/cli@0.13.0 netlify-cli@17

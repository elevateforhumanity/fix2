# 🔐 Anthropic API Key Setup

## Quick Setup (2 minutes)

### Step 1: Get Your Anthropic API Key

1. Go to: https://console.anthropic.com/settings/keys
2. Click "Create Key"
3. Copy the key (starts with `sk-ant-...`)

### Step 2: Add to GitHub Secrets

**Option A: Via GitHub UI (Recommended)**

1. Go to: https://github.com/elevateforhumanity/fix2/settings/secrets/actions
2. Click "New repository secret"
3. Name: `ANTHROPIC_API_KEY`
4. Value: Paste your key (e.g., `sk-ant-api03-...`)
5. Click "Add secret"

**Option B: Via GitHub CLI**

```bash
gh secret set ANTHROPIC_API_KEY --body "YOUR_ANTHROPIC_KEY_HERE"
```

### Step 3: Verify Setup

Once added, your GitHub secrets should have:

- ✅ `OPENAI_API_KEY` (already set)
- ✅ `ANTHROPIC_API_KEY` (just added)
- ✅ `AUTOPILOT_TOKEN` (optional, for Durable Objects)

## 🧪 Test the Dual AI System

Create a test PR to see all 5 AI agents in action:

```bash
# Create a test branch
git checkout -b test-dual-ai

# Make a small code change
echo "// Test change for AI agents" >> frontend/src/App.tsx

# Commit and push
git add frontend/src/App.tsx
git commit -m "Test: Trigger dual AI agents"
git push origin test-dual-ai

# Create PR
gh pr create --title "Test: Dual AI Agents" --body "Testing GPT-4 + Claude agents"
```

## 📊 What Happens Next

When you create a PR, you'll see **5 AI comments**:

1. 🤖 **GPT-4 Code Review** - General code quality
2. 🔒 **GPT-4 Security Scan** - Vulnerability detection
3. ⚡ **GPT-4 Performance** - Optimization tips
4. 🛡️ **Claude Security Expert** - Deep security analysis
5. 📐 **Claude Code Quality** - Architecture review

## 💰 Cost Tracking

- **Per PR**: ~$0.12 (5 agents)
- **Monthly** (100 PRs): ~$12
- **ROI**: 208x return

## 🔧 Configuration Files

Your AI workflows are here:

- `.github/workflows/ai-agent-gpt4.yml` - GPT-4 agents
- `.github/workflows/ai-agent-claude.yml` - Claude agents

## 📚 Full Documentation

See `DUAL-AI-SYSTEM.md` for complete details on:

- How the dual AI system works
- Why use both GPT-4 and Claude
- Example AI comments
- Best practices
- Performance metrics

## ⚠️ Troubleshooting

**If workflows don't run:**

1. Check API keys are set in GitHub secrets
2. Verify workflows are on `main` branch: `ls .github/workflows/ai-agent-*.yml`
3. Check workflow runs: https://github.com/elevateforhumanity/fix2/actions

**If you see API errors:**

- OpenAI: Check key starts with `sk-proj-...` or `sk-...`
- Anthropic: Check key starts with `sk-ant-...`
- Verify keys have sufficient credits

## 🎯 Next Steps

1. ✅ Add `ANTHROPIC_API_KEY` to GitHub secrets
2. ✅ Create a test PR
3. ✅ Watch 5 AI agents analyze your code
4. ✅ Review and iterate based on feedback

---

**Need help?** Check the full documentation in `DUAL-AI-SYSTEM.md`

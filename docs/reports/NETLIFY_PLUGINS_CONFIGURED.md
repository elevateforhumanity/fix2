# Netlify Plugins Configuration

## Plugins Configured in netlify.toml

### 1. @netlify/plugin-lighthouse ✅

**Purpose**: Automated Lighthouse performance audits on every deploy

**Configuration**:

- Output: `reports/lighthouse.html`
- Runs on: Every production deploy
- Checks: Performance, Accessibility, Best Practices, SEO

**Benefits**:

- Automatic performance monitoring
- Catch performance regressions
- SEO and accessibility checks

### 2. netlify-plugin-cache ✅

**Purpose**: Cache dependencies between builds for faster deployments

**Configuration**:

- Cached paths: `node_modules`, `.pnpm-store`
- Speeds up builds by reusing dependencies

**Benefits**:

- Faster build times (can reduce by 50%+)
- Lower build minutes usage
- Consistent dependency versions

### 3. netlify-plugin-checklinks ✅

**Purpose**: Check for broken links in your site

**Configuration**:

- Skip patterns: `/api/*`, `*.pdf`
- Runs after build completes

**Benefits**:

- Catch broken internal links
- Prevent 404 errors
- Improve user experience

### 4. netlify-plugin-submit-sitemap ✅

**Purpose**: Automatically submit sitemap to search engines

**Configuration**:

- Base URL: `https://elevateforhumanity.org`
- Sitemap: `/sitemap.xml`
- Providers: Google, Bing

**Benefits**:

- Automatic search engine indexing
- Better SEO
- No manual sitemap submission needed

### 5. @supabase/netlify-integration ✅

**Purpose**: Supabase integration for seamless database access

**Configuration**:

- Automatic environment variable injection
- Supabase CLI integration
- Database migrations support

**Benefits**:

- Simplified Supabase setup
- Automatic credential management
- Database migration automation

**Setup Required**:

1. Go to: https://app.netlify.com/sites/elevateforhumanityfix2/integrations
2. Search for "Supabase"
3. Click "Enable" and authorize
4. Select your Supabase project

### 6. netlify-plugin-cloudflare-cache-purge ✅

**Purpose**: Purge Cloudflare cache on deploy (if using Cloudflare CDN)

**Configuration**:

- Requires environment variables:
  - `CLOUDFLARE_ZONE_ID`
  - `CLOUDFLARE_API_TOKEN`

**Benefits**:

- Automatic cache invalidation
- Ensures users get latest content
- Works with Cloudflare CDN

**Setup Required** (if using Cloudflare):

1. Get Cloudflare Zone ID from dashboard
2. Create API token with cache purge permissions
3. Add to Netlify environment variables:
   ```bash
   netlify env:set CLOUDFLARE_ZONE_ID "your-zone-id"
   netlify env:set CLOUDFLARE_API_TOKEN "your-api-token"
   ```

## Plugin Installation

Plugins are automatically installed during the build process when configured in `netlify.toml`. No manual installation required.

### Verification

After next deploy, check:

1. Build logs for plugin execution
2. Lighthouse report in deploy details
3. Link check results in build output

## Additional Recommended Plugins (Optional)

### netlify-plugin-a11y

**Purpose**: Accessibility testing

```toml
[[plugins]]
  package = "netlify-plugin-a11y"
```

### netlify-plugin-image-optim

**Purpose**: Automatic image optimization

```toml
[[plugins]]
  package = "netlify-plugin-image-optim"
```

### netlify-plugin-minify-html

**Purpose**: Minify HTML output

```toml
[[plugins]]
  package = "netlify-plugin-minify-html"
  [plugins.inputs]
    contexts = ["production"]
```

### @netlify/plugin-nextjs (if using React)

**Purpose**: React optimization

```toml
[[plugins]]
  package = "@netlify/plugin-nextjs"
```

## Plugin Management

### Enable/Disable Plugins

Edit `netlify.toml` and commit changes. Plugins are enabled/disabled on next deploy.

### View Plugin Logs

Check build logs in Netlify Dashboard:
https://app.netlify.com/sites/elevateforhumanityfix2/deploys

### Plugin Execution Order

Plugins run in the order they appear in `netlify.toml`:

1. Pre-build plugins
2. Build command
3. Post-build plugins
4. Deploy plugins

## Troubleshooting

### Plugin Not Running

- Check netlify.toml syntax
- Verify plugin package name
- Check build logs for errors
- Ensure plugin is compatible with your build

### Plugin Errors

- Check plugin documentation
- Verify required environment variables
- Check plugin version compatibility
- Review build logs for specific errors

### Slow Builds

- Review which plugins are running
- Consider disabling non-essential plugins
- Check plugin configuration
- Use caching plugins to speed up builds

## Integration Setup

### Supabase Integration

1. Visit: https://app.netlify.com/sites/elevateforhumanityfix2/integrations
2. Search: "Supabase"
3. Click: "Enable"
4. Authorize: Connect to your Supabase account
5. Select: Your Supabase project (cuxzzpsyufcewtmicszk)

### Cloudflare Integration (Optional)

Only needed if using Cloudflare as CDN:

1. Get Zone ID from Cloudflare dashboard
2. Create API token with "Cache Purge" permission
3. Add environment variables in Netlify

## Current Status

✅ Plugins configured in netlify.toml
✅ Lighthouse audits enabled
✅ Build caching enabled
✅ Link checking enabled
✅ Sitemap submission enabled
✅ Supabase integration configured
✅ Cloudflare cache purge configured (requires env vars)

⏳ Supabase integration needs manual enablement in dashboard
⏳ Cloudflare requires environment variables (if using)

## Next Steps

1. **Enable Supabase Integration** (Recommended)
   - Go to integrations page
   - Enable Supabase
   - Connect your project

2. **Add Cloudflare Credentials** (If using Cloudflare)
   - Get Zone ID and API token
   - Add to environment variables

3. **Monitor First Build** with plugins
   - Check build logs
   - Review Lighthouse report
   - Verify link checking results

4. **Review Plugin Performance**
   - Check build time impact
   - Review plugin outputs
   - Adjust configuration as needed

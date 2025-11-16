# DURABLE DOMAIN → NETLIFY SETUP

**Your Domain:** elevateconnectsdirectory.org (at Durable.co)
**Goal:** Point Durable domain to Netlify LMS
**Status:** ✅ Simple 3-step process

---

## 🎯 WHAT YOU HAVE

```
Domain: elevateconnectsdirectory.org
Registrar: Durable.co
Current Status: Not connected
Netlify Site: elevateproduction.netlify.app (ready)
```

---

## 🚀 SETUP PROCESS (15 minutes)

### Step 1: Login to Durable.co (2 minutes)

1. **Go to:** https://durable.co/login
2. **Login** with your credentials
3. **Go to:** Dashboard
4. **Find:** elevateconnectsdirectory.org
5. **Click:** Domain Settings or Manage Domain

---

### Step 2: Configure DNS in Durable.co (5 minutes)

**Look for:** "DNS Settings" or "Advanced DNS" or "Custom DNS"

**Add these records:**

#### A Record (IPv4):

```
Type: A
Name: @ (or leave blank for root)
Value: 75.2.60.5
TTL: 3600 (or 1 hour)
```

#### AAAA Record (IPv6):

```
Type: AAAA
Name: @ (or leave blank for root)
Value: 2600:1f18:2148:bc00:e87f:535d:9c1:b5c
TTL: 3600 (or 1 hour)
```

#### CNAME Record (www):

```
Type: CNAME
Name: www
Value: elevateproduction.netlify.app
TTL: 3600 (or 1 hour)
```

**Important:** Delete any existing A or CNAME records that point to Durable's servers

**Click:** Save or Update DNS

---

### Step 3: Add Domain in Netlify (5 minutes)

1. **Go to:** https://app.netlify.com/sites/elevateproduction/settings/domain

2. **Click:** "Add custom domain"

3. **Enter:** `elevateconnectsdirectory.org`

4. **Click:** "Verify"

5. **Netlify will check DNS** and show:

   ```
   ✅ DNS configured correctly
   ⏳ Provisioning SSL certificate...
   ```

6. **Wait 5-10 minutes** for SSL certificate

7. **Done!**

---

## 🔍 VERIFICATION

### Check DNS Propagation (10-15 minutes after setup):

1. **Go to:** https://dnschecker.org
2. **Enter:** elevateconnectsdirectory.org
3. **Select:** A Record
4. **Should show:** 75.2.60.5 (Netlify IP)

### Check Website (15-20 minutes after setup):

1. **Visit:** https://www.elevateconnectsdirectory.org
2. **Should show:** Your Netlify LMS
3. **SSL:** Should be secure (🔒 in browser)
4. **www redirect:** www.elevateconnectsdirectory.org should redirect to apex

---

## 📊 WHAT EACH SYSTEM DOES

### Durable.co:

```
Role: Domain registrar + DNS hosting ONLY
What it does:
  ✅ Holds your domain registration
  ✅ Manages DNS records
  ✅ Points domain to Netlify
What it does NOT do:
  ❌ Host your website
  ❌ Serve content
  ❌ Build anything
```

### Netlify:

```
Role: Website hosting
What it does:
  ✅ Hosts your LMS website
  ✅ Serves content
  ✅ Provides SSL certificate
  ✅ Auto-deploys from GitHub
  ✅ Responds to your Durable domain
```

---

## 🏗️ ARCHITECTURE

```
USER TYPES: elevateconnectsdirectory.org
    ↓
DNS LOOKUP (Durable.co DNS servers)
    ↓
DNS RETURNS: 75.2.60.5 (Netlify IP)
    ↓
BROWSER CONNECTS TO: Netlify servers
    ↓
NETLIFY SERVES: Your LMS site
    ↓
USER SEES: Your site at elevateconnectsdirectory.org
```

---

## 🔧 FINDING DNS SETTINGS IN DURABLE.CO

### Option 1: Domain Dashboard

```
1. Login to Durable.co
2. Click "Domains" or "My Domains"
3. Find: elevateconnectsdirectory.org
4. Click: "Manage" or "Settings"
5. Look for: "DNS Settings" or "Advanced DNS"
```

### Option 2: Site Settings

```
1. Login to Durable.co
2. Go to your site dashboard
3. Click: "Settings" or "Domain"
4. Click: "Advanced" or "Custom DNS"
5. Look for: DNS record management
```

### Option 3: Support

```
If you can't find DNS settings:
1. Contact Durable.co support
2. Ask: "How do I add custom DNS records?"
3. Tell them: "I want to point to external hosting"
```

---

## 💰 COSTS

### Durable.co:

```
Domain registration: Included with Durable plan
DNS hosting: Included free
Total: $0 extra (already paying for Durable)
```

### Netlify:

```
Hosting: FREE (up to 100GB bandwidth)
SSL: FREE (Let's Encrypt)
Builds: FREE (300 build minutes/month)
Total: $0/month
```

### Total Cost:

```
$0 extra (domain already at Durable)
```

---

## ⚠️ IMPORTANT NOTES

### 1. Don't Use Durable Website Builder

```
❌ Don't build site in Durable
❌ Don't use Durable's hosting
❌ Don't connect domain to Durable site

✅ Only use Durable for domain registration
✅ Only use Durable DNS to point to Netlify
✅ Netlify hosts everything
```

### 2. DNS Propagation Time

```
Minimum: 5-10 minutes
Average: 1-2 hours
Maximum: 24-48 hours

Be patient - DNS changes take time
```

### 3. SSL Certificate

```
Netlify automatically provisions SSL after:
- DNS is configured correctly
- Domain is verified in Netlify
- Usually takes 5-10 minutes

If SSL doesn't work after 1 hour:
- Check DNS records are correct
- Click "Verify DNS" in Netlify
- Wait a bit longer
```

---

## 🆘 TROUBLESHOOTING

### Problem: Can't find DNS settings in Durable

**Solution:**

1. Look for "Advanced Settings" or "Developer Settings"
2. Try searching for "DNS" or "nameservers"
3. Contact Durable support: "I need to add custom DNS records"
4. Alternative: Transfer domain to Cloudflare/Namecheap

### Problem: DNS not propagating

**Solution:**

1. Wait 24-48 hours
2. Check records are saved in Durable
3. Use dnschecker.org to monitor
4. Clear browser cache

### Problem: SSL certificate not provisioning

**Solution:**

1. Verify DNS is fully propagated (dnschecker.org)
2. In Netlify, click "Verify DNS configuration"
3. Wait 10-15 more minutes
4. If still failing, check DNS records are exact

### Problem: Site shows "Page not found"

**Solution:**

1. Check Netlify deployment succeeded
2. Verify domain is added in Netlify
3. Check DNS points to correct IP (75.2.60.5)
4. Clear browser cache

---

## ✅ VERIFICATION CHECKLIST

### In Durable.co:

- [ ] Logged into Durable account
- [ ] Found elevateconnectsdirectory.org
- [ ] Opened DNS settings
- [ ] Deleted old A records (if any)
- [ ] Added A record: @ → 75.2.60.5
- [ ] Added AAAA record: @ → 2600:1f18:2148:bc00:e87f:535d:9c1:b5c
- [ ] Added CNAME: www → elevateproduction.netlify.app
- [ ] Saved changes

### In Netlify:

- [ ] Logged into Netlify
- [ ] Went to domain settings
- [ ] Added custom domain: elevateconnectsdirectory.org
- [ ] Verified DNS configuration
- [ ] SSL certificate provisioned
- [ ] Domain shows as "Active"

### Testing:

- [ ] Checked DNS propagation (dnschecker.org)
- [ ] Visited https://www.elevateconnectsdirectory.org
- [ ] Site loads correctly
- [ ] SSL works (🔒 in browser)
- [ ] www.elevateconnectsdirectory.org redirects to apex

---

## 🔄 ALTERNATIVE: Transfer Domain Away from Durable

### If Durable Doesn't Allow Custom DNS:

Some website builders don't allow custom DNS records. If Durable.co doesn't let you add A/AAAA/CNAME records:

**Option 1: Transfer to Cloudflare (RECOMMENDED)**

```
Pros:
✅ Cheapest ($9/year)
✅ Best DNS tools
✅ Free CDN
✅ Full control

Steps:
1. Unlock domain in Durable
2. Get transfer code from Durable
3. Transfer to Cloudflare
4. Point DNS to Netlify
5. Takes 5-7 days
```

**Option 2: Transfer to Namecheap**

```
Pros:
✅ Affordable (~$10/year)
✅ Good DNS tools
✅ Easy to use

Steps:
1. Unlock domain in Durable
2. Get transfer code from Durable
3. Transfer to Namecheap
4. Point DNS to Netlify
5. Takes 5-7 days
```

---

## 📊 COMPARISON

### Keep Domain at Durable (If DNS works):

```
✅ Already own domain there
✅ No transfer needed
✅ Works immediately
✅ $0 extra cost
⚠️ May have limited DNS options
```

### Transfer to Cloudflare (If DNS doesn't work):

```
✅ Full DNS control
✅ Cheapest ($9/year)
✅ Best performance
✅ Free CDN
⚠️ Transfer takes 5-7 days
⚠️ Small transfer fee
```

---

## 🎯 RECOMMENDED APPROACH

### Try This First:

```
1. Try to add DNS records in Durable
2. If it works → Great! Use Durable DNS
3. If it doesn't → Transfer to Cloudflare
```

### If Durable Allows Custom DNS:

```
✅ Keep domain at Durable
✅ Point DNS to Netlify
✅ $0 extra cost
✅ Works perfectly
```

### If Durable Doesn't Allow Custom DNS:

```
⚠️ Transfer to Cloudflare
⚠️ Takes 5-7 days
⚠️ Costs ~$9/year
✅ Full control
```

---

## 📝 QUICK REFERENCE

### Netlify DNS Records (Add to Durable):

```
A      @    75.2.60.5
AAAA   @    2600:1f18:2148:bc00:e87f:535d:9c1:b5c
CNAME  www  elevateproduction.netlify.app
```

### Netlify Dashboard:

```
https://app.netlify.com/sites/elevateproduction/settings/domain
```

### DNS Checker:

```
https://dnschecker.org
```

### Durable Login:

```
https://durable.co/login
```

---

## 🎉 FINAL RESULT

### After Setup:

```
Your Domain: elevateconnectsdirectory.org (Durable)
Points to: Netlify (75.2.60.5)
Netlify Serves: Your LMS site
SSL: Automatic (Let's Encrypt)
Cost: $0 extra
```

### User Experience:

```
1. User types: elevateconnectsdirectory.org
2. DNS (Durable) points to: Netlify
3. Netlify serves: Your LMS
4. User sees: Your site with SSL
```

---

## 📞 SUPPORT

### Durable.co Support:

```
If you need help finding DNS settings:
- Email: support@durable.co
- Chat: Available in Durable dashboard
- Ask: "How do I add custom DNS records?"
```

### Netlify Support:

```
If domain verification fails:
- Docs: https://docs.netlify.com/domains-https/custom-domains/
- Support: https://www.netlify.com/support/
```

---

**SUMMARY:**

**Durable.co = Domain registrar + DNS (that's it)**  
**Netlify = Website hosting (everything else)**  
**Setup = 3 simple steps**  
**Time = 15 minutes + DNS propagation**  
**Cost = $0 extra**

---

_Your Durable domain points to your Netlify site._

**Start with Step 1 above!**

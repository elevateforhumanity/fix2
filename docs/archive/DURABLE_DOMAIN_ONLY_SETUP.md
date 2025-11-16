# DURABLE.CO - DOMAIN NAME ONLY

**Purpose:** Use Durable.co ONLY for domain registration/DNS
**Status:** ✅ CRYSTAL CLEAR

---

## 🎯 THE SETUP

### What You Want:

```
1. Buy domain at Durable.co: elevateforhumanity.org
2. Point domain to Netlify
3. Durable.co = Domain registrar ONLY (not hosting)
4. Netlify = Hosts your site
5. Two separate systems, domain points to Netlify
```

---

## 🌐 DNS CONFIGURATION IN DURABLE.CO

### Step 1: Login to Durable.co

1. Go to: https://durable.co
2. Login to your account

### Step 2: Access Domain Settings

1. Go to **Domains** or **Domain Management**
2. Find: `elevateforhumanity.org`
3. Click **Manage DNS** or **DNS Settings**

### Step 3: Point Domain to Netlify

**Remove Durable.co hosting, add Netlify DNS:**

#### A Records (IPv4):

```
Type: A
Name: @
Value: 75.2.60.5
TTL: 3600
```

#### AAAA Records (IPv6):

```
Type: AAAA
Name: @
Value: 2600:1f18:2148:bc00:e87f:535d:9c1:b5c
TTL: 3600
```

#### CNAME Record (www):

```
Type: CNAME
Name: www
Value: elevateproduction.netlify.app
TTL: 3600
```

### Step 4: Save Changes

- Click **Save** or **Update DNS**
- Wait 5-10 minutes for changes to propagate

---

## 🔧 NETLIFY CONFIGURATION

### Step 1: Add Custom Domain

1. Go to: https://app.netlify.com/sites/elevateproduction/settings/domain
2. Click **Add custom domain**
3. Enter: `elevateforhumanity.org`
4. Click **Verify**
5. Netlify will check DNS records

### Step 2: Verify DNS

Netlify will show:

```
✅ DNS configured correctly
✅ Domain verified
⏳ Provisioning SSL certificate...
```

Wait 5-10 minutes for SSL.

### Step 3: Enable HTTPS

Netlify automatically:

- ✅ Provisions Let's Encrypt SSL certificate
- ✅ Enables HTTPS
- ✅ Redirects HTTP → HTTPS

### Step 4: Test

Visit: https://elevateforhumanity.org

Should show your Netlify site!

---

## 📋 WHAT DURABLE.CO DOES

### Durable.co Role:

```
✅ Domain registrar (you bought domain there)
✅ DNS hosting (manages DNS records)
❌ NOT hosting your website
❌ NOT serving content
❌ Just pointing domain to Netlify
```

### Think of it like:

```
Durable.co = Phone book (DNS)
Netlify = Your actual house (hosting)

Domain points from phone book to house.
```

---

## 🏗️ FINAL ARCHITECTURE

```
USER TYPES: elevateforhumanity.org
    ↓
DNS LOOKUP (Durable.co DNS servers)
    ↓
DNS RETURNS: 75.2.60.5 (Netlify IP)
    ↓
BROWSER CONNECTS TO: Netlify servers
    ↓
NETLIFY SERVES: Your LMS site
    ↓
USER SEES: Your site at elevateforhumanity.org
```

### Two Separate Systems:

```
System 1: Durable.co
- Purpose: Domain registrar + DNS
- What it does: Points domain to Netlify
- What it doesn't do: Host anything

System 2: Netlify
- Purpose: Website hosting
- What it does: Serves your site
- Domain: elevateforhumanity.org (pointed from Durable)
```

---

## 🔍 VERIFICATION

### Check DNS Propagation:

1. Go to: https://dnschecker.org
2. Enter: `elevateforhumanity.org`
3. Select: **A Record**
4. Should show: `75.2.60.5` (Netlify IP)

### Check Domain:

```bash
# Command line check
dig elevateforhumanity.org

# Should return:
;; ANSWER SECTION:
elevateforhumanity.org. 3600 IN A 75.2.60.5
```

### Check Website:

1. Visit: https://elevateforhumanity.org
2. Should show: Your Netlify LMS
3. SSL: Should be secure (🔒)

---

## 📝 MANUAL INJECTION (After Deploy)

### What You Said:

> "I'll manually inject the site once it deploys"

### What This Means:

After Netlify deploys your site to `elevateforhumanity.org`, you can:

1. **Edit content** in your Netlify site
2. **Add features** via code
3. **Customize** as needed

**No Durable.co involvement** - it's just the domain registrar.

---

## 💰 COSTS

### Durable.co:

```
Domain registration: ~$12-15/year
DNS hosting: Usually included free
Total: ~$12-15/year
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
~$12-15/year (just domain registration)
```

---

## 🔄 ALTERNATIVE: Transfer Domain Away from Durable

### If You Want to Leave Durable Completely:

1. **Transfer domain to another registrar:**
   - Namecheap
   - GoDaddy
   - Cloudflare Registrar
   - Google Domains

2. **Point DNS to Netlify** (same records as above)

3. **Cancel Durable.co account**

### Why Transfer:

- ✅ One less account to manage
- ✅ Potentially cheaper
- ✅ Better DNS management tools
- ✅ Complete separation from Durable

---

## 📊 COMPARISON

### Option A: Keep Domain at Durable (What you're doing)

```
Domain Registrar: Durable.co
DNS Hosting: Durable.co
Website Hosting: Netlify
Domain Points To: Netlify

Pros:
✅ Already own domain there
✅ Simple DNS setup
✅ Works perfectly

Cons:
⚠️ Still have Durable account
⚠️ Domain renewal at Durable
```

### Option B: Transfer Domain Away

```
Domain Registrar: Namecheap/Cloudflare/etc
DNS Hosting: Cloudflare/Registrar
Website Hosting: Netlify
Domain Points To: Netlify

Pros:
✅ Complete separation from Durable
✅ Better DNS tools
✅ Potentially cheaper

Cons:
⚠️ Transfer process (7 days)
⚠️ Small transfer fee (~$10)
```

---

## ✅ FINAL CHECKLIST

### In Durable.co:

- [ ] Login to Durable.co
- [ ] Go to DNS settings for elevateforhumanity.org
- [ ] Add A record: @ → 75.2.60.5
- [ ] Add AAAA record: @ → 2600:1f18:2148:bc00:e87f:535d:9c1:b5c
- [ ] Add CNAME: www → elevateproduction.netlify.app
- [ ] Save changes

### In Netlify:

- [ ] Go to domain settings
- [ ] Add custom domain: elevateforhumanity.org
- [ ] Verify DNS
- [ ] Wait for SSL certificate
- [ ] Test HTTPS

### Verification:

- [ ] Check DNS propagation (dnschecker.org)
- [ ] Visit elevateforhumanity.org
- [ ] Verify SSL works (🔒)
- [ ] Verify site loads correctly

---

## 🎯 SUMMARY

### What Durable.co Does:

```
✅ Holds your domain registration
✅ Provides DNS hosting
✅ Points domain to Netlify
❌ Does NOT host your website
❌ Does NOT serve content
```

### What Netlify Does:

```
✅ Hosts your website
✅ Serves content
✅ Provides SSL
✅ Auto-deploys from GitHub
✅ Responds to elevateforhumanity.org
```

### How They Work Together:

```
1. User types: elevateforhumanity.org
2. DNS (Durable) says: "Go to 75.2.60.5"
3. Browser connects to: Netlify servers
4. Netlify serves: Your website
5. User sees: Your site at elevateforhumanity.org
```

### Result:

```
✅ Domain: elevateforhumanity.org (registered at Durable)
✅ Hosting: Netlify
✅ Two separate systems
✅ Domain points to Netlify
✅ Clean, simple, works perfectly
```

---

## 📞 SUPPORT

### If DNS doesn't work:

1. Wait 24-48 hours for full propagation
2. Check DNS records in Durable.co dashboard
3. Verify A record: 75.2.60.5
4. Verify CNAME: elevateproduction.netlify.app

### If SSL doesn't work:

1. Wait 10-15 minutes after DNS propagation
2. Check Netlify domain settings
3. Click "Verify DNS configuration"
4. Netlify will auto-provision SSL

### If site doesn't load:

1. Check Netlify deployment status
2. Verify build succeeded
3. Check DNS propagation
4. Clear browser cache

---

**FINAL ANSWER:**

**Durable.co = Domain registrar + DNS ONLY**  
**Netlify = Website hosting**  
**Domain points from Durable to Netlify**  
**Two separate systems**  
**Clean, simple, works perfectly**

---

_Durable.co: Just the domain name_  
_Netlify: Everything else_  
_No injection needed_  
_Just DNS pointing_

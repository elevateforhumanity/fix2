# Cloudflare DNS, WAF, and DDoS protection

resource "cloudflare_record" "efh_root" {
  zone_id = var.cloudflare_zone_id
  name    = "elevateconnectsdirectory.org"
  type    = "A"
  value   = var.origin_ip_address
  ttl     = 300
  proxied = true
}

resource "cloudflare_record" "efh_www" {
  zone_id = var.cloudflare_zone_id
  name    = "www"
  type    = "CNAME"
  value   = "elevateconnectsdirectory.org"
  ttl     = 300
  proxied = true
}

resource "cloudflare_record" "efh_monitoring" {
  zone_id = var.cloudflare_zone_id
  name    = "monitoring"
  type    = "CNAME"
  value   = "elevateconnectsdirectory.org"
  ttl     = 300
  proxied = true
}

# Basic security settings
resource "cloudflare_zone_settings_override" "efh_zone_settings" {
  zone_id = var.cloudflare_zone_id

  settings {
    security_level          = "high"
    ssl                     = "full"
    always_use_https        = "on"
    min_tls_version         = "1.2"
    opportunistic_encryption = "on"
    tls_1_3                 = "on"
    automatic_https_rewrites = "on"
    brotli                  = "on"
    early_hints             = "on"
    http2                   = "on"
    http3                   = "on"
    ipv6                    = "on"
    websockets              = "on"
  }
}

# WAF managed ruleset (OWASP)
resource "cloudflare_ruleset" "efh_waf_managed" {
  zone_id     = var.cloudflare_zone_id
  name        = "efh_waf_managed"
  description = "Managed WAF ruleset for EFH"
  kind        = "zone"
  phase       = "http_request_firewall_managed"

  rules {
    action = "execute"
    action_parameters {
      id = "efb7b8c949ac4650a09736fc376e9aee" # OWASP Core Ruleset
    }
    expression = "true"
    description = "Execute OWASP Core Ruleset"
    enabled = true
  }
}

# Custom WAF ruleset (block obvious bots / scanners)
resource "cloudflare_ruleset" "efh_waf_custom" {
  zone_id     = var.cloudflare_zone_id
  name        = "efh_waf_custom"
  description = "Custom WAF rules for EFH"
  kind        = "zone"
  phase       = "http_request_firewall_custom"

  rules {
    enabled = true
    action  = "block"
    expression = "(http.request.uri.path contains \"wp-admin\" or http.request.uri.path contains \"wp-login.php\" or http.request.uri.path contains \"xmlrpc.php\")"
    description = "Block WordPress scanner noise"
  }

  rules {
    enabled = true
    action  = "block"
    expression = "cf.threat_score > 40"
    description = "Block high threat score traffic"
  }

  rules {
    enabled = true
    action  = "challenge"
    expression = "(http.user_agent contains \"bot\" or http.user_agent contains \"crawler\") and not cf.verified_bot_category in {\"Search Engine Crawler\"}"
    description = "Challenge suspicious bots"
  }
}

# Rate limiting on login route to deter brute-force
resource "cloudflare_rate_limit" "efh_login_rate_limit" {
  zone_id = var.cloudflare_zone_id
  threshold = 20
  period = 60
  match {
    request {
      url_pattern = "*/auth/login*"
    }
  }
  action {
    mode = "ban"
    timeout = 600
  }
  description = "Rate limit login attempts to prevent brute force"
}

# Rate limiting on API endpoints
resource "cloudflare_rate_limit" "efh_api_rate_limit" {
  zone_id = var.cloudflare_zone_id
  threshold = 100
  period = 60
  match {
    request {
      url_pattern = "*/api/*"
    }
  }
  action {
    mode = "challenge"
    timeout = 300
  }
  description = "Rate limit API requests"
}

# DDoS protection (L7)
resource "cloudflare_ruleset" "efh_ddos_l7" {
  zone_id     = var.cloudflare_zone_id
  name        = "efh_ddos_l7"
  description = "Layer 7 DDoS protection"
  kind        = "zone"
  phase       = "ddos_l7"

  rules {
    action = "execute"
    action_parameters {
      id = "4d21379b4f9f4bb088e0729962c8b3cf" # HTTP DDoS Attack Protection
    }
    expression = "true"
    description = "Execute HTTP DDoS protection"
    enabled = true
  }
}

# Page rules for caching
resource "cloudflare_page_rule" "efh_cache_static" {
  zone_id = var.cloudflare_zone_id
  target = "elevateconnectsdirectory.org/_next/static/*"
  priority = 1

  actions {
    cache_level = "cache_everything"
    edge_cache_ttl = 31536000
  }
}

resource "cloudflare_page_rule" "efh_cache_images" {
  zone_id = var.cloudflare_zone_id
  target = "elevateconnectsdirectory.org/images/*"
  priority = 2

  actions {
    cache_level = "cache_everything"
    edge_cache_ttl = 86400
  }
}

# Firewall rule to allow only specific countries (optional)
# Uncomment and adjust if you want geo-blocking
# resource "cloudflare_filter" "efh_geo_filter" {
#   zone_id = var.cloudflare_zone_id
#   description = "Allow only US traffic"
#   expression = "ip.geoip.country ne \"US\""
# }
# 
# resource "cloudflare_firewall_rule" "efh_geo_block" {
#   zone_id = var.cloudflare_zone_id
#   description = "Block non-US traffic"
#   filter_id = cloudflare_filter.efh_geo_filter.id
#   action = "block"
# }

# Bot management (requires Enterprise plan)
# resource "cloudflare_bot_management" "efh_bot_mgmt" {
#   zone_id = var.cloudflare_zone_id
#   enable_js = true
#   fight_mode = true
# }

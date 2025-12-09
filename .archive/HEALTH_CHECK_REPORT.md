# LMS Health Check Report

Generated: 2025-12-08T21:05:47.117Z

## Summary

- **Total Checks:** 50
- **Passed:** 23 ✅
- **Failed:** 18 ❌
- **Warnings:** 9 ⚠️
- **Health Score:** 46%
- **Overall Status:** ❌ CRITICAL

## Detailed Results

### ✅ Database Migrations
- **Status:** pass
- **Message:** 118 migration files found
- **Severity:** info


### ❌ Migration: 010_complete_lms_schema.sql
- **Status:** fail
- **Message:** Missing
- **Severity:** critical


### ❌ Migration: 014_milady_cima_integration.sql
- **Status:** fail
- **Message:** Missing
- **Severity:** critical


### ❌ Migration: 015_exec_sql_rpc.sql
- **Status:** fail
- **Message:** Missing
- **Severity:** critical


### ❌ Migration: 016_ojt_enhancements.sql
- **Status:** fail
- **Message:** Missing
- **Severity:** critical


### ❌ Migration: 20251015_grade_book.sql
- **Status:** fail
- **Message:** Missing
- **Severity:** critical


### ❌ Migration: 20251015_quiz_system.sql
- **Status:** fail
- **Message:** Missing
- **Severity:** critical


### ❌ Migration: 20251015_live_classes.sql
- **Status:** fail
- **Message:** Missing
- **Severity:** critical


### ❌ Migration: 20251015_notification_center.sql
- **Status:** fail
- **Message:** Missing
- **Severity:** critical


### ✅ Database Tables
- **Status:** pass
- **Message:** 352 tables defined
- **Severity:** info


### ❌ Frontend Check
- **Status:** fail
- **Message:** ENOENT: no such file or directory, scandir '/workspaces/fix2/src/pages'
- **Severity:** critical


### ✅ Workers Found
- **Status:** pass
- **Message:** 0 workers configured
- **Severity:** info


### ❌ Worker: cima-importer
- **Status:** fail
- **Message:** Missing
- **Severity:** high


### ❌ Worker: grade-book
- **Status:** fail
- **Message:** Missing
- **Severity:** high


### ❌ Worker: quiz-system
- **Status:** fail
- **Message:** Missing
- **Severity:** high


### ❌ Worker: live-classes
- **Status:** fail
- **Message:** Missing
- **Severity:** high


### ❌ Worker: notification-center
- **Status:** fail
- **Message:** Missing
- **Severity:** high


### ✅ package.json
- **Status:** pass
- **Message:** Found
- **Severity:** info


### ✅ Dependency: react
- **Status:** pass
- **Message:** Frontend framework (19.2.1)
- **Severity:** info


### ✅ Dependency: react-dom
- **Status:** pass
- **Message:** React DOM (19.2.1)
- **Severity:** info


### ⚠️ Dependency: react-router-dom
- **Status:** warn
- **Message:** Routing not found
- **Severity:** info


### ✅ Dependency: @supabase/supabase-js
- **Status:** pass
- **Message:** Database client (2.57.4)
- **Severity:** info


### ✅ Dependency: recharts
- **Status:** pass
- **Message:** Charts (3.4.1)
- **Severity:** info


### ✅ Dependency: tailwindcss
- **Status:** pass
- **Message:** Styling (3.4.18)
- **Severity:** info


### ✅ node_modules
- **Status:** pass
- **Message:** Dependencies installed
- **Severity:** info


### ✅ Directory: src
- **Status:** pass
- **Message:** Exists
- **Severity:** info


### ❌ Directory: src/pages
- **Status:** fail
- **Message:** Missing
- **Severity:** critical


### ❌ Directory: src/components
- **Status:** fail
- **Message:** Missing
- **Severity:** critical


### ❌ Directory: src/layouts
- **Status:** fail
- **Message:** Missing
- **Severity:** critical


### ❌ Directory: src/contexts
- **Status:** fail
- **Message:** Missing
- **Severity:** critical


### ✅ Directory: supabase/migrations
- **Status:** pass
- **Message:** Exists
- **Severity:** info


### ✅ Directory: workers
- **Status:** pass
- **Message:** Exists
- **Severity:** info


### ✅ Directory: public
- **Status:** pass
- **Message:** Exists
- **Severity:** info


### ✅ File: package.json
- **Status:** pass
- **Message:** Exists
- **Severity:** info


### ⚠️ File: vite.config.js
- **Status:** warn
- **Message:** Missing
- **Severity:** info


### ⚠️ File: index.html
- **Status:** warn
- **Message:** Missing
- **Severity:** info


### ✅ File: README.md
- **Status:** pass
- **Message:** Exists
- **Severity:** info


### ✅ Git Repository
- **Status:** pass
- **Message:** Initialized
- **Severity:** info


### ✅ Current Branch
- **Status:** pass
- **Message:** main
- **Severity:** info


### ✅ Git Status
- **Status:** pass
- **Message:** Clean working directory
- **Severity:** info


### ✅ Last Commit
- **Status:** pass
- **Message:** e72c64ba2 Replace video slideshow with static hero image and shorten text
- **Severity:** info


### ✅ Git Remote
- **Status:** pass
- **Message:** GitHub configured
- **Severity:** info


### ⚠️ Doc: COMPLETE_DEPLOYMENT_GUIDE.md
- **Status:** warn
- **Message:** Missing
- **Severity:** info


### ✅ Doc: DEPLOYMENT_READY.md
- **Status:** pass
- **Message:** Available
- **Severity:** info


### ✅ Doc: DEPLOYMENT_COMPLETE.md
- **Status:** pass
- **Message:** Available
- **Severity:** info


### ⚠️ Doc: LMS_COMPLETE_ANALYSIS.md
- **Status:** warn
- **Message:** Missing
- **Severity:** info


### ⚠️ Doc: SYSTEM_STATUS.md
- **Status:** warn
- **Message:** Missing
- **Severity:** info


### ⚠️ Doc: AUTOPILOT_FIX_REPORT.md
- **Status:** warn
- **Message:** Missing
- **Severity:** info


### ⚠️ Doc: FINAL_DEPLOYMENT_SUMMARY.md
- **Status:** warn
- **Message:** Missing
- **Severity:** info


### ⚠️ Doc: LMS_VALUE_ASSESSMENT.md
- **Status:** warn
- **Message:** Missing
- **Severity:** info


## 🚨 Critical Issues

- **Migration: 010_complete_lms_schema.sql:** Missing
- **Migration: 014_milady_cima_integration.sql:** Missing
- **Migration: 015_exec_sql_rpc.sql:** Missing
- **Migration: 016_ojt_enhancements.sql:** Missing
- **Migration: 20251015_grade_book.sql:** Missing
- **Migration: 20251015_quiz_system.sql:** Missing
- **Migration: 20251015_live_classes.sql:** Missing
- **Migration: 20251015_notification_center.sql:** Missing
- **Frontend Check:** ENOENT: no such file or directory, scandir '/workspaces/fix2/src/pages'
- **Directory: src/pages:** Missing
- **Directory: src/components:** Missing
- **Directory: src/layouts:** Missing
- **Directory: src/contexts:** Missing

## ⚠️ High Priority Issues

- **Worker: cima-importer:** Missing
- **Worker: grade-book:** Missing
- **Worker: quiz-system:** Missing
- **Worker: live-classes:** Missing
- **Worker: notification-center:** Missing

## Recommendations

❌ System has critical issues. Do not deploy until all critical issues are resolved.

## Next Steps


1. Fix all critical issues immediately
2. Address high priority issues
3. Re-run health check
4. Proceed with deployment when all checks pass


---

Generated by LMS Health Check Script

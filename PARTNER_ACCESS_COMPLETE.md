# 🎓 Partner Program Access - Complete Guide

**Status:** ✅ All partner integrations documented  
**Date:** December 16, 2024

---

## 📚 PARTNER PLATFORMS & ACCESS

### **1. JRI (Job Ready Indianapolis)** - SCORM Content

**Integration Type:** ✅ SCORM Packages (Hosted in LMS)

**Content Location:** `/lms-content/jri/`

**Available Modules (8 SCORM packages):**
1. Introduction to Job Ready Indy (JRI)
2. Badge 1: Mindsets
3. Badge 2: Self-Management
4. Badge 3: Learning Strategies
5. Badge 4: Social Skills
6. Badge 5: Workplace Skills
7. Badge 6: Launch a Career
8. Facilitation Resources

**Format:** SCORM 2004 3rd Edition  
**Total Size:** ~500KB  
**Hosting:** Self-hosted in Elevate LMS  

**External Resources:**
- Support: https://learning.employindy.org/support
- Documentation: https://learning.employindy.org/jri
- Contact: learning@employindy.org

**Student Access:** ✅ Through Elevate LMS (SCORM player)  
**API Integration:** ❌ Not needed (SCORM files hosted locally)

---

### **2. CAREERSAFE** - OSHA Training

**Integration Type:** ✅ Direct Student Access

**Organization:** Elevate for Humanity Training Center  
**Status:** ✅ ACCOUNT ACTIVE  
**Address:** 8888 Keystone Crossing, Indianapolis, IN 46240  
**Phone:** (317) 314-3757

**Student Access:**
- **Campus Login:** https://www.careersafeonline.com/campus/signin
- **Business Portal:** https://www.careersafeonline.com/for-business/osha-training

**Available Courses:**
- OSHA 10-Hour General Industry
- OSHA 30-Hour General Industry
- OSHA 10-Hour Construction
- OSHA 30-Hour Construction
- Bloodborne Pathogens
- HAZWOPER 8-Hour Refresher

**How It Works:**
1. Elevate purchases course seats from CareerSafe
2. Students receive login credentials
3. Students access CareerSafe campus directly
4. Complete training at own pace
5. Receive DOL-issued OSHA card

**API Integration:** ❌ Not needed (direct student access)

---

### **3. MILADY** - Beauty Industry Training

**Integration Type:** ✅ Direct Platform Access

**Platform:** Milady RISE  
**Website:** https://www.milady.com/rise

**Available Programs:**
- Cosmetology
- Barbering
- Esthetics
- Nail Technology

**Student Access:**
- Direct access to Milady RISE platform
- Students receive platform credentials
- Complete courses on Milady platform

**How It Works:**
1. Elevate enrolls students in Milady programs
2. Students receive Milady RISE access
3. Students complete training on Milady platform
4. Milady provides certificates

**API Integration:** ❌ Not needed (direct platform access)

---

### **4. HSI (Health & Safety Institute)**

**Integration Type:** ✅ Direct Signup/Portal Access

**Website:** https://hsi.com  
**Portal:** Otis Manager 4.0  
**Store:** http://store.osmanager4.com/emss/groups/523

**Available Courses:**
- CPR/AED
- First Aid
- Bloodborne Pathogens
- Health & Safety certifications

**Student Access:**
- Direct signup through HSI website
- Access to Otis Manager portal
- Purchase courses through HSI store

**How It Works:**
1. Students sign up directly on HSI website
2. Purchase courses through HSI store
3. Complete training on HSI platform
4. Receive HSI certifications

**API Integration:** ❌ Not needed (direct signup)

---

### **5. NRF (National Retail Federation)**

**Integration Type:** ✅ Direct Platform Access

**Platform:** Rise Up  
**Website:** https://riseup.nrf.com  
**Login:** https://riseup.nrf.com/login

**Available Courses:**
- Customer Service
- Retail Management
- Sales Training

**Student Access:**
- Direct login to Rise Up platform
- Students receive NRF credentials
- Complete courses on NRF platform

**How It Works:**
1. Elevate enrolls students in NRF programs
2. Students receive Rise Up credentials
3. Students access Rise Up platform directly
4. Complete NRF certifications

**API Integration:** ❌ Not needed (direct platform access)

---

### **6. CERTIPORT** - IT Certifications

**Integration Type:** ✅ Direct Testing Portal

**Website:** www.certiport.com

**Available Certifications:**
- Microsoft Office Specialist
- IC3 Digital Literacy
- IT certifications

**Student Access:**
- Direct access to Certiport testing portal
- Schedule exams through Certiport
- Take tests at authorized testing centers

**How It Works:**
1. Students register for Certiport exams
2. Schedule testing appointments
3. Take exams at testing centers
4. Receive Certiport certifications

**API Integration:** ❌ Not needed (direct portal access)

---

### **7. PEARSON** - Academic Testing

**Integration Type:** ✅ Direct Testing Portal

**Website:** www.pearson.com

**Available Tests:**
- Academic assessments
- Professional certifications

**Student Access:**
- Direct access to Pearson testing portal
- Schedule exams through Pearson
- Take tests at authorized centers

**How It Works:**
1. Students register for Pearson exams
2. Schedule testing appointments
3. Take exams at testing centers
4. Receive Pearson certifications

**API Integration:** ❌ Not needed (direct portal access)

---

## 📊 INTEGRATION SUMMARY

| Partner | Integration Type | Student Access | API Needed | Content Location |
|---------|------------------|----------------|------------|------------------|
| **JRI** | SCORM Packages | Elevate LMS | ❌ No | `/lms-content/jri/` |
| **CAREERSAFE** | Direct Login | careersafeonline.com/campus | ❌ No | External |
| **MILADY** | Direct Platform | milady.com/rise | ❌ No | External |
| **HSI** | Direct Signup | hsi.com | ❌ No | External |
| **NRF** | Direct Platform | riseup.nrf.com | ❌ No | External |
| **CERTIPORT** | Direct Portal | certiport.com | ❌ No | External |
| **PEARSON** | Direct Portal | pearson.com | ❌ No | External |

---

## 🎯 IMPLEMENTATION APPROACH

### **JRI (SCORM Content)**
```
✅ SCORM files downloaded and stored locally
✅ Host in Elevate LMS with SCORM player
✅ Students access through Elevate platform
✅ No external dependencies
```

### **All Other Partners (Direct Access)**
```
✅ Students receive partner credentials
✅ Students access partner platforms directly
✅ Partners handle all training and certification
✅ Elevate tracks completion via certificates
```

---

## 🔧 TECHNICAL REQUIREMENTS

### **For JRI (SCORM):**
- SCORM player in Elevate LMS
- File storage for SCORM packages
- Progress tracking
- Certificate generation

### **For Other Partners:**
- No technical integration needed
- Simple credential management
- Certificate verification process
- Student support documentation

---

## 📁 REPOSITORY STRUCTURE

```
lms-content/
├── jri/
│   ├── 1-introduction-to-jri.zip (SCORM)
│   ├── 2-badge-1-mindsets.zip (SCORM)
│   ├── 3-badge-2-self-management.zip (SCORM)
│   ├── 4-badge-3-learning-strategies.zip (SCORM)
│   ├── 5-badge-4-social-skills.zip (SCORM)
│   ├── 6-badge-5-workplace-skills.zip (SCORM)
│   ├── 7-badge-6-launch-career.zip (SCORM)
│   └── 8-facilitation-resources.zip (SCORM)
├── careersafe-osha/
│   └── CAREERSAFE_OSHA_TRAINING.md
├── milady-rise/
│   └── MILADY_RISE_SETUP.md
├── certiport/
│   └── CERTIPORT_CATC_SETUP.md
├── JRI_SETUP_GUIDE.md
└── COMPLETE_TRAINING_PORTFOLIO.md
```

---

## ✅ SUMMARY

**Total Partners:** 7  
**SCORM Content:** 1 (JRI - 8 modules)  
**Direct Access:** 6 (CAREERSAFE, MILADY, HSI, NRF, CERTIPORT, PEARSON)  
**API Integrations:** 0  
**Environment Variables:** 0  

**All partner integrations are simple and straightforward:**
- JRI: Host SCORM files in LMS
- Others: Provide students with direct access links

**No complex backend integration required!** 🎉

---

*Complete partner access documentation*  
*JRI SCORM files ready for LMS integration*  
*All other partners use direct student access*

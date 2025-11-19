// Central contact information for Elevate for Humanity
// Update these values with your actual contact details

export const CONTACT_INFO = {
  // Phone
  phone: {
    display: '(317) 314-3757', // How it appears on the site
    tel: '+13173143757', // For tel: links (no spaces, dashes, or parentheses)
  },

  // Email
  email: {
    general: 'info@elevateforhumanity.org',
    support: 'support@elevateforhumanity.org',
    partnerships: 'partners@elevateforhumanity.org',
  },

  // Address
  address: {
    street: '123 Main Street',
    city: 'Indianapolis',
    state: 'IN',
    zip: '46204',
    full: '123 Main Street, Indianapolis, IN 46204',
  },

  // Hours
  hours: {
    office: 'Monday-Friday, 9:00 AM - 5:00 PM EST',
    aiReceptionist: '24/7 - Always Available',
  },

  // Social Media (optional)
  social: {
    facebook: 'https://facebook.com/elevateforhumanity',
    linkedin: 'https://linkedin.com/company/elevateforhumanity',
    twitter: 'https://twitter.com/elevate4humanity',
  },
};

// Helper function to format phone for display
export function formatPhone(phone: string): string {
  return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
}

// Helper function to create tel: link
export function getTelLink(phone: string): string {
  return `tel:${phone.replace(/\D/g, '')}`;
}

INSERT INTO courses (title, slug, description, duration, moderation_status, thumbnail_url, category, level)
VALUES
  ('Medical Assistant', 'medical-assistant', 'Clinical and administrative medical assisting training', '24 weeks', 'approved', '/images/programs/efh-cna-hero.jpg', 'Healthcare', 'Beginner'),
  ('Phlebotomy Technician', 'phlebotomy', 'Blood collection and laboratory procedures', '8 weeks', 'approved', '/images/programs/efh-cna-hero.jpg', 'Healthcare', 'Beginner'),
  ('Pharmacy Technician', 'pharmacy-tech', 'Pharmacy operations and medication dispensing', '16 weeks', 'approved', '/images/programs/efh-cna-hero.jpg', 'Healthcare', 'Beginner'),
  ('Dental Assistant', 'dental-assistant', 'Chairside dental assisting and office procedures', '12 weeks', 'approved', '/images/programs/efh-cna-hero.jpg', 'Healthcare', 'Beginner'),
  ('Patient Care Technician', 'patient-care-tech', 'Direct patient care in healthcare facilities', '10 weeks', 'approved', '/images/programs/efh-cna-hero.jpg', 'Healthcare', 'Beginner'),
  ('Electrical Technician', 'electrical-tech', 'Electrical systems installation and maintenance', '16 weeks', 'approved', '/images/programs/hvac-hero.jpg', 'Trades', 'Intermediate'),
  ('Plumbing Technician', 'plumbing', 'Plumbing systems and pipe fitting', '14 weeks', 'approved', '/images/programs/hvac-hero.jpg', 'Trades', 'Intermediate'),
  ('Welding Technician', 'welding', 'Welding techniques and metal fabrication', '12 weeks', 'approved', '/images/programs/hvac-hero.jpg', 'Trades', 'Intermediate'),
  ('Carpentry', 'carpentry', 'Residential and commercial carpentry', '16 weeks', 'approved', '/images/programs/building-maintenance-hero.jpg', 'Trades', 'Beginner'),
  ('Automotive Technician', 'automotive-tech', 'Automotive repair and maintenance', '20 weeks', 'approved', '/images/programs/hvac-hero.jpg', 'Trades', 'Intermediate'),
  ('Cosmetology', 'cosmetology', 'Hair styling, coloring, and beauty services', '52 weeks', 'approved', '/images/programs/barber-hero.jpg', 'Beauty', 'Beginner'),
  ('Esthetics', 'esthetics', 'Skincare and facial treatments', '24 weeks', 'approved', '/images/programs/barber-hero.jpg', 'Beauty', 'Beginner'),
  ('Nail Technician', 'nail-tech', 'Manicure and pedicure services', '12 weeks', 'approved', '/images/programs/barber-hero.jpg', 'Beauty', 'Beginner'),
  ('Massage Therapy', 'massage-therapy', 'Therapeutic massage techniques', '26 weeks', 'approved', '/images/programs/barber-hero.jpg', 'Beauty', 'Beginner'),
  ('Forklift Operator', 'forklift', 'Forklift operation and warehouse safety', '2 weeks', 'approved', '/images/programs/cdl-hero.jpg', 'Transportation', 'Beginner'),
  ('Logistics Coordinator', 'logistics', 'Supply chain and logistics management', '8 weeks', 'approved', '/images/programs/cdl-hero.jpg', 'Transportation', 'Beginner'),
  ('Customer Service Representative', 'customer-service', 'Customer service and communication skills', '6 weeks', 'approved', '/images/programs/efh-building-tech-hero.jpg', 'Business', 'Beginner'),
  ('Administrative Assistant', 'admin-assistant', 'Office administration and clerical skills', '8 weeks', 'approved', '/images/programs/efh-building-tech-hero.jpg', 'Business', 'Beginner'),
  ('Bookkeeping', 'bookkeeping', 'Financial recordkeeping and accounting basics', '12 weeks', 'approved', '/images/programs/efh-building-tech-hero.jpg', 'Business', 'Beginner'),
  ('IT Support Specialist', 'it-support', 'Computer troubleshooting and technical support', '16 weeks', 'approved', '/images/programs/efh-building-tech-hero.jpg', 'Technology', 'Beginner'),
  ('Cybersecurity Fundamentals', 'cybersecurity', 'Network security and data protection', '12 weeks', 'approved', '/images/programs/efh-building-tech-hero.jpg', 'Technology', 'Intermediate'),
  ('Digital Marketing', 'digital-marketing', 'Social media and online marketing strategies', '10 weeks', 'approved', '/images/programs/efh-building-tech-hero.jpg', 'Business', 'Beginner'),
  ('Food Service Manager', 'food-service', 'Restaurant operations and food safety', '8 weeks', 'approved', '/images/programs/efh-building-tech-hero.jpg', 'Hospitality', 'Beginner'),
  ('Hospitality Management', 'hospitality', 'Hotel and hospitality operations', '12 weeks', 'approved', '/images/programs/efh-building-tech-hero.jpg', 'Hospitality', 'Beginner'),
  ('Childcare Provider', 'childcare', 'Early childhood education and care', '10 weeks', 'approved', '/images/programs/efh-building-tech-hero.jpg', 'Education', 'Beginner'),
  ('Security Guard', 'security-guard', 'Security operations and safety procedures', '4 weeks', 'approved', '/images/programs/efh-building-tech-hero.jpg', 'Security', 'Beginner')
ON CONFLICT (slug) DO NOTHING;

SELECT COUNT(*) as total_courses FROM courses WHERE moderation_status = 'approved';
SELECT id, title, category FROM courses WHERE moderation_status = 'approved' ORDER BY category, title;

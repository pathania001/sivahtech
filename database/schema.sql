CREATE TABLE IF NOT EXISTS users (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(160) NOT NULL,
  email VARCHAR(190) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin','editor') NOT NULL DEFAULT 'admin',
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_users_email (email)
);

CREATE TABLE IF NOT EXISTS pages (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(190) NOT NULL UNIQUE,
  meta_description TEXT,
  head_html LONGTEXT,
  content_html LONGTEXT,
  status ENUM('draft','published','scheduled','unpublished') NOT NULL DEFAULT 'draft',
  publish_at DATETIME NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_pages_slug_status (slug, status)
);

CREATE TABLE IF NOT EXISTS services (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(190) NOT NULL UNIQUE,
  excerpt TEXT,
  content_html LONGTEXT,
  icon_svg LONGTEXT,
  sort_order INT NOT NULL DEFAULT 0,
  status ENUM('draft','published','scheduled','unpublished') NOT NULL DEFAULT 'draft',
  publish_at DATETIME NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_services_slug_status (slug, status)
);

CREATE TABLE IF NOT EXISTS blog_categories (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(160) NOT NULL,
  slug VARCHAR(190) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS blogs (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  category_id BIGINT UNSIGNED NULL,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(190) NOT NULL UNIQUE,
  excerpt TEXT,
  content_html LONGTEXT,
  featured_image_url VARCHAR(500),
  tags JSON NULL,
  author_name VARCHAR(160) NOT NULL DEFAULT 'Sivah Tech',
  meta_title VARCHAR(255),
  meta_description TEXT,
  status ENUM('draft','published','scheduled','unpublished') NOT NULL DEFAULT 'draft',
  published_at DATETIME NULL,
  publish_at DATETIME NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_blogs_slug_status (slug, status),
  INDEX idx_blogs_category (category_id),
  FULLTEXT INDEX ft_blogs_search (title, excerpt, content_html),
  CONSTRAINT fk_blogs_category FOREIGN KEY (category_id) REFERENCES blog_categories(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS faq (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  question VARCHAR(500) NOT NULL,
  answer TEXT NOT NULL,
  category VARCHAR(160),
  sort_order INT NOT NULL DEFAULT 0,
  status ENUM('draft','published','scheduled','unpublished') NOT NULL DEFAULT 'published',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_faq_status (status)
);

CREATE TABLE IF NOT EXISTS testimonials (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(160) NOT NULL,
  role VARCHAR(160),
  company VARCHAR(160),
  quote TEXT NOT NULL,
  rating TINYINT UNSIGNED DEFAULT 5,
  status ENUM('draft','published','scheduled','unpublished') NOT NULL DEFAULT 'published',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS team_members (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(160) NOT NULL,
  role VARCHAR(160) NOT NULL,
  bio TEXT,
  photo_url VARCHAR(500),
  sort_order INT NOT NULL DEFAULT 0,
  status ENUM('draft','published','scheduled','unpublished') NOT NULL DEFAULT 'published',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS case_studies (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(190) NOT NULL UNIQUE,
  client_name VARCHAR(190),
  industry VARCHAR(160),
  summary TEXT,
  content_html LONGTEXT,
  metrics JSON NULL,
  status ENUM('draft','published','scheduled','unpublished') NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS media (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  file_name VARCHAR(255) NOT NULL,
  file_url VARCHAR(500) NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  size_bytes BIGINT UNSIGNED NOT NULL DEFAULT 0,
  alt_text VARCHAR(255),
  folder VARCHAR(160),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_media_mime (mime_type)
);

CREATE TABLE IF NOT EXISTS leads (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(160) NOT NULL,
  email VARCHAR(190) NOT NULL,
  phone VARCHAR(80),
  service VARCHAR(160),
  message TEXT,
  source_page VARCHAR(255),
  ip_address VARCHAR(80),
  status ENUM('new','contacted','qualified','proposal_sent','won','lost') NOT NULL DEFAULT 'new',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_leads_email (email),
  INDEX idx_leads_status_created (status, created_at)
);

CREATE TABLE IF NOT EXISTS settings (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  setting_group VARCHAR(100) NOT NULL DEFAULT 'global',
  setting_key VARCHAR(190) NOT NULL,
  setting_value TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_setting (setting_group, setting_key)
);

CREATE TABLE IF NOT EXISTS seo (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  entity_type VARCHAR(80) NOT NULL,
  entity_id BIGINT UNSIGNED NULL,
  slug VARCHAR(190),
  meta_title VARCHAR(255),
  meta_description TEXT,
  canonical_url VARCHAR(500),
  og_title VARCHAR(255),
  og_description TEXT,
  og_image VARCHAR(500),
  twitter_title VARCHAR(255),
  twitter_description TEXT,
  twitter_image VARCHAR(500),
  schema_json JSON NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_seo_entity (entity_type, entity_id),
  INDEX idx_seo_slug (slug)
);

CREATE TABLE IF NOT EXISTS menus (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  menu_location VARCHAR(80) NOT NULL,
  label VARCHAR(160) NOT NULL,
  url VARCHAR(500) NOT NULL,
  parent_id BIGINT UNSIGNED NULL,
  sort_order INT NOT NULL DEFAULT 0,
  status ENUM('draft','published','unpublished') NOT NULL DEFAULT 'published',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_menus_location (menu_location),
  CONSTRAINT fk_menus_parent FOREIGN KEY (parent_id) REFERENCES menus(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(190) NOT NULL UNIQUE,
  source_page VARCHAR(255),
  status ENUM('active','unsubscribed') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO settings (setting_group, setting_key, setting_value) VALUES
('global','companyName','Sivah Tech'),
('global','email','info@sivahtech.com'),
('global','phone','+91 75082 76752'),
('global','address','Plot E, 195, Industrial Area, Sector 74, Sahibzada Ajit Singh Nagar, Mohali, Punjab, India'),
('global','facebook','https://www.facebook.com/SivahTech'),
('global','linkedinProfile','https://in.linkedin.com/in/sivah-tech'),
('global','linkedinCompany','https://in.linkedin.com/company/sivah-tech')
ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value);

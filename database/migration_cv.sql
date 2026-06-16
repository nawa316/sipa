CREATE TABLE IF NOT EXISTS profile (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    tagline VARCHAR(255),
    about_text TEXT,
    email VARCHAR(255),
    phone VARCHAR(50),
    location VARCHAR(255),
    github VARCHAR(255),
    linkedin VARCHAR(255),
    cv_url VARCHAR(500),
    photo_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS educations (
    id SERIAL PRIMARY KEY,
    institution VARCHAR(255) NOT NULL,
    degree VARCHAR(255) NOT NULL,
    major VARCHAR(255),
    start_date DATE NOT NULL,
    end_date DATE,
    gpa VARCHAR(50),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS certifications (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    issuer VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    description TEXT,
    credential_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS achievements (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    year INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert initial profile data if empty
INSERT INTO profile (name, tagline, about_text, email, phone, location, github, linkedin)
SELECT 'Muhammad Ade Dzakwan', 'Information Systems Student & Web Developer', 'Seorang mahasiswa Sistem Informasi dengan passion dalam pengembangan web...', 'muhammadadedzakwan@gmail.com', '0895-1360-1357', 'Surabaya, Jawa Timur', 'https://github.com/nawa316', 'https://linkedin.com/in/muhammad-ade-dzakwan'
WHERE NOT EXISTS (SELECT 1 FROM profile);

-- Insert initial education data if empty
INSERT INTO educations (institution, degree, major, start_date, gpa, description)
SELECT 'Institut Teknologi Sepuluh Nopember', 'S1', 'Sistem Informasi', '2023-08-01', '3.64 / 3.50', 'Active student.'
WHERE NOT EXISTS (SELECT 1 FROM educations);

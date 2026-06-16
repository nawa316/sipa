-- Database initialization script for Profile Web
-- This script creates the necessary tables matching frontend data structure

-- Drop tables if exist (for fresh install)
DROP TABLE IF EXISTS experiences CASCADE;
DROP TABLE IF EXISTS portfolios CASCADE;
DROP TABLE IF EXISTS blogs CASCADE;

-- Create blogs table (matching frontend BlogPost interface)
CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    image VARCHAR(500),
    author VARCHAR(100) DEFAULT 'Muhammad Ade Dzakwan',
    category VARCHAR(100) NOT NULL,
    tags TEXT[] DEFAULT '{}', -- Array of tags
    published_at DATE DEFAULT CURRENT_DATE,
    read_time INTEGER DEFAULT 5, -- in minutes
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create portfolios table (matching frontend PortfolioItem interface)
CREATE TABLE portfolios (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image VARCHAR(500),
    technologies TEXT[] DEFAULT '{}', -- Array of technologies
    category VARCHAR(100) NOT NULL,
    link VARCHAR(500), -- project live link
    github VARCHAR(500), -- github repository link
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create experiences table (matching frontend ExperienceItem interface)
CREATE TABLE experiences (
    id SERIAL PRIMARY KEY,
    organization VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image VARCHAR(500),
    start_date DATE NOT NULL,
    end_date DATE, -- NULL means current/ongoing
    type VARCHAR(50) NOT NULL CHECK (type IN ('organization', 'work', 'volunteer')),
    skills TEXT[] DEFAULT '{}', -- Array of skills
    location VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX idx_blogs_slug ON blogs(slug);
CREATE INDEX idx_blogs_category ON blogs(category);
CREATE INDEX idx_blogs_published_at ON blogs(published_at DESC);
CREATE INDEX idx_blogs_tags ON blogs USING GIN(tags); -- GIN index for array search

CREATE INDEX idx_portfolios_category ON portfolios(category);
CREATE INDEX idx_portfolios_created_at ON portfolios(created_at DESC);

CREATE INDEX idx_experiences_type ON experiences(type);
CREATE INDEX idx_experiences_start_date ON experiences(start_date DESC);

-- Insert sample blog data
INSERT INTO blogs (title, slug, excerpt, content, image, author, category, tags, published_at, read_time) VALUES
    (
        'Memulai Karir sebagai Web Developer di 2024',
        'memulai-karir-web-developer-2024',
        'Panduan lengkap untuk memulai karir sebagai web developer, dari belajar dasar-dasar hingga mendapatkan pekerjaan pertama.',
        'Web development adalah salah satu bidang yang paling diminati saat ini. Dengan semakin banyaknya bisnis yang beralih ke platform digital, kebutuhan akan web developer terus meningkat.

## Langkah Pertama: Pelajari Dasar-Dasar

Mulailah dengan mempelajari HTML, CSS, dan JavaScript. Ketiga teknologi ini adalah fondasi dari web development.

## Framework Modern

Setelah menguasai dasar-dasar, pelajari framework modern seperti React, Vue, atau Angular untuk frontend, dan Node.js, Express, atau Laravel untuk backend.

## Bangun Portfolio

Buat proyek-proyek kecil untuk mengisi portfolio Anda. Ini akan membantu Anda mendapatkan pekerjaan pertama.',
        '/images/blog/web-developer.jpg',
        'Muhammad Ade Dzakwan',
        'Career',
        ARRAY['Web Development', 'Career', 'Programming'],
        '2024-01-10',
        5
    ),
    (
        'Tips Optimasi Performa Website dengan Next.js',
        'optimasi-performa-nextjs',
        'Pelajari cara mengoptimalkan performa website Next.js Anda dengan teknik-teknik terbaik.',
        'Next.js adalah framework React yang powerful untuk membangun website dengan performa tinggi. Berikut adalah tips untuk mengoptimalkan website Next.js Anda.

## Image Optimization

Gunakan komponen Image dari Next.js untuk mengoptimalkan gambar secara otomatis.

## Code Splitting

Next.js secara otomatis melakukan code splitting, tetapi Anda bisa mengoptimalkannya lebih lanjut dengan dynamic imports.

## Caching Strategy

Implementasikan strategi caching yang tepat untuk meningkatkan waktu loading.',
        '/images/blog/nextjs-performance.jpg',
        'Muhammad Ade Dzakwan',
        'Technology',
        ARRAY['Next.js', 'Performance', 'React'],
        '2024-02-15',
        7
    ),
    (
        'Pentingnya UI/UX dalam Pengembangan Aplikasi',
        'pentingnya-ui-ux-development',
        'Mengapa UI/UX sangat penting dalam pengembangan aplikasi dan bagaimana cara menerapkannya dengan baik.',
        'UI/UX adalah aspek yang sering diabaikan dalam pengembangan aplikasi, padahal sangat penting untuk kesuksesan produk.

## Apa itu UI/UX?

UI (User Interface) adalah tampilan visual dari aplikasi, sedangkan UX (User Experience) adalah pengalaman pengguna saat menggunakan aplikasi.

## Mengapa Penting?

Aplikasi dengan UI/UX yang baik akan meningkatkan kepuasan pengguna dan retensi.

## Best Practices

- Konsisten dalam desain
- Fokus pada kebutuhan pengguna
- Lakukan user testing',
        '/images/blog/ui-ux.jpg',
        'Muhammad Ade Dzakwan',
        'Design',
        ARRAY['UI/UX', 'Design', 'User Experience'],
        '2024-03-20',
        6
    );

-- Insert sample portfolio data
INSERT INTO portfolios (title, description, image, technologies, category, link, github, created_at) VALUES
    (
        'E-Commerce Website',
        'Platform e-commerce lengkap dengan fitur keranjang belanja, pembayaran, dan manajemen produk. Dibangun dengan Next.js dan Tailwind CSS untuk performa optimal.',
        '/images/portfolio/ecommerce.jpg',
        ARRAY['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
        'Web Development',
        'https://example.com/ecommerce',
        'https://github.com/example/ecommerce',
        '2024-01-15'
    ),
    (
        'Mobile Banking App',
        'Aplikasi mobile banking dengan fitur transfer, pembayaran tagihan, dan monitoring transaksi secara real-time.',
        '/images/portfolio/banking.jpg',
        ARRAY['React Native', 'Node.js', 'MongoDB', 'JWT'],
        'Mobile Development',
        'https://example.com/banking',
        NULL,
        '2024-02-20'
    ),
    (
        'Dashboard Analytics',
        'Dashboard interaktif untuk visualisasi data bisnis dengan grafik dan laporan yang komprehensif.',
        '/images/portfolio/dashboard.jpg',
        ARRAY['React', 'D3.js', 'Express.js', 'MySQL'],
        'Web Development',
        'https://example.com/dashboard',
        'https://github.com/example/dashboard',
        '2024-03-10'
    );

-- Insert sample experience data
INSERT INTO experiences (organization, role, description, image, start_date, end_date, type, skills, location) VALUES
    (
        'FSLDK Surabaya Raya',
        'Staff Media & Informasi',
        'Berkontribusi dalam pengelolaan media sosial dan penyebaran informasi kegiatan dakwah kampus di wilayah Surabaya Raya.',
        '/images/FSLDK.jpeg',
        '2023-09-01',
        NULL,
        'organization',
        ARRAY['Social Media Management', 'Content Creation', 'Public Relations'],
        'Surabaya'
    ),
    (
        'Ini Lho ITS!',
        'Staff Divisi IT',
        'Berkontribusi dalam pengembangan sistem informasi dan website untuk kegiatan open campus terbesar di ITS.',
        '/images/Ini Lho ITS!.jpeg',
        '2024-01-01',
        '2024-06-30',
        'organization',
        ARRAY['Web Development', 'React', 'Next.js', 'Team Collaboration'],
        'Surabaya'
    ),
    (
        'ISE! (Information Systems Expo)',
        'Staff Web Developer',
        'Mengembangkan website untuk acara expo tahunan departemen Sistem Informasi ITS.',
        '/images/ISE.jpeg',
        '2024-02-01',
        '2024-05-31',
        'organization',
        ARRAY['Web Development', 'UI/UX Design', 'React', 'Tailwind CSS'],
        'Surabaya'
    );

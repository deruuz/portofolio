export interface ProjectLink {
  label: string
  href: string
}

export interface Project {
  name: string
  desc: string
  stack: string[]
  links?: ProjectLink[]
}

export interface ExperienceItem {
  when: string
  role: string
  org: string
  note: string
}

export interface EducationItem {
  when: string
  title: string
  org: string
}

export interface SkillGroup {
  name: string
  items: string[]
}

export interface SectionMeta {
  number: string
  title: string      // bahasa Jepang
  label: string      // bahasa Indonesia/Inggris (kecil)
}

export interface PortfolioData {
  me: {
    fullName: string
    fullNameKana: string
    logo: string
    title: string
    vertical: string
    wa: string
    email: string
    github: string
    linkedin: string
  }
  hero: {
    // EN (default)
    taglineEn: string
    headlineEn: string
    descEn: string
    // ID
    taglineId: string
    headlineId: string
    descId: string
    // JA
    taglineJa: string
    headlineJa: string
    descJa: string
    ctaPrimary:   { label: string; href: string }
    ctaSecondary: { label: string; href: string }
  }
  sections: Record<'about' | 'projects' | 'experience' | 'education' | 'skills' | 'contact', SectionMeta>
  about: {
    story: string
    facts: { label: string; value: string }[]
  }
  projects: Project[]
  experience: ExperienceItem[]
  education: EducationItem[]
  skills: SkillGroup[]
  contact: {
    blurb: string
    links: { label: string; href: string }[]
  }
  ink: {
    brushTip: string
    stampTip: string
    modes: { read: string; brush: string; stamp: string; clear: string }
  }
}

const wa       = 'https://wa.me/6285159101012'
const email    = 'deruuz215@gmail.com'
const github   = 'https://github.com/deruuz'
const linkedin = 'https://www.linkedin.com/in/ardhianrizky/'

const DATA: PortfolioData = {
  me: {
    fullName:     'Ardhian Rizky Ayatollah Nur Ismail',
    fullNameKana: 'アルディアン・リズキ・アヤトラ・ヌル・イスマイル',
    logo:         'デルー·deruu',
    title:        'Deruu',
    vertical:     'ウェブ開発・品質保証',
    wa,
    email,
    github,
    linkedin,
  },
  hero: {
    // EN
    taglineEn:  '作って、確かめる。',
    headlineEn: 'I build clean, fast websites, already tested before delivery.',
    descEn:     'Landing pages, company profiles, and custom web systems, front to back. Informatics graduate from Telkom University, open for freelance projects.',
    // ID
    taglineId:  '作って、確かめる。',
    headlineId: 'Saya bikin web yang rapi, cepat, dan sudah dites.',
    descId:     'Saya bikin landing page, company profile, dan sistem web, dari tampilan sampai server. Lulusan Informatika Telkom University, terbuka untuk project freelance.',
    // JA
    taglineJa:  '作って、確かめる。',
    headlineJa: '丁寧で速い、テスト済みのウェブを作ります。',
    descJa:     'ランディングページ、会社紹介サイト、カスタムウェブシステムをフロントからサーバーまで制作します。テルコム大学情報学部卒。フリーランス案件募集中。',
    ctaPrimary:   { label: 'Chat WhatsApp',   href: wa },
    ctaSecondary: { label: 'Lihat project ↓', href: '#projects' },
  },
  sections: {
    about:      { number: '',   title: 'プロフィール',   label: 'Tentang' },
    projects:   { number: '一', title: '作品',          label: 'Project' },
    experience: { number: '二', title: '経歴',          label: 'Pengalaman' },
    education:  { number: '',   title: '学歴',          label: 'Pendidikan' },
    skills:     { number: '三', title: '技術',          label: 'Skill' },
    contact:    { number: '',   title: 'ご連絡ください', label: 'Ayo ngobrol' },
  },
  about: {
    story: 'Saya dari Karangampel, Indramayu. Sejak 2017 saya jualan produk digital sebagai sampingan, lalu lama-lama belajar membangun platformnya sendiri, yang sekarang jadi TokuDigital. Kuliah Informatika di Telkom University, lalu magang QA di Timedoor, tempat saya belajar kalau bug paling sering muncul di hal yang dianggap sepele. Sekarang saya lagi belajar bahasa Jepang, makanya situs ini tampilannya begini.',
    facts: [
      { label: 'Lokasi', value: 'Karangampel, Indramayu' },
      { label: 'Fokus',  value: 'Web development, QA' },
      { label: 'Bahasa', value: 'Indonesia · English B1 · Japanese JFT A2' },
    ],
  },
  projects: [
    {
      name: 'TokuDigital',
      desc: 'Platform top-up game yang saya bangun dan jalankan sendiri, dari frontend, API, integrasi payment gateway, deploy, sampai keamanan server.',
      stack: ['Next.js', 'NestJS', 'Prisma', 'Xendit', 'Cloudflare', 'Coolify'],
      links: [
        { label: 'Web', href: 'https://tokudigital.com' },
      ],
    },
    {
      name: 'Nusantara Lab',
      desc: 'Company profile PT Salman Perkasa Nusantara (furniture laboratorium) dengan desain nuansa blueprint teknis. Masih aktif dipakai klien.',
      stack: ['Nuxt', 'Tailwind'],
      links: [
        { label: 'Web', href: 'https://nusantaralab.com' },
      ],
    },
    {
      name: 'Bobakuy',
      desc: 'Landing page untuk usaha minuman boba lokal. Dari brief klien sampai online dalam waktu singkat.',
      stack: ['HTML', 'CSS', 'JavaScript'],
      links: [],
    },
    {
      name: 'SapaSemua',
      desc: 'Aplikasi translasi bahasa isyarat SIBI untuk mobile dan web. Saya desain UI-nya dan handle pengujian Black Box & White Box pakai Katalon dan Appium.',
      stack: ['Katalon', 'Appium', 'Figma'],
      links: [
        { label: 'Figma', href: 'https://www.figma.com/design/lQkIYv24DGrvSztpMkGSlh/SAPA-SEMUA?node-id=191-1663&t=26ZuVfZKFTqkd1ao-1' },
      ],
    },
  ],
  experience: [
    {
      when: 'Mar 2025 – Sep 2025',
      role: 'QA Mobile Intern',
      org: 'Timedoor Indonesia',
      note: 'Testing manual aplikasi mobile: nulis test case, nyari bug UI/UX dan fungsional, laporan pakai issue tracker. Salah satu temuan: satu nomor HP bisa daftar dua akun.',
    },
    {
      when: 'Jul 2024 – Agu 2024',
      role: 'Web Programmer Intern',
      org: 'SIABDes TAXion',
      note: 'Bikin tampilan Super Admin di frontend Vue.js dan ikut identifikasi inkonsistensi antarmuka selama development.',
    },
    {
      when: 'Jan 2017 – sekarang',
      role: 'Founder',
      org: 'Toku Digital',
      note: 'Mulai dari jualan top-up game manual, sekarang udah jadi platform sendiri dengan sistem otomatis, payment gateway, dan komunitas di media sosial.',
    },
  ],
  education: [
    { when: 'Agu 2021 – Nov 2025', title: 'S1 Informatika · GPA 3.71', org: 'Telkom University' },
  ],
  skills: [
    { name: 'Frontend',     items: ['Vue / Nuxt', 'Next.js', 'HTML', 'CSS', 'Tailwind', 'JavaScript'] },
    { name: 'QA & Testing', items: ['Manual Testing', 'Black Box', 'White Box', 'Test Case', 'Bug Report', 'Katalon', 'Appium'] },
    { name: 'IT Support',   items: ['Hardware Troubleshooting', 'Software Support', 'System Configuration', 'Network Basics', 'Docker', 'Coolify', 'Cloudflare'] },
    { name: 'UI/UX',        items: ['Figma', 'Wireframing', 'Prototyping', 'UI Design', 'UX Research'] },
  ],
  contact: {
    blurb: 'Landing page, company profile, sampai platform custom, saya kerjain dari nol sampai jalan.',
    links: [
      { label: 'WhatsApp', href: wa },
      { label: 'Email',    href: `mailto:${email}` },
      { label: 'GitHub',   href: github },
      { label: 'LinkedIn', href: linkedin },
    ],
  },
  ink: {
    brushTip: 'Coret-coret di mana saja, tintanya pelan-pelan memudar',
    stampTip: 'Klik untuk cap hanko 検 (kualitas terjamin)',
    modes: { read: '閲覧 baca', brush: '筆 coret', stamp: '印 cap', clear: '消' },
  },
}

export function usePortfolio() {
  return useState<PortfolioData>('portfolio', () => DATA)
}

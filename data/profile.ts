// All portfolio content, in English and French. Taken from Tahani Cherif's CV
// (CV-Cherif-Tahani, version 5). Change the words here; the page reads them.

export type Lang = "en" | "fr";
export type T = Record<Lang, string>;
export type TList = Record<Lang, string[]>;

export type Category = "web" | "devops" | "mobile-ai";

export type Project = {
  id: string;
  name: string;
  /** "work" = real project for a client or employer, "academic" = school project */
  kind: "work" | "academic";
  category: Category;
  url?: string;
  /** Where the project was done (shown on the card) */
  context: T;
  period?: string;
  featured?: boolean;
  summary: T;
  points: TList;
  stack: string[];
};

export type Job = {
  id: string;
  kind: "work" | "internship";
  company: string;
  role: T;
  period: T;
  location: T;
  context?: T;
  /** Projects of this job, by id (see `projects` below) */
  projectIds: string[];
};

// ------------------------------------------------------------------ profile
export const profile = {
  name: "Tahani Cherif",
  initials: "TC",
  email: "cheriftahani92@gmail.com",
  github: "https://github.com/tahani-cherif",
  linkedin: "https://www.linkedin.com/in/tahani-cherif-50815a214/",
  photo: "/photo.jpeg",
  // CV files in /public. Replace them with your latest compiled CVs.
  cv: { en: "/cv-en.pdf", fr: "/cv-fr.pdf" } as T,
  location: { en: "Raoued, Tunis, Tunisia", fr: "Raoued, Tunis, Tunisie" } as T,
  yearsOfExperience: 4,
  roles: {
    en: ["Full-Stack JavaScript Engineer", "Next.js & NestJS Developer", "Cloud & DevOps Engineer"],
    fr: ["Ingénieure Full-Stack JavaScript", "Développeuse Next.js & NestJS", "Ingénieure Cloud & DevOps"],
  } as TList,
  tagline: {
    en: "I build fast, reliable web applications with Next.js, React and Node.js, and ship them to production with Docker, Nginx and CI/CD.",
    fr: "Je crée des applications web rapides et fiables avec Next.js, React et Node.js, et je les mets en production avec Docker, Nginx et CI/CD.",
  } as T,
  about: {
    en: [
      "Computer engineer (ESPRIT, 2026, Cloud Computing major) and full-stack JavaScript developer with 4+ years of experience, at WAZOLAB and then Steps.",
      "I build web applications end to end: turning Figma designs into Next.js and React interfaces in TypeScript, designing REST and GraphQL APIs with Node.js, Express and NestJS, modelling SQL and NoSQL databases, then shipping to production with Docker, Nginx and CI/CD.",
      "I have delivered multilingual banking portals for Afreximbank, a client of Steps, and several SaaS platforms in production. My cloud training adds a DevOps side: Kubernetes on Azure, Jenkins, GitHub Actions, OpenStack, Prometheus and Grafana.",
    ],
    fr: [
      "Ingénieure en informatique (ESPRIT, 2026, spécialité Cloud Computing) et développeuse full-stack JavaScript avec plus de 4 ans d'expérience, chez WAZOLAB puis Steps.",
      "Je prends en charge des applications web de A à Z : interfaces Next.js et React en TypeScript à partir de maquettes Figma, API REST et GraphQL avec Node.js, Express et NestJS, bases SQL et NoSQL, puis mise en production avec Docker, Nginx et CI/CD.",
      "J'ai livré des portails bancaires multilingues pour Afreximbank, client de Steps, et plusieurs plateformes SaaS en production. Ma formation cloud ajoute une dimension DevOps : Kubernetes sur Azure, Jenkins, GitHub Actions, OpenStack, Prometheus et Grafana.",
    ],
  } as TList,
  spokenLanguages: {
    en: ["Arabic (native)", "French (fluent)", "English (professional)"],
    fr: ["Arabe (langue maternelle)", "Français (courant)", "Anglais (professionnel)"],
  } as TList,
};

// ------------------------------------------------------------------- skills
export const skills: { title: T; items: string[] }[] = [
  { title: { en: "Languages", fr: "Langages" }, items: ["JavaScript", "TypeScript", "Python", "Java", "PHP", "SQL"] },
  {
    title: { en: "Front-end", fr: "Front-end" },
    items: ["React", "Next.js", "Redux Toolkit", "React Query", "React Hook Form", "Zod", "next-intl", "Axios", "Tailwind CSS", "shadcn/ui", "Material UI", "Figma"],
  },
  { title: { en: "Back-end", fr: "Back-end" }, items: ["Node.js", "Express", "NestJS", "REST APIs", "GraphQL", "Socket.IO", "Stripe", "Handlebars"] },
  { title: { en: "CMS & BaaS", fr: "CMS et BaaS" }, items: ["WordPress", "Strapi", "Prismic", "Supabase", "Firebase"] },
  { title: { en: "Databases", fr: "Bases de données" }, items: ["PostgreSQL", "MySQL", "MariaDB", "MongoDB", "TypeORM"] },
  { title: { en: "Security", fr: "Sécurité" }, items: ["Auth0", "OAuth 2.0", "PAR", "Role-based access", "Maker-checker"] },
  {
    title: { en: "DevOps & Cloud", fr: "DevOps et cloud" },
    items: ["Docker", "Docker Compose", "GitHub Actions", "Jenkins", "Ansible", "Nginx", "Apache", "PM2", "Let's Encrypt", "Linux", "Kubernetes", "Azure", "OpenStack", "Prometheus", "Grafana", "Trivy"],
  },
  {
    title: { en: "AI & Mobile", fr: "IA et mobile" },
    items: ["Deep learning", "NLP", "LLMs", "Whisper", "Qwen2.5", "Kotlin", "Jetpack Compose", "Flutter"],
  },
  { title: { en: "Tools & methods", fr: "Outils et méthodes" }, items: ["Git", "GitHub", "GitLab", "Jira", "Agile Scrum"] },
];

// ----------------------------------------------------------------- projects
const steps: T = { en: "Steps · for Afreximbank", fr: "Steps · pour Afreximbank" };

export const projects: Project[] = [
  {
    id: "customer-portal",
    name: "Customer Portal",
    kind: "work",
    category: "web",
    featured: true,
    url: "https://portal.afreximbank.com",
    context: steps,
    summary: {
      en: "Afreximbank's online banking portal, in English and French.",
      fr: "Portail bancaire en ligne pour les clients d'Afreximbank, en anglais et en français.",
    },
    points: {
      en: [
        "Developed the portal's back office and, on the client side, the main banking modules: payments and bulk payments, transfers, beneficiaries, trade finance, credit facilities, cases, members and sub-clients, account opening and KYC.",
        "Protected sensitive actions, such as payments, with Auth0 and PAR (Pushed Authorization Requests), wired through to the GraphQL API.",
        "Enforced access rules in the interface: role and permission guards, maker-checker approval, and a rule that stops users from approving their own requests.",
        "Built the shared layer used across the portal: an Axios client for REST and GraphQL calls, React Query caching, forms with React Hook Form and Zod, TanStack Table with server-side pagination, and PDF documents with Handlebars.",
      ],
      fr: [
        "Développé le back-office du portail et, côté client, les modules bancaires principaux : paiements et paiements en masse, virements, bénéficiaires, financement du commerce, facilités de crédit, dossiers, membres et sous-clients, ouverture de compte et KYC.",
        "Protégé les actions sensibles, comme les paiements, avec Auth0 et PAR (Pushed Authorization Requests), de l'interface jusqu'à l'API GraphQL.",
        "Appliqué les règles d'accès dans l'interface : vérifications des rôles et des permissions, validation maker-checker, et une règle qui empêche un utilisateur de valider ses propres demandes.",
        "Construit le socle commun du portail : client Axios pour REST et GraphQL, cache React Query, formulaires React Hook Form avec Zod, TanStack Table paginée côté serveur et génération de PDF avec Handlebars.",
      ],
    },
    stack: ["Next.js 16", "React 19", "TypeScript", "React Query", "GraphQL", "Axios", "Auth0", "Zod", "Handlebars", "Docker", "Tailwind CSS", "shadcn/ui"],
  },
  {
    id: "asme-portal",
    name: "ASME Portal",
    kind: "work",
    category: "web",
    context: steps,
    summary: {
      en: "Afreximbank's banking and financial services portal for African SMEs.",
      fr: "Portail de services bancaires et financiers d'Afreximbank pour les PME africaines.",
    },
    points: {
      en: [
        "Developed the signed-in area in Next.js: translations with next-intl, data with React Query and a shadcn/ui interface.",
        "Integrated the portal's public site on a headless CMS.",
      ],
      fr: [
        "Développé l'espace connecté en Next.js : traductions avec next-intl, données avec React Query et interface shadcn/ui.",
        "Intégré la partie publique du portail sur un CMS headless.",
      ],
    },
    stack: ["Next.js 16", "React 19", "next-intl", "React Query", "Zod", "Tailwind CSS", "Axios", "Docker", "shadcn/ui"],
  },
  {
    id: "afreximbank-website",
    name: "Afreximbank website",
    kind: "work",
    category: "web",
    context: steps,
    summary: {
      en: "Afreximbank's multilingual showcase website.",
      fr: "Site vitrine multilingue d'Afreximbank.",
    },
    points: {
      en: [
        "Developed the site in Next.js on headless WordPress, with Tailwind CSS and shadcn/ui.",
        "Built the forms (React Hook Form, Zod, EmailJS) and integrated a PDF viewer.",
      ],
      fr: [
        "Développé le site en Next.js sur WordPress headless, avec Tailwind CSS et shadcn/ui.",
        "Construit les formulaires (React Hook Form, Zod, EmailJS) et intégré une visionneuse PDF.",
      ],
    },
    stack: ["Next.js 16", "React 19", "next-intl", "shadcn/ui", "Zod", "Tailwind CSS", "pdfjs-dist", "React Hook Form", "EmailJS", "SociableKIT", "WordPress", "Docker"],
  },
  {
    id: "afracad",
    name: "Afracad",
    kind: "work",
    category: "web",
    url: "https://afracad.com",
    context: steps,
    summary: {
      en: "Learning platform of the Afreximbank Academy, which trains people in African trade.",
      fr: "Plateforme de l'Afreximbank Academy, académie de formation au commerce africain.",
    },
    points: {
      en: [
        "Developed the front end in React and TypeScript on headless WordPress.",
        "Set up internationalisation (i18n) and data validation with Zod.",
      ],
      fr: [
        "Développé le front-end en React et TypeScript sur WordPress headless.",
        "Mis en place l'internationalisation (i18n) et la validation des données avec Zod.",
      ],
    },
    stack: ["React", "TypeScript", "Tailwind CSS", "Material UI", "React Hook Form", "Zod", "i18n", "Express", "MongoDB", "WordPress", "Docker"],
  },
  {
    id: "astrallys",
    name: "Astrallys",
    kind: "work",
    category: "web",
    url: "https://live.astrallys.eu",
    context: { en: "Steps", fr: "Steps" },
    summary: {
      en: "Secure platform for reporting and tracking issues in buildings.",
      fr: "Plateforme sécurisée de déclaration et de suivi des réclamations dans les bâtiments.",
    },
    points: {
      en: [
        "Developed the Next.js front end and the NestJS API on a MariaDB database, with Strapi for content management.",
        "Deployed the application on two VPS servers (staging and production) with Nginx, PM2 and Let's Encrypt certificates.",
      ],
      fr: [
        "Développé le front Next.js et l'API NestJS sur une base MariaDB, avec Strapi pour la gestion des contenus.",
        "Déployé l'application sur deux VPS (préprod et prod) avec Nginx, PM2 et des certificats Let's Encrypt.",
      ],
    },
    stack: ["Next.js", "NestJS", "React Query", "Zod", "Tailwind CSS", "Axios", "Docker", "MariaDB", "Strapi", "Nginx", "PM2", "Let's Encrypt"],
  },
  {
    id: "staroil",
    name: "Staroil",
    kind: "work",
    category: "devops",
    url: "https://staroil.com.tn",
    context: { en: "Steps", fr: "Steps" },
    summary: {
      en: "Trilingual corporate website of Tunisia's leading private fuel distributor.",
      fr: "Site vitrine trilingue du premier distributeur pétrolier privé tunisien.",
    },
    points: {
      en: [
        "Deployed the existing WordPress site on a Linux VPS: Apache web server, PHP and a MySQL database.",
        "Set up HTTPS with Let's Encrypt certificates.",
      ],
      fr: [
        "Déployé le site WordPress existant sur un VPS Linux : serveur Apache, PHP et base MySQL.",
        "Mis en place le HTTPS avec des certificats Let's Encrypt.",
      ],
    },
    stack: ["WordPress", "Apache", "PHP", "MySQL", "Linux", "VPS", "Let's Encrypt"],
  },
  {
    id: "avec",
    name: "AVEC.FR",
    kind: "work",
    category: "web",
    context: { en: "WAZOLAB", fr: "WAZOLAB" },
    summary: {
      en: "E-health platform of Groupe AVEC.",
      fr: "Plateforme de e-santé du Groupe AVEC.",
    },
    points: {
      en: [
        "Turned Figma designs into responsive Next.js and React interfaces that work across browsers and devices.",
        "Consumed REST and GraphQL APIs and integrated headless CMSs (Prismic, WordPress).",
      ],
      fr: [
        "Intégré les maquettes Figma en interfaces Next.js et React responsives, multi-navigateurs et multi-appareils.",
        "Consommé des API REST et GraphQL et intégré des CMS headless (Prismic, WordPress).",
      ],
    },
    stack: ["Next.js", "React", "Redux", "GraphQL", "Prismic", "WordPress", "Material UI", "React Hook Form", "Docker"],
  },
  {
    id: "grolize",
    name: "Grolize",
    kind: "work",
    category: "web",
    context: { en: "WAZOLAB", fr: "WAZOLAB" },
    summary: {
      en: "Full-stack web application built in an Agile team.",
      fr: "Application web full-stack développée en équipe Agile.",
    },
    points: {
      en: [
        "Developed the Express back end: business logic, MySQL data handling and server-side operations.",
        "Set up Docker and Nginx; took part in testing and debugging.",
      ],
      fr: [
        "Développé le back-end Express : logique métier, gestion des données MySQL et opérations côté serveur.",
        "Mis en place Docker et Nginx ; participé aux tests et au débogage.",
      ],
    },
    stack: ["React", "Express", "MySQL", "Docker", "Nginx", "GitLab", "Jira"],
  },
  {
    id: "airhna",
    name: "Airhna",
    kind: "work",
    category: "web",
    url: "https://airhna.com",
    context: { en: "Freelance", fr: "Freelance" },
    summary: {
      en: "SaaS for short-term rental concierge companies.",
      fr: "SaaS pour conciergeries de locations courte durée.",
    },
    points: {
      en: [
        "Developed property, owner and service-provider job management, with a dedicated space per profile.",
        "Deployed on a VPS with Docker, Nginx, Let's Encrypt and a GitHub Actions CI/CD pipeline.",
      ],
      fr: [
        "Développé la gestion des logements, des propriétaires et des missions des prestataires, avec un espace par profil.",
        "Déployé sur un VPS avec Docker, Nginx, Let's Encrypt et un pipeline CI/CD GitHub Actions.",
      ],
    },
    stack: ["Next.js", "Express", "React Query", "Supabase", "shadcn/ui", "react-intl", "Docker", "Nginx", "GitHub Actions"],
  },
  {
    id: "nexa",
    name: "Nexa",
    kind: "work",
    category: "devops",
    context: { en: "Freelance", fr: "Freelance" },
    summary: {
      en: "Application for a call centre (full-stack and DevOps role).",
      fr: "Application d'un centre d'appels (rôle full-stack et DevOps).",
    },
    points: {
      en: ["Containerised the app with Docker Compose and deployed it on the client's server, with a GitHub Actions CI/CD pipeline automating build, tests and redeployment."],
      fr: ["Conteneurisé l'application avec Docker Compose et déployée sur le serveur du client, avec un pipeline CI/CD GitHub Actions qui automatise build, tests et redéploiement."],
    },
    stack: ["Docker", "Docker Compose", "GitHub Actions", "Linux"],
  },
  {
    id: "courseraan",
    name: "CourseraAn",
    kind: "work",
    category: "web",
    period: "04/2023 – 05/2023",
    context: { en: "Freelance", fr: "Freelance" },
    summary: { en: "E-learning platform.", fr: "Plateforme e-learning." },
    points: {
      en: ["Online course access and user management through a dashboard, secure payment with Stripe and real-time features with Socket.IO."],
      fr: ["Accès aux cours et gestion des utilisateurs via un tableau de bord, paiement sécurisé avec Stripe et temps réel avec Socket.IO."],
    },
    stack: ["React", "Redux", "Material UI", "Express", "MongoDB", "Stripe", "Socket.IO"],
  },
  {
    id: "amir-mobile",
    name: "Amir Mobile",
    kind: "work",
    category: "web",
    period: "04/2023 – 05/2023",
    context: { en: "Freelance", fr: "Freelance" },
    summary: { en: "Flutter e-learning mobile app for young people.", fr: "Application mobile Flutter d'e-learning pour les jeunes." },
    points: {
      en: ["Built the back-end API, designed to scale."],
      fr: ["Développé l'API back-end, pensée pour évoluer."],
    },
    stack: ["Node.js", "Express", "MongoDB", "Docker"],
  },
  {
    id: "dzagence",
    name: "Dzagence",
    kind: "work",
    category: "web",
    period: "01/2023 – 03/2023",
    context: { en: "Freelance", fr: "Freelance" },
    summary: { en: "Travel booking platform.", fr: "Plateforme de réservation touristique." },
    points: {
      en: ["Transport, accommodation and leisure booking, integrating third-party APIs."],
      fr: ["Réservation de transport, d'hébergement et de loisirs, avec intégration d'API tierces."],
    },
    stack: ["React", "Redux Toolkit", "Express", "MySQL", "Docker", "Nodemailer"],
  },
  {
    id: "v-eyes",
    name: "V-Eyes",
    kind: "work",
    category: "mobile-ai",
    period: "2026",
    context: { en: "Final-year project · Esprit Tech", fr: "Projet de fin d'études · Esprit Tech" },
    summary: {
      en: "Fully offline voice assistant for visually impaired people, with a companion app for their relatives.",
      fr: "Assistant vocal 100 % hors ligne pour personnes malvoyantes, avec une application compagnon pour les proches.",
    },
    points: {
      en: [
        "V-Eyes App (Android): fully offline voice assistant in French, English and Arabic; wake word, Whisper, two-level understanding (rules + Qwen2.5 LLM), 70+ commands, camera vision and location-based SOS.",
        "V-Eyes Family (Flutter): app for the caregiver, with code-based pairing, real-time alerts, location and history.",
        "Built with Scrum over 5 sprints.",
      ],
      fr: [
        "V-Eyes App (Android) : assistant vocal 100 % hors ligne en français, anglais et arabe ; mot-clé d'activation, Whisper, compréhension en deux niveaux (règles + LLM Qwen2.5), plus de 70 commandes, vision caméra et SOS géolocalisé.",
        "V-Eyes Family (Flutter) : application pour l'aidant, avec appairage par code, alertes temps réel, localisation et historique.",
        "Développé en Scrum sur 5 sprints.",
      ],
    },
    stack: ["Kotlin", "Jetpack Compose", "Flutter", "MediaPipe", "Firebase", "Whisper", "Qwen2.5"],
  },
  {
    id: "my-v-eyes",
    name: "My V-Eyes",
    kind: "work",
    category: "mobile-ai",
    period: "02/2022 – 05/2022",
    context: { en: "Internship · StartDevelopment", fr: "Stage · StartDevelopment" },
    summary: { en: "Android app for visually impaired people.", fr: "Application Android pour personnes malvoyantes." },
    points: {
      en: ["Designed the user interfaces, managed data with Firebase and integrated Google Assistant."],
      fr: ["Conception des interfaces utilisateur, gestion des données avec Firebase et intégration de Google Assistant."],
    },
    stack: ["Android Studio", "Java", "XML", "Firebase", "Google Assistant"],
  },
  {
    id: "kubernetes-azure",
    name: "Kubernetes on Azure",
    kind: "academic",
    category: "devops",
    context: { en: "Academic project · ESPRIT", fr: "Projet académique · ESPRIT" },
    summary: {
      en: "Deployment to AKS via CI/CD, with image scanning and monitoring.",
      fr: "Déploiement sur AKS via CI/CD, avec scan des images et monitoring.",
    },
    points: {
      en: ["Deployment to AKS via CI/CD, Trivy image scanning, Prometheus and Grafana monitoring."],
      fr: ["Déploiement sur AKS via CI/CD, scan des images avec Trivy, monitoring Prometheus et Grafana."],
    },
    stack: ["Kubernetes", "Azure", "Docker", "Trivy", "Prometheus", "Grafana"],
  },
  {
    id: "jenkins",
    name: "Jenkins CI/CD pipeline",
    kind: "academic",
    category: "devops",
    context: { en: "Academic project · ESPRIT", fr: "Projet académique · ESPRIT" },
    summary: {
      en: "Automated build, tests, Docker images and deployment, with monitoring.",
      fr: "Build, tests, images Docker et déploiement automatisés, avec monitoring.",
    },
    points: {
      en: ["Build, tests, Docker images and deployment on Linux; monitoring with Prometheus and Grafana."],
      fr: ["Build, tests, images Docker et déploiement sur Linux ; monitoring Prometheus et Grafana."],
    },
    stack: ["Jenkins", "Docker", "Linux", "Prometheus", "Grafana"],
  },
  {
    id: "openstack",
    name: "OpenStack private cloud",
    kind: "academic",
    category: "devops",
    context: { en: "Academic project · ESPRIT", fr: "Projet académique · ESPRIT" },
    summary: {
      en: "IaaS private cloud with the core OpenStack services.",
      fr: "Cloud privé IaaS avec les services principaux d'OpenStack.",
    },
    points: {
      en: ["Keystone, Nova, Neutron, Glance, Cinder, Horizon; projects, quotas, instances and floating IPs."],
      fr: ["Keystone, Nova, Neutron, Glance, Cinder, Horizon ; projets, quotas, instances et IP flottantes."],
    },
    stack: ["OpenStack", "Linux"],
  },
  {
    id: "anomaly-detection",
    name: "Video anomaly detection (UCSD)",
    kind: "academic",
    category: "mobile-ai",
    context: { en: "Academic project · ESPRIT", fr: "Projet académique · ESPRIT" },
    summary: {
      en: "Deep learning models to detect unusual events in surveillance video.",
      fr: "Modèles de deep learning pour détecter les événements anormaux dans des vidéos de surveillance.",
    },
    points: {
      en: ["Data augmentation, SMOTE-Tomek, ANN, CNN, LSTM, autoencoder, U-Net V2 and WGAN-GP V2."],
      fr: ["Augmentation de données, SMOTE-Tomek, ANN, CNN, LSTM, autoencodeur, U-Net V2 et WGAN-GP V2."],
    },
    stack: ["Deep learning", "CNN", "LSTM", "Autoencoder", "WGAN-GP"],
  },
];

// --------------------------------------------------------------- experience
export const jobs: Job[] = [
  {
    id: "steps",
    kind: "work",
    company: "Steps",
    role: { en: "Full-Stack JavaScript Engineer", fr: "Ingénieure Full-Stack JavaScript" },
    period: { en: "2023 – Present", fr: "2023 – Présent" },
    location: { en: "Tunis, Tunisia", fr: "Tunis, Tunisie" },
    context: {
      en: "Projects for Steps' clients, including Afreximbank, the African Export-Import Bank.",
      fr: "Projets pour les clients de Steps, dont Afreximbank, la Banque africaine d'import-export.",
    },
    projectIds: ["customer-portal", "asme-portal", "afreximbank-website", "afracad", "astrallys", "staroil"],
  },
  {
    id: "wazolab",
    kind: "work",
    company: "WAZOLAB",
    role: { en: "Full-Stack Developer", fr: "Développeuse Full-Stack" },
    period: { en: "06/2022 – 07/2023", fr: "06/2022 – 07/2023" },
    location: { en: "Tunis, Tunisia", fr: "Tunis, Tunisie" },
    projectIds: ["avec", "grolize"],
  },
  {
    id: "freelance",
    kind: "work",
    company: "Freelance",
    role: { en: "Full-Stack Developer", fr: "Développeuse Full-Stack" },
    period: { en: "2023 – Present", fr: "2023 – Présent" },
    location: { en: "Remote", fr: "À distance" },
    projectIds: ["airhna", "nexa", "courseraan", "amir-mobile", "dzagence"],
  },
  {
    id: "esprit-tech",
    kind: "internship",
    company: "Esprit Tech, ESPRIT",
    role: { en: "Final-Year Engineering Internship", fr: "Stage de fin d'études (PFE)" },
    period: { en: "2026 · 6 months", fr: "2026 · 6 mois" },
    location: { en: "Tunis, Tunisia", fr: "Tunis, Tunisie" },
    context: { en: "V-Eyes ecosystem, built with Scrum over 5 sprints.", fr: "Écosystème V-Eyes, développé en Scrum sur 5 sprints." },
    projectIds: ["v-eyes"],
  },
  {
    id: "startdevelopment",
    kind: "internship",
    company: "StartDevelopment",
    role: { en: "Mobile Development Intern", fr: "Stagiaire développement mobile" },
    period: { en: "02/2022 – 05/2022", fr: "02/2022 – 05/2022" },
    location: { en: "Tunis, Tunisia", fr: "Tunis, Tunisie" },
    projectIds: ["my-v-eyes"],
  },
];

// ---------------------------------------------------------------- education
export const education: { title: T; school: T; period: string; kind: "degree" | "certificate" }[] = [
  {
    kind: "degree",
    title: { en: "Engineering Degree in Computer Science — Cloud Computing", fr: "Diplôme d'ingénieure en informatique — Cloud Computing" },
    school: { en: "ESPRIT, Private Higher School of Engineering and Technology", fr: "ESPRIT, École Supérieure Privée d'Ingénierie et de Technologies" },
    period: "2022 – 2026",
  },
  {
    kind: "degree",
    title: { en: "Bachelor's Degree in Business Computing — E-Business", fr: "Licence en informatique de gestion — E-Business" },
    school: { en: "ESSECT, Higher School of Economic and Commercial Sciences of Tunis", fr: "ESSECT, École Supérieure des Sciences Économiques et Commerciales de Tunis" },
    period: "2019 – 2022",
  },
  {
    kind: "certificate",
    title: { en: "Applications of AI for Anomaly Detection", fr: "Applications of AI for Anomaly Detection" },
    school: { en: "NVIDIA Deep Learning Institute", fr: "NVIDIA Deep Learning Institute" },
    period: "02/2026",
  },
];

// --------------------------------------------------------------- interface
export const ui = {
  en: {
    nav: { about: "About", skills: "Skills", experience: "Experience", projects: "Projects", education: "Education", contact: "Contact" },
    langSwitch: "Passer en français",
    menu: "Open menu",
    closeMenu: "Close menu",
    status: "Open to Full-Stack and Cloud / DevOps roles",
    hello: "Hi there 👋 I'm",
    viewWork: "See my projects",
    downloadCv: "Download my CV",
    contactMe: "Let's talk",
    stats: { years: "years of experience", projects: "real-world projects", live: "websites live now", languages: "languages spoken" },
    aboutTitle: "About me",
    speaks: "I speak",
    skillsTitle: "Skills",
    skillsHint: "Tap a skill to see the projects where I used it.",
    usedIn: (n: number) => (n === 1 ? "Used in 1 project" : `Used in ${n} projects`),
    experienceTitle: "Experience",
    tabs: { work: "Work", internship: "Internships" },
    projectsOf: (n: number) => (n === 1 ? "1 project" : `${n} projects`),
    projectsTitle: "Projects",
    filters: { all: "All", web: "Web apps", devops: "Deployment & DevOps", "mobile-ai": "Mobile & AI" },
    filteredBy: "Projects using",
    clearFilter: "Show all",
    noProjects: "No project in this category uses that skill yet.",
    academic: "Academic",
    featured: "Featured",
    live: "Live",
    details: "Details",
    visit: "Visit the website",
    close: "Close",
    whatIDid: "What I did",
    stack: "Tech stack",
    educationTitle: "Education & certification",
    certificate: "Certificate",
    contactTitle: "Contact",
    contactText: "Have a project, a role or just a question? I'd love to hear from you.",
    copyEmail: "Copy email",
    copied: "Email copied!",
    sendEmail: "Send an email",
    backToTop: "Back to top",
    footer: "Built with Next.js and Tailwind CSS.",
  },
  fr: {
    nav: { about: "À propos", skills: "Compétences", experience: "Expérience", projects: "Projets", education: "Formation", contact: "Contact" },
    langSwitch: "Switch to English",
    menu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    status: "Disponible pour des postes Full-Stack et Cloud / DevOps",
    hello: "Bonjour 👋 je suis",
    viewWork: "Voir mes projets",
    downloadCv: "Télécharger mon CV",
    contactMe: "Discutons",
    stats: { years: "ans d'expérience", projects: "projets réels", live: "sites en ligne", languages: "langues parlées" },
    aboutTitle: "À propos",
    speaks: "Je parle",
    skillsTitle: "Compétences",
    skillsHint: "Cliquez sur une compétence pour voir les projets où je l'ai utilisée.",
    usedIn: (n: number) => (n === 1 ? "Utilisée dans 1 projet" : `Utilisée dans ${n} projets`),
    experienceTitle: "Expérience",
    tabs: { work: "Postes", internship: "Stages" },
    projectsOf: (n: number) => (n === 1 ? "1 projet" : `${n} projets`),
    projectsTitle: "Projets",
    filters: { all: "Tous", web: "Applications web", devops: "Déploiement et DevOps", "mobile-ai": "Mobile et IA" },
    filteredBy: "Projets avec",
    clearFilter: "Tout afficher",
    noProjects: "Aucun projet de cette catégorie n'utilise encore cette compétence.",
    academic: "Académique",
    featured: "À la une",
    live: "En ligne",
    details: "Détails",
    visit: "Voir le site",
    close: "Fermer",
    whatIDid: "Ce que j'ai fait",
    stack: "Technologies",
    educationTitle: "Formation et certification",
    certificate: "Certificat",
    contactTitle: "Contact",
    contactText: "Un projet, un poste ou simplement une question ? Écrivez-moi, je vous répondrai avec plaisir.",
    copyEmail: "Copier l'e-mail",
    copied: "E-mail copié !",
    sendEmail: "Envoyer un e-mail",
    backToTop: "Retour en haut",
    footer: "Réalisé avec Next.js et Tailwind CSS.",
  },
};

export type UI = (typeof ui)["en"];

/** Normalises a technology name so "Next.js 16" matches the skill "Next.js". */
export function techKey(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+\d+(\.\d+)*$/, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function projectsUsing(skill: string): Project[] {
  const key = techKey(skill);
  return projects.filter((p) => p.stack.some((s) => techKey(s) === key));
}

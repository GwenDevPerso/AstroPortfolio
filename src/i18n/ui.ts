export const languages = {
  en: 'English',
  fr: 'Français',
};

export const defaultLang = 'fr';
export const showDefaultLang = false;

export const ui = {
  fr: {
    nav: {
      about: "À propos",
      skills: "Compétences",
      services: "Prestations",
      projects: "Réalisations",
    },
    hero: {
      name: "Gwenael Bihan",
      title: "Développeur Fullstack Web & Mobile Freelance",
      location: "Localisation à définir.",
      email: "Email",
      malt: "Malt",
      linkedin: "Linkedin"
    },
    about: {
      title: "A propos.",
      content: "Développeur Full-Stack avec 5 ans d'expérience, j'aide les startups à concevoir, développer et faire évoluer leurs produits numériques.\n\nSpécialisé dans les secteurs Sport et MedTech, je prends en charge l'ensemble du cycle de développement : conception, architecture, développement, déploiement et maintenance.\n\nMVP, SaaS, plateformes web, applications mobiles, APIs, cloud.\n\nOuvert à tous les secteurs où la technologie crée de la valeur.\n\n5 ans d'expérience • Full-Stack • Startup Builder • Sport & MedTech 🚀\n\n N'hésitez pas à me contacter pour en discuter d'avantage !"
    },
    skills: {
      title: "Compétences.",
      groups: {
        languages: "Langages",
        frameworks: "Frameworks",
        databases: "Bases de données",
        devops: "DevOps",
      },
    },
    services: {
      title: "Prestations.",
      frontend: {
        title: "Front-end",
        content: "- Conception d'interfaces utilisateur (UI)\n- Développement de composants réutilisables\n- Intégration de données\n- Interaction utilisateur\n- Optimisation des performances\n- Tests\n- Responsive design\n- Support multi-navigateurs\n- Maintenance et mises à jour\n- Collaboration\n- Documentation"
      },
      backend: {
        title: "Back-end",
        content: "- Conception de l'architecture backend\n- Développement des API et des services web\n- Intégration avec les bases de données\n- Implémentation de la logique métier\n- Sécurité et gestion des autorisations\n- Gestion des sessions et de l'authentification\n- Support et maintenance backend\n- Mise en place des serveurs et déploiement"
      },
      mobile: {
        title: "Mobile",
        content: "- Conception d'interfaces utilisateur (UI) mobiles\n- Développement d'écrans et de fonctionnalités mobiles\n- Intégration de services et d'API\n- Interaction utilisateur mobile\n- Optimisation des performances mobiles\n- Support multi-plateformes (iOS, Android, etc.)"
      }
    },
    projects: {
      title: "Réalisations.",
      label: "Poste",
      company: "Entreprise",
      startingDate: "Date de début",
      endingDate: "Date de fin",
      location: "Lieu",
      technologies: "Technologies",
      description: "Description",
      viewProject: "Voir le projet",
      backToHome: "← Retour à l'accueil",
      notFound: "Projet non trouvé",
      notFoundDesc: "Le projet avec l'ID {id} n'existe pas."
    },
    footer: {
      copyright: "© 2025 Gwenael Bihan Portfolio"
    },
    routes: {
      services: 'prestations',
    }
  },
  en: {
    nav: {
      about: "About",
      skills: "Skills",
      services: "Services",
      projects: "Projects",
    },
    hero: {
      name: "Gwenael Bihan",
      title: "Fullstack Web & Mobile Freelance Developer",
      location: "Location to be defined.",
      email: "Email",
      malt: "Malt",
      linkedin: "Linkedin"
    },
    about: {
      title: "About.",
      content: "Full-Stack Developer with 5 years of experience, I help startups design, develop and evolve their digital products.\n\nSpecialized in the Sport and MedTech sectors, I take charge of the entire development cycle: design, architecture, development, deployment and maintenance.\n\nMVP, SaaS, web platforms, mobile apps, APIs, cloud.\n\nOpen to all sectors where technology creates value.\n\n5 years of experience • Full-Stack • Startup Builder • Sport & MedTech 🚀\n\n Don't hesitate to contact me to discuss it further!"
    },
    skills: {
      title: "Skills.",
      groups: {
        languages: "Languages",
        frameworks: "Frameworks",
        databases: "Databases",
        devops: "DevOps",
      },
    },
    services: {
      title: "Services.",
      frontend: {
        title: "Front-end",
        content: "- User Interface (UI) design\n- Reusable component development\n- Data integration\n- User interaction\n- Performance optimization\n- Testing\n- Responsive design\n- Cross-browser support\n- Maintenance and updates\n- Collaboration\n- Documentation"
      },
      backend: {
        title: "Back-end",
        content: "- Backend architecture design\n- API and web services development\n- Database integration\n- Business logic implementation\n- Security and authorization management\n- Session and authentication management\n- Backend support and maintenance\n- Server setup and deployment"
      },
      mobile: {
        title: "Mobile",
        content: "- Mobile User Interface (UI) design\n- Mobile screen and feature development\n- Service and API integration\n- Mobile user interaction\n- Mobile performance optimization\n- Multi-platform support (iOS, Android, etc.)"
      }
    },
    projects: {
      title: "Projects.",
      label: "Role",
      company: "Company",
      startingDate: "Start Date",
      endingDate: "End Date",
      location: "Location",
      technologies: "Technologies",
      description: "Description",
      viewProject: "View project",
      backToHome: "← Back to home",
      notFound: "Project not found",
      notFoundDesc: "The project with ID {id} does not exist."
    },
    footer: {
      copyright: "© 2025 Gwenael Bihan Portfolio"
    },
    routes: {
      services: 'services',
    }
  }
} as const; 
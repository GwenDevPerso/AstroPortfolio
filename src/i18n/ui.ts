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
      location: "Basé à Rennes.",
      email: "Email",
      malt: "Malt",
      linkedin: "Linkedin"
    },
    about: {
      title: "A propos.",
      content: "Bonjour ! Je suis un développeur fullstack JS passionné et freelance, spécialisé dans la création de solutions web & mobiles.\n\nFort de mes compétences en JavaScript et de ma maîtrise des frameworks tels que React, Angular et Vue.js, je suis prêt à relever tous les défis pour transformer vos idées en réalités numériques.\n\nMon univers ne se limite pas au développement web. Je suis également un grand amateur de sport, je pratique la boxe et le football, ce qui m'a permis de développer un esprit d'équipe et une capacité à persévérer face aux défis. La musique occupe également une place importante dans ma vie, avec un penchant particulier pour la guitare. Ca me permet de m'exprimer, de me détendre et de stimuler ma créativité, des compétences qui se révèlent précieuses dans mon travail de développeur.\n\nEnfin, j'aime voyager et découvrir de nouvelles cultures, car cela nourrit ma curiosité et m'inspire dans mon travail. Je suis convaincu que ces expériences me permettent de concevoir des solutions plus adaptées aux besoins de mes clients, en comprenant mieux leur contexte et leurs attentes. En somme, je suis un développeur fullstack JS freelance déterminé et polyvalent, toujours à la recherche de nouvelles aventures et prêt à vous accompagner dans la réalisation de vos projets. N'hésitez pas à me contacter pour en discuter d'avantage !"
    },
    skills: {
      title: "Compétences."
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
      location: "Based in Rennes, France.",
      email: "Email",
      malt: "Malt",
      linkedin: "Linkedin"
    },
    about: {
      title: "About.",
      content: "Hello! I'm a passionate fullstack JS freelance developer, specialized in creating web & mobile solutions.\n\nWith my JavaScript skills and mastery of frameworks like React, Angular and Vue.js, I'm ready to take on any challenge to transform your ideas into digital realities.\n\nMy world is not limited to web development. I'm also a big sports enthusiast, practicing boxing and football, which has allowed me to develop team spirit and the ability to persevere in the face of challenges. Music also occupies an important place in my life, with a particular fondness for guitar. It allows me to express myself, relax and stimulate my creativity, skills that prove valuable in my work as a developer.\n\nFinally, I love to travel and discover new cultures, as this nourishes my curiosity and inspires me in my work. I'm convinced that these experiences allow me to design solutions that are better adapted to my clients' needs, by better understanding their context and expectations. In short, I'm a determined and versatile fullstack JS freelance developer, always looking for new adventures and ready to support you in the realization of your projects. Don't hesitate to contact me to discuss it further!"
    },
    skills: {
      title: "Skills."
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
/* =========================================================
 *  Tanya Malviya – Portfolio │ script.js  (FULL FILE)
 *  Last updated: December 2024
 *  ---------------------------------------------------------
 *  Clean, modern portfolio with elegant sections
 * ======================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initThemeToggle();
  initSmoothScrolling();
  initBackToTop();
  initTypewriter();
  initLoadingScreen();
  initScrollEffects();

  // Populate all sections
  populateAboutSection();
  populateExperienceSection();
  populateProjectsSection();
  populateSkillsSection();
  populateCertificationsSection();
  populateResearchSection();
  populateContactSection();


  // Initialize AOS animations
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 1000, once: true, offset: 100 });
  }
});

/* ────────────────────────────────────────────────────────── */
/*  NAVIGATION                                                */
/* ────────────────────────────────────────────────────────── */
function initNavigation() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Mobile menu toggle
  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  });

  // Close menu when link clicked
  navLinks.forEach(link =>
    link.addEventListener('click', () => {
      hamburger?.classList.remove('active');
      navMenu?.classList.remove('active');
      document.body.classList.remove('menu-open');
    })
  );

  // Close menu when clicked outside
  document.addEventListener('click', e => {
    if (!hamburger?.contains(e.target) && !navMenu?.contains(e.target)) {
      hamburger?.classList.remove('active');
      navMenu?.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  });

  // Update active nav link on scroll
  window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  const scrollY = window.pageYOffset;

  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    const height = sec.offsetHeight;
    if (scrollY > top && scrollY <= top + height) current = sec.id;
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

/* ────────────────────────────────────────────────────────── */
/*  THEME TOGGLE                                              */
/* ────────────────────────────────────────────────────────── */
function initThemeToggle() {
  const themeIcon = document.getElementById('theme-icon');
  const body = document.body;
  const stored = localStorage.getItem('theme') || 'dark';
  
  body.dataset.theme = stored;
  updateThemeIcon(stored);

  themeIcon?.addEventListener('click', () => {
    const newTheme = body.dataset.theme === 'dark' ? 'light' : 'dark';
    body.dataset.theme = newTheme;
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    body.classList.add('theme-transition');
    setTimeout(() => body.classList.remove('theme-transition'), 300);
  });
}

function updateThemeIcon(theme) {
  const icon = document.getElementById('theme-icon');
  if (icon) icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

/* ────────────────────────────────────────────────────────── */
/*  SMOOTH SCROLLING & BACK TO TOP                           */
/* ────────────────────────────────────────────────────────── */
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor =>
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const y = target.offsetTop - 70;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    })
  );
}

function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  window.addEventListener('scroll', () =>
    btn?.classList.toggle('show', window.pageYOffset > 400)
  );
  btn?.addEventListener('click', () => 
    window.scrollTo({ top: 0, behavior: 'smooth' })
  );
}

/* ────────────────────────────────────────────────────────── */
/*  TYPEWRITER EFFECT                                         */
/* ────────────────────────────────────────────────────────── */
function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const words = ['Backend Developer', 'Data Analyst', 'Cloud Engineer', 'Python Developer'];
  let idx = 0, char = 0, isDeleting = false, delay = 100;

  const type = () => {
    const word = words[idx];
    el.textContent = isDeleting 
      ? word.substring(0, char--) 
      : word.substring(0, char++);

    if (!isDeleting && char === word.length) {
      delay = 1800; 
      isDeleting = true;
    } else if (isDeleting && char === 0) {
      isDeleting = false; 
      idx = (idx + 1) % words.length; 
      delay = 600;
    } else {
      delay = isDeleting ? 60 : 120;
    }

    setTimeout(type, delay);
  };

  setTimeout(type, 500);
}

/* ────────────────────────────────────────────────────────── */
/*  LOADING & SCROLL EFFECTS                                  */
/* ────────────────────────────────────────────────────────── */
function initLoadingScreen() {
  const scr = document.getElementById('loading-screen');
  window.addEventListener('load', () =>
    setTimeout(() => scr?.classList.add('fade-out'), 800)
  );
}

function initScrollEffects() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () =>
    navbar?.classList.toggle('scrolled', window.scrollY > 40)
  );
}

/* ────────────────────────────────────────────────────────── */
/*  ABOUT SECTION - SIMPLE & CLEAN                           */
/* ────────────────────────────────────────────────────────── */
function populateAboutSection() {
  const container = document.querySelector('.about-content');
  if (!container) return;

  container.innerHTML = `
    <div class="about-text">
      <p class="about-intro">
        I'm a <strong>software engineer</strong> passionate about building scalable solutions that matter. 
        I specialize in backend development, cloud infrastructure, and turning complex data into actionable insights. 
        When I'm not coding, you'll find me exploring new technologies or mentoring fellow developers.
      </p>
      
      <p class="about-description">
        Currently pursuing my Master's in Management Information Systems at Baylor University, 
        I bring hands-on experience with Python, SQL, AWS, and data visualization tools. 
        I'm actively seeking full-time opportunities in software engineering and data-focused roles.
      </p>

      <div class="about-skills">
        <h3>What I Do</h3>
        <ul>
          <li>🚀 <strong>Backend Development:</strong> Python, Java, REST APIs, SQL</li>
          <li>☁️ <strong>Cloud & DevOps:</strong> AWS, Docker, CI/CD pipelines</li>
          <li>📊 <strong>Data Analytics:</strong> Power BI, Tableau, data visualization</li>
          <li>🔧 <strong>Tools & Tech:</strong> Git, Jupyter, Excel, Agile methodologies</li>
        </ul>
      </div>
    </div>

    <div class="about-sidebar">
      <div class="education-card">
        <div class="education-header">
          <i class="fas fa-graduation-cap"></i>
          <h3>Education</h3>
        </div>
        <div class="education-item">
          <h4>Master's in MIS</h4>
          <p class="institution">Baylor University</p>
          <p class="period">2024-2025 • GPA: 3.88</p>
        </div>
        <div class="education-item">
          <h4>B.S. Computer Science</h4>
          <p class="institution">Symbiosis University</p>
          <p class="period">2019-2023 • GPA: 3.42</p>
        </div>
      </div>
      
      <div class="quick-stats">
        <div class="stat-box">
          <h4>2+</h4>
          <p>Years Experience</p>
        </div>
        <div class="stat-box">
          <h4>8+</h4>
          <p>Certifications</p>
        </div>
        <div class="stat-box">
          <h4>1</h4>
          <p>Research Paper</p>
        </div>
      </div>
    </div>
  `;
}



/* ────────────────────────────────────────────────────────── */
/*  EXPERIENCE TIMELINE                                       */
/* ────────────────────────────────────────────────────────── */
function populateExperienceSection() {
  const timeline = document.querySelector('.timeline');
  if (!timeline) return;

  const experiences = [
    {
      title: 'IT Operations & Media Lab Coordinator',
      company: 'Baylor University',
      location: 'Waco, TX',
      period: 'Sept 2024 – Present',
      description: 'Built dynamic scheduling tools and provided technical support to 200+ users while optimizing AV workflows.',
      tools: ['Excel', 'OBS', 'Adobe CC', 'SharePoint']
    },
    {
      title: 'Data Research Assistant',
      company: 'Baylor University',
      location: 'Waco, TX',
      period: 'May 2025 – Present',
      description: 'Developed Python automation pipelines for blockchain decentralization analysis using GitHub data.',
      tools: ['Python', 'GitHub API', 'Jupyter', 'Pandas', 'Matplotlib']
    },
    {
      title: 'Product & Data Analyst',
      company: 'SeaWind Solutions',
      location: 'Ahmedabad, India',
      period: 'June 2023 – July 2024',
      description: 'Created real-time KPI dashboards and reduced process rework by 20% through SQL optimization.',
      tools: ['Power BI', 'SQL Server', 'Tableau']
    },
    {
      title: 'Business Systems Intern',
      company: 'Tata Consultancy Services',
      location: 'Indore, India',
      period: 'Jan 2021 – July 2021',
      description: 'Automated reporting workflows and supported Agile development cycles.',
      tools: ['Python', 'MS Visio', 'Jira']
    }
  ];

  timeline.innerHTML = experiences
    .map(exp => `
      <div class="timeline-item" data-aos="fade-up">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <div class="timeline-header">
            <h3>${exp.title}</h3>
            <span class="timeline-period">${exp.period}</span>
          </div>
          <div class="timeline-company">
            <i class="fas fa-building"></i> ${exp.company} • ${exp.location}
          </div>
          <p class="timeline-description">${exp.description}</p>
          <div class="timeline-tools">
            ${exp.tools.map(tool => `<span class="tool-tag">${tool}</span>`).join('')}
          </div>
        </div>
      </div>
    `)
    .join('');
}

/* ────────────────────────────────────────────────────────── */
/*  PROJECTS SHOWCASE                                         */
/* ────────────────────────────────────────────────────────── */
function populateProjectsSection() {
  const grid = document.querySelector('.projects-grid');
  if (!grid) return;

  const projects = [
    {
      title: 'GitHub Blockchain Analysis',
      image: 'images/project1.jpg',
      description: 'Analyzed decentralization trends in Bitcoin & Ethereum using GitHub API and Python data visualization.',
      tools: ['Python', 'GitHub API', 'Pandas', 'Matplotlib'],
      github: 'https://github.com/tanyamalviya01',
      demo: ''
    },
    {
      title: 'AWS ML Deployment',
      image: 'images/project2.jpg',
      description: 'Deployed sentiment analysis microservice on AWS with automated CI/CD pipeline and monitoring.',
      tools: ['AWS EC2', 'S3', 'CloudWatch', 'Docker'],
      github: '',
      demo: ''
    },
    {
      title: 'Restaurant Flow Simulation',
      image: 'images/project3.jpg',
      description: 'Object-oriented Python simulation modeling restaurant operations and inventory management.',
      tools: ['Python', 'OOP', 'Data Structures'],
      github: '',
      demo: ''
    }
  ];

  grid.innerHTML = projects
    .map(project => `
      <div class="project-card" data-aos="zoom-in">
        <div class="project-image">
          <img src="${project.image}" alt="${project.title}" 
               onerror="this.src='https://via.placeholder.com/400x200/6366f1/ffffff?text=${encodeURIComponent(project.title)}'">
          <div class="project-overlay">
            <div class="project-links">
              ${project.demo ? `<a href="${project.demo}" class="project-link" target="_blank"><i class="fas fa-external-link-alt"></i></a>` : ''}
              ${project.github ? `<a href="${project.github}" class="project-link" target="_blank"><i class="fab fa-github"></i></a>` : ''}
            </div>
          </div>
        </div>
        <div class="project-content">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="project-tools">
            ${project.tools.map(tool => `<span class="tool-tag">${tool}</span>`).join('')}
          </div>
        </div>
      </div>
    `)
    .join('');
}

/* ────────────────────────────────────────────────────────── */
/*  SKILLS GRID                                               */
/* ────────────────────────────────────────────────────────── */
function populateSkillsSection() {
  const container = document.querySelector('.skills-content');
  if (!container) return;

  const skillCategories = [
    {
      name: 'Programming Languages',
      icon: 'fas fa-code',
      skills: ['Python', 'SQL', 'Java', 'C++', 'JavaScript', 'HTML/CSS']
    },
    {
      name: 'Cloud & DevOps',
      icon: 'fas fa-cloud',
      skills: ['AWS', 'Docker', 'CI/CD', 'EC2', 'S3', 'CloudWatch']
    },
    {
      name: 'Data & Analytics',
      icon: 'fas fa-chart-line',
      skills: ['Power BI', 'Tableau', 'Pandas', 'NumPy', 'Matplotlib']
    },
    {
      name: 'Databases & Tools',
      icon: 'fas fa-database',
      skills: ['MySQL', 'MongoDB', 'Git', 'Jupyter', 'Excel', 'Jira']
    }
  ];

  container.innerHTML = skillCategories
    .map(category => `
      <div class="skill-category" data-aos="fade-up">
        <div class="skill-header">
          <div class="skill-icon"><i class="${category.icon}"></i></div>
          <h3>${category.name}</h3>
        </div>
        <div class="skill-items">
          ${category.skills.map(skill => `<span class="skill-item">${skill}</span>`).join('')}
        </div>
      </div>
    `)
    .join('');
}

/* ────────────────────────────────────────────────────────── */
/*  CONTACT SECTION                                           */
/* ────────────────────────────────────────────────────────── */
function populateContactSection() {
  const container = document.querySelector('.contact-content');
  if (!container) return;

  container.innerHTML = `
    <p class="contact-intro" data-aos="fade-up">
      Ready to build something amazing together? Whether you have an exciting project idea 
      or just want to connect, I'd love to hear from you.
    </p>

    <div class="contact-cards">
      <div class="contact-card" data-aos="fade-up" data-aos-delay="100">
        <div class="contact-icon"><i class="fas fa-envelope"></i></div>
        <h3>Email</h3>
        <p><a href="mailto:Tanyamalviya13@gmail.com">Tanyamalviya13@gmail.com</a></p>
      </div>
      
      <div class="contact-card" data-aos="fade-up" data-aos-delay="200">
        <div class="contact-icon"><i class="fas fa-phone"></i></div>
        <h3>Phone</h3>
        <p><a href="tel:+19403346856">(940) 334-6856</a></p>
      </div>
      
      <div class="contact-card" data-aos="fade-up" data-aos-delay="300">
        <div class="contact-icon"><i class="fab fa-linkedin-in"></i></div>
        <h3>LinkedIn</h3>
        <p><a href="https://www.linkedin.com/in/tanya-malviya01/" target="_blank">Connect with me</a></p>
      </div>
      
      <div class="contact-card" data-aos="fade-up" data-aos-delay="400">
        <div class="contact-icon"><i class="fab fa-github"></i></div>
        <h3>GitHub</h3>
        <p><a href="https://github.com/tanyamalviya01" target="_blank">View my code</a></p>
      </div>
    </div>

    <div class="contact-cta" data-aos="zoom-in">
      <h3>Let's Work Together</h3>
      <p>I'm actively seeking full-time backend development and data engineering opportunities. 
      Let's discuss how I can contribute to your team's success.</p>
      <div class="contact-buttons">
        <a href="RESUME TECH.pdf" class="btn btn-primary" target="_blank">
          <i class="fas fa-download"></i> Resume
        </a>
        <a href="mailto:Tanyamalviya13@gmail.com" class="btn btn-secondary">
          <i class="fas fa-envelope"></i> Send Message
        </a>
      </div>
    </div>
  `;
}

/* ────────────────────────────────────────────────────────── */
/*  CERTIFICATIONS SECTION                                    */
/* ────────────────────────────────────────────────────────── */
function populateCertificationsSection() {
  const container = document.querySelector('.certifications-content');
  if (!container) return;

  const certifications = [
    {
      name: 'AWS Certified AI Practitioner',
      issuer: 'Amazon Web Services',
      date: 'June 2025',
      credential: '9160a8edea2347e0ae5b5b1dc15c89d1',
      logo: 'fab fa-aws',
      category: 'Cloud Computing'
    },
    {
      name: 'AWS Cloud Technical Essentials',
      issuer: 'Amazon Web Services',
      date: 'July 2025',
      credential: 'ETZ5764NBEBY',
      logo: 'fab fa-aws',
      category: 'Cloud Computing'
    },
    {
      name: 'Google Foundations of Data Science',
      issuer: 'Google',
      date: 'April 2023',
      credential: 'NHHVHL9ZLOJA',
      logo: 'fab fa-google',
      category: 'Data Science'
    },
    {
      name: 'Machine Learning Foundations',
      issuer: 'University of Washington',
      date: 'April 2023',
      credential: '43TKGAZBAAZT',
      logo: 'fas fa-university',
      category: 'Machine Learning'
    },
    {
      name: 'Introduction to Python',
      issuer: 'Coursera Project Network',
      date: 'April 2023',
      credential: '7GF4ZWLGHWVH',
      logo: 'fab fa-python',
      category: 'Programming'
    },
    {
      name: 'Big Data Modeling & Management',
      issuer: 'UC San Diego',
      date: 'May 2023',
      credential: '527PM25CO2J2',
      logo: 'fas fa-database',
      category: 'Data Science'
    }
  ];

  // Group certifications by category
  const groupedCerts = certifications.reduce((groups, cert) => {
    if (!groups[cert.category]) groups[cert.category] = [];
    groups[cert.category].push(cert);
    return groups;
  }, {});

  container.innerHTML = `
    <div class="certifications-intro" data-aos="fade-up">
      <p>Professional certifications that validate my expertise in cloud computing, data science, and software development.</p>
    </div>
    
    <div class="cert-categories">
      ${Object.entries(groupedCerts).map(([category, certs]) => `
        <div class="cert-category" data-aos="fade-up">
          <h3 class="category-title">${category}</h3>
          <div class="cert-grid">
            ${certs.map(cert => `
              <div class="cert-card">
                <div class="cert-logo">
                  <i class="${cert.logo}"></i>
                </div>
                <div class="cert-details">
                  <h4>${cert.name}</h4>
                  <p class="cert-issuer">${cert.issuer}</p>
                  <p class="cert-date">${cert.date}</p>
                  <span class="cert-credential">ID: ${cert.credential}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

/* ────────────────────────────────────────────────────────── */
/*  RESEARCH/PUBLICATIONS SECTION                             */
/* ────────────────────────────────────────────────────────── */
function populateResearchSection() {
  const container = document.querySelector('.research-content');
  if (!container) return;

  container.innerHTML = `
    <div class="research-intro" data-aos="fade-up">
      <p>Published research contributing to the field of cloud computing security and cryptography.</p>
    </div>

    <div class="research-paper" data-aos="zoom-in">
      <div class="paper-header">
        <div class="paper-badge">
          <i class="fas fa-file-alt"></i>
          <span>Published Research</span>
        </div>
        <h3>Enhancing Cloud Computing Security Using AES Algorithm</h3>
      </div>
      
      <div class="paper-details">
        <div class="authors">
          <strong>Authors:</strong> <span class="highlight-author">Tanya Malviya</span>, Nilesh Chauhan, Shivani Narwariya, Ms. Shruti Jain, Vivek Singh Tomar
        </div>
        
        <div class="publication-info">
          <span class="journal-name">Journal of The Maharaja Sayajirao University of Baroda</span>
          <span class="pub-year">2023</span>
        </div>
        
        <div class="paper-meta">
          <span>Volume-57, No.1 (I)</span> • 
          <span>ISSN: 0025-0422</span> • 
          <span>Pages 214-223</span>
        </div>
      </div>

      <div class="abstract-section">
        <h4>Abstract</h4>
        <p>This paper proposes a secure data protection model where information is encrypted using Advanced Encryption Standard (AES) before being sent to the cloud, ensuring data privacy and security in cloud computing environments.</p>
      </div>

      <div class="keywords-section">
        <h4>Keywords</h4>
        <div class="keyword-tags">
          <span class="keyword-tag">Cloud Computing</span>
          <span class="keyword-tag">Cloud Security</span>
          <span class="keyword-tag">Cryptography</span>
          <span class="keyword-tag">AES Algorithm</span>
        </div>
      </div>

      <div class="citation-section">
        <h4>Citation</h4>
        <div class="citation-text">
          <code>Malviya, T., Chauhan, N., Narwariya, S., Jain, S., & Tomar, V. S. (2023). Enhancing Cloud Computing Security Using AES Algorithm. Journal of The Maharaja Sayajirao University of Baroda, 57(1), 214-223.</code>
          <button class="copy-citation" onclick="navigator.clipboard.writeText('Malviya, T., Chauhan, N., Narwariya, S., Jain, S., & Tomar, V. S. (2023). Enhancing Cloud Computing Security Using AES Algorithm. Journal of The Maharaja Sayajirao University of Baroda, 57(1), 214-223.')">
            <i class="fas fa-copy"></i> Copy Citation
          </button>
        </div>
      </div>
    </div>
  `;
}

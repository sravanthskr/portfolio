"use strict";

// API Configuration
const API_BASE_URL = 'https://script.google.com/macros/s/AKfycbyBB0ZbfWAj6qXGa2cMMjKVC_9t8tTV1ncyJs3Fvl9z318aoq2fq0JcSbghsZo-koEYqQ/exec';

// Icon mapping for different data types
const ICON_MAP = {
  'code': 'code-outline',
  'brain': 'bulb-outline', 
  'coffee': 'cafe-outline',
  'puzzle-piece': 'extension-puzzle-outline',
  'briefcase': 'briefcase-outline',
  'graduation-cap': 'school-outline',
  'school': 'library-outline',
  'book': 'book-outline',
  'linkedin': 'logo-linkedin',
  'github': 'logo-github',
  'twitter': 'logo-twitter',
  'instagram': 'logo-instagram',
  'facebook': 'logo-facebook',
  'email': 'mail-outline',
  'phone': 'phone-portrait-outline',
  'resume': 'document-outline'
};

// Global data storage
let portfolioData = {
  sidebar: null,
  about: null,
  skills: null,
  projects: null,
  experience: null,
  education: null,
  certifications: null,
  contactForm: null
};

// Utility Functions
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// Safe text function to handle undefined values
const safeText = function(value) {
  return value !== undefined && value !== null ? value : '';
};

// API Functions
async function fetchData(endpoint) {
  try {
    const response = await fetch(`${API_BASE_URL}?tab=${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching ${endpoint} data:`, error);
    return null;
  }
}

async function loadAllData() {
  const loadingSpinner = document.getElementById('loading-spinner');
  const mainContent = document.getElementById('main-content');
  
  try {
    // Fetch all data in parallel for better performance
    const [sidebar, about, skills, projects, experience, education, certifications, contactForm] = await Promise.all([
      fetchData('sidebar'),
      fetchData('about'),
      fetchData('skills'),
      fetchData('projects'),
      fetchData('experience'),
      fetchData('education'),
      fetchData('certification'),
      fetchData('contact-form')
    ]);

    // Store data globally
    portfolioData = {
      sidebar,
      about,
      skills,
      projects,
      experience,
      education,
      certifications,
      contactForm
    };

    // Populate all sections
    populateSidebar(sidebar);
    populateAbout(about);
    populateSkills(skills);
    populateProjects(projects);
    populateExperience(experience);
    populateEducation(education);
    populateCertifications(certifications);
    // populateContactForm(contactForm);

    // Hide loading spinner and show main content
    loadingSpinner.style.display = 'none';
    mainContent.style.display = 'block';

  } catch (error) {
    console.error('Error loading portfolio data:', error);
    loadingSpinner.innerHTML = '<div class="spinner"></div><p>Error loading portfolio. Please refresh the page.</p>';
  }
}

// Populate Functions
function populateSidebar(data) {
  if (!data) return;

  const nameElement = document.getElementById('sidebar-name');
  const jobTitleElement = document.getElementById('sidebar-job-title');
  const contactsList = document.getElementById('contacts-list');
  const socialList = document.getElementById('social-list');

  // Clear existing content
  contactsList.innerHTML = '';
  socialList.innerHTML = '';

  data.forEach(item => {
    switch(item.key) {
      case 'name':
        nameElement.textContent = safeText(item.content);
        nameElement.setAttribute('title', safeText(item.content));
        document.getElementById('page-title').textContent = `${safeText(item.content)} - Portfolio`;
        break;
      
      case 'job_title':
        jobTitleElement.textContent = safeText(item.content);
        break;
      
      case 'phone':
        contactsList.innerHTML += `
          <li class="contact-item">
            <div class="icon-box">
              <ion-icon name="${ICON_MAP['phone']}"></ion-icon>
            </div>
            <div class="contact-info">
              <p class="contact-title">Phone</p>
              <a href="tel:${safeText(item.content)}" class="contact-link">${safeText(item.content)}</a>
            </div>
          </li>
        `;
        break;
      
      case 'email':
        contactsList.innerHTML += `
          <li class="contact-item">
            <div class="icon-box">
              <ion-icon name="${ICON_MAP['email']}"></ion-icon>
            </div>
            <div class="contact-info">
              <p class="contact-title">Email</p>
              <a href="mailto:${safeText(item.content)}" class="contact-link">${safeText(item.content)}</a>
            </div>
          </li>
        `;
        break;
      
      case 'resume':
        contactsList.innerHTML += `
          <li class="contact-item">
            <div class="icon-box">
              <ion-icon name="${ICON_MAP['resume']}"></ion-icon>
            </div>
            <div class="contact-info">
              <p class="contact-title">Resume</p>
              <a href="${safeText(item.content)}" target="_blank" class="contact-link">Download CV</a>
            </div>
          </li>
        `;
        break;
      
      case 'social':
        try {
          const socialData = JSON.parse(item.content);
          socialData.forEach(social => {
            socialList.innerHTML += `
              <li class="social-item">
                <a href="${safeText(social.url)}" target="_blank" class="social-link">
                  <ion-icon name="${ICON_MAP[social.icon] || 'link-outline'}"></ion-icon>
                </a>
              </li>
            `;
          });
        } catch (error) {
          console.error('Error parsing social data:', error);
        }
        break;
    }
  });
}

function populateAbout(data) {
  if (!data) return;

  const aboutTextElement = document.getElementById('about-text');
  aboutTextElement.innerHTML = '';

  data.forEach(item => {
    aboutTextElement.innerHTML += `<p>${safeText(item.content)}</p>`;
  });
}

function populateSkills(data) {
  if (!data) return;

  const skillsList = document.getElementById('skills-list');
  skillsList.innerHTML = '';

  // Group skills by category
  const skillsGrouped = {};
  data.forEach(skill => {
    if (!skillsGrouped[skill.category]) {
      skillsGrouped[skill.category] = {
        role: skill.role,
        icon: skill.icon,
        subskills: []
      };
    }
    skillsGrouped[skill.category].subskills.push(skill.subskill);
  });

  // Create skill items
  Object.entries(skillsGrouped).forEach(([category, skillGroup]) => {
    const skillsText = skillGroup.subskills.join(', ');
    const isLongText = skillsText.length > 50;
    
    skillsList.innerHTML += `
      <li class="service-item" data-category="${category}" data-full-skills="${skillsText}">
        <div class="service-icon-box">
          <ion-icon name="${ICON_MAP[skillGroup.icon] || 'code-outline'}"></ion-icon>
        </div>
        <div class="service-content-box">
          <h4 class="h4 service-item-title">${safeText(skillGroup.role)}</h4>
          <p class="service-item-text">${skillsText}</p>
        </div>
      </li>
    `;
  });

  // Add click event listeners for skill items
  const skillItems = document.querySelectorAll('.service-item');
  skillItems.forEach(item => {
    const skillsText = item.getAttribute('data-full-skills');
    if (skillsText && skillsText.length > 50) {
      item.addEventListener('click', function() {
        showSkillsModal(item.querySelector('.service-item-title').textContent, skillsText);
      });
    }
  });
}

function showSkillsModal(title, skills) {
  const modal = document.getElementById('skills-modal');
  const modalTitle = document.getElementById('modal-skill-title');
  const modalContent = document.getElementById('modal-skills-content');
  const overlay = modal.querySelector('.overlay');
  
  modalTitle.textContent = title;
  modalContent.innerHTML = `<p>${skills}</p>`;
  
  modal.classList.add('active');
  overlay.classList.add('active');
}

function populateProjects(data) {
  if (!data) return;

  const projectList = document.getElementById('project-list');
  const projectFilters = document.getElementById('project-filters');
  const projectSelectList = document.getElementById('project-select-list');
  
  projectList.innerHTML = '';
  
  // Get unique categories
  const categories = [...new Set(data.map(project => project.category))];
  
  // Update filter buttons
  categories.forEach(category => {
    projectFilters.innerHTML += `
      <li class="filter-item">
        <button data-filter-btn>${category}</button>
      </li>
    `;
    
    projectSelectList.innerHTML += `
      <li class="select-item">
        <button data-select-item>${category}</button>
      </li>
    `;
  });

  // Create project items with certification-style layout
  data.forEach(project => {
    projectList.innerHTML += `
      <li class="project-item active" data-filter-item data-category="${project.category.toLowerCase()}">
        <a href="${safeText(project.project_url)}" target="_blank">
          <figure class="project-img">
            <div class="project-item-icon-box">
              <ion-icon name="eye-outline"></ion-icon>
            </div>
            <img src="${safeText(project.image_url)}" alt="${safeText(project.name)}" loading="lazy" onerror="this.src='https://via.placeholder.com/300x200?text=Project+Image'"/>
          </figure>
          <div class="project-content">
            <h3 class="project-title">${safeText(project.name)}</h3>
            <p class="project-category">${safeText(project.category)}</p>
            <p class="project-languages">${safeText(project.languages)}</p>
          </div>
        </a>
      </li>
    `;
  });

  // Reinitialize project filtering
  initializeProjectFiltering();
}

function populateExperience(data) {
  if (!data) return;

  const experienceList = document.getElementById('experience-list');
  experienceList.innerHTML = '';

  data.forEach(experience => {
    experienceList.innerHTML += `
      <li class="timeline-item">
        <h4 class="h4 timeline-item-title">${safeText(experience.role)}</h4>
        <div class="timeline-item-company">
          ${experience.company_url ? 
            `<a href="${safeText(experience.company_url)}" target="_blank" class="timeline-link">${safeText(experience.company)}</a>` : 
            safeText(experience.company)
          }
        </div>
        <span class="timeline-item-duration">${safeText(experience.duration)} • ${safeText(experience.location)}</span>
        <p class="timeline-text">${safeText(experience.description)}</p>
      </li>
    `;
  });
}

function populateEducation(data) {
  if (!data) return;

  const educationList = document.getElementById('education-list');
  educationList.innerHTML = '';

  data.forEach(education => {
    educationList.innerHTML += `
      <li class="timeline-item">
        <h4 class="h4 timeline-item-title">${safeText(education.degree)}</h4>
        <div class="timeline-item-company">
          ${education.certificate_url ? 
            `<a href="${safeText(education.certificate_url)}" target="_blank" class="timeline-link">${safeText(education.institution)}</a>` : 
            safeText(education.institution)
          }
        </div>
        <span class="timeline-item-duration">${safeText(education.duration)} • ${safeText(education.location)}</span>
      </li>
    `;
  });
}

function populateCertifications(data) {
  if (!data) return;

  const certificationsList = document.getElementById('certifications-list');
  certificationsList.innerHTML = '';

  data.forEach(cert => {
    const hasImage = cert.certificate_image && cert.certificate_image.trim() !== '';
    
    if (hasImage) {
      // Certificate with image - project-like layout
      certificationsList.innerHTML += `
        <li class="certification-post-item">
          <a href="${safeText(cert.certificate_url)}" target="_blank">
            <figure class="certification-banner-box">
              <div class="certification-item-icon-box">
                <ion-icon name="eye-outline"></ion-icon>
              </div>
              <img src="${safeText(cert.certificate_image)}" alt="${safeText(cert.certificate_name)}" loading="lazy" onerror="this.parentElement.parentElement.parentElement.classList.add('text-only'); this.parentElement.style.display='none';"/>
            </figure>
            <div class="certification-content">
              <h3 class="h3 certification-item-title">${safeText(cert.certificate_name)}</h3>
              <p class="certification-platform">${safeText(cert.platform)}</p>
            </div>
          </a>
        </li>
      `;
    } else {
      // Certificate without image - text-only layout
      certificationsList.innerHTML += `
        <li class="certification-post-item text-only">
          <a href="${safeText(cert.certificate_url)}" target="_blank">
            <div class="certification-content">
              <h3 class="h3 certification-item-title">${safeText(cert.certificate_name)}</h3>
              <p class="certification-platform">${safeText(cert.platform)}</p>
            </div>
          </a>
        </li>
      `;
    }
  });
}

// function populateContactForm(data) {
//   if (!data) return;

//   const contactForm = document.getElementById('contact-form');
//   const inputWrapper = document.createElement('div');
//   inputWrapper.className = 'input-wrapper';
  
//   contactForm.innerHTML = '';

//   // Sort by order
//   const sortedFields = data.sort((a, b) => a.order - b.order);
//   let currentWrapper = inputWrapper;

//   sortedFields.forEach((field, index) => {
//     switch(field.type) {
//       case 'text':
//       case 'email':
//       case 'tel':
//         const input = document.createElement('input');
//         input.type = field.type;
//         input.name = field.field_id;
//         input.className = 'form-input';
//         input.placeholder = safeText(field.placeholder);
//         if (field.required) input.required = true;
//         input.setAttribute('data-form-input', '');
        
//         currentWrapper.appendChild(input);
//         break;
      
//       case 'textarea':
//         // Add current wrapper to form before textarea
//         if (currentWrapper.children.length > 0) {
//           contactForm.appendChild(currentWrapper);
//         }
        
//         const textarea = document.createElement('textarea');
//         textarea.name = field.field_id;
//         textarea.className = 'form-input';
//         textarea.placeholder = safeText(field.placeholder);
//         if (field.required) textarea.required = true;
//         textarea.setAttribute('data-form-input', '');
        
//         contactForm.appendChild(textarea);
        
//         // Create a new wrapper for remaining fields
//         currentWrapper = document.createElement('div');
//         currentWrapper.className = 'input-wrapper';
//         break;
      
//       case 'button':
//         // Add current wrapper if it has content
//         if (currentWrapper.children.length > 0) {
//           contactForm.appendChild(currentWrapper);
//         }
        
//         const button = document.createElement('button');
//         button.className = 'form-btn';
//         button.type = 'submit';
//         button.disabled = true;
//         button.setAttribute('data-form-btn', '');
//         button.innerHTML = `
//           <ion-icon name="paper-plane"></ion-icon>
//           <span>${safeText(field.label)}</span>
//         `;
        
//         contactForm.appendChild(button);
//         break;
//     }
//   });

//   // Add remaining wrapper if it has content
//   if (currentWrapper.children.length > 0) {
//     contactForm.appendChild(currentWrapper);
//   }

//   // Reinitialize form validation
//   initializeFormValidation();
// }



// Navigation and UI Functions
function initializeNavigation() {
  const navigationLinks = document.querySelectorAll("[data-nav-link]");
  const pages = document.querySelectorAll("[data-page]");

  for (let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener("click", function () {
      for (let j = 0; j < pages.length; j++) {
        if (this.innerHTML.toLowerCase() === pages[j].dataset.page) {
          pages[j].classList.add("active");
          navigationLinks[j].classList.add("active");
          window.scrollTo(0, 0);
        } else {
          pages[j].classList.remove("active");
          navigationLinks[j].classList.remove("active");
        }
      }
    });
  }
}

function initializeSidebar() {
  const sidebar = document.querySelector("[data-sidebar]");
  const sidebarBtn = document.querySelector("[data-sidebar-btn]");

  if (sidebarBtn) {
    sidebarBtn.addEventListener("click", function () {
      elementToggleFunc(sidebar);
    });
  }
}

function initializeProjectFiltering() {
  const select = document.querySelector("[data-select]");
  const selectItems = document.querySelectorAll("[data-select-item]");
  const selectValue = document.querySelector("[data-selecct-value]");
  const filterBtn = document.querySelectorAll("[data-filter-btn]");
  const filterItems = document.querySelectorAll("[data-filter-item]");

  const filterFunc = function (selectedValue) {
    for (let i = 0; i < filterItems.length; i++) {
      if (selectedValue === "all") {
        filterItems[i].classList.add("active");
      } else if (selectedValue === filterItems[i].dataset.category) {
        filterItems[i].classList.add("active");
      } else {
        filterItems[i].classList.remove("active");
      }
    }
  };

  if (select) {
    select.addEventListener("click", function () {
      elementToggleFunc(this);
    });
  }

  // Add event to select items
  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      elementToggleFunc(select);
      filterFunc(selectedValue);
    });
  }

  // Add event to filter buttons
  let lastClickedBtn = filterBtn[0];
  for (let i = 0; i < filterBtn.length; i++) {
    filterBtn[i].addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      filterFunc(selectedValue);

      lastClickedBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;
    });
  }
}

function initializeFormValidation() {
  const form = document.querySelector("[data-form]");
  const formInputs = document.querySelectorAll("[data-form-input]");
  const formBtn = document.querySelector("[data-form-btn]");

  if (!form || !formBtn) return;

  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  }
}

// Form Submission Handler for Contact Form
function initializeContactForm() {
  const form = document.getElementById('contact-form');
  const thankYouDiv = document.getElementById('thank-you-message');

  if (!form || !thankYouDiv) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission

    const formData = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          // Hide the form
          form.style.display = 'none';
          // Show custom thank-you message
          thankYouDiv.style.display = 'block';
          thankYouDiv.innerHTML = `
            <h3 class="h3">Thank You!</h3>
            <p>Your message has been sent successfully. I'll get back to you within 24 hours.</p>
            <button class="form-btn" onclick="resetForm()">Send Another Message</button>
          `;
          // Reset form fields
          form.reset();
        } else {
          thankYouDiv.style.display = 'block';
          thankYouDiv.innerHTML = '<p class="error">Something went wrong. Please try again later.</p>';
        }
      })
      .catch((error) => {
        thankYouDiv.style.display = 'block';
        thankYouDiv.innerHTML = '<p class="error">Error: ' + error.message + '</p>';
      });
  });

  // Reinitialize form validation
  initializeFormValidation();
}




// Function to reset the form and show it again
function resetForm() {
  const form = document.getElementById('contact-form');
  const thankYouDiv = document.getElementById('thank-you-message');
  thankYouDiv.style.display = 'none';
  form.style.display = 'block';
}

function initializeSkillsModal() {
  const modal = document.getElementById('skills-modal');
  const closeBtn = modal.querySelector('[data-modal-close-btn]');
  const overlay = modal.querySelector('.overlay');

  closeBtn.addEventListener('click', function() {
    modal.classList.remove('active');
    overlay.classList.remove('active');
  });

  overlay.addEventListener('click', function() {
    modal.classList.remove('active');
    overlay.classList.remove('active');
  });
}

// Ensure initializeContactForm is called on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
  initializeSidebar();
  initializeNavigation();
  initializeSkillsModal();
  initializeContactForm();
  loadAllData();
});

thankYouDiv.innerHTML = `
  <h3 class="h3">Thank You for contactting!</h3>
  <p>Your message has been sent successfully. I'll get back to you.</p>
  <button class="form-btn" onclick="resetForm()">Send Another Message</button>
`;

// Export functions for external use if needed
window.portfolioData = portfolioData;
window.loadAllData = loadAllData;
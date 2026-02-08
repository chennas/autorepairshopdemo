/* ==========================================
   MAIN JAVASCRIPT - AutoCare Pro
   Handles mobile menu, form validation, and smooth scrolling
   ========================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // MOBILE MENU TOGGLE
    // ==========================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = menuToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!menuToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // ==========================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ==========================================
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Check if the href is just "#" or if the target exists
            if (href === '#' || href === '#!') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ==========================================
    // CONTACT FORM VALIDATION
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        // Phone validation regex (optional field)
        const phoneRegex = /^[\d\s\-\(\)\+]+$/;
        
        // Form submission handler
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset all error states
            clearErrors();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();
            
            let isValid = true;
            
            // Validate name
            if (name === '') {
                showError('name', 'Please enter your name');
                isValid = false;
            } else if (name.length < 2) {
                showError('name', 'Name must be at least 2 characters');
                isValid = false;
            }
            
            // Validate email
            if (email === '') {
                showError('email', 'Please enter your email address');
                isValid = false;
            } else if (!emailRegex.test(email)) {
                showError('email', 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate phone (optional, but if provided must be valid)
            if (phone !== '' && !phoneRegex.test(phone)) {
                showError('phone', 'Please enter a valid phone number');
                isValid = false;
            }
            
            // Validate message
            if (message === '') {
                showError('message', 'Please enter a message');
                isValid = false;
            } else if (message.length < 10) {
                showError('message', 'Message must be at least 10 characters');
                isValid = false;
            }
            
            // If all validations pass
            if (isValid) {
                // Submit the form (in this demo, we'll simulate submission)
                submitForm(name, email, phone, message);
            }
        });
        
        // Real-time validation on blur
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const messageInput = document.getElementById('message');
        
        if (nameInput) {
            nameInput.addEventListener('blur', function() {
                const value = this.value.trim();
                if (value !== '' && value.length < 2) {
                    showError('name', 'Name must be at least 2 characters');
                } else {
                    clearError('name');
                }
            });
        }
        
        if (emailInput) {
            emailInput.addEventListener('blur', function() {
                const value = this.value.trim();
                if (value !== '' && !emailRegex.test(value)) {
                    showError('email', 'Please enter a valid email address');
                } else {
                    clearError('email');
                }
            });
        }
        
        if (phoneInput) {
            phoneInput.addEventListener('blur', function() {
                const value = this.value.trim();
                if (value !== '' && !phoneRegex.test(value)) {
                    showError('phone', 'Please enter a valid phone number');
                } else {
                    clearError('phone');
                }
            });
        }
        
        if (messageInput) {
            messageInput.addEventListener('blur', function() {
                const value = this.value.trim();
                if (value !== '' && value.length < 10) {
                    showError('message', 'Message must be at least 10 characters');
                } else {
                    clearError('message');
                }
            });
        }
    }
    
    // ==========================================
    // FORM HELPER FUNCTIONS
    // ==========================================
    
    /**
     * Display error message for a form field
     * @param {string} fieldId - The ID of the form field
     * @param {string} message - The error message to display
     */
    function showError(fieldId, message) {
        const input = document.getElementById(fieldId);
        const errorElement = document.getElementById(fieldId + 'Error');
        
        if (input && errorElement) {
            input.classList.add('error');
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
    }
    
    /**
     * Clear error message for a specific field
     * @param {string} fieldId - The ID of the form field
     */
    function clearError(fieldId) {
        const input = document.getElementById(fieldId);
        const errorElement = document.getElementById(fieldId + 'Error');
        
        if (input && errorElement) {
            input.classList.remove('error');
            errorElement.textContent = '';
            errorElement.classList.remove('show');
        }
    }
    
    /**
     * Clear all error messages
     */
    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => {
            error.textContent = '';
            error.classList.remove('show');
        });
        
        const errorInputs = document.querySelectorAll('.error');
        errorInputs.forEach(input => {
            input.classList.remove('error');
        });
    }
    
    /**
     * Submit form data (in this demo, uses mailto or displays success message)
     * @param {string} name - User's name
     * @param {string} email - User's email
     * @param {string} phone - User's phone (optional)
     * @param {string} message - User's message
     */
    function submitForm(name, email, phone, message) {
        // Get service type if available
        const serviceSelect = document.getElementById('service');
        const service = serviceSelect ? serviceSelect.value : 'Not specified';
        
        // Option 1: Use mailto (opens user's email client)
        // Uncomment the following lines to enable mailto functionality
        /*
        const subject = encodeURIComponent('Contact Form Submission from ' + name);
        const body = encodeURIComponent(
            'Name: ' + name + '\n' +
            'Email: ' + email + '\n' +
            'Phone: ' + (phone || 'Not provided') + '\n' +
            'Service: ' + (service || 'Not specified') + '\n\n' +
            'Message:\n' + message
        );
        window.location.href = 'mailto:info@autocarepro.com?subject=' + subject + '&body=' + body;
        */
        
        // Option 2: Display success message (current implementation)
        // In a real application, this would send data to a server
        
        // Hide the form
        contactForm.style.display = 'none';
        
        // Show success message
        const successMessage = document.getElementById('formSuccess');
        if (successMessage) {
            successMessage.style.display = 'block';
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        
        // Reset form after 5 seconds
        setTimeout(function() {
            contactForm.reset();
            contactForm.style.display = 'flex';
            if (successMessage) {
                successMessage.style.display = 'none';
            }
        }, 5000);
        
        // Log form data (for demo purposes)
        console.log('Form submitted with data:', {
            name: name,
            email: email,
            phone: phone,
            service: service,
            message: message
        });
    }
    
    // ==========================================
    // SCROLL ANIMATIONS (Optional Enhancement)
    // ==========================================
    
    /**
     * Add scroll reveal animation to elements
     */
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe elements that should animate on scroll
        const animateElements = document.querySelectorAll('.highlight-card, .service-card, .team-member, .value-card');
        animateElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    }
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // ==========================================
    // WHATSAPP BUTTON TRACKING (Optional)
    // ==========================================
    const whatsappButton = document.querySelector('.whatsapp-float');
    if (whatsappButton) {
        whatsappButton.addEventListener('click', function() {
            console.log('WhatsApp button clicked');
            // You can add analytics tracking here if needed
        });
    }
    
});

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

/**
 * Debounce function to limit function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function to limit function execution rate
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
function throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

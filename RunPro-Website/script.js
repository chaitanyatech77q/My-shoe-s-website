// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Modal functionality
const learnMoreModal = document.getElementById('learnMoreModal');
const outOfStockModal = document.getElementById('outOfStockModal');
const learnMoreBtn = document.getElementById('learnMoreBtn');

// Learn More button functionality
if (learnMoreBtn) {
    learnMoreBtn.addEventListener('click', () => {
        learnMoreModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
}

// Close modal functionality
document.querySelectorAll('.close-modal').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        learnMoreModal.style.display = 'none';
        outOfStockModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === learnMoreModal) {
        learnMoreModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    if (e.target === outOfStockModal) {
        outOfStockModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Function to close out of stock modal
function closeOutOfStockModal() {
    outOfStockModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Add to cart functionality with out of stock check
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Randomly show different messages for variety
        const messages = [
            { text: "Sorry, this product is currently out of stock. Please select another one from our collection.", type: "out-of-stock" },
            { text: "This product is coming soon! Get notified when it's available.", type: "coming-soon" },
            { text: "Pre-order available! This product will ship in 2-3 weeks.", type: "pre-order" }
        ];
        
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        // Update modal content based on message type
        const modalTitle = document.querySelector('#outOfStockModal h2');
        const modalText = document.querySelector('#outOfStockModal p');
        const modalButton = document.querySelector('#outOfStockModal button');
        
        if (randomMessage.type === 'coming-soon') {
            modalTitle.innerHTML = '🚀 Coming Soon';
            modalButton.textContent = 'Get Notified';
            modalButton.style.background = 'linear-gradient(45deg, #f59e0b, #d97706)';
        } else if (randomMessage.type === 'pre-order') {
            modalTitle.innerHTML = '📦 Pre-order Available';
            modalButton.textContent = 'Pre-order Now';
            modalButton.style.background = 'linear-gradient(45deg, #10b981, #059669)';
        } else {
            modalTitle.innerHTML = '⚠️ Out of Stock';
            modalButton.textContent = 'Continue Shopping';
            modalButton.style.background = 'linear-gradient(45deg, #6366f1, #8b5cf6)';
        }
        
        modalText.textContent = randomMessage.text;
        
        // Show out of stock modal
        outOfStockModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Optional: Add visual feedback to the button
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Check Availability';
        this.style.background = 'linear-gradient(45deg, #f59e0b, #d97706)';
        
        setTimeout(() => {
            this.innerHTML = originalText;
            this.style.background = 'linear-gradient(45deg, #6366f1, #8b5cf6)';
        }, 3000);
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll with enhanced behavior
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.scrollY;
    
    if (scrolled > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
    
    // Add smooth transition for navbar
    navbar.style.transition = 'all 0.3s ease';
});

// Enhanced smooth scrolling with offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Heart button functionality
document.querySelectorAll('.action-btn').forEach(button => {
    if (button.querySelector('.fa-heart')) {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon.classList.contains('fas')) {
                icon.classList.remove('fas');
                icon.classList.add('far');
                icon.style.color = '#64748b';
            } else {
                icon.classList.remove('far');
                icon.classList.add('fas');
                icon.style.color = '#ef4444';
            }
        });
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('loaded');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.shoe-card, .feature, .contact-item').forEach(el => {
    el.classList.add('loading');
    observer.observe(el);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// Search functionality (if needed)
function searchShoes(query) {
    const shoes = document.querySelectorAll('.shoe-card');
    shoes.forEach(shoe => {
        const title = shoe.querySelector('h3').textContent.toLowerCase();
        const description = shoe.querySelector('p').textContent.toLowerCase();
        const searchTerm = query.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            shoe.style.display = 'block';
        } else {
            shoe.style.display = 'none';
        }
    });
}

// Filter functionality
function filterShoes(category) {
    const shoes = document.querySelectorAll('.shoe-card');
    if (category === 'all') {
        shoes.forEach(shoe => shoe.style.display = 'block');
        return;
    }
    
    shoes.forEach(shoe => {
        const badge = shoe.querySelector('.badge').textContent.toLowerCase();
        if (badge === category.toLowerCase()) {
            shoe.style.display = 'block';
        } else {
            shoe.style.display = 'none';
        }
    });
}

// Price range filter
function filterByPrice(min, max) {
    const shoes = document.querySelectorAll('.shoe-card');
    shoes.forEach(shoe => {
        const price = parseFloat(shoe.querySelector('.price').textContent.replace('$', ''));
        if (price >= min && price <= max) {
            shoe.style.display = 'block';
        } else {
            shoe.style.display = 'none';
        }
    });
}

// Add loading animation to images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
    
    img.addEventListener('error', function() {
        // If image fails to load, make it visible anyway
        this.style.opacity = '1';
        console.log('Image failed to load:', this.src);
    });
    
    // Set initial opacity to 0.8 instead of 0 to ensure visibility
    img.style.opacity = '0.8';
    img.style.transition = 'opacity 0.5s ease';
    
    // Force opacity to 1 after a short delay to ensure visibility
    setTimeout(() => {
        img.style.opacity = '1';
    }, 100);
});

// Form validation for contact form (if added later)
function validateForm(formData) {
    const errors = [];
    
    if (!formData.get('name')) {
        errors.push('Name is required');
    }
    
    if (!formData.get('email')) {
        errors.push('Email is required');
    } else if (!isValidEmail(formData.get('email'))) {
        errors.push('Please enter a valid email');
    }
    
    if (!formData.get('message')) {
        errors.push('Message is required');
    }
    
    return errors;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Smooth reveal animation for sections
const revealSections = document.querySelectorAll('.shoes-section, .about-section, .contact-section');

const revealSection = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
};

const sectionObserver = new IntersectionObserver(revealSection, {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
});

revealSections.forEach(section => {
    // Ensure sections are visible by default
    section.style.opacity = '1';
    section.style.transform = 'translateY(0)';
    section.style.transition = 'all 0.8s ease';
    sectionObserver.observe(section);
});

// Add some interactive hover effects
document.querySelectorAll('.shoe-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Initialize tooltips for action buttons
document.querySelectorAll('.action-btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = this.querySelector('i').classList.contains('fa-heart') ? 'Add to Wishlist' : 'Quick View';
        tooltip.style.cssText = `
            position: absolute;
            background: #333;
            color: white;
            padding: 5px 10px;
            border-radius: 5px;
            font-size: 12px;
            white-space: nowrap;
            z-index: 1000;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        this.appendChild(tooltip);
        setTimeout(() => tooltip.style.opacity = '1', 10);
    });
    
    button.addEventListener('mouseleave', function() {
        const tooltip = this.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        
        // Close modals
        if (learnMoreModal.style.display === 'block') {
            learnMoreModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (outOfStockModal.style.display === 'block') {
            outOfStockModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
});

// Performance optimization: Debounce scroll events
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

const debouncedScrollHandler = debounce(() => {
    // Handle scroll events here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Add some fun micro-interactions
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.95)';
    });
    
    button.addEventListener('mouseup', function() {
        this.style.transform = 'scale(1)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Add scroll to top functionality
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(45deg, #6366f1, #8b5cf6);
    color: white;
    border: none;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
    transition: all 0.3s ease;
    z-index: 1000;
`;

document.body.appendChild(scrollToTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'flex';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

// Scroll to top functionality
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Enhanced hover effects for scroll to top button
scrollToTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px) scale(1.1)';
    this.style.boxShadow = '0 6px 20px rgba(99, 102, 241, 0.4)';
});

scrollToTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
    this.style.boxShadow = '0 4px 15px rgba(99, 102, 241, 0.3)';
});

console.log('RunPro website loaded successfully! 🏃‍♂️');

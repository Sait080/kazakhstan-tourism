// Detail Page JavaScript

// Booking Form
document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(bookingForm);
            const data = Object.fromEntries(formData);
            
            // Show success modal
            showModal('Брондау сәтті жіберілді!', 
                'Біз сізбен жақын арада байланысамыз. Рахмет!');
            
            // Reset form
            bookingForm.reset();
        });
    }
    
    // Gallery Lightbox
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const src = img.getAttribute('src');
            const alt = img.getAttribute('alt');
            
            showLightbox(src, alt);
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Суреттерді қатесіз жүктеу
    document.querySelectorAll("img").forEach((img) => {
        img.addEventListener("error", () => {
            img.style.backgroundColor = "#f0f0f0";
            img.style.minHeight = "200px";
            img.alt = img.alt || "Сурет жүктелмеді";
        });
    });
    
    // Attraction cards animation
    const attractionCards = document.querySelectorAll('.attraction-card');
    
    const attractionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });
    
    attractionCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        attractionObserver.observe(card);
    });
    
    // Review cards animation
    const reviewCards = document.querySelectorAll('.review-card');
    
    const reviewObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
    }, { threshold: 0.1 });
    
    reviewCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        reviewObserver.observe(card);
    });
});

// Modal Function
function showModal(title, message) {
    // Remove existing modal
    const existingModal = document.querySelector('.custom-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'custom-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3>${title}</h3>
            <p>${message}</p>
            <button class="btn btn-primary" onclick="closeModal()">Жақсы</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

function closeModal() {
    const modal = document.querySelector('.custom-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Lightbox Function
function showLightbox(src, alt) {
    // Remove existing lightbox
    const existingLightbox = document.querySelector('.lightbox');
    if (existingLightbox) {
        existingLightbox.remove();
    }
    
    // Create lightbox
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-overlay" onclick="closeLightbox()"></div>
        <div class="lightbox-content">
            <button class="lightbox-close" onclick="closeLightbox()">
                <i class="fas fa-times"></i>
            </button>
            <img src="${src}" alt="${alt}">
            <p class="lightbox-caption">${alt}</p>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';
    
    // Animate in
    setTimeout(() => {
        lightbox.classList.add('active');
    }, 10);
}

function closeLightbox() {
    const lightbox = document.querySelector('.lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        setTimeout(() => {
            lightbox.remove();
            document.body.style.overflow = '';
        }, 300);
    }
}

// Add modal styles
const modalStyles = document.createElement('style');
modalStyles.innerHTML = `
    .custom-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    }
    
    .custom-modal.active {
        opacity: 1;
        visibility: visible;
    }
    
    .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
    }
    
    .modal-content {
        position: relative;
        background: white;
        padding: 50px;
        border-radius: 20px;
        text-align: center;
        max-width: 400px;
        width: 90%;
        transform: scale(0.8);
        transition: all 0.3s ease;
    }
    
    .custom-modal.active .modal-content {
        transform: scale(1);
    }
    
    .modal-icon {
        font-size: 80px;
        color: #2ecc71;
        margin-bottom: 20px;
    }
    
    .modal-content h3 {
        font-size: 24px;
        font-weight: 700;
        color: #1a1a2e;
        margin-bottom: 15px;
    }
    
    .modal-content p {
        font-size: 16px;
        color: #666;
        margin-bottom: 30px;
    }
    
    /* Lightbox Styles */
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    }
    
    .lightbox.active {
        opacity: 1;
        visibility: visible;
    }
    
    .lightbox-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
    }
    
    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
        z-index: 1;
    }
    
    .lightbox-content img {
        max-width: 100%;
        max-height: 80vh;
        border-radius: 10px;
    }
    
    .lightbox-close {
        position: absolute;
        top: -50px;
        right: 0;
        background: none;
        border: none;
        color: white;
        font-size: 30px;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .lightbox-close:hover {
        color: #ff6b6b;
    }
    
    .lightbox-caption {
        color: white;
        text-align: center;
        margin-top: 15px;
        font-size: 16px;
    }
`;
document.head.appendChild(modalStyles);

console.log('Detail page loaded!');

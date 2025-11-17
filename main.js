const danceClasses = [
    {
        id: 1,
        title: 'Contemporary Flow',
        instructor: 'Sarah Johnson',
        duration: '90 min',
        capacity: 15,
        rating: 4.9,
        price: '$25',
        image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400&h=300&fit=crop&auto=format',
        description: 'Express your emotions through fluid contemporary movements and choreography.',
        level: 'Intermediate',
        style: 'Contemporary',
        time: '7:00 PM',
        schedule: ['Monday', 'Wednesday', 'Friday'],
        timeSlots: ['6:00 PM', '7:00 PM', '8:00 PM'],
        benefits: [
            'Improved flexibility and strength',
            'Enhanced emotional expression',
            'Better body awareness',
            'Stress relief through movement'
        ]
    },
    {
        id: 2,
        title: 'Hip-Hop Groove',
        instructor: 'Marcus Davis',
        duration: '60 min',
        capacity: 20,
        rating: 4.8,
        price: '$20',
        image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=400&h=300&fit=crop&auto=format',
        description: 'Learn the latest hip-hop moves and develop your street dance skills.',
        level: 'All Levels',
        style: 'Hip-Hop',
        time: '8:00 PM',
        schedule: ['Tuesday', 'Thursday', 'Saturday'],
        timeSlots: ['7:00 PM', '8:00 PM', '9:00 PM'],
        benefits: [
            'Cardiovascular fitness',
            'Rhythm and coordination',
            'Self-confidence building',
            'Creative expression'
        ]
    },
    {
        id: 3,
        title: 'Classical Ballet',
        instructor: 'Emma Rodriguez',
        duration: '75 min',
        capacity: 12,
        rating: 5.0,
        price: '$30',
        image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop&auto=format',
        description: 'Master the elegance and technique of classical ballet fundamentals.',
        level: 'Beginner',
        style: 'Ballet',
        time: '6:00 PM',
        schedule: ['Monday', 'Wednesday', 'Friday'],
        timeSlots: ['5:00 PM', '6:00 PM', '7:00 PM'],
        benefits: [
            'Perfect posture and alignment',
            'Enhanced grace and poise',
            'Core strength development',
            'Mental discipline and focus'
        ]
    },
    {
        id: 4,
        title: 'Latin Salsa',
        instructor: 'Carlos Martinez',
        duration: '60 min',
        capacity: 16,
        rating: 4.7,
        price: '$22',
        image: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=400&h=300&fit=crop&auto=format',
        description: 'Feel the rhythm and passion of Latin dance with authentic salsa steps.',
        level: 'Beginner',
        style: 'Latin',
        time: '7:30 PM',
        schedule: ['Tuesday', 'Thursday', 'Sunday'],
        timeSlots: ['6:30 PM', '7:30 PM', '8:30 PM'],
        benefits: [
            'Social dancing skills',
            'Cultural appreciation',
            'Partner connection',
            'Rhythmic awareness'
        ]
    },
    {
        id: 5,
        title: 'Jazz Fusion',
        instructor: 'Lisa Thompson',
        duration: '60 min',
        capacity: 18,
        rating: 4.6,
        price: '$23',
        image: 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=400&h=300&fit=crop&auto=format',
        description: 'Energetic jazz movements combined with modern dance techniques.',
        level: 'Intermediate',
        style: 'Jazz',
        time: '6:30 PM',
        schedule: ['Monday', 'Wednesday', 'Friday'],
        timeSlots: ['6:30 PM', '7:30 PM', '8:30 PM'],
        benefits: [
            'Dynamic movement skills',
            'Musical interpretation',
            'Performance confidence',
            'Artistic expression'
        ]
    },
    {
        id: 6,
        title: 'Breakdancing Basics',
        instructor: 'Alex Rivera',
        duration: '75 min',
        capacity: 14,
        rating: 4.9,
        price: '$28',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&auto=format',
        description: 'Learn the fundamentals of breaking including toprock, footwork, and power moves.',
        level: 'Beginner',
        style: 'Hip-Hop',
        time: '8:30 PM',
        schedule: ['Tuesday', 'Thursday', 'Saturday'],
        timeSlots: ['8:30 PM', '9:30 PM'],
        benefits: [
            'Strength and agility',
            'Balance and coordination',
            'Street dance culture',
            'Personal style development'
        ]
    }
];

let filteredClasses = [...danceClasses];
let currentSelectedClass = null;

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    renderClasses();
    setupEventListeners();
    setupSmoothScrolling();
    setupIntersectionObserver();
}

function setupEventListeners() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }

    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
        link.addEventListener('click', handleNavClick);
    });

    document.querySelectorAll('.btn-primary').forEach(btn => {
        if (btn.textContent.includes('Book')) {
            btn.addEventListener('click', () => {
                if (filteredClasses.length > 0) {
                    openBookingModal(filteredClasses[0]);
                }
            });
        }
    });
    const classesBtn = document.getElementById('classesBtn');
    if (classesBtn) {
        classesBtn.addEventListener('click', scrollToClasses);
    }
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingSubmit);
    }

    window.addEventListener('click', function(event) {
        const modal = document.getElementById('bookingModal');
        if (event.target === modal) {
            closeBookingModal();
        }
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeBookingModal();
        }
    });
}

function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    const menuBtn = document.querySelector('.mobile-menu-btn');

    if (mobileNav.classList.contains('open')) {
        closeMobileMenu();
    } else {
        mobileNav.style.display = 'flex';
        mobileNav.classList.add('open', 'fade-in-up');
        menuBtn.classList.add('active');
    }
}

function closeMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    const menuBtn = document.querySelector('.mobile-menu-btn');

    mobileNav.style.display = 'none';
    mobileNav.classList.remove('open');
    menuBtn.classList.remove('active');
}

function handleNavClick(event) {
    event.preventDefault();
    const href = event.target.getAttribute('href');
    
    if (href && href.startsWith('#')) {
        const targetElement = document.querySelector(href);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }
    
    closeMobileMenu();
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    event.target.classList.add('active');
}

function scrollToClasses() {
    const classesSection = document.getElementById('classes');
    if (classesSection) {
        const headerOffset = 80;
        const elementPosition = classesSection.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

function renderClasses() {
    const classesGrid = document.getElementById('classesGrid');
    if (!classesGrid) return;

    classesGrid.innerHTML = '';

    filteredClasses.forEach(danceClass => {
        const classCard = createClassCard(danceClass);
        classesGrid.appendChild(classCard);
    });

    if (filteredClasses.length === 0) {
        classesGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
                <h3 style="font-size: 1.5rem; color: #6b7280; margin-bottom: 10px;">No classes found</h3>
                <p style="color: #9ca3af;">Try adjusting your search or filters.</p>
            </div>
        `;
    }
}

function createClassCard(danceClass) {
    const card = document.createElement('div');
    card.className = 'class-card fade-in-up';
    
    const stars = '★'.repeat(Math.floor(danceClass.rating)) + (danceClass.rating % 1 >= 0.5 ? '☆' : '');
    
    card.innerHTML = `
        <div class="class-image">
            <img src="${danceClass.image}" alt="${danceClass.title}" loading="lazy">
            <div class="class-price">${danceClass.price}</div>
            <div class="class-level">${danceClass.level}</div>
        </div>
        <div class="class-content">
            <div class="class-header">
                <h3 class="class-title">${danceClass.title}</h3>
                <div class="class-rating">
                    <div class="stars">${stars}</div>
                    <span class="rating-value">${danceClass.rating}</span>
                </div>
            </div>
            <p class="class-description">${danceClass.description}</p>
            <div class="class-details">
                <div class="class-detail">
                    <svg viewBox="0 0 24 24" fill="none">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2"/>
                        <circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="2"/>
                    </svg>
                    Instructor: ${danceClass.instructor}
                </div>
                <div class="class-detail-row">
                    <div class="class-detail">
                        <svg viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                            <polyline points="12,6 12,12 16,14" stroke="currentColor" stroke-width="2"/>
                        </svg>
                        ${danceClass.duration}
                    </div>
                    <div>${danceClass.time}</div>
                </div>
            </div>
            <div class="class-schedule">
                <strong>Schedule:</strong> ${danceClass.schedule.join(', ')}
            </div>
            <button class="btn btn-primary book-btn" onclick="openBookingModal(${danceClass.id})">
                Book This Class
            </button>
        </div>
    `;
    
    return card;
}

function filterClasses() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const selectedLevel = document.getElementById('levelFilter')?.value || 'all';
    const selectedStyle = document.getElementById('styleFilter')?.value || 'all';

    filteredClasses = danceClasses.filter(danceClass => {
        const matchesSearch = 
            danceClass.title.toLowerCase().includes(searchTerm) ||
            danceClass.instructor.toLowerCase().includes(searchTerm) ||
            danceClass.style.toLowerCase().includes(searchTerm) ||
            danceClass.description.toLowerCase().includes(searchTerm);

        const matchesLevel = selectedLevel === 'all' || danceClass.level === selectedLevel;
        const matchesStyle = selectedStyle === 'all' || danceClass.style === selectedStyle;

        return matchesSearch && matchesLevel && matchesStyle;
    });

    renderClasses();
}

function showAllClasses() {
    // Reset filters
    document.getElementById('searchInput').value = '';
    document.getElementById('levelFilter').value = 'all';
    document.getElementById('styleFilter').value = 'all';
    
    filteredClasses = [...danceClasses];
    renderClasses();
}

function openBookingModal(classId) {
    const selectedClass = danceClasses.find(c => c.id === classId);
    if (!selectedClass) return;

    currentSelectedClass = selectedClass;
    
    document.getElementById('selectedClass').value = selectedClass.title;
    document.getElementById('selectedInstructor').value = selectedClass.instructor;
    
    populateAvailableDates(selectedClass);
    
    populateTimeSlots(selectedClass);
    
    document.getElementById('bookingModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeBookingModal() {
    document.getElementById('bookingModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    
    document.getElementById('bookingForm').reset();
    currentSelectedClass = null;
}

function populateAvailableDates(selectedClass) {
    const dateSelect = document.getElementById('bookingDate');
    dateSelect.innerHTML = '<option value="">Choose available date</option>';
    
    const today = new Date();
    const dates = [];
    
    for (let i = 0; i < 14; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        
        if (selectedClass.schedule.includes(dayName)) {
            const dateValue = date.toISOString().split('T')[0];
            const dateLabel = date.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'short', 
                day: 'numeric' 
            });
            
            dates.push({ value: dateValue, label: dateLabel });
        }
    }
    
    dates.forEach(date => {
        const option = document.createElement('option');
        option.value = date.value;
        option.textContent = date.label;
        dateSelect.appendChild(option);
    });
}

function populateTimeSlots(selectedClass) {
    const timeSelect = document.getElementById('bookingTime');
    timeSelect.innerHTML = '<option value="">Choose time slot</option>';
    
    selectedClass.timeSlots.forEach(timeSlot => {
        const option = document.createElement('option');
        option.value = timeSlot;
        option.textContent = timeSlot;
        timeSelect.appendChild(option);
    });
}

function handleBookingSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const formData = {
        classId: currentSelectedClass.id,
        className: currentSelectedClass.title,
        instructor: currentSelectedClass.instructor,
        date: document.getElementById('bookingDate').value,
        time: document.getElementById('bookingTime').value,
        studentInfo: {
            name: document.getElementById('studentName').value,
            email: document.getElementById('studentEmail').value,
            phone: document.getElementById('studentPhone').value,
            experience: document.getElementById('danceExperience').value,
            specialRequests: document.getElementById('specialRequests').value
        }
    };
    
    if (!formData.date || !formData.time || !formData.studentInfo.name || 
        !formData.studentInfo.email || !formData.studentInfo.phone) {
        showToast('Please fill in all required fields', 'error');
        return;
    }
    
    if (!isValidEmail(formData.studentInfo.email)) {
        showToast('Please enter a valid email address', 'error');
        return;
    }
    
    saveBooking(formData);
    
    showToast('Class booked successfully! You will receive a confirmation email shortly.');
    
    closeBookingModal();
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function saveBooking(booking) {
    const bookings = JSON.parse(localStorage.getItem('danceBookings') || '[]');
    
    const newBooking = {
        ...booking,
        id: Date.now(),
        bookedAt: new Date().toISOString(),
        status: 'confirmed'
    };
    
    bookings.push(newBooking);
    localStorage.setItem('danceBookings', JSON.stringify(bookings));
    
    console.log('Booking saved:', newBooking);
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    toastMessage.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');
    
    // Hide toast after 6 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 6000);
}

function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.class-card, .instructor-card, .testimonial-card, .stat-item').forEach(el => {
        observer.observe(el);
    });
}

window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

function setupLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('loading-shimmer');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            img.classList.add('loading-shimmer');
            imageObserver.observe(img);
        });
    }
}

function optimizePerformance() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(filterClasses, 300);
        });
    }

    const criticalImages = [
        'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1920&h=1080&fit=crop&auto=format'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    setupLazyLoading();
    optimizePerformance();
});

// Error handling
window.addEventListener('error', function(event) {
    console.error('JavaScript error:', event.error);
    showToast('Something went wrong. Please refresh the page and try again.', 'error');
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment when service worker is implemented
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}

function improveAccessibility() {
    const buttons = document.querySelectorAll('button:not([aria-label])');
    buttons.forEach(button => {
        if (button.textContent.trim()) {
            button.setAttribute('aria-label', button.textContent.trim());
        }
    });

    const modal = document.getElementById('bookingModal');
    const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length > 0) {
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        modal.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', improveAccessibility);

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        danceClasses,
        filterClasses,
        isValidEmail,
        saveBooking
    };
}
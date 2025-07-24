document.addEventListener('DOMContentLoaded', function() {
    // Initialize carousel with options
    const featuredProductsCarousel = new bootstrap.Carousel('#featuredProductsCarousel', {
        interval: 5000, // Rotate every 5 seconds
        ride: 'carousel', // Enable auto-cycling
        wrap: true // Infinite looping
    });

    // Enhanced Countdown Timer Class
    class CountdownTimer {
        constructor(targetDate, displayElement) {
            this.targetDate = new Date(targetDate);
            this.displayElement = displayElement;
            this.timerInterval = null;
            this.init();
        }

        init() {
            this.updateCountdown();
            this.timerInterval = setInterval(() => this.updateCountdown(), 1000);
        }

        updateCountdown() {
            const now = new Date();
            const diff = this.targetDate - now;

            if (diff <= 0) {
                clearInterval(this.timerInterval);
                this.displaySaleStarted();
                return;
            }

            const { days, hours, minutes, seconds } = this.calculateTimeUnits(diff);
            this.updateDisplay(days, hours, minutes, seconds);
        }

        calculateTimeUnits(diff) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            return { days, hours, minutes, seconds };
        }

        updateDisplay(days, hours, minutes, seconds) {
            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
            
            // Add animation class when numbers change
            this.animateNumberChange('days', days);
            this.animateNumberChange('hours', hours);
            this.animateNumberChange('minutes', minutes);
            this.animateNumberChange('seconds', seconds);
        }

        animateNumberChange(elementId, newValue) {
            const element = document.getElementById(elementId);
            if (element.dataset.lastValue !== newValue.toString()) {
                element.classList.add('number-change');
                setTimeout(() => {
                    element.classList.remove('number-change');
                }, 500);
                element.dataset.lastValue = newValue.toString();
            }
        }

        displaySaleStarted() {
            const timerContainer = document.querySelector('.countdown-timer');
            timerContainer.innerHTML = `
                <div class="sale-started-banner bg-warning text-dark p-3 rounded text-center">
                    <h4 class="mb-2">🎉 Prime Day Sale is LIVE! 🎉</h4>
                    <a href="#products" class="btn btn-danger btn-sm">
                        <i class="fas fa-bolt me-1"></i> Shop Now
                    </a>
                </div>
            `;
        }
    }

    // Initialize the countdown timer
    // Set target date to 7 days from now at 12:00 PM
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);
    targetDate.setHours(12, 0, 0, 0); // Set to noon
    
    new CountdownTimer(
        targetDate,
        document.querySelector('.countdown-timer')
    );

    // Pause carousel on hover
    const carouselElement = document.querySelector('#featuredProductsCarousel');
    carouselElement.addEventListener('mouseenter', () => {
        featuredProductsCarousel.pause();
    });
    
    carouselElement.addEventListener('mouseleave', () => {
        featuredProductsCarousel.cycle();
    });
    
    // Product filtering functionality
    const filterButton = document.getElementById('filterButton');
    if (filterButton) {
        filterButton.addEventListener('click', function() {
            const selectedCategory = document.getElementById('categoryFilter').value;
            const productCards = document.querySelectorAll('#products .col-md-6.col-lg-4');
            
            productCards.forEach(card => {
                if (selectedCategory === 'all' || card.dataset.category === selectedCategory) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Track product clicks (replace with your affiliate tracking logic)
    document.querySelectorAll('.product-card .btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productName = this.closest('.product-card').querySelector('.card-title').textContent;
            console.log(`Affiliate click tracked for: ${productName}`);
            
            // In a real implementation, you would:
            // 1. Send this data to your backend
            // 2. Then redirect to the affiliate link
            window.open(this.getAttribute('href'), '_blank');
        });
    });

    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const email = document.getElementById('email').value;
            if (!email.includes('@')) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            this.reset();
        });
    }
    
    // Newsletter subscription
    const newsletterForm = document.querySelector('footer form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            if (emailInput.value.includes('@')) {
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address');
            }
        });
    }
});
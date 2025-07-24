const affiliateLinks = document.querySelectorAll('.affiliate-link');

affiliateLinks.forEach(link => {
    link.addEventListener('click', () => {
        // You can add tracking code here, for example, using Google Analytics
        console.log('Affiliate link clicked!');
    });
});

const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // In a real application, you would send this data to a server
        console.log('Form submitted:', { name, email, message });
        alert('Thank you for your message!');
        contactForm.reset();
    });
}

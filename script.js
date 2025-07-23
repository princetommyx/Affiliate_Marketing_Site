const affiliateLinks = document.querySelectorAll('.affiliate-link');

affiliateLinks.forEach(link => {
    link.addEventListener('click', () => {
        // You can add tracking code here, for example, using Google Analytics
        console.log('Affiliate link clicked!');
    });
});

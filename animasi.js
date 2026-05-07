document.addEventListener("DOMContentLoaded", () => {

    document.body.style.opacity = "0";
    setTimeout(() => {
        document.body.style.transition = "opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
        document.body.style.opacity = "1";
    }, 50);

    const links = document.querySelectorAll('a[href]');
    
    links.forEach(link => {
        link.addEventListener("click", function(e) {
            const targetUrl = this.getAttribute("href");

            if (
                targetUrl.startsWith("#") || 
                targetUrl.startsWith("http") || 
                this.hasAttribute("data-bs-toggle") || 
                targetUrl === ""
            ) {
                return; 
            }

            const currentUrl = window.location.pathname.split("/").pop() || "index.html";

            if (targetUrl !== currentUrl) {
                e.preventDefault(); 
                
                document.body.style.transition = "opacity 0.6s ease-in-out";
                document.body.style.opacity = "0"; 
                
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 600);
            }
        });
    });

    const navbar = document.querySelector(".custom-navbar");
    if (navbar) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                navbar.style.backgroundColor = "rgba(11, 17, 33, 0.98)";
                navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.5)";
            } else {
                navbar.style.backgroundColor = "rgba(11, 17, 33, 0.85)";
                navbar.style.boxShadow = "none";
            }
        });
    }

    const revealElements = document.querySelectorAll(`
        .hero-text > *, .hero-image-placeholder,
        .feature-card, .vehicle-card, .step-card, .testimonial-card,
        .card-surface > .text-center > *, 
        form .mb-3, form .mb-4, form .col-md-6, form .col-12, form button, form .text-center, 
        .step-item, .detail-mini, .tracking-pay-row, .fake-map, 
        .accordion-item, .section-label, h1, h2, h3, .stat-card
    `);

    revealElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)";
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        const intersectingEntries = entries.filter(entry => entry.isIntersecting);
        
        intersectingEntries.forEach((entry, index) => {
            setTimeout(() => {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                
                setTimeout(() => {
                    entry.target.style.transition = "";
                    entry.target.style.transform = "";
                }, 600);

            }, index * 100); 
            
            observer.unobserve(entry.target);
        });
    }, {
        threshold: 0.1, 
        rootMargin: "0px 0px -20px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));
});
document.addEventListener("DOMContentLoaded", () => {

    const statsSection = document.querySelector(".stats-section");
    if (statsSection) {
        const statNumbers = document.querySelectorAll(".stat-number");
        let hasCounted = false; 

        const countUp = (el) => {
            const target = parseInt(el.innerText.replace(/,/g, '').replace('+', '').replace('%', ''));
            const suffix = el.innerText.replace(/[0-9,]/g, ''); 
            
            let current = 0;
            const increment = target / 50; 

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    el.innerText = Math.ceil(current).toLocaleString('en-US') + suffix;
                    requestAnimationFrame(updateCounter);
                } else {
                    el.innerText = target.toLocaleString('en-US') + suffix;
                }
            };
            updateCounter();
        };

        const statsObserver = new IntersectionObserver((entries) => {
            const entry = entries[0];
            if (entry.isIntersecting && !hasCounted) {
                hasCounted = true;
                setTimeout(() => {
                    statNumbers.forEach(num => countUp(num));
                }, 400); 
            }
        }, { threshold: 0.5 }); 
        
        statsObserver.observe(statsSection);
    }
});
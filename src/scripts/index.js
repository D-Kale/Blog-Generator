
        // Lógica de la Cuenta Regresiva (9 de Mayo)
        const targetDate = new Date("May 9, 2026 16:00:00").getTime();

        function updateCountdown() {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                document.getElementById("countdown").innerHTML = "<p class='font-title text-2xl text-red-600 animate-bounce'>¡Hoy es el Gran Baile!</p>";
                return;
            }

            const d = Math.floor(distance / (1000 * 60 * 60 * 24));
            const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById("days").innerText = d.toString().padStart(2, '0');
            document.getElementById("hours").innerText = h.toString().padStart(2, '0');
            document.getElementById("minutes").innerText = m.toString().padStart(2, '0');
            document.getElementById("seconds").innerText = s.toString().padStart(2, '0');
        }

        setInterval(updateCountdown, 1000);
        updateCountdown();

        // Generador de pétalos mágicos
        function createPetals() {
            const container = document.getElementById('petals');
            for (let i = 0; i < 45; i++) {
                const petal = document.createElement('div');
                petal.className = 'petal';
                petal.style.left = Math.random() * 100 + 'vw';
                petal.style.animationDuration = (Math.random() * 7 + 5) + 's';
                petal.style.animationDelay = (Math.random() * 6) + 's';
                petal.style.opacity = Math.random() * 0.6 + 0.2;
                petal.style.transform = `scale(${Math.random() * 0.6 + 0.4})`;
                container.appendChild(petal);
            }
        }
        createPetals();

        // Observador de elementos (Scroll Reveal)
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
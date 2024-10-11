document.addEventListener('DOMContentLoaded', () => {
    // Seleziona gli elementi del DOM
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const contactForm = document.getElementById('contact-form');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const lavoriItems = document.querySelectorAll('.lavoro-item');

    // Funzione per il toggle del menu mobile
    function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    }

    // Funzione per chiudere il menu mobile
    function closeMobileMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }

    // Event listener per il click sull'hamburger
    hamburger.addEventListener('click', toggleMobileMenu);

    // Event listener per i link del menu (chiude il menu mobile dopo il click)
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Funzione per gestire lo scroll della navbar
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    }

    // Event listener per lo scroll della pagina
    window.addEventListener('scroll', handleNavbarScroll);

    // Smooth scrolling per i link interni
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animazione fade-in per le sezioni
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Funzione per la validazione del form di contatto
    function validateForm(event) {
        event.preventDefault();
        
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        let isValid = true;

        if (name.value.trim() === '') {
            isValid = false;
            showError(name, 'Il nome è obbligatorio');
        } else {
            removeError(name);
        }

        if (email.value.trim() === '') {
            isValid = false;
            showError(email, 'L\'email è obbligatoria');
        } else if (!isValidEmail(email.value)) {
            isValid = false;
            showError(email, 'Inserisci un\'email valida');
        } else {
            removeError(email);
        }

        if (message.value.trim() === '') {
            isValid = false;
            showError(message, 'Il messaggio è obbligatorio');
        } else {
            removeError(message);
        }

        if (isValid) {
            // Qui puoi aggiungere il codice per inviare il form
            alert('Messaggio inviato con successo!');
            event.target.reset();
        }
    }

    // Funzione helper per validare l'email
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Funzione per mostrare errori di validazione
    function showError(input, message) {
        const formControl = input.parentElement;
        const errorElement = formControl.querySelector('.error-message') || document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        if (!formControl.querySelector('.error-message')) {
            formControl.appendChild(errorElement);
        }
        input.classList.add('error');
    }

    // Funzione per rimuovere errori di validazione
    function removeError(input) {
        const formControl = input.parentElement;
        const errorElement = formControl.querySelector('.error-message');
        if (errorElement) {
            formControl.removeChild(errorElement);
        }
        input.classList.remove('error');
    }

    // Event listener per la sottomissione del form
    if (contactForm) {
        contactForm.addEventListener('submit', validateForm);
    }

    // Filtraggio dei lavori
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Rimuovi la classe active da tutti i pulsanti
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Aggiungi la classe active al pulsante cliccato
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            lavoriItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Scorrimento automatico delle immagini per i lavori
    lavoriItems.forEach(item => {
        const images = item.querySelectorAll('.lavoro-images img');
        let currentIndex = 0;

        setInterval(() => {
            images[currentIndex].style.opacity = 0;
            currentIndex = (currentIndex + 1) % images.length;
            images[currentIndex].style.opacity = 1;
        }, 3000); // Cambia immagine ogni 3 secondi
    });
});
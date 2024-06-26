
//------- Active Nav with Scroll -------------//
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header .menu-item a ');
let headerHeight = 100;

document.querySelectorAll('header .menu-item a, .offcanvas-menu .menu-item a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        // Remove 'active' class from all links
        document.querySelectorAll('header .menu-item a, .offcanvas-menu .menu-item a').forEach(link => {
            link.classList.remove('active');
        });

        // Add 'active' class only to the clicked link
        this.classList.add('active');

        // Close offcanvas if open (add this part only if necessary)
        let offcanvas = document.querySelector('.offcanvas.show');
        if (offcanvas) {
            let offcanvasButton = document.querySelector('[data-bs-target="#offcanvasRight"]');

            // Close the offcanvas
            offcanvasButton.click(); 
        }

        // Scroll to the corresponding section
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        const offsetPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

window.onscroll = () => {
    let top = window.scrollY;
    let windowBottom = window.innerHeight + top;
    let docHeight = document.documentElement.scrollHeight;

    sections.forEach((sec) => {
        let offset = sec.offsetTop - headerHeight;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            // Remove 'active' class from all links in the main menu
            navLinks.forEach((link) => {
                link.classList.remove('active');
            });

            // Select and add 'active' class to the link in the main menu
            let activeLink = document.querySelector(`header .menu-item a[href="#${id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }

            // Select and add 'active' class to the link in the offcanvas menu
            let activeLinkCanvas = document.querySelector(`header .offcanvas-menu .menu-item a[href="#${id}"]`);
            if (activeLinkCanvas) {
                activeLinkCanvas.classList.add('active');
            }
        }
    });

    // Check if at the bottom of the page
    if (windowBottom >= docHeight) {
        // Remove 'active' class from all links in the main menu
        navLinks.forEach((link) => {
            link.classList.remove('active');
        });

        // Select and add 'active' class to the last link in the main menu
        let lastSection = sections[sections.length - 1];
        let lastLink = document.querySelector(`header .menu-item a[href="#${lastSection.getAttribute('id')}"]`);
        if (lastLink) {
            lastLink.classList.add('active');
        }

        // Select and add 'active' class to the last link in the offcanvas menu
        let lastLinkCanvas = document.querySelector(`header .offcanvas-menu .menu-item a[href="#${lastSection.getAttribute('id')}"]`);
        if (lastLinkCanvas) {
            lastLinkCanvas.classList.add('active');
        }
    }
};

//--------- Custom succes message ----------//
document.getElementById('newsletter-form').addEventListener('submit', function(e) {
    // Prevent normal form submission
    e.preventDefault(); 

    // Submit the form using Netlify's API
    fetch('/', {
        method: 'POST',
        body: new FormData(this)
    })
    .then(response => {
        // Hide the form
        this.classList.add('d-none'); 

        // Show the success message
        document.getElementById('success-message').classList.remove('d-none'); 

        // Add class to show the success message
        document.getElementById('success-message').classList.add('d-block'); 
    })
    .catch(error => {
        console.error('Error submitting the form', error);
    });
});
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // See More Buttons Logic (Popup Modal)
    const textModal = document.getElementById('text-modal');
    const textModalBody = document.getElementById('text-modal-body');
    const textModalClose = document.querySelector('.text-modal-close');
    const seeMoreBtns = document.querySelectorAll('.see-more-btn');

    seeMoreBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            let moreText = this.parentElement.previousElementSibling;
            
            if (!moreText || !moreText.classList.contains('more-text')) {
                moreText = this.previousElementSibling;
            }

            if (moreText) {
                let excerpt = moreText.previousElementSibling;
                let modalContent = '';

                // Optionally grab headings from the parent section/content
                let h3 = moreText.parentElement.querySelector('h3');
                let h4 = moreText.parentElement.querySelector('h4');
                
                if (h3) modalContent += `<h3 style="color: var(--clr-purple); font-family: var(--font-heading); margin-bottom: 0.5rem; text-align: center;">${h3.innerText}</h3>`;
                if (h4) modalContent += `<h4 style="color: var(--clr-pink); font-family: var(--font-heading); margin-bottom: 1.5rem; text-align: center;">${h4.innerText}</h4>`;

                if (excerpt && excerpt.tagName === 'P') {
                    modalContent += `<p style="font-weight: 800; font-size: 1.2rem;">${excerpt.innerHTML}</p><hr style="border: 2px dashed var(--clr-pink); margin: 1.5rem 0;">`;
                }
                
                modalContent += moreText.innerHTML;

                if (textModalBody) {
                    textModalBody.innerHTML = modalContent;
                }
                
                if (textModal) {
                    textModal.style.display = 'flex';
                    textModal.style.justifyContent = 'center';
                    textModal.style.alignItems = 'center';
                    document.body.style.overflow = 'hidden';
                }
            }
        });
    });

    if (textModal && textModalClose) {
        textModalClose.addEventListener('click', () => {
            textModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        textModal.addEventListener('click', (e) => {
            if (e.target === textModal) {
                textModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Dynamic Random Gallery Logic
    const galleryContainer = document.getElementById('dynamic-gallery');
    if (galleryContainer) {
        // List of 70 images from the Album folder
        const allImages = [
            "IMG_0102.JPG", "IMG_0103.JPG", "IMG_0104.JPG", "IMG_0105.JPG", "IMG_0106.JPG", "IMG_0107.JPG", "IMG_0108.JPG", "IMG_0109.JPG", "IMG_0111.JPG", "IMG_0112.JPG",
            "IMG_0113.JPG", "IMG_0114.JPG", "IMG_0115.JPG", "IMG_0116.JPG", "IMG_0117.JPG", "IMG_0118.JPG", "IMG_0119.JPG", "IMG_0120.JPG", "IMG_0121.JPG", "IMG_0122.JPG",
            "IMG_0123.JPG", "IMG_0124.JPG", "IMG_0125.JPG", "IMG_0126.JPG", "IMG_0127.JPG", "IMG_0128.JPG", "IMG_0129.JPG", "IMG_0130.JPG", "IMG_0131.JPG", "IMG_0132.JPG",
            "IMG_0133.JPG", "IMG_0134.JPG", "IMG_0135.JPG", "IMG_0136.JPG", "IMG_0137.JPG", "IMG_0138.JPG", "IMG_0139.JPG", "IMG_0140.JPG", "IMG_0149.JPG", "IMG_0201.JPG",
            "IMG_0202.JPG", "IMG_0203.JPG", "IMG_0204.JPG", "IMG_0205.JPG", "IMG_0206.JPG", "IMG_0207.JPG", "IMG_0208.JPG", "IMG_0209.JPG", "IMG_0210.JPG", "IMG_0211.JPG",
            "IMG_0877.JPG", "IMG_0878.JPG", "IMG_0879.JPG", "IMG_0880.JPG", "IMG_0881.JPG", "IMG_0882.JPG", "IMG_0883.JPG", "IMG_0958.JPG", "IMG_1124.JPG", "IMG_1125.JPG",
            "IMG_1126.JPG", "IMG_1127.JPG", "IMG_1128.JPG", "IMG_1252.JPG", "IMG_1588.JPG", "IMG_1725.JPG", "IMG_1819.JPG", "IMG_1840.JPG", "IMG_1843.JPG", "IMG_1857.JPG"
        ];

        // Shuffle array and pick 8 random images
        const shuffled = allImages.sort(() => 0.5 - Math.random());
        const selectedImages = shuffled.slice(0, 8);

        // Generate HTML for the selected images
        selectedImages.forEach((imgSrc, index) => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            
            const img = document.createElement('img');
            img.src = `Album/${imgSrc}`;
            img.alt = `Dokumentasi ${index + 1}`;
            img.className = 'gallery-img';
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            img.style.display = 'block';
            img.style.cursor = 'pointer'; // indicates it can be clicked
            
            item.appendChild(img);
            galleryContainer.appendChild(item);
        });
    }

    // Lightbox Logic
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');

    if (lightbox && galleryContainer) {
        // Event delegation for dynamically added images
        galleryContainer.addEventListener('click', function(e) {
            if (e.target.tagName === 'IMG') {
                lightbox.style.display = 'flex';
                lightbox.style.justifyContent = 'center';
                lightbox.style.alignItems = 'center';
                lightboxImg.src = e.target.src;
                document.body.style.overflow = 'hidden'; // prevent background scrolling
            }
        });

        // Close when X is clicked
        closeBtn.addEventListener('click', () => {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        // Close when clicking outside the image
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Handle Comment Submission
    const commentForm = document.getElementById('comment-form');
    const commentsList = document.getElementById('comments-list');

    if (commentForm && commentsList) {
        commentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameInput = commentForm.querySelector('input');
            const messageInput = commentForm.querySelector('textarea');
            const name = nameInput.value;
            const message = messageInput.value;
            
            if(name && message) {
                const commentEl = document.createElement('div');
                commentEl.className = 'comment-card bounce-in';
                const colors = ['var(--clr-cyan)', 'var(--clr-yellow)', 'var(--clr-pink)', 'var(--clr-purple)'];
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                commentEl.style.borderColor = randomColor;
                commentEl.style.boxShadow = `6px 6px 0 ${randomColor}`;
                
                commentEl.innerHTML = `
                    <h4>${name}</h4>
                    <p>${message}</p>
                `;
                commentsList.prepend(commentEl);
                nameInput.value = '';
                messageInput.value = '';
            }
        });

        const initialComments = [
            { name: "Siti Rahma", message: "Wah acaranya seru banget! Anak-anak pasti suka! Nggak sabar nunggu hari H nya.", color: "var(--clr-cyan)" },
            { name: "Budi Santoso", message: "Tahun lalu saya ke Pasar Wutah, jajanannya enak-enak dan harganya terjangkau. Recommended buat keluarga!", color: "var(--clr-pink)" }
        ];

        initialComments.forEach(c => {
            const commentEl = document.createElement('div');
            commentEl.className = 'comment-card';
            commentEl.style.borderColor = c.color;
            commentEl.style.boxShadow = `6px 6px 0 ${c.color}`;
            commentEl.innerHTML = `<h4>${c.name}</h4><p>${c.message}</p>`;
            commentsList.appendChild(commentEl);
        });
    }

    // Smooth scrolling for navigation links
    const navbarHeight = document.querySelector('.navbar').offsetHeight;

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if(target) {
                // Close mobile menu if open
                if(navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
                
                // Calculate position accurately
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight - 10;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ScrollSpy: Highlight nav links on scroll
    const sections = document.querySelectorAll('section, header');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - navbarHeight - 50)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(a => {
            a.classList.remove('active-nav');
            if (a.getAttribute('href') === `#${current}`) {
                a.classList.add('active-nav');
            }
        });
    });
});

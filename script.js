document.addEventListener('DOMContentLoaded', () => {
    // GSAP Register
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

    // 1. Initial Hero Animations
    const heroTl = gsap.timeline();
    
    // Advanced Text Reveal for Headline
    const headline = document.querySelector(".hero-headline");
    if(headline) {
        // Helper to split text into chars without breaking HTML structure (simple version)
        // We will target the text nodes specifically or just animate the span vs the parent text
        // For a robust effect without SplitText, let's treat the <br> and <span> structure carefully.
        
        // Let's animate the main text and the span separately but with a sophisticated ease
        const mainText = headline.childNodes[0]; // "Where will your"
        const italicSpan = headline.querySelector(".italic");
        
        // Wrap "Where will your" in a span if not already (it's a text node)
        if (mainText.nodeType === 3) {
             const wrapper = document.createElement('span');
             wrapper.style.display = 'inline-block';
             wrapper.textContent = mainText.textContent.trim();
             headline.replaceChild(wrapper, mainText);
             
             // Now split this wrapper into words
             const words = wrapper.textContent.split(" ");
             wrapper.innerHTML = "";
             words.forEach(word => {
                 const wordSpan = document.createElement("span");
                 wordSpan.style.display = "inline-block";
                 wordSpan.style.overflow = "hidden";
                 wordSpan.style.verticalAlign = "top";
                 wordSpan.style.marginRight = "0.3em"; // space
                 
                 const innerSpan = document.createElement("span");
                 innerSpan.textContent = word;
                 innerSpan.style.display = "inline-block";
                 innerSpan.className = "char-reveal";
                 
                 wordSpan.appendChild(innerSpan);
                 wrapper.appendChild(wordSpan);
             });
        }
        
        // Split the italic span words too
        if (italicSpan) {
             const iWords = italicSpan.textContent.split(" ");
             italicSpan.innerHTML = "";
             italicSpan.style.display = 'inline-block'; // ensure it respects transforms
             
             iWords.forEach(word => {
                 const wordSpan = document.createElement("span");
                 wordSpan.style.display = "inline-block";
                 wordSpan.style.overflow = "hidden";
                 wordSpan.style.verticalAlign = "top";
                 wordSpan.style.marginRight = "0.3em";
                 
                 const innerSpan = document.createElement("span");
                 innerSpan.textContent = word;
                 innerSpan.style.display = "inline-block";
                 innerSpan.className = "char-reveal-italic";
                 
                 wordSpan.appendChild(innerSpan);
                 italicSpan.appendChild(wordSpan);
             });
        }

        // Animate the generated spans
        heroTl.from(".char-reveal", {
            y: 100,
            opacity: 0,
            duration: 1.2,
            stagger: 0.05,
            ease: "power4.out"
        })
        .from(".char-reveal-italic", {
            y: 100,
            opacity: 0,
            duration: 1.2,
            stagger: 0.05,
            ease: "power4.out"
        }, "-=1.0"); // Overlap slightly
    }

    // Animate other reveal elements (excluding headline elements if they still have reveal class)
    heroTl.to(".reveal:not(.hero-headline)", {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out"
    }, "-=0.5");

    // 2. Fixed Plane Position (Static)
    gsap.set("#planeMarker", {
        motionPath: {
            path: "#planePath",
            align: "#planePath",
            autoRotate: true,
            alignOrigin: [0.5, 0.5],
            start: 0.75 // Position it 75% along the path
        }
    });

    // 3. Scroll Reveal for Destinations
    gsap.to(".destinations-grid", {
        scrollTrigger: {
            trigger: ".destinations-container",
            start: "top 95%",
            toggleActions: "play none none none"
        },
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out"
    });

    // 4. Background Carousel Logic
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function nextSlide() {
        // Animation for the outgoing slide
        gsap.to(slides[currentSlide], {
            opacity: 0,
            duration: 2,
            scale: 1.1, // Reset scale for next time
            ease: "power2.inOut"
        });

        // Update index
        currentSlide = (currentSlide + 1) % slides.length;

        // Animation for the incoming slide
        gsap.fromTo(slides[currentSlide], 
            { opacity: 0, scale: 1.2 }, 
            { 
                opacity: 1, 
                scale: 1, 
                duration: 6, // Long duration for slow zoom/pan effect
                ease: "linear"
            }
        );
    }

    // Initial state for first slide
    gsap.set(slides[0], { opacity: 1, scale: 1 });
    
    // Start interval
    setInterval(nextSlide, 7000); // Change every 7 seconds

    // 5. Section Title Reveal
    gsap.to(".next-section-title", {
        scrollTrigger: {
            trigger: ".next-section-title",
            start: "top 90%",
            toggleActions: "play none none none"
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
    });

    // 6. Custom Dropdown Logic
    const dropdowns = document.querySelectorAll('.custom-select-wrapper');
    let selectedDestination = null;

    const destinations = {
        'bali': {
            name: 'Bali',
            image: 'assets/bali.png',
            desc: 'Discover the lush landscapes and vibrant culture of Bali, an island paradise.'
        },
        'cambodia': {
            name: 'Cambodia',
            image: 'assets/cambodia.png',
            desc: 'Explore the ancient temples and rich history of the Kingdom of Wonder.'
        },
        'indonesia': {
            name: 'Indonesia',
            image: 'assets/indonesia.png',
            desc: 'Adventure through the diverse archipelago of Indonesia, a land of endless wonders.'
        },
        'goa': {
            name: 'Goa',
            image: 'assets/goa.png',
            desc: 'Relax on the sun-kissed beaches and enjoy the vibrant nightlife of Goa.'
        },
        'manali': {
            name: 'Manali',
            image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=800',
            desc: 'Breathe in the fresh mountain air and witness the majestic snow-capped peaks of Manali.'
        },
        'bangalore': {
            name: 'Bangalore',
            image: 'assets/bangalore.png',
            desc: 'Experience the perfect blend of modern tech and lush gardens in the Garden City.'
        }
    };

    dropdowns.forEach(wrapper => {
        const trigger = wrapper.querySelector('.custom-select-trigger');
        const options = wrapper.querySelectorAll('.custom-option');
        const selectedText = wrapper.querySelector('.selected-text');

        // Toggle Open
        trigger.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent document click from closing immediately
            
            // Close other dropdowns first
            dropdowns.forEach(otherWrapper => {
                if(otherWrapper !== wrapper) {
                    otherWrapper.classList.remove('open');
                }
            });
            
            wrapper.classList.toggle('open');
        });

        // Select Option
        options.forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation(); 
                
                // Clear other dropdowns (Mutual Selection Logic)
                dropdowns.forEach(otherWrapper => {
                    if(otherWrapper !== wrapper) {
                        const otherSelectedText = otherWrapper.querySelector('.selected-text');
                        const otherOptions = otherWrapper.querySelectorAll('.custom-option');
                        
                        otherSelectedText.textContent = "Select Destination";
                        otherSelectedText.style.color = "#666"; // Reset color to muted
                        otherOptions.forEach(opt => opt.classList.remove('selected'));
                    }
                });

                // Update Text
                selectedText.textContent = option.textContent;
                selectedText.style.color = "#1a1a1a";
                
                // Visual Selection State
                options.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                
                // Set selected destination
                selectedDestination = option.dataset.value;
                console.log(`Selected: ${selectedDestination}`);
                
                // Close Dropdown
                wrapper.classList.remove('open');
            });
        });
    });

    // Close when clicking outside
    document.addEventListener('click', () => {
        dropdowns.forEach(wrapper => {
            wrapper.classList.remove('open');
        });
    });

    // Search Button Logic (Screenshot Capture Style)
    const searchBtn = document.querySelector('.search-btn');
    const destinationModal = document.getElementById('destination-modal');
    const searchResultContainer = document.getElementById('search-results'); 
    const wishlistContainer = document.getElementById('wishlist-container');
    const wishlistThumb = document.getElementById('wishlist-thumb');
    const wishlistCount = document.querySelector('.wishlist-count');
    const flashOverlay = document.querySelector('.flash-overlay');
    const wishlist = new Set();

    // Show Mandatory Modal on Load
    if (destinationModal) {
        document.body.style.overflow = 'hidden'; // Lock scroll
        gsap.from(".destination-modal .search-container", {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out", // Simplified non-bouncy ease
            delay: 0.3
        });
    }

    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            if (!selectedDestination) {
                // Show a more prominent error since it's mandatory
                gsap.to(".search-panel", { x: 10, repeat: 3, yoyo: true, duration: 0.1 });
                return;
            }

            // Close Modal and transition to booking
            if (destinationModal) {
                gsap.to(destinationModal, { 
                    opacity: 0, 
                    y: -20,
                    duration: 0.5, 
                    onComplete: () => {
                        destinationModal.style.display = 'none';
                        document.body.style.overflow = 'auto';
                        
                        // Auto-select in booking flow and jump to Step 2
                        bookingData.destination = selectedDestination;
                        currentStep = 2;
                        renderStep();
                        
                        // Scroll to booking section
                        const bookingSection = document.getElementById('booking-flow-section');
                        if (bookingSection) {
                            bookingSection.scrollIntoView({ behavior: 'smooth' });
                        }
                    }
                });
            }
        });
    }

    // --- MULTI-STEP BOOKING FLOW LOGIC ---
    let currentStep = 1;
    let bookingData = {
        destination: null,
        resort: null,
        details: {}
    };

    const resortsData = {
        'bali': [
            { name: 'Ayana Resort', price: 'Starts at $450/night', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800', features: ['Ocean Front', 'Infinity Pool', 'Private Beach'] },
            { name: 'Ubud Rainforest Retreat', price: 'Starts at $250/night', img: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&q=80&w=800', features: ['Jungle View', 'Yoga Deck', 'Eco-Luxury'] }
        ],
        'cambodia': [
            { name: 'Amansara', price: 'Starts at $1200/night', img: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=800', features: ['Ancient Vibes', 'Luxury Suites', 'Private Tours'] }
        ],
        'indonesia': [
            { name: 'Nihi Sumba', price: 'Starts at $1500/night', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800', features: ['Surfing', 'Eco-Luxury', 'Private Safaris'] }
        ],
        'goa': [
            { name: 'Taj Exotica', price: 'Starts at $350/night', img: 'https://images.unsplash.com/photo-1540202404-a2f2903388a1?auto=format&fit=crop&q=80&w=800', features: ['Beach Access', 'Fine Dining', 'Poolside Bar'] },
            { name: 'W Goa', price: 'Starts at $400/night', img: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=800', features: ['Nightlife', 'Modern Design', 'Rock Spa'] }
        ],
        'manali': [
            { name: 'Span Resort', price: 'Starts at $200/night', img: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=800', features: ['River Side', 'Fruit Orchard', 'Mountain View'] }
        ],
        'bangalore': [
            { name: 'The Leela Palace', price: 'Starts at $250/night', img: 'assets/bangalore.png', features: ['Royal Style', 'City Center', 'Art Gallery'] }
        ]
    };

    const bookingContent = document.getElementById('booking-content');
    const stepIndicators = document.querySelectorAll('.mag-step');

    function updateProgress() {
        stepIndicators.forEach(indicator => {
            const step = parseInt(indicator.dataset.step);
            indicator.classList.remove('active', 'completed');
            if (step === currentStep) indicator.classList.add('active');
            if (step < currentStep) indicator.classList.add('completed');
        });
    }

    function renderStep() {
        if (!bookingContent) return;
        bookingContent.innerHTML = '';
        let html = '';

        if (currentStep === 1) {
            html = `
                <div class="step-content">
                    <div class="mag-step-title">
                        <h2>Choose Your Journey</h2>
                        <p>Explore our curated selection of global retreats.</p>
                    </div>
                    <div class="mag-dest-grid">
                        ${Object.entries(destinations).map(([code, dest]) => `
                            <div class="mag-dest-card" data-dest="${code}">
                                <img src="${dest.image}" alt="${dest.name}">
                                <div class="mag-dest-overlay"></div>
                                <div class="mag-dest-info">
                                    <span class="dest-cat">${code === 'bali' || code === 'cambodia' || code === 'indonesia' ? 'INTERNATIONAL' : 'INDIA'}</span>
                                    <h4>${dest.name}</h4>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        } else if (currentStep === 2) {
            const destResorts = resortsData[bookingData.destination] || [];
            const selectedResort = bookingData.resort || destResorts[0];
            
            html = `
                <div class="step-content">
                    <div class="mag-step-title">
                        <h2>Select Luxury</h2>
                        <p>Immerse yourself in ${destinations[bookingData.destination].name}</p>
                    </div>
                    <div class="mag-explorer">
                        <!-- Left Preview -->
                        <div class="mag-explorer-preview" id="resort-preview-pane">
                            <img src="${selectedResort.img}" alt="${selectedResort.name}">
                            <div class="mag-resort-details">
                                <h3 id="preview-resort-name">${selectedResort.name}</h3>
                                <p id="preview-resort-price">${selectedResort.price}</p>
                            </div>
                        </div>
                        
                        <!-- Right Selection List -->
                        <div class="mag-explorer-list">
                            ${destResorts.map(resort => {
                                const resortJson = JSON.stringify(resort).replace(/'/g, "&apos;");
                                return `
                                    <div class="mag-resort-item ${bookingData.resort?.name === resort.name ? 'selected' : ''}" data-resort='${resortJson}'>
                                        <h4>${resort.name}</h4>
                                        <span class="price">${resort.price}</span>
                                        <p style="margin-top: 0.5rem; color: #888; font-size: 0.8rem;">${resort.features.join(' • ')}</p>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                    <div class="mag-nav-bar">
                        <button class="mag-btn-back btn-prev">Change Destination</button>
                    </div>
                </div>
            `;
        } else if (currentStep === 3) {
            html = `
                <div class="step-content">
                    <div class="mag-step-title">
                        <h2>Finalize Experience</h2>
                        <p>Your journey is just one click away.</p>
                    </div>
                    <div class="mag-summary-layout">
                        <!-- Journey Ticket -->
                        <div class="mag-journey-ticket">
                            <div class="ticket-header">
                                <span style="letter-spacing: 5px; color: #ddd; font-weight: 900;">BOARDING PASS</span>
                            </div>
                            <div class="ticket-detail">
                                <label>Destination</label>
                                <span>${destinations[bookingData.destination].name}</span>
                            </div>
                            <div class="ticket-detail">
                                <label>Resort Selection</label>
                                <span>${bookingData.resort.name}</span>
                            </div>
                            <div class="ticket-detail">
                                <label>Rate Estimate</label>
                                <span>${bookingData.resort.price}</span>
                            </div>
                        </div>

                        <!-- Modern Enquiry Form -->
                        <form class="mag-enquiry-form">
                            <div class="mag-input-group">
                                <label>FULL NAME</label>
                                <input type="text" placeholder="John Doe" required>
                            </div>
                            <div class="mag-input-group">
                                <label>EMAIL ADDRESS</label>
                                <input type="email" placeholder="john@example.com" required>
                            </div>
                            <div class="mag-input-group">
                                <label>PHONE NUMBER</label>
                                <input type="tel" placeholder="+91 XXX XXX XXXX" required>
                            </div>
                            <div class="mag-input-group">
                                <label>TRAVEL DATE</label>
                                <input type="date" required>
                            </div>
                            <button type="submit" class="mag-submit-btn">Reserve Now</button>
                        </form>
                    </div>
                    <div class="mag-nav-bar">
                        <button class="mag-btn-back btn-prev">Change Resort</button>
                    </div>
                </div>
            `;
        }

        bookingContent.innerHTML = html;
        attachStepListeners();
        updateProgress();
    }

    function attachStepListeners() {
        // Step 1: Destination Selection
        const destCards = bookingContent.querySelectorAll('.mag-dest-card');
        destCards.forEach(card => {
            card.addEventListener('click', () => {
                bookingData.destination = card.dataset.dest;
                currentStep = 2;
                renderStep();
                document.getElementById('booking-flow-section').scrollIntoView({ behavior: 'smooth' });
            });
        });

        // Step 2: Resort Selection
        const resortItems = bookingContent.querySelectorAll('.mag-resort-item');
        resortItems.forEach(item => {
            item.addEventListener('mouseover', () => {
               const resort = JSON.parse(item.dataset.resort);
               const previewImg = bookingContent.querySelector('#resort-preview-pane img');
               const previewName = bookingContent.querySelector('#preview-resort-name');
               const previewPrice = bookingContent.querySelector('#preview-resort-price');
               
               if (previewImg) previewImg.src = resort.img;
               if (previewName) previewName.textContent = resort.name;
               if (previewPrice) previewPrice.textContent = resort.price;

               // Highlight selected item
               resortItems.forEach(i => i.classList.remove('selected'));
               item.classList.add('selected');
            });

            item.addEventListener('click', () => {
                bookingData.resort = JSON.parse(item.dataset.resort);
                currentStep = 3;
                renderStep();
                document.getElementById('booking-flow-section').scrollIntoView({ behavior: 'smooth' });
            });
        });

        // Navigation
        const btnPrev = bookingContent.querySelector('.btn-prev');
        if (btnPrev) {
            btnPrev.addEventListener('click', () => {
                currentStep--;
                renderStep();
            });
        }

        // Form Submission
        const form = bookingContent.querySelector('.mag-enquiry-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Success! Your journey is being curated. We will contact you soon.');
                window.location.reload();
            });
        }
    }

    // Initialize Step 1
    renderStep();

});

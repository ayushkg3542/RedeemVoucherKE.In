$(document).ready(function() {
    // GSAP Register
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

    // Custom phone validation: no leading 0, digits only, no spaces, not all same digit
    $.validator.addMethod("validPhone", function(value, element) {
        if (!value) return false;
        var digits = value.replace(/\s/g, '').replace(/\D/g, '');
        if (digits.length !== 10) return false;
        if (digits.charAt(0) === '0') return false;
        if (/^(\d)\1{9}$/.test(digits)) return false; // reject 1111111111, 2222222222, etc.
        return true;
    }, "Please enter a valid 10-digit phone number (cannot start with 0, no spaces or special characters, and cannot be all same digits).");

    // Date fields: year must not be more than 2026
    $.validator.addMethod("maxYear2026", function(value, element) {
        if (!value) return true; // let required handle empty
        var parts = value.split('-');
        if (parts.length !== 3) return false;
        var y = parseInt(parts[0], 10);
        return !isNaN(y) && y <= 2026;
    }, "Year cannot be after 2026.");

    // Helper function to save to PHP session
    async function saveToSession(type, value) {
        try {
            const response = await fetch('save-session.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ type: type, value: value })
            });
            const result = await response.json();
            if (result.success) {
                console.log(result.message);
                return true;
            } else {
                console.error('Error saving to session:', result.message);
                return false;
            }
        } catch (error) {
            console.error('Error saving to session:', error);
            return false;
        }
    }

    // Helper function to load from PHP session
    async function loadFromSession() {
        try {
            const response = await fetch('get-session.php');
            const result = await response.json();
            if (result.success && result.data) {
                return result.data;
            }
            return { location: null, destination: null, resort: null };
        } catch (error) {
            console.error('Error loading from session:', error);
            return { location: null, destination: null, resort: null };
        }
    }

    // 1. Initial Hero Animations
    const heroTl = gsap.timeline();

    // Advanced Text Reveal for Headline
    const $headline = $(".hero-headline");
    if ($headline.length) {
        const headline = $headline[0];
        // Let's animate the main text and the span separately but with a sophisticated ease
        const mainText = headline.childNodes[0]; // "Where will your"
        const $italicSpan = $headline.find(".italic");

        // Wrap "Where will your" in a span if not already (it's a text node)
        if (mainText && mainText.nodeType === 3) {
            const $wrapper = $('<span>').css('display', 'inline-block');
            $wrapper.text($(mainText).text().trim());
            $(mainText).replaceWith($wrapper);

            // Now split this wrapper into words
            const words = $wrapper.text().split(" ");
            $wrapper.empty();
            words.forEach(word => {
                const $wordSpan = $('<span>').css({
                    display: "inline-block",
                    overflow: "hidden",
                    verticalAlign: "top",
                    marginRight: "0.3em"
                });

                const $innerSpan = $('<span>').text(word).css({
                    display: "inline-block"
                }).addClass("char-reveal");

                $wordSpan.append($innerSpan);
                $wrapper.append($wordSpan);
            });
        }

        // Split the italic span words too
        if ($italicSpan.length) {
            const iWords = $italicSpan.text().split(" ");
            $italicSpan.empty().css('display', 'inline-block');

            iWords.forEach(word => {
                const $wordSpan = $('<span>').css({
                    display: "inline-block",
                    overflow: "hidden",
                    verticalAlign: "top",
                    marginRight: "0.3em"
                });

                const $innerSpan = $('<span>').text(word).css({
                    display: "inline-block"
                }).addClass("char-reveal-italic");

                $wordSpan.append($innerSpan);
                $italicSpan.append($wordSpan);
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
    const $slides = $('.slide');
    let currentSlide = 0;

    function nextSlide() {
        // Animation for the outgoing slide
        gsap.to($slides[currentSlide], {
            opacity: 0,
            duration: 2,
            scale: 1.1, // Reset scale for next time
            ease: "power2.inOut"
        });

        // Update index
        currentSlide = (currentSlide + 1) % $slides.length;

        // Animation for the incoming slide
        gsap.fromTo($slides[currentSlide],
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
    if ($slides.length > 0) {
        gsap.set($slides[0], { opacity: 1, scale: 1 });
    }

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
    const $dropdowns = $('.custom-select-wrapper');
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

    // Vista Location Selection
    const $vistaOptions = $('.vista-option');
    $vistaOptions.on('click', function() {
        $vistaOptions.removeClass('selected');
        $(this).addClass('selected');
        selectedDestination = $(this).data('value');
    });

    window.selectLocation = function (val) {
        selectedDestination = val;
        $vistaOptions.each(function() {
            $(this).toggleClass('selected', $(this).data('value') === val);
        });

        if (!selectedDestination) return;

        // Reset Booking Data when location changes
        bookingData = {
            destination: null,
            resort: null
        };

        // Store Location in PHP session and update local sessionData immediately
        const locationName = destinations[selectedDestination].name;
        sessionData.location = locationName; // Update local sessionData immediately
        saveToSession('location', locationName);

        // Update banner location badge (top right corner)
        const $bannerBadge = $('#banner-location-badge');
        const $bannerText = $('#banner-location-text');
        if ($bannerBadge.length && $bannerText.length) {
            $bannerText.text(locationName);
            $bannerBadge.css('display', 'flex');
            
            // Animate in
            gsap.fromTo($bannerBadge[0], 
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
            );
        }

        // Close modal and proceed
        if ($destinationModal.length) {
            gsap.to($destinationModal[0], {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    $destinationModal.css('display', 'none');
                    $('body').css('overflow', 'auto');

                    // Reset sections: show Step 1 again, hide others
                    const $step1 = $('#journey-step-1');
                    const $step2 = $('#journey-step-2');
                    const $step3 = $('#journey-step-3');
                    const $gallery = $('#journey-gallery');
                    if ($step1.length) $step1.css('display', 'block');
                    if ($step2.length) $step2.css('display', 'none');
                    if ($step3.length) $step3.css('display', 'none');
                    // journey-gallery was removed, but keep guard just in case
                    if ($gallery.length) $gallery.css('display', 'none');

                    currentStep = 1;
                    renderStep();
                    updateProgress(1);

                    if ($step1.length) {
                        $step1[0].scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        }
    };

    // 7. Sticky Header & Steps Logic with Location Badge
    const $heroSteps = $('#hero-steps');
    const $hero = $('.hero');
    const $bannerBadge = $('#banner-location-badge');

    if ($heroSteps.length && $hero.length) {
        $(window).on('scroll', function() {
            const scrollY = $(window).scrollTop();
            const heroHeight = $hero.outerHeight();
            const triggerPoint = heroHeight - 150;

            if (scrollY > triggerPoint) {
                // Hide location badge
                if ($bannerBadge.length && $bannerBadge.css('display') !== 'none') {
                    gsap.to($bannerBadge[0], {
                        opacity: 0,
                        y: -20,
                        duration: 0.4,
                        onComplete: () => {
                            $bannerBadge.css('display', 'none');
                        }
                    });
                }

                // Show step progress and make it sticky as header
                if ($heroSteps.css('display') === 'none') {
                    $heroSteps.css('display', 'flex');
                    gsap.fromTo($heroSteps[0],
                        { opacity: 0, y: -20 },
                        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
                    );
                }

                if (!$heroSteps.hasClass('sticky')) {
                    $heroSteps.addClass('sticky');
                }
            } else {
                // Show location badge if location is selected (will be loaded from session)
                // Note: This check happens during scroll, session data is loaded on page load
                if ($bannerBadge.length && $bannerBadge.css('display') === 'none') {
                    $bannerBadge.css('display', 'flex');
                    gsap.fromTo($bannerBadge[0],
                        { opacity: 0, y: -20 },
                        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
                    );
                }

                // Hide step progress
                if ($heroSteps.hasClass('sticky')) {
                    $heroSteps.removeClass('sticky');
                    gsap.to($heroSteps[0], {
                        opacity: 0,
                        duration: 0.3,
                        onComplete: () => {
                            $heroSteps.css('display', 'none');
                        }
                    });
                }
            }
        });
    }

    // Location Step Click Trigger
    const $locationStep = $('.timeline-step[data-step="location"]');
    if ($locationStep.length) {
        $locationStep.on('click', function() {
            if ($destinationModal.length) {
                $destinationModal.css('display', 'flex');
                $('body').css('overflow', 'hidden');
                gsap.fromTo(".vista-style",
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
                );
            }
        });
    }

    // Search Button Logic (REMOVED as it is now direct execution)
    const $destinationModal = $('#destination-modal');

    // Load session data on page load
    let sessionData = { location: null, destination: null, resort: null };
    
    // Load session data asynchronously
    loadFromSession().then(data => {
        sessionData = data;
        
        // Show Mandatory Modal on Load if no location is selected
        if ($destinationModal.length && !sessionData.location) {
            setTimeout(() => {
                $destinationModal.css('display', 'flex');
                $('body').css('overflow', 'hidden');
                gsap.from(".vista-style", {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    delay: 0.2
                });
            }, 500);
        }

        // Load stored location from session
        if (sessionData.location) {
            // Update banner location badge
            const $bannerBadge = $('#banner-location-badge');
            const $bannerText = $('#banner-location-text');
            const $headerLocationValue = $('#header-location-value');

            if ($bannerBadge.length && $bannerText.length) {
                $bannerText.text(sessionData.location);
                $bannerBadge.css('display', 'flex');
            }

            if ($headerLocationValue.length) {
                $headerLocationValue.text(sessionData.location);
            }

            // Legacy support for old location badge (if exists)
            const $locationBadge = $('#header-location');
            const $locationText = $('#location-text');
            if ($locationBadge.length && $locationText.length) {
                $locationText.text(sessionData.location);
                $locationBadge.css('visibility', 'visible');
            }
        }

        // Load destination from session
        if (sessionData.destination) {
            bookingData.destination = sessionData.destination;
        }

        // Load resort from session
        if (sessionData.resort) {
            try {
                bookingData.resort = JSON.parse(sessionData.resort);
            } catch (e) {
                console.error('Error parsing resort data from session:', e);
            }
        }

        // Update progress based on session data
        if (sessionData.location) {
            updateProgress(1);
        }
        if (sessionData.destination) {
            updateProgress(2);
        }
        if (sessionData.resort) {
            updateProgress(3);
        }

        // Re-render step 1 with session data
        renderStep();
    });

    // --- MULTI-STEP BOOKING FLOW LOGIC ---
    let currentStep = 1;
    let bookingData = {
        destination: null,
        resort: null
    };

    const resortsData = {
        'bali': [
            {
                name: 'Ayana Resort',
                price: 'Starts at $450/night',
                img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
                features: ['Ocean Front', 'Infinity Pool', 'Private Beach'],
                gallery: [
                    'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&q=80&w=600',
                    'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&q=80&w=600',
                    'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&q=80&w=600',
                    'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&q=80&w=600',
                    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600',
                    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=600'
                ]
            },
            {
                name: 'Ubud Rainforest Retreat',
                price: 'Starts at $250/night',
                img: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&q=80&w=800',
                features: ['Jungle View', 'Yoga Deck', 'Eco-Luxury'],
                gallery: [
                    'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=600',
                    'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600',
                    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=600',
                    'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&q=80&w=600',
                    'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&q=80&w=600',
                    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600'
                ]
            },
            {
                name: 'Seminyak Sands Villa',
                price: 'Starts at $320/night',
                img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800',
                features: ['Beachfront', 'Private Chef', 'Sunset Terrace'],
                gallery: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600']
            },
            {
                name: 'Mount Agung Vista',
                price: 'Starts at $180/night',
                img: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800',
                features: ['Mountain Trek', 'Infinity Pool', 'Himalayan Breeze'],
                gallery: ['https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=600']
            },
            {
                name: 'Canggu Coastal Club',
                price: 'Starts at $280/night',
                img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800',
                features: ['Surf Lessons', 'Pool Parties', 'Modern Suites'],
                gallery: ['https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=600']
            },
            {
                name: 'Nusa Dua Sanctuary',
                price: 'Starts at $550/night',
                img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
                features: ['Golf Course', 'Awarded Spa', 'Royal Service'],
                gallery: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600']
            }
        ],
        'cambodia': [
            {
                name: 'Amansara',
                price: 'Starts at $1200/night',
                img: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=800',
                features: ['Ancient Vibes', 'Luxury Suites', 'Private Tours'],
                gallery: [
                    'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=600',
                    'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600',
                    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=600',
                    'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&q=80&w=600',
                    'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&q=80&w=600',
                    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600'
                ]
            }
        ],
        'indonesia': [
            {
                name: 'Nihi Sumba',
                price: 'Starts at $1500/night',
                img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
                features: ['Surfing', 'Eco-Luxury', 'Private Safaris'],
                gallery: [
                    'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=600',
                    'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600',
                    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=600',
                    'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&q=80&w=600',
                    'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&q=80&w=600',
                    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600'
                ]
            }
        ],
        'goa': [
            {
                name: 'Taj Exotica',
                price: 'Starts at $350/night',
                img: 'https://images.unsplash.com/photo-1540202404-a2f2903388a1?auto=format&fit=crop&q=80&w=800',
                features: ['Beach Access', 'Fine Dining', 'Poolside Bar'],
                gallery: [
                    'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=600',
                    'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600',
                    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=600',
                    'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&q=80&w=600',
                    'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&q=80&w=600',
                    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600'
                ]
            },
            {
                name: 'W Goa',
                price: 'Starts at $400/night',
                img: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=800',
                features: ['Nightlife', 'Modern Design', 'Rock Spa'],
                gallery: [
                    'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=600',
                    'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600',
                    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=600',
                    'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&q=80&w=600',
                    'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&q=80&w=600',
                    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600'
                ]
            }
        ],
        'manali': [
            {
                name: 'Span Resort',
                price: 'Starts at $200/night',
                img: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=800',
                features: ['River Side', 'Fruit Orchard', 'Mountain View'],
                gallery: [
                    'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=600',
                    'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600',
                    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=600',
                    'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&q=80&w=600',
                    'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&q=80&w=600',
                    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600'
                ]
            }
        ],
        'bangalore': [
            {
                name: 'The Leela Palace',
                price: 'Starts at $250/night',
                img: 'assets/bangalore.png',
                features: ['Royal Style', 'City Center', 'Art Gallery'],
                gallery: [
                    'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=600',
                    'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600',
                    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=600',
                    'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&q=80&w=600',
                    'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&q=80&w=600',
                    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600'
                ]
            }
        ]
    };

    // No longer a single booking-content container
    // const bookingContent = $('#booking-content');
    function updateProgress(stepOverride) {
        const step = stepOverride || currentStep;
        const $miniLocationVal = $('#mini-step-location-value');
        const $miniDestVal = $('#mini-step-destination-value');
        const $miniResortVal = $('#mini-step-resort-value');
        const $miniEnquiryVal = $('#mini-step-enquiry-value');
        const $miniSteps = $('#mini-step-stack .mini-step');

        // Update Location (from sessionData or from selectedDestination)
        // Check both sessionData and selectedDestination to handle immediate updates
        let locationName = null;
        if (sessionData && sessionData.location) {
            locationName = sessionData.location;
        } else if (selectedDestination && destinations[selectedDestination]) {
            locationName = destinations[selectedDestination].name;
        }

        const $locationStep = $('#mini-step-stack .mini-step-location');
        const $destStep = $('#mini-step-stack .mini-step-destination');
        const $resortStep = $('#mini-step-stack .mini-step-resort');
        const $enquiryStep = $('#mini-step-stack .mini-step-enquiry');

        if (locationName && $miniLocationVal.length) {
            $miniLocationVal.text(locationName);
            if ($locationStep.length) $locationStep.addClass('is-visible');
        } else {
            if ($locationStep.length) $locationStep.removeClass('is-visible');
        }

        // Update Destination
        if (bookingData.destination && $miniDestVal.length) {
            $miniDestVal.text(destinations[bookingData.destination].name);
            if ($destStep.length) $destStep.addClass('is-visible');
        } else {
            if ($destStep.length) $destStep.removeClass('is-visible');
        }

        // Update Resort
        if (bookingData.resort && $miniResortVal.length) {
            $miniResortVal.text(bookingData.resort.name);
            if ($resortStep.length) $resortStep.addClass('is-visible');
            if ($enquiryStep.length) $enquiryStep.addClass('is-visible'); // show Query when resort selected
        } else {
            if ($resortStep.length) $resortStep.removeClass('is-visible');
            if ($enquiryStep.length) $enquiryStep.removeClass('is-visible');
        }

        // Update mini-step states
        if ($miniSteps.length) {
            $miniSteps.removeClass('active completed');
            $miniSteps.each(function() {
                const s = parseInt($(this).data('step'), 10);
                if (s < step + 1) {
                    $(this).addClass('completed');
                }
                if (s === step) {
                    $(this).addClass('active');
                }
            });
        }
    }

    function renderStep() {
        const $step1Content = $('#step-1-content');
        if (!$step1Content.length) return;

        // Initial Step 1: Destination Selection
        $step1Content.html(`
            <div id="step-1-container" class="journey-section active">
                <div class="step-header">
                    <h2>1. Select Your World</h2>
                    <p>
                        Explore curations for <strong style="color:var(--tropical-emerald);">${sessionData && sessionData.location ? sessionData.location : 'You'}</strong>
                    </p>
                </div>
                <div class="dest-carousel">
                    ${Object.entries(destinations).map(([code, dest]) => `
                        <div class="dest-card-vista" data-dest="${code}">
                            <img src="${dest.image}" alt="${dest.name}">
                            <div class="dest-card-overlay">
                                <span class="resort-badge">${resortsData[code]?.length || 0} RESORTS</span>
                                <h3>${dest.name}</h3>
                                <p style="font-size: 0.8rem; margin-top: 0.5rem; opacity: 0.8;">Explore Properties &rarr;</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `);
        attachStepListeners($step1Content[0]);
    }

    // Mini-step badge navigation
    const $miniStack = $('#mini-step-stack');

    // Click on Selected Location → open location modal
    $miniStack.on('click', '.mini-step-location', function (e) {
        e.stopPropagation();
        changeLocation();
    });

    // Click on Selected Destination → go to destination section (Step 1)
    $miniStack.on('click', '.mini-step-destination', function (e) {
        e.stopPropagation();
        const $step1 = $('#journey-step-1');
        const $step2 = $('#journey-step-2');
        const $step3 = $('#journey-step-3');
        if ($step1.length) {
            $step1.css('display', 'block');
            if ($step2.length) $step2.css('display', 'none');
            if ($step3.length) $step3.css('display', 'none');
            currentStep = 1;
            updateProgress(1);
            $step1[0].scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Click on Selected Resort → go to resort section (Step 2)
    $miniStack.on('click', '.mini-step-resort', function (e) {
        e.stopPropagation();
        if (!bookingData.destination) return; // nothing to show yet
        revealStep2();
        currentStep = 2;
        updateProgress(2);
        const $step2 = $('#journey-step-2');
        if ($step2.length) {
            $step2[0].scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Click on Query → go to enquiry form (Step 3)
    $miniStack.on('click', '.mini-step-enquiry', function (e) {
        e.stopPropagation();
        if (!bookingData.resort) return; // need a resort first
        revealStep3();
        currentStep = 3;
        updateProgress(3);
        const $step3 = $('#journey-step-3');
        if ($step3.length) {
            $step3[0].scrollIntoView({ behavior: 'smooth' });
        }
    });

    function revealStep2() {
        const $step2Container = $('#journey-step-2');
        const $step2Content = $('#step-2-content');
        if (!$step2Container.length || !$step2Content.length) return;

        const destResorts = resortsData[bookingData.destination] || [];

        $step2Content.html(`
            <div class="step-header">
                <h2>2. The ${destinations[bookingData.destination].name} Collection</h2>
                    <p>Discover unique experiences tailored for you.</p>
                </div>
                <div class="bento-grid">
                    ${destResorts.map((resort, idx) => {
            const resortJson = JSON.stringify(resort).replace(/'/g, "&apos;");
            return `
                            <div class="bento-item">
                                <img src="${resort.img}" class="bento-img">
                                <div class="bento-content">
                                    <h4>${resort.name}</h4>
                                    <p style="font-size: 1rem; opacity: 0.9; margin-bottom: 1.5rem; letter-spacing: 0.5px;">${resort.price}</p>
                                    <div style="display: flex; gap: 0.8rem; flex-wrap: wrap;">
                                        <button class="vista-btn btn-select-resort" data-resort='${resortJson}' style="padding: 0.7rem 1.5rem; font-size: 0.9rem;">Select Resort</button>
                                        <button class="vista-btn btn-view-details" data-resort='${resortJson}' style="padding: 0.7rem 1.2rem; font-size: 0.85rem; background: none; border: 1px solid rgba(255,255,255,0.4); opacity: 0.8;">Details</button>
                                    </div>
                                </div>
                            </div>
                        `;
        }).join('')}
                </div>
            </div>
        `);

        // Show only Step 2 section
        const $step1 = $('#journey-step-1');
        if ($step1.length) $step1.css('display', 'none');
        $step2Container.css('display', 'block');
        $step2Container.addClass('step-2-mountain-bg');

        // Hide other further sections if user went back
        const $step3 = $('#journey-step-3');
        const $gallery = $('#journey-gallery');
        if ($step3.length) $step3.css('display', 'none');
        if ($gallery.length) $gallery.css('display', 'none');

        gsap.from($step2Content[0], { opacity: 0, y: 50, duration: 1, ease: "power2.out" });

        // Mark destination as selected
        $('.dest-card-vista').each(function() {
            const $card = $(this);
            $card.toggleClass('selected', $card.data('dest') === bookingData.destination);
            if ($card.data('dest') !== bookingData.destination) {
                $card.css('opacity', '0.5');
            } else {
                $card.css('opacity', '1');
            }
        });

        setTimeout(() => {
            $step2Container[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);

        attachStepListeners($step2Content[0]);
    }

    function revealStep3() {
        const $step3Container = $('#journey-step-3');
        const $step3Content = $('#step-3-content');
        if (!$step3Container.length || !$step3Content.length) return;

        // Hide gallery
        const $gallerySection = $('#journey-gallery');
        if ($gallerySection.length) $gallerySection.css('display', 'none');

        // Show only Step 3 section
        const $step1 = $('#journey-step-1');
        const $step2 = $('#journey-step-2');
        if ($step1.length) $step1.css('display', 'none');
        if ($step2.length) $step2.css('display', 'none');
        $step3Container.css('display', 'block');

        $step3Content.html(`
            <div class="step-header">
                <h2>3. Reserve Your Experience</h2>
                <p>Our concierge will reach out to finalize your luxury getaway.</p>
            </div>
            <div class="concierge-card">
                <div class="summary-visual">
                    <img src="${bookingData.resort.img}">
                    <div class="summary-details">
                        <h3>${bookingData.resort.name}</h3>
                        <p>${destinations[bookingData.destination].name}</p>
                        <div class="feature-tags">
                            ${bookingData.resort.features.map(f => `<span class="feature-tag">${f}</span>`).join('')}
                        </div>
                    </div>
                </div>
                <form class="vista-form">
                    <div class="doodle-img">
                        <img src="assets/doodle.png" id="img-1" alt="Doodle 1">
                    </div>
                    <div class="doodle-img2">
                        <img src="assets/doodle2.png" id="img-2" alt="Doodle 2">
                    </div>
                    <div class="form-content-wrapper">
                        <div class="form-row">
                            <div class="form-group">
                                <label>FIRST NAME</label>
                                <input type="text" name="first_name" placeholder="First Name" required>
                            </div>
                            <div class="form-group">
                                <label>LAST NAME</label>
                                <input type="text" name="last_name" placeholder="Last Name" required>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>EMAIL ADDRESS</label>
                                <input type="email" name="email" placeholder="john@example.com" required>
                            </div>
                            <div class="form-group">
                                <label>PHONE NUMBER</label>
                                <input type="tel" id="phone-input" name="phone" placeholder="XXX XXX XXXX" required>
                            </div>
                        </div>
                        <div class="form-group">
                             <label>DATE OF BIRTH</label>
                             <div class="date-field-wrapper">
                                 <input type="date" name="dob" required placeholder="Date of Birth" max="2026-12-31">
                                 <span class="date-placeholder-text">Date of Birth</span>
                             </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>PREFERRED CHECK-IN</label>
                                <div class="date-field-wrapper">
                                    <input type="date" name="checkin" required placeholder="Check-In" max="2026-12-31">
                                    <span class="date-placeholder-text">Check-In</span>
                                </div>
                            </div>
                             <div class="form-group">
                                <label>PREFERRED CHECK-OUT</label>
                                <div class="date-field-wrapper">
                                    <input type="date" name="checkout" required placeholder="Check-Out" max="2026-12-31">
                                    <span class="date-placeholder-text">Check-Out</span>
                                </div>
                            </div>
                        </div>
                        <button type="submit" class="vista-btn" style="margin-top: 1rem;">Confirm Reservation</button>
                    </div>
                </form>
            </div>
        `);

        $step3Container.css('display', 'block');

        gsap.from($step3Content[0], { opacity: 0, y: 50, duration: 1, ease: "power2.out" });

        // Mark resort as selected
        $('.bento-item').each(function() {
            const $item = $(this);
            const $btn = $item.find('.btn-select-resort');
            if ($btn.length && bookingData.resort) {
                // Get resort data - jQuery .data() auto-parses JSON, so check if it's already an object
                let resortData = $btn.data('resort');
                if (typeof resortData === 'string') {
                    resortData = JSON.parse(resortData);
                }
                const isSelected = resortData && resortData.name === bookingData.resort.name;
                // Fix: Do not use opacity as it makes background bleed through. Use brightness/grayscale.
                $item.css({
                    filter: isSelected ? 'none' : 'grayscale(100%) brightness(0.6)',
                    opacity: '1',
                    border: isSelected ? '2px solid var(--tropical-emerald)' : 'none'
                });
            }
        });

        setTimeout(() => {
            $step3Container[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);

        attachStepListeners($step3Content[0]);

        // Initialize International Tel Input on phone field
        setTimeout(() => {
            const $phoneInput = $('#phone-input');
            if ($phoneInput.length && typeof intlTelInput !== 'undefined') {
                window.phoneIti = intlTelInput($phoneInput[0], {
                    initialCountry: 'in',
                    preferredCountries: ['in', 'us', 'gb'],
                    separateDialCode: true,
                    utilsScript: 'https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js'
                });
                // Restrict input: digits only, no spaces, no leading 0, max 10 digits
                $phoneInput.off('input.redeemPhone').on('input.redeemPhone', function() {
                    var v = this.value.replace(/\s/g, '').replace(/\D/g, '');
                    v = v.replace(/^0+/, '');
                    v = v.slice(0, 10);
                    if (this.value !== v) {
                        this.value = v;
                        $(this).valid();
                    }
                });
            }
        }, 150);
    }

    function attachStepListeners(context) {
        if (!context) return;
        const $context = $(context);

        const $destCards = $context.find('.dest-card-vista');
        $destCards.on('click', async function() {
            bookingData.destination = $(this).data('dest');
            // Save destination to session
            await saveToSession('destination', $(this).data('dest'));
            revealStep2();
            updateProgress(2);
        });

        const $selectResortBtns = $context.find('.btn-select-resort');
        $selectResortBtns.on('click', async function(e) {
            e.stopPropagation();
            // Get resort data - jQuery .data() auto-parses JSON, so check if it's already an object
            let resortData = $(this).data('resort');
            if (typeof resortData === 'string') {
                resortData = JSON.parse(resortData);
            }
            bookingData.resort = resortData;
            // Save resort to session
            await saveToSession('resort', JSON.stringify(bookingData.resort));
            // Hide gallery if switching to form
            const $galleryContainer = $('#journey-gallery');
            if ($galleryContainer.length) $galleryContainer.css('display', 'none');
            revealStep3();
            updateProgress(3);
        });

        const $viewGalleryBtns = $context.find('.btn-view-gallery');
        $viewGalleryBtns.on('click', function(e) {
            e.stopPropagation();
            // Get resort data - jQuery .data() auto-parses JSON, so check if it's already an object
            let resortData = $(this).data('resort');
            if (typeof resortData === 'string') {
                resortData = JSON.parse(resortData);
            }
            openResortDetails(resortData, 'gallery');
        });

        const $viewDetailsBtns = $context.find('.btn-view-details');
        $viewDetailsBtns.on('click', function(e) {
            e.stopPropagation();
            // Get resort data - jQuery .data() auto-parses JSON, so check if it's already an object
            let resortData = $(this).data('resort');
            if (typeof resortData === 'string') {
                resortData = JSON.parse(resortData);
            }
            openResortDetails(resortData);
        });

        // Initialize jQuery Validation
        const $form = $context.find('.vista-form');

        if ($form.length > 0) {
            $form.validate({
                errorElement: 'div',
                errorClass: 'form-error',
                onkeyup: function (element) { $(element).valid(); },
                onfocusout: function (element) { $(element).valid(); },
                rules: {
                    first_name: "required",
                    last_name: "required",
                    email: {
                        required: true,
                        email: true
                    },
                    phone: {
                        required: true,
                        minlength: 10,
                        digits: true,
                        maxlength: 10,
                        validPhone: true
                    },
                    dob: { required: true, maxYear2026: true },
                    checkin: { required: true, maxYear2026: true },
                    checkout: { required: true, maxYear2026: true }
                },
                messages: {
                    first_name: "Please enter your first name",
                    last_name: "Please enter your last name",
                    email: "Please enter a valid email address",
                    phone: {
                        required: "Please enter a valid 10-digit phone number",
                        validPhone: "Cannot start with 0; no spaces or special characters; cannot be all same digits (e.g. 1111111111)."
                    },
                    dob: "Date of Birth is required",
                    checkin: "Check-in date is required",
                    checkout: "Check-out date is required"
                },
                errorPlacement: function (error, element) {
                    // For phone input, place error after the .iti container, not the input
                    if (element.attr('id') === 'phone-input' || element.attr('name') === 'phone') {
                        const $itiContainer = element.closest('.iti');
                        if ($itiContainer.length) {
                            error.insertAfter($itiContainer);
                        } else {
                            error.insertAfter(element);
                        }
                        return;
                    }
                    // For date fields, place error after the wrapper so placeholder text doesn't shift
                    const $dateWrapper = element.closest('.date-field-wrapper');
                    if ($dateWrapper.length) {
                        error.insertAfter($dateWrapper);
                    } else {
                        error.insertAfter(element);
                    }
                },
                showErrors: function (errorMap, errorList) {
                    this.defaultShowErrors();
                    // Add error class to phone input container
                    $('input[name="phone"], input#phone-input').each(function() {
                        const $itiContainer = $(this).closest('.iti');
                        if ($(this).hasClass('form-error')) {
                            $itiContainer.addClass('has-error');
                        } else {
                            $itiContainer.removeClass('has-error');
                        }
                    });
                    // Ensure icon is always there for every visible error DIV, not the input itself
                    $('div.form-error:visible').each(function () {
                        if ($(this).find('i.fa-circle-exclamation').length === 0) {
                            const $icon = $('<i class="fa-solid fa-circle-exclamation" style="margin-right: 5px;"></i>');
                            $(this).prepend($icon);
                        }
                        $(this).css({
                            'color': '#ef4444',
                            'font-size': '0.75rem',
                            'margin-top': '0.25rem',
                            'font-weight': '500',
                            'display': 'flex',
                            'align-items': 'center'
                        });
                    });
                },
                submitHandler: function (form) {
                    alert('Success! Your journey is being curated.');
                    window.location.reload();
                }
            });

            // Date fields: hide our text only when a full date is entered; show when empty. Track focus so typed date is visible.
            $context.find('.date-field-wrapper').each(function() {
                var $wrap = $(this);
                var $input = $wrap.find('input[type="date"]');
                function updatePlaceholder() {
                    var val = $input.val() || '';
                    var hasFullDate = /^\d{4}-\d{2}-\d{2}$/.test(val);
                    var focused = $input.is(':focus');
                    $wrap.toggleClass('has-value', hasFullDate);
                    $wrap.toggleClass('has-focus', focused);
                    $wrap.toggleClass('show-placeholder', !hasFullDate && !focused);
                }
                $input.on('change input', updatePlaceholder);
                $input.on('focus', updatePlaceholder);
                $input.on('blur', updatePlaceholder);
                updatePlaceholder();
            });
        }
    }


    const $detailsModal = $('#resort-details-modal');
    const $detailsBody = $('#details-modal-body');
    const $closeDetails = $('#close-resort-details');
    const $detailsOverlay = $('.details-modal-overlay');

    function closeResortModal() {
        if (!$detailsModal.length) return;
        gsap.to(".details-modal-content", {
            scale: 0.9,
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                $detailsModal.css('display', 'none');
                gsap.set(".details-modal-content", { clearProps: "all" });
                $('body').css('overflow', 'auto');
            }
        });
    }
    // Expose to window for onclick events
    window.closeResortModal = closeResortModal;

    function switchModalTab(tabName) {
        const $detailsContent = $('#details-content');
        const $galleryContent = $('#gallery-content');
        const $leftHero = $('.modal-left-hero');
        const $rightContent = $('.modal-right-content');
        const $tabs = $('.modal-tab');

        $tabs.each(function() {
            $(this).toggleClass('active', $(this).data('tab') === tabName);
        });

        if (tabName === 'details') {
            // Show details content
            if ($detailsContent.length) {
                $detailsContent.css('display', 'block').addClass('active');
            }
            if ($galleryContent.length) {
                $galleryContent.css('display', 'none').removeClass('active');
            }
            // Show left hero image
            if ($leftHero.length) {
                $leftHero.css('display', 'block');
            }
            if ($rightContent.length) {
                $rightContent.removeClass('full-width');
            }
        } else {
            // Show gallery content
            if ($detailsContent.length) {
                $detailsContent.css('display', 'none').removeClass('active');
            }
            if ($galleryContent.length) {
                $galleryContent.css('display', 'block').addClass('active');
            }
            // Hide left hero image and expand gallery to full width
            if ($leftHero.length) {
                $leftHero.css('display', 'none');
            }
            if ($rightContent.length) {
                $rightContent.addClass('full-width');
            }
        }
    }
    window.switchModalTab = switchModalTab;

    // selectFromGallery removed since integrated into switchModalTab

    function openResortDetails(resort, initialTab = 'details') {
        if (!$detailsModal.length || !$detailsBody.length) return;

        $detailsBody.html(`
            <div class="modal-split-layout">
                <div class="modal-left-hero">
                    <img src="${resort.img}" alt="${resort.name}">
                </div>
                <div class="modal-right-content">
                    <div class="modal-tabs-inline">
                        <div class="modal-tab ${initialTab === 'details' ? 'active' : ''}" data-tab="details" onclick="switchModalTab('details')">Details</div>
                        <div class="modal-tab ${initialTab === 'gallery' ? 'active' : ''}" data-tab="gallery" onclick="switchModalTab('gallery')">Gallery</div>
                    </div>
                    
                    <div id="details-content" class="tab-content ${initialTab === 'details' ? 'active' : ''}" style="display: ${initialTab === 'details' ? 'block' : 'none'};">
                        <div class="details-info-content">
                            <h2>${resort.name}</h2>
                            <p class="price-tag" style="font-size: 1.2rem; font-weight: 700; color: var(--tropical-emerald);">${resort.price}</p>
                            <p style="margin-top: 1.5rem; line-height: 1.8;">Experience unparalleled luxury at ${resort.name}. Located in the heart of ${bookingData.destination ? bookingData.destination.toUpperCase() : 'PARADISE'}, this property offers world-class amenities and breathtaking views.</p>
                            <div class="details-features">
                                ${resort.features.map(f => `<span class="feature-tag">${f}</span>`).join('')}
                            </div>
                            <div style="margin-top: 2rem; display: flex; gap: 1rem;">
                                <button class="vista-btn" onclick="selectFromDetails('${resort.name}')">Select Resort</button>
                                <button class="vista-btn" style="background: var(--vista-gray); color: var(--text-muted);" onclick="closeResortModal()">Close</button>
                            </div>
                        </div>
                    </div>

                    <div id="gallery-content" class="tab-content ${initialTab === 'gallery' ? 'active' : ''}" style="display: ${initialTab === 'gallery' ? 'block' : 'none'};">
                        <div class="gallery-grid-container">
                            <div class="mosaic-gallery">
                                ${resort.gallery.map((img, i) => `
                                    <div class="mosaic-item">
                                        <img src="${img}" alt="Gallery ${i}">
                                    </div>
                                `).join('')}
                            </div>
                            <div style="margin: 2rem 0; text-align: center;">
                                <button class="vista-btn" onclick="selectFromDetails('${resort.name}')">Select Resort &rarr;</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `);

        $detailsModal.css('display', 'flex');
        gsap.fromTo(".details-modal-content",
            { scale: 0.9, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }
        );
        $('body').css('overflow', 'hidden');
    }

    if ($closeDetails.length) {
        $closeDetails.on('click', closeResortModal);
    }
    if ($detailsOverlay.length) {
        $detailsOverlay.on('click', closeResortModal);
    }

    // Global helper for the Select button inside modal
    window.selectFromDetails = async function (resortName) {
        const resortsList = resortsData[bookingData.destination];
        const selected = resortsList.find(r => r.name === resortName);
        if (selected) {
            bookingData.resort = selected;
            // Save resort to session
            await saveToSession('resort', JSON.stringify(selected));
            revealStep3();
            updateProgress(3);
            closeResortModal();
        }
    };

    // legacy filterDestinations removed

    // Change Location Helper
    window.changeLocation = function () {
        const $modal = $('#destination-modal');
        if ($modal.length) {
            // Get currently selected location from session
            const currentLocation = sessionData && sessionData.location ? sessionData.location : null;
            
            // Find the location code that matches the stored location name
            let currentLocationCode = null;
            if (currentLocation) {
                for (const [code, dest] of Object.entries(destinations)) {
                    if (dest.name === currentLocation) {
                        currentLocationCode = code;
                        break;
                    }
                }
            }
            
            // Highlight the currently selected location option
            const $vistaOptions = $('.vista-option');
            $vistaOptions.each(function() {
                if (currentLocationCode && $(this).data('value') === currentLocationCode) {
                    $(this).addClass('selected');
                } else {
                    $(this).removeClass('selected');
                }
            });
            
            // Update selectedDestination variable
            if (currentLocationCode) {
                selectedDestination = currentLocationCode;
            }
            
            gsap.set($modal[0], { opacity: 1 }); // Reset opacity from previous close
            $modal.css('display', 'flex');
            $('body').css('overflow', 'hidden');
            gsap.fromTo(".vista-style",
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
            );
        }
    };

    // Initialize Header and Step 1 (will be updated after session loads)
    // Don't call updateProgress here - it will be called after session data loads
    // This ensures no default location is shown
    // renderStep() will be called after session data loads


});

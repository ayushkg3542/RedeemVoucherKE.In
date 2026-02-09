<?php
session_start();
include 'includes/header.php';
?>
<main>
    <!-- Hero Section -->
    <section class="hero">
        <!-- Location Badge (Top Left) with compact step stack -->
        <div class="banner-location-badge" id="banner-location-badge" onclick="changeLocation()"
            title="Click to change location">
            <div class="mini-step-stack" id="mini-step-stack">
                <div class="mini-step mini-step-location" data-step="1">
                    <span class="mini-step-circle"><i class="fa-solid fa-chevron-down"></i></span>
                    <div class="mini-step-text">
                        <span class="mini-step-label">Selected Location</span>
                        <span class="mini-step-value" id="mini-step-location-value"></span>
                    </div>
                </div>
                <div class="mini-step mini-step-destination" data-step="2">
                    <span class="mini-step-circle"><i class="fa-solid fa-chevron-down"></i></span>
                    <div class="mini-step-text">
                        <span class="mini-step-label">Selected Destination</span>
                        <span class="mini-step-value" id="mini-step-destination-value"></span>
                    </div>
                </div>
                <div class="mini-step mini-step-resort" data-step="3">
                    <span class="mini-step-circle"><i class="fa-solid fa-chevron-down"></i></span>
                    <div class="mini-step-text">
                        <span class="mini-step-label">Selected Resort</span>
                        <span class="mini-step-value" id="mini-step-resort-value"></span>
                    </div>
                </div>
                <div class="mini-step mini-step-enquiry" data-step="4">
                    <span class="mini-step-circle"><i class="fa-solid fa-chevron-down"></i></span>
                    <div class="mini-step-text">
                        <span class="mini-step-label">Query</span>
                        <span class="mini-step-value" id="mini-step-enquiry-value">Content Form</span>
                    </div>
                </div>
            </div>
            <!-- <div class="mini-step-down-arrow">
                <i class="fa-solid fa-angles-down"></i>
            </div> -->
        </div>

        <div class="hero-slider">
            <div class="slide active"
                style="background-image: url(&quot;assets/bali-pagoda-sunrise-indonesia.jpg&quot;)"></div>
            <div class="slide" style="background-image: url(&quot;assets/kerala.jpg&quot;)"></div>
            <div class="slide" style="background-image: url(&quot;assets/kinkakuji-temple.jpg&quot;)"></div>
            <div class="slide" style="background-image: url(&quot;assets/manali.jpg&quot;)"></div>
            <div class="slide" style="background-image: url(&quot;assets/indonesia.jpg&quot;)"></div>
            <div class="slide" style="background-image: url(&quot;assets/goa.jpg&quot;)"></div>
        </div>
        <div class="hero-overlay"></div>

        <!-- Path Animation SVG -->
        <div class="flight-path-container">
            <svg width="100%" height="100%" viewBox="0 0 652 370" preserveAspectRatio="xMidYMid meet">
                <path id="planePath" class="flight-path"
                    d="M0.5 36.5V36.5C14.7714 66.7217 50.2754 80.3908 81.1289 67.5422L208.5 14.5L242.9 4.97854C257.114 1.04429 272.036 0.390626 286.54 3.06689V3.06689C324.244 10.0241 354.354 38.4611 363.454 75.7058L368.222 95.2223C381.965 151.475 431.659 191.569 489.545 193.11L587.857 195.726C624.429 196.7 653.055 227.546 651.299 264.09V264.09C650.185 287.258 636.857 308.093 616.29 318.816L609.359 322.431C590.286 332.376 567.978 334.1 547.603 327.203L500.28 311.183C462.751 298.479 424.993 329.764 430.5 369V369"
                    fill="none" stroke="#F9A80B" stroke-dasharray="10 10" stroke-width="1.5" opacity="0.9" />
                <g id="planeMarker">
                    <g transform="scale(0.4) translate(-50, -50)">
                        <path
                            d="M15.3265 61.7144C16.2571 61.3838 17.136 61.0711 18.0503 60.858C18.4594 60.7631 19.0442 60.6593 19.3967 60.8684C19.8865 61.1625 19.8443 62.1052 19.5177 62.8469C18.7039 64.7149 16.9079 66.264 13.8688 67.71C11.1938 68.9782 8.36618 69.8937 5.45433 70.4814C6.93181 67.8029 8.84869 65.2385 11.1958 62.7979C11.6634 62.747 12.1331 62.6916 12.5982 62.5781C13.5375 62.3496 14.4466 62.0262 15.3265 61.7144Z"
                            fill="#F9A80B" />
                        <path
                            d="M75.7443 58.4524C75.4827 59.0221 74.6025 59.5749 73.5249 59.8421C70.0924 60.6919 66.5304 61.0827 63.1789 61.4089C57.6597 61.9454 52.0422 62.364 46.4803 62.6548C45.0063 62.7303 43.3337 62.817 41.8414 62.3934C41.1091 62.1809 40.6128 61.8772 40.3727 61.4894C39.911 60.7415 40.3671 59.8062 41.0771 59.0109C41.4968 58.5409 42.0097 58.1164 42.4725 57.8093C43.0572 57.4226 43.615 57.0344 44.1584 56.656C46.7634 54.845 49.0148 53.2801 52.3858 53.0694C54.3928 52.9418 56.3278 53.2139 58.3743 53.5025C59.3021 53.6332 60.2329 53.7629 61.1695 53.8563L63.598 54.0824C65.7677 54.2774 67.8856 54.4902 69.9694 54.9102L70.2404 54.9636C71.8937 55.2934 74.9717 55.9071 75.6745 57.3606C75.8731 57.7717 75.8963 58.128 75.7443 58.4524Z"
                            fill="#F9A80B" />
                        <path
                            d="M65.6099 25.4699C64.8895 26.803 63.9703 27.9028 62.9308 28.8812C62.3895 28.7319 61.8422 28.5854 61.2577 28.4437C58.9475 27.8781 56.5575 27.2942 55.0622 25.8836C54.9686 25.7962 54.7559 25.5762 54.7847 25.4171C54.816 25.2301 55.1294 24.9065 55.7602 24.6288C56.4135 24.3448 57.1653 24.2165 57.8906 24.0948C60.6981 23.62 63.59 23.2981 66.6489 23.0776C66.3565 23.8979 66.03 24.7 65.6099 25.4699Z"
                            fill="#F9A80B" />
                        <path
                            d="M38.7268 40.8974C38.4275 41.8685 38.1443 42.8203 37.8747 43.7644C33.42 46.0218 28.9103 48.3655 24.5368 50.9468C29.3086 42.5321 32.772 36.7967 37.0839 31.8995C37.0839 31.8995 37.0933 31.889 37.0989 31.8827C37.9795 30.8965 39.7459 30.162 40.4898 30.4755C40.7961 30.6056 40.927 31.0016 40.8763 31.654C40.6473 34.6663 39.6721 37.8345 38.7268 40.8974Z"
                            fill="#F9A80B" />
                        <path
                            d="M80.1635 32.0839C79.9435 32.1402 79.6775 32.2269 79.3921 32.3228C78.8915 32.4906 78.2051 32.7187 77.8765 32.6855C77.6447 32.4785 77.4666 32.0253 77.6228 30.6488C77.8619 28.5543 78.1806 26.5649 79.3684 25.2345C79.464 25.1275 79.5648 25.0252 79.6727 24.9255C79.8755 24.7403 80.1252 24.6005 80.3665 24.4522C80.383 24.4493 80.3967 24.4632 80.4133 24.4592C80.5587 24.4231 80.6828 24.3453 80.7765 24.2404C80.7903 24.2249 80.7929 24.203 80.8053 24.1865C81.9568 23.6392 83.4855 23.4247 85.5172 23.5368C86.988 23.6169 88.4659 23.8201 90.0331 24.1598C90.2589 24.2068 90.5123 24.2482 90.7778 24.2929C91.6143 24.4289 92.6568 24.598 93.0027 25.1293C93.1281 25.3204 93.104 25.4234 93.0946 25.4678C92.9852 25.9471 92.0011 26.5467 91.3538 26.938L90.8631 27.2427C89.3059 28.2433 87.5765 29.1391 85.5788 29.9763C85.139 30.1606 84.6996 30.3528 84.2613 30.546C82.9346 31.1301 81.5641 31.7317 80.1635 32.0839Z"
                            fill="#F9A80B" />
                        <path
                            d="M25.7252 74.7024C22.326 76.7546 11.5958 80.9839 6.41961 78.7984C4.99079 78.1939 4.12358 77.1632 3.77069 75.6451C3.52257 74.6052 3.88266 73.505 4.50131 72.168C4.50754 72.155 4.51669 72.1429 4.52293 72.1298C7.98243 71.547 11.3357 70.5059 14.4912 69.0087C16.017 68.2818 17.9824 67.2083 19.4344 65.5821C19.9983 64.9505 20.4847 64.2346 20.8403 63.4245C21.4042 62.1405 21.4264 60.4029 20.1355 59.6312C19.3408 59.1592 18.4307 59.2894 17.7259 59.4558C16.7338 59.6863 15.7758 60.0264 14.8482 60.3559C14.2222 60.5778 13.6235 60.7568 13.0188 60.9375C14.3836 59.6735 15.849 58.4409 17.4518 57.2539C23.8719 52.5399 31.1118 48.8117 38.1763 45.2299C38.1876 45.2336 38.1909 45.2473 38.2026 45.2503C38.4739 45.3266 38.7535 45.2331 38.9296 45.0359C38.9948 44.9628 39.0416 44.871 39.0743 44.771C39.1096 44.7532 39.1452 44.7347 39.1805 44.7169C45.29 41.6227 51.6068 38.4232 57.4277 34.6112L58.5001 33.9169C60.239 32.7957 61.9213 31.7011 63.4139 30.396C63.5467 30.3592 63.6676 30.2878 63.7597 30.1845C63.8142 30.1236 63.8483 30.0475 63.8804 29.9696C65.0328 28.8931 66.06 27.6716 66.8731 26.1612C67.9588 24.1702 68.5413 22.0015 69.104 19.9056C69.5876 18.1011 70.047 16.3956 70.7994 14.7821C71.3933 13.4834 72.0641 12.5928 72.8455 12.0724C73.6329 11.5347 74.2976 11.3815 74.881 11.6045C75.6538 11.8985 76.768 13.0178 77.6814 16.6768L77.7935 17.1088C78.3315 19.1787 78.8641 21.2527 79.3877 23.3387C79.1514 23.497 78.9195 23.6659 78.7028 23.864C76.8643 25.5599 76.4823 27.9453 76.1919 30.488C76.0769 31.5016 76.0248 32.7637 76.6441 33.5315C76.6563 33.5469 76.6748 33.5531 76.6873 33.5678C70.4012 40.6293 64.4794 46.5231 58.1125 52.0207C56.2255 51.7583 54.2877 51.5074 52.2947 51.633C48.5217 51.8694 46.003 53.6218 43.3357 55.4752C42.8 55.8491 42.2507 56.2299 41.6766 56.611C39.5553 58.0091 37.9478 60.3036 39.1476 62.2459C39.5809 62.9496 40.3532 63.4657 41.4438 63.7795C41.879 63.9034 42.319 63.9896 42.7591 64.0486C42.3787 64.3277 41.9907 64.62 41.6046 64.8961C38.2167 67.377 34.6528 69.4594 30.5248 71.8716C28.9955 72.765 27.3996 73.6971 25.7252 74.7024Z"
                            fill="#F9A80B" />
                    </g>
                </g>
            </svg>
        </div>

        <div class="hero-content simple-elegant">
            <div class="hero-logo-container reveal">
                <img src="assets/KE-White.png" alt="Karma Experience" class="hero-logo" />
            </div>
            <h1 class="hero-title reveal">
                <span class="text-border">Where your journey</span><br />
                <span class="italic">Truly Begins</span>
            </h1>
            <div class="hero-desc reveal">
                <p>
                    Unlock the world's most breathtaking destinations<br />
                    with your exclusive Vista travel voucher.
                </p>
            </div>
            <div class="hero-cta reveal">
                <a href="#journey-step-1" class="vista-btn-premium">
                    Explore Destinations &rarr;
                </a>
            </div>
        </div>

        <div class="bottom-shape"></div>
    </section>

    <div id="destination-modal" class="destination-modal">
        <div class="search-panel vista-style">
            <h2>Personalize Your Experience</h2>
            <p>From where you get the Voucher</p>

            <div class="portal-grid">
                <!-- Global Getaways -->
                <div class="portal-category">
                    <h3>Global Getaways</h3>
                    <div class="portal-options">
                        <div class="vista-option mini" data-value="bali" onclick="selectLocation('bali')">
                            <i class="fa-solid fa-umbrella-beach"></i>
                            <span>Bali</span>
                        </div>
                        <div class="vista-option mini" data-value="cambodia" onclick="selectLocation('cambodia')">
                            <i class="fa-solid fa-gopuram"></i>
                            <span>Cambodia</span>
                        </div>
                        <div class="vista-option mini" data-value="indonesia" onclick="selectLocation('indonesia')">
                            <i class="fa-solid fa-volcano"></i>
                            <span>Indonesia</span>
                        </div>
                    </div>
                </div>

                <!-- Treasured India -->
                <div class="portal-category">
                    <h3>Treasured India</h3>
                    <div class="portal-options">
                        <div class="vista-option mini" data-value="goa" onclick="selectLocation('goa')">
                            <i class="fa-solid fa-water"></i>
                            <span>Goa</span>
                        </div>
                        <div class="vista-option mini" data-value="manali" onclick="selectLocation('manali')">
                            <i class="fa-solid fa-mountain-sun"></i>
                            <span>Manali</span>
                        </div>
                        <div class="vista-option mini" data-value="bangalore" onclick="selectLocation('bangalore')">
                            <i class="fa-solid fa-city"></i>
                            <span>Bangalore</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Step 1: Destination Selection -->
    <section id="journey-step-1" class="vista-journey">
        <div class="atmos-bloom bloom-1"></div>
        <div class="container">
            <div id="step-1-content" class="booking-content">
                <!-- Dynamically Injected: Step 1 -->
            </div>
        </div>
    </section>

    <!-- Step 2: Resort Selection -->
    <section id="journey-step-2" class="vista-journey" style="display: none">
        <div class="atmos-bloom bloom-2"></div>
        <div class="journey-bg"></div>
        <div class="container">
            <div id="step-2-content" class="booking-content">
                <!-- Dynamically Injected: Step 2 -->
            </div>
        </div>
    </section>

    <!-- Step 3: Enquiry Form -->
    <section id="journey-step-3" class="vista-journey" style="display: none">
        <div class="atmos-bloom bloom-3"></div>
        <div class="container">
            <div id="step-3-content" class="booking-content">
                <!-- Dynamically Injected: Step 3 -->
            </div>
        </div>
    </section>
</main>

<!-- Site Footer Premium -->
<footer class="site-footer-premium">
    <div class="footer-background-map">
        <img src="assets/country.jpg" alt="World Map Pattern" />
    </div>

    <div class="container footer-container-relative">
        <div class="footer-grid">
            <!-- Col 1: Brand -->
            <div class="footer-col brand-col">
                <img src="assets/KE-White.png" alt="Karma Experience" class="footer-logo" />
                <p class="brand-tagline">
                    The Holiday Preview Division Of Karma Group
                </p>
                <p class="brand-desc">
                    Discover the world with Karma Experience - where luxury meets
                    adventure.
                </p>
                <div class="footer-socials">
                    <a href="#" class="social-icon"><i class="fa-brands fa-facebook-f"></i></a>
                    <a href="#" class="social-icon"><i class="fa-brands fa-instagram"></i></a>
                    <a href="#" class="social-icon"><i class="fa-brands fa-linkedin-in"></i></a>
                </div>
            </div>

            <!-- Col 2: Quick Links -->
            <div class="footer-col margin-top-mobile">
                <h4 class="footer-heading">Quick Links</h4>
                <ul class="footer-links">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About us</a></li>
                    <li><a href="#">Destinations</a></li>
                    <li><a href="#">Careers</a></li>
                </ul>
            </div>

            <!-- Col 3: Other Links -->
            <div class="footer-col margin-top-mobile">
                <h4 class="footer-heading">Other Links</h4>
                <ul class="footer-links">
                    <li><a href="#">Gallery</a></li>
                    <li><a href="#">Terms & conditions</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                    <li><a href="#">Blogs</a></li>
                    <li><a href="#">Contact Us</a></li>
                </ul>
            </div>

            <!-- Col 4: Address -->
            <div class="footer-col margin-top-mobile">
                <h4 class="footer-heading">Address</h4>
                <p class="footer-subhead">Our Offices</p>
                <p class="office-list">
                    Indonesia | India | Germany |<br />
                    Philippines | Singapore | UK
                </p>
            </div>
        </div>

        <div class="footer-bottom-border"></div>
        <div class="footer-copyright">
            &copy;<?php echo date('Y'); ?> - PRESTIGE HOLIDAY RESORTS LLP - ALL RIGHTS RESERVED
        </div>
    </div>
</footer>

<!-- Resort Details Modal -->
<div id="resort-details-modal" class="resort-details-modal" style="display: none">
    <div class="details-modal-overlay"></div>
    <div class="details-modal-content">
        <button class="details-close-btn" id="close-resort-details">
            <i class="fa-solid fa-xmark"></i>
        </button>
        <div class="details-body" id="details-modal-body">
            <!-- Dynamically Injected -->
        </div>
    </div>
</div>

<?php include 'includes/footer.php'; ?>
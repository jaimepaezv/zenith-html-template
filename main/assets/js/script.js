/**
 * -------------------------------------------------------------------
 * Theme Name: ZENITH
 * Theme Version: 1.0.0
 * -------------------------------------------------------------------
 *
 * This file contains the main JavaScript code for the theme.
 * It uses jQuery to handle various functionalities such as:
 * - Preloader
 * - Header styling and scroll to top
 * - Mobile and category menus
 * - Animations using WOW.js and AOS.js
 * - Form validation
 * - Counter (odometer)
 * - Lightbox (Fancybox)
 * - Tabs and Accordions
 * - Carousels (Owl Carousel)
 * - One Page Navigation
 * - Nice Select for dropdowns
 * - Masonry layout with filtering (Isotope)
 * - Progress bars
 * - RTL direction switch
 * - Quantity spinner
 * - Price range slider
 * - Search popup
 * - BXSlider
 * - Donate popup
 * - Curved text effect
 *
 *  It is important to have jQuery library included in your HTML file before this script.
 */
(function ($) {
	"use strict"; // Enable strict mode for better JavaScript practices

	// ------------------------------------------------------------------------
	// Preloader Functionality
	// ------------------------------------------------------------------------
	/**
	 * handlePreloader - Hides the loading box (preloader) after a delay.
	 *
	 * This function checks if a loader wrapper element exists in the DOM.
	 * If it does, it delays the fadeOut effect for 1000 milliseconds (1 second)
	 * and then fades out the loader wrapper over 500 milliseconds (0.5 seconds).
	 *
	 * @function handlePreloader
	 * @returns {void}
	 */
	function handlePreloader() {
		if ($('.loader-wrap').length) { // Check if the element with class 'loader-wrap' exists
			$('.loader-wrap').delay(1000).fadeOut(500); // Delay fadeOut for 1s, then fade out in 0.5s
		}
	}

	/**
	 * Preloader Close Button Event Handler
	 *
	 * This section adds an event listener to elements with the class 'preloader-close'.
	 * When clicked, it fades out the loader wrapper element after a short delay.
	 * This provides a manual way for users to close the preloader if needed.
	 */
	if ($(".preloader-close").length) { // Check if the element with class 'preloader-close' exists
		$(".preloader-close").on("click", function () { // Attach click event handler
			$('.loader-wrap').delay(200).fadeOut(500); // Delay fadeOut for 0.2s, then fade out in 0.5s
		})
	}

	// ------------------------------------------------------------------------
	// Header Styling and Scroll to Top Functionality
	// ------------------------------------------------------------------------
	/**
	 * headerStyle - Updates the header style on scroll and manages the "scroll to top" button.
	 *
	 * This function is responsible for making the header fixed when scrolling down past a certain point
	 * and showing/hiding the "scroll to top" button.
	 *
	 * @function headerStyle
	 * @returns {void}
	 */
	function headerStyle() {
		if ($('.main-header').length) { // Check if the element with class 'main-header' exists
			var windowpos = $(window).scrollTop(); // Get the current vertical scroll position
			var siteHeader = $('.main-header'); // Select the main header element
			var scrollLink = $('.scroll-top'); // Select the "scroll to top" link element
			if (windowpos >= 150) { // Check if the scroll position is greater than or equal to 150 pixels
				siteHeader.addClass('fixed-header'); // Add the class 'fixed-header' to the main header to make it fixed
				scrollLink.addClass('open'); // Add the class 'open' to the "scroll to top" link to make it visible
			} else {
				siteHeader.removeClass('fixed-header'); // Remove the class 'fixed-header' to make the header static
				scrollLink.removeClass('open'); // Remove the class 'open' to hide the "scroll to top" link
			}
		}
	}
	headerStyle(); // Call headerStyle function initially to set initial header state

	// ------------------------------------------------------------------------
	// Submenu Dropdown Toggle for Desktop Navigation
	// ------------------------------------------------------------------------
	/**
	 * Submenu Dropdown Toggle - Adds dropdown buttons to submenu items in the main header navigation.
	 *
	 * This function targets list items with the class 'dropdown' that are within the main header navigation.
	 * It appends a dropdown button (with a Font Awesome angle down icon) to these dropdown list items.
	 * This button is likely used to trigger the display of submenus on smaller screens or touch devices,
	 * or as an alternative interaction method on desktop.
	 */
	if ($('.main-header li.dropdown ul').length) { // Check if dropdown menus exist in the main header
		$('.main-header .navigation li.dropdown').append('<div class="dropdown-btn"><span class="fas fa-angle-down"></span></div>'); // Append dropdown button to dropdown list items
	}

	// ------------------------------------------------------------------------
	// Mobile Navigation Functionality
	// ------------------------------------------------------------------------
	/**
	 * Mobile Nav Hide Show - Handles the mobile navigation menu display and toggling.
	 *
	 * This section manages the mobile menu functionality, including:
	 * - Cloning the main menu content into the mobile menu.
	 * - Handling dropdown button clicks within the mobile menu to toggle submenus.
	 * - Toggling the mobile menu visibility when the mobile nav toggler is clicked.
	 * - Hiding the mobile menu when clicking on the backdrop or close button.
	 */
	if ($('.mobile-menu').length) { // Check if the element with class 'mobile-menu' exists
		var mobileMenuContent = $('.main-header .menu-area .main-menu').html(); // Get the HTML content of the main menu
		$('.mobile-menu .menu-box .menu-outer').append(mobileMenuContent); // Append the main menu content to the mobile menu
		$('.sticky-header .main-menu').append(mobileMenuContent); // Append the main menu content to the sticky header's menu (if sticky header is used)

		// Dropdown Button for Mobile Menu Submenus
		$('.mobile-menu li.dropdown .dropdown-btn').on('click', function () { // Attach click event handler to dropdown buttons in mobile menu
			$(this).toggleClass('open'); // Toggle the 'open' class on the dropdown button itself (likely for icon change)
			$(this).prev('ul').slideToggle(500); // Slide toggle (show/hide) the submenu (ul) preceding the clicked button with 500ms animation
		});

		// Dropdown Button for Mobile Menu Megamenus (if used) -  This is likely a separate dropdown type
		$('.mobile-menu li.dropdown .dropdown-btn').on('click', function () { // Re-attach click event handler (could be combined with the above one if logic is the same)
			$(this).prev('.megamenu').slideToggle(900); // Slide toggle the megamenu (if it exists instead of a regular submenu) with 900ms animation
		});

		// Menu Toggle Button - Show Mobile Menu
		$('.mobile-nav-toggler').on('click', function () { // Attach click event handler to the mobile nav toggler button
			$('body').addClass('mobile-menu-visible'); // Add 'mobile-menu-visible' class to the body to make the mobile menu visible (likely triggers CSS animation/display)
		});

		// Menu Toggle Button - Hide Mobile Menu (using backdrop or close button)
		$('.mobile-menu .menu-backdrop,.mobile-menu .close-btn').on('click', function () { // Attach click event handler to backdrop and close button of mobile menu
			$('body').removeClass('mobile-menu-visible'); // Remove 'mobile-menu-visible' class from the body to hide the mobile menu
		});
	}

	// ------------------------------------------------------------------------
	// Category Menu Functionality (Similar to Mobile Menu, but for Categories)
	// ------------------------------------------------------------------------
	/**
	 * Category Dropdown Toggle - Adds dropdown buttons to category dropdown items.
	 *
	 * Similar to submenu dropdowns, this adds buttons to category list items that have subcategories.
	 */
	if ($('.category-menu li.category-dropdown ul').length) { // Check if category dropdown menus exist
		$('.category-menu .category-list li.category-dropdown').append('<div class="dropdown-btn"><span class="icon-1"></span></div>'); // Append dropdown button to category dropdown items
	}

	/**
	 * Category Nav Hide Show - Handles category menu visibility and toggling.
	 *
	 * Manages the display and interaction of the category menu, likely used for shop or product category navigation.
	 * Functionality is very similar to the mobile menu, but specific to categories.
	 */
	if ($('.category-menu').length) { // Check if the element with class 'category-menu' exists
		// Dropdown Button for Category Submenus
		$('.category-menu li.category-dropdown .dropdown-btn').on('click', function () { // Attach click handler for category dropdown buttons
			$(this).toggleClass('open'); // Toggle 'open' class on button
			$(this).prev('ul').slideToggle(500); // Slide toggle category submenu
		});
		// Dropdown Button for Category Megamenus (if used)
		$('.category-menu li.category-dropdown .dropdown-btn').on('click', function () { // Re-attach click handler (could be combined)
			$(this).prev('.megamenu').slideToggle(900); // Slide toggle category megamenu
		});
		// Menu Toggle Button - Show Category Menu
		$('.category-box').on('click', function () { // Attach click handler to category box (likely a button to open category menu)
			$('body').addClass('category-visible'); // Add 'category-visible' class to body to show category menu
		});
		// Menu Toggle Button - Hide Category Menu (backdrop or close button)
		$('.category-menu .menu-backdrop,.category-menu .close-btn').on('click', function () { // Attach click handler to backdrop and close button
			$('body').removeClass('category-visible'); // Remove 'category-visible' class to hide category menu
		});
	}

	// ------------------------------------------------------------------------
	// Elements Animation using WOW.js
	// ------------------------------------------------------------------------
	/**
	 * Elements Animation - Initializes WOW.js for revealing animations on scroll.
	 *
	 * WOW.js is used to trigger CSS animations when elements with the class 'wow' become visible in the viewport.
	 * This adds subtle animations to page elements as the user scrolls down, enhancing visual appeal.
	 */
	if ($('.wow').length) { // Check if elements with class 'wow' exist (indicating WOW.js is intended to be used)
		var wow = new WOW({ // Initialize WOW.js
			mobile: false // Disable animations on mobile devices (optional, can be set to true if mobile animations are desired)
		});
		wow.init(); // Initialize the WOW.js instance
	}

	// ------------------------------------------------------------------------
	// Contact Form Validation using jQuery Validation Plugin
	// ------------------------------------------------------------------------
	/**
	 * Contact Form Validation - Implements form validation for the contact form.
	 *
	 * This section uses the jQuery Validation plugin to validate the contact form fields before submission.
	 * It defines rules for required fields and email format validation.
	 * Make sure to include the jQuery Validation plugin library in your HTML.
	 */
	if ($('#contact-form').length) { // Check if a form with ID 'contact-form' exists
		$('#contact-form').validate({ // Initialize jQuery Validation plugin on the contact form
			rules: { // Define validation rules for form fields
				username: { // Rule for the 'username' input field
					required: true // Make the 'username' field required
				},
				email: { // Rule for the 'email' input field
					required: true, // Make the 'email' field required
					email: true // Ensure the input is a valid email format
				},
				phone: { // Rule for the 'phone' input field
					required: true // Make the 'phone' field required
				},
				subject: { // Rule for the 'subject' input field
					required: true // Make the 'subject' field required
				},
				message: { // Rule for the 'message' textarea field
					required: true // Make the 'message' field required
				}
			}
		});
	}

	// ------------------------------------------------------------------------
	// Odometer Counter Functionality
	// ------------------------------------------------------------------------
	/**
	 * odometer - Initializes and activates the odometer (counter) effect for elements with class 'odometer'.
	 *
	 * Odometer is a JavaScript library for smooth, animated number transitions.
	 * This section finds elements with the class 'odometer' and uses the 'appear' plugin to trigger
	 * the counter animation when these elements become visible in the viewport.
	 * The target number for the counter is taken from the 'data-count' attribute of the element.
	 */
	if ($(".odometer").length) { // Check if elements with class 'odometer' exist
		var odo = $(".odometer"); // Select all elements with class 'odometer'
		odo.each(function () { // Iterate over each odometer element
			$(this).appear(function () { // Use the 'appear' plugin to detect when the element becomes visible
				var countNumber = $(this).attr("data-count"); // Get the target count number from the 'data-count' attribute
				$(this).html(countNumber); // Set the HTML content of the odometer element to the target number (odometer library will handle the animation)
			});
		});
	}

	// ------------------------------------------------------------------------
	// LightBox / Fancybox Functionality
	// ------------------------------------------------------------------------
	/**
	 * LightBox / Fancybox - Initializes Fancybox for lightbox image galleries.
	 *
	 * Fancybox is a jQuery lightbox plugin for displaying images, videos, and other content in a modal window.
	 * This section initializes Fancybox for elements with the class 'lightbox-image'.
	 * It sets fade effects for opening and closing the lightbox and enables media helpers.
	 * Make sure to include the Fancybox library and CSS in your project.
	 */
	if ($('.lightbox-image').length) { // Check if elements with class 'lightbox-image' exist
		$('.lightbox-image').fancybox({ // Initialize Fancybox on elements with class 'lightbox-image'
			openEffect: 'fade', // Set the opening effect to 'fade'
			closeEffect: 'fade', // Set the closing effect to 'fade'
			helpers: { // Enable helpers
				media: {} // Enable media helper to handle different media types (images, videos, etc.)
			}
		});
	}

	// ------------------------------------------------------------------------
	// Tabs Box Functionality
	// ------------------------------------------------------------------------
	/**
	 * Tabs Box - Handles tabbed content areas.
	 *
	 * This section implements tab functionality using jQuery.
	 * It allows switching between different tab contents by clicking on tab buttons.
	 *
	 *  - When a tab button is clicked:
	 *    - It prevents the default link behavior.
	 *    - It gets the target tab content ID from the 'data-tab' attribute of the button.
	 *    - If the target tab is already visible, it does nothing.
	 *    - Otherwise:
	 *      - It removes the 'active-btn' class from all tab buttons in the same tabs box.
	 *      - It adds the 'active-btn' class to the clicked button.
	 *      - It fades out all tab contents within the same tabs box.
	 *      - It removes the 'active-tab' class from all tab contents.
	 *      - It fades in the target tab content.
	 *      - It adds the 'active-tab' class to the target tab content.
	 */
	if ($('.tabs-box').length) { // Check if elements with class 'tabs-box' exist
		$('.tabs-box .tab-buttons .tab-btn').on('click', function (e) { // Attach click handler to tab buttons within tabs boxes
			e.preventDefault(); // Prevent default link behavior (if tab buttons are links)
			var target = $($(this).attr('data-tab')); // Get the target tab content selector from the 'data-tab' attribute
			if ($(target).is(':visible')) { // Check if the target tab content is already visible
				return false; // If visible, do nothing
			} else { // If not visible, switch tabs
				target.parents('.tabs-box').find('.tab-buttons').find('.tab-btn').removeClass('active-btn'); // Remove 'active-btn' class from all tab buttons in the tabs box
				$(this).addClass('active-btn'); // Add 'active-btn' class to the clicked tab button
				target.parents('.tabs-box').find('.tabs-content').find('.tab').fadeOut(0); // Fade out all tab contents in the tabs box instantly
				target.parents('.tabs-box').find('.tabs-content').find('.tab').removeClass('active-tab'); // Remove 'active-tab' class from all tab contents
				$(target).fadeIn(100); // Fade in the target tab content with 100ms animation
				$(target).addClass('active-tab'); // Add 'active-tab' class to the target tab content
			}
		});
	}

	// ------------------------------------------------------------------------
	// Accordion Box Functionality
	// ------------------------------------------------------------------------
	/**
	 * Accordion Box - Handles accordion content areas.
	 *
	 * This section implements accordion functionality using jQuery.
	 * It allows expanding and collapsing accordion items by clicking on accordion buttons (acc-btn).
	 *
	 * - When an accordion button (acc-btn) is clicked:
	 *   - It gets the parent accordion box and the parent accordion item.
	 *   - If the clicked button is not already active:
	 *     - It removes the 'active' class from all accordion buttons within the same accordion box.
	 *   - If the content of the clicked button is already visible, it does nothing.
	 *   - Otherwise:
	 *     - It adds the 'active' class to the clicked button.
	 *     - It removes the 'active-block' class from all accordion items in the same accordion box.
	 *     - It slides up (hide) all accordion contents within the same accordion box with 300ms animation.
	 *     - It adds the 'active-block' class to the parent accordion item.
	 *     - It slides down (show) the accordion content of the clicked button with 300ms animation.
	 */
	if ($('.accordion-box').length) { // Check if elements with class 'accordion-box' exist
		$(".accordion-box").on('click', '.acc-btn', function () { // Attach click handler to accordion buttons (acc-btn) within accordion boxes
			var outerBox = $(this).parents('.accordion-box'); // Get the parent accordion box
			var target = $(this).parents('.accordion'); // Get the parent accordion item
			if ($(this).hasClass('active') !== true) { // Check if the clicked button is not already active
				$(outerBox).find('.accordion .acc-btn').removeClass('active'); // Remove 'active' class from all accordion buttons in the accordion box
			}
			if ($(this).next('.acc-content').is(':visible')) { // Check if the accordion content is already visible
				return false; // If visible, do nothing
			} else { // If not visible, expand/collapse accordion item
				$(this).addClass('active'); // Add 'active' class to the clicked button
				$(outerBox).children('.accordion').removeClass('active-block'); // Remove 'active-block' class from all accordion items in the accordion box
				$(outerBox).find('.accordion').children('.acc-content').slideUp(300); // Slide up (hide) all accordion contents in the accordion box
				target.addClass('active-block'); // Add 'active-block' class to the parent accordion item
				$(this).next('.acc-content').slideDown(300); // Slide down (show) the accordion content of the clicked button
			}
		});
	}

	// ------------------------------------------------------------------------
	// Banner Carousel (Owl Carousel)
	// ------------------------------------------------------------------------
	/**
	 * banner-carousel - Initializes Owl Carousel for banner sliders.
	 *
	 * Owl Carousel is a jQuery plugin for creating responsive carousel sliders.
	 * This section initializes Owl Carousel for elements with the class 'banner-carousel'.
	 * It sets various options for loop, navigation, animations, autoplay, and responsive behavior.
	 * Make sure to include Owl Carousel library and CSS in your project.
	 */
	if ($('.banner-carousel').length) { // Check if elements with class 'banner-carousel' exist
		$('.banner-carousel').owlCarousel({ // Initialize Owl Carousel on elements with class 'banner-carousel'
			loop: true, // Enable infinite loop
			margin: 0, // Set margin between items to 0
			nav: true, // Enable navigation controls (next/prev buttons)
			animateOut: 'fadeOut', // Set animation for item going out of view
			animateIn: 'fadeIn', // Set animation for item coming into view
			active: true, // Likely related to initial active state (check Owl Carousel documentation)
			smartSpeed: 1000, // Set animation speed to 1000ms
			autoplay: 6000, // Enable autoplay with interval of 6000ms (6 seconds)
			navText: ['<span class="icon-6"></span>', '<span class="icon-7"></span>'], // Set navigation button text (using icon spans)
			responsive: { // Responsive settings
				0: { items: 1 }, // 1 item for viewport width 0 and above
				600: { items: 1 }, // 1 item for viewport width 600 and above
				800: { items: 1 }, // 1 item for viewport width 800 and above
				1024: { items: 1 } // 1 item for viewport width 1024 and above (always 1 item in this case)
			}
		});
	}

	// ------------------------------------------------------------------------
	// Single Item Carousel (Owl Carousel)
	// ------------------------------------------------------------------------
	/**
	 * single-item-carousel - Initializes Owl Carousel for single item sliders.
	 *
	 * Similar to banner carousel, but typically used for testimonials, single product displays, etc.
	 * Shows only one item at a time in the carousel.
	 */
	if ($('.single-item-carousel').length) { // Check if elements with class 'single-item-carousel' exist
		$('.single-item-carousel').owlCarousel({ // Initialize Owl Carousel
			loop: true, // Enable loop
			margin: 30, // Set margin between items to 30px
			nav: true, // Enable navigation
			smartSpeed: 500, // Animation speed 500ms
			autoplay: 1000, // Autoplay 1 second interval
			navText: ['<span class="icon-6"></span>', '<span class="icon-7"></span>'], // Navigation icons
			responsive: { // Responsive settings
				0: { items: 1 }, // 1 item for all viewport widths
				480: { items: 1 },
				600: { items: 1 },
				800: { items: 1 },
				1200: { items: 1 }
			}
		});
	}

	// ------------------------------------------------------------------------
	// Two Item Carousel (Owl Carousel)
	// ------------------------------------------------------------------------
	/**
	 * two-item-carousel - Initializes Owl Carousel to display two items at a time.
	 *
	 * Used for displaying content in pairs, like blog posts, services, etc.
	 */
	if ($('.two-item-carousel').length) { // Check for elements with class 'two-item-carousel'
		$('.two-item-carousel').owlCarousel({ // Initialize Owl Carousel
			loop: true, // Loop enabled
			margin: 30, // 30px margin between items
			nav: true, // Navigation enabled
			smartSpeed: 500, // Animation speed 500ms
			autoplay: 1000, // Autoplay 1 second interval
			navText: ['<span class="icon-6"></span>', '<span class="icon-7"></span>'], // Navigation icons
			responsive: { // Responsive settings
				0: { items: 1 }, // 1 item on smaller screens
				480: { items: 1 },
				600: { items: 1 },
				800: { items: 1 },
				1200: { items: 2 } // 2 items on larger screens (1200px and above)
			}
		});
	}

	// ------------------------------------------------------------------------
	// Three Item Carousel (Owl Carousel)
	// ------------------------------------------------------------------------
	/**
	 * three-item-carousel - Initializes Owl Carousel to display three items at a time.
	 *
	 * Useful for showcasing features, team members, or product categories in groups of three.
	 */
	if ($('.three-item-carousel').length) { // Check for elements with class 'three-item-carousel'
		$('.three-item-carousel').owlCarousel({ // Initialize Owl Carousel
			loop: true, // Loop enabled
			margin: 30, // 30px margin
			nav: true, // Navigation enabled
			smartSpeed: 500, // Animation speed 500ms
			autoplay: 1000, // Autoplay 1 second interval
			navText: ['<span class="icon-6"></span>', '<span class="icon-7"></span>'], // Navigation icons
			responsive: { // Responsive settings
				0: { items: 1 }, // 1 item on smallest screens
				480: { items: 1 },
				600: { items: 2 }, // 2 items on medium screens
				800: { items: 2 }, // 2 items on larger screens (up to 1200px)
				1200: { items: 3 } // 3 items on large screens (1200px and above)
			}
		});
	}

	// ------------------------------------------------------------------------
	// Four Item Carousel (Owl Carousel)
	// ------------------------------------------------------------------------
	/**
	 * four-item-carousel - Initializes Owl Carousel to display four items at a time.
	 *
	 * Suitable for product listings, gallery displays, or sections requiring more content per row.
	 */
	if ($('.four-item-carousel').length) { // Check for elements with class 'four-item-carousel'
		$('.four-item-carousel').owlCarousel({ // Initialize Owl Carousel
			loop: true, // Loop enabled
			margin: 30, // 30px margin
			nav: true, // Navigation enabled
			smartSpeed: 500, // Animation speed 500ms
			autoplay: 1000, // Autoplay 1 second interval
			navText: ['<span class="icon-6"></span>', '<span class="icon-7"></span>'], // Navigation icons
			responsive: { // Responsive settings
				0: { items: 1 }, // 1 item on smallest screens
				480: { items: 1 },
				600: { items: 2 }, // 2 items on medium screens
				800: { items: 3 }, // 3 items on larger screens
				1200: { items: 4 } // 4 items on large screens (1200px and above)
			}
		});
	}

	// ------------------------------------------------------------------------
	// Five Item Carousel (Owl Carousel)
	// ------------------------------------------------------------------------
	/**
	 * five-item-carousel - Initializes Owl Carousel to display five items at a time.
	 *
	 * Used for extensive product showcases, brand logos, or similar content where many items need to be visible.
	 */
	if ($('.five-item-carousel').length) { // Check for elements with class 'five-item-carousel'
		$('.five-item-carousel').owlCarousel({ // Initialize Owl Carousel
			loop: true, // Loop enabled
			margin: 30, // 30px margin
			nav: true, // Navigation enabled
			smartSpeed: 500, // Animation speed 500ms
			autoplay: 1000, // Autoplay 1 second interval
			navText: ['<span class="icon-6"></span>', '<span class="icon-7"></span>'], // Navigation icons
			responsive: { // Responsive settings
				0: { items: 1 }, // 1 item on smallest screens
				480: { items: 2 }, // 2 items on small screens
				600: { items: 3 }, // 3 items on medium screens
				800: { items: 4 }, // 4 items on larger screens
				1200: { items: 5 } // 5 items on large screens (1200px and above)
			}
		});
	}

	// ------------------------------------------------------------------------
	// One Page Navigation
	// ------------------------------------------------------------------------
	/**
	 * Add One Page nav - Initializes One Page Navigation for smooth scrolling to sections.
	 *
	 * One Page Nav is a jQuery plugin that automatically updates the navigation links based on the currently visible section in the viewport.
	 * It also enables smooth scrolling when clicking on navigation links to jump to different sections on the same page.
	 * Make sure to include the One Page Nav library in your project.
	 */
	if ($('.scroll-nav').length) { // Check if elements with class 'scroll-nav' exist (navigation element for one page nav)
		$('.scroll-nav').onePageNav(); // Initialize One Page Nav on elements with class 'scroll-nav'
	}

	// ------------------------------------------------------------------------
	// Nice Select Plugin for Dropdowns
	// ------------------------------------------------------------------------
	/**
	 * nice select - Initializes Nice Select plugin for enhanced dropdown styling.
	 *
	 * Nice Select is a jQuery plugin that replaces default browser dropdowns with customizable and stylable dropdowns.
	 * This section initializes Nice Select for all <select> elements on the page, except those with the class 'ignore'.
	 * Make sure to include Nice Select library and CSS in your project.
	 */
	$(document).ready(function () { // Execute this code when the document is ready
		$('select:not(.ignore)').niceSelect(); // Initialize Nice Select on all <select> elements that do not have the class 'ignore'
	});

	// ------------------------------------------------------------------------
	// Sortable Masonry with Filters (Isotope)
	// ------------------------------------------------------------------------
	/**
	 * Sortable Masonary with Filters - Implements a sortable and filterable Masonry layout using Isotope.
	 *
	 * Isotope is a JavaScript library for creating dynamic, filterable, and sortable layouts.
	 * This section sets up Isotope for elements with the class 'sortable-masonry'.
	 * It handles filtering based on data attributes of filter buttons and responsive layout adjustments.
	 * Make sure to include Isotope library in your project.
	 */
	function enableMasonry() { // Function to enable Masonry layout
		if ($('.sortable-masonry').length) { // Check if elements with class 'sortable-masonry' exist
			var winDow = $(window); // Get the window object
			var $container = $('.sortable-masonry .items-container'); // Select the container for Masonry items
			var $filter = $('.filter-btns'); // Select the filter buttons container

			$container.isotope({ // Initialize Isotope on the items container
				filter: '*', // Initial filter to show all items
				masonry: { // Masonry layout options
					columnWidth: '.masonry-item.small-column' // Define column width using elements with class 'masonry-item small-column'
				},
				animationOptions: { // Animation options for layout transitions
					duration: 500, // Animation duration 500ms
					easing: 'linear' // Linear easing for animation
				}
			});

			// Isotope Filter - Handle filter button clicks
			$filter.find('li').on('click', function () { // Attach click handler to filter buttons (list items)
				var selector = $(this).attr('data-filter'); // Get the filter selector from the 'data-filter' attribute
				try { // Try-catch block to handle potential errors during Isotope filtering
					$container.isotope({ // Apply Isotope filtering
						filter: selector, // Apply the selected filter
						animationOptions: { // Animation options for filtering
							duration: 500, // Animation duration 500ms
							easing: 'linear', // Linear easing
							queue: false // Disable animation queueing
						}
					});
				} catch (err) { // Catch any errors during Isotope filtering
					// Handle error if needed, or leave empty to silently fail
				}
				return false; // Prevent default link behavior
			});

			winDow.on('resize', function () { // Attach resize event handler to window
				var selector = $filter.find('li.active').attr('data-filter'); // Get the currently active filter selector
				$container.isotope({ // Re-apply Isotope layout with current filter on window resize
					filter: selector, // Apply the active filter
					animationOptions: { // Animation options
						duration: 500, // Animation duration 500ms
						easing: 'linear', // Linear easing
						queue: false // Disable queueing
					}
				});
			});

			var filterItemA = $('.filter-btns li'); // Select all filter buttons
			filterItemA.on('click', function () { // Attach click handler to filter buttons
				var $this = $(this); // Store the clicked button in a variable
				if (!$this.hasClass('active')) { // Check if the clicked button is not already active
					filterItemA.removeClass('active'); // Remove 'active' class from all filter buttons
					$this.addClass('active'); // Add 'active' class to the clicked button
				}
			});
		}
	}
	enableMasonry(); // Call enableMasonry function to initialize Masonry layout

	// ------------------------------------------------------------------------
	// Progress Bar Animation
	// ------------------------------------------------------------------------
	/**
	 * Progress Bar - Animates progress bars on scroll using the 'appear' plugin.
	 *
	 * This section animates progress bars by gradually increasing their width to the specified percentage when they become visible in the viewport.
	 * It uses the 'appear' plugin to detect visibility and sets the width based on the 'data-percent' attribute.
	 */
	if ($('.count-bar').length) { // Check if elements with class 'count-bar' exist (progress bar elements)
		$('.count-bar').appear(function () { // Use 'appear' plugin to detect when progress bar becomes visible
			var el = $(this); // Store the current progress bar element
			var percent = el.data('percent'); // Get the percentage value from the 'data-percent' attribute
			$(el).css('width', percent).addClass('counted'); // Set the width of the progress bar to the specified percentage and add 'counted' class (likely for styling)
		}, { accY: -50 }); // Offset for 'appear' detection (trigger 50px before element is fully in viewport)
	}

	// ------------------------------------------------------------------------
	// Page Direction Switch (RTL/LTR)
	// ------------------------------------------------------------------------
	/**
	 * page direction - Handles switching between Right-to-Left (RTL) and Left-to-Right (LTR) page direction.
	 *
	 * This section provides functionality to toggle the page direction, which is useful for supporting RTL languages.
	 * It adds a click handler to direction switch buttons and toggles classes on the 'boxed_wrapper' element to change direction.
	 */
	function directionswitch() { // Function to handle direction switch
		if ($('.page_direction').length) { // Check if elements with class 'page_direction' exist (direction switch controls)
			$('.direction_switch button').on('click', function () { // Attach click handler to direction switch buttons
				$('.boxed_wrapper').toggleClass(function () { // Toggle classes on the 'boxed_wrapper' element
					return $(this).is('.rtl, .ltr') ? 'rtl ltr' : 'rtl'; // If it has 'rtl' or 'ltr' class, toggle between them, otherwise add 'rtl'
				})
			});
		};
	}

	// ------------------------------------------------------------------------
	// Jquery Spinner / Quantity Spinner
	// ------------------------------------------------------------------------
	/**
	 * Jquery Spinner / Quantity Spinner - Initializes TouchSpin plugin for quantity input fields.
	 *
	 * TouchSpin is a jQuery plugin for creating user-friendly numeric input fields with increment/decrement buttons.
	 * This section initializes TouchSpin for input elements with the class 'quantity-spinner'.
	 * It enables vertical buttons for incrementing and decrementing the quantity.
	 * Make sure to include TouchSpin library and CSS in your project.
	 */
	if ($('.quantity-spinner').length) { // Check if elements with class 'quantity-spinner' exist (quantity input fields)
		$("input.quantity-spinner").TouchSpin({ // Initialize TouchSpin on input elements with class 'quantity-spinner'
			verticalbuttons: true // Enable vertical increment/decrement buttons
		});
	}

	// ------------------------------------------------------------------------
	// AOS Animation (Animate On Scroll)
	// ------------------------------------------------------------------------
	/**
	 * AOS Animation - Initializes AOS (Animate On Scroll) library for scroll-triggered animations.
	 *
	 * AOS is a JavaScript library for animating elements as you scroll down the page.
	 * This section initializes AOS with default settings, including a duration of 1000ms and mirroring animations.
	 * Elements with the 'data-aos' attribute will be animated when they come into view.
	 * Make sure to include AOS library and CSS in your project.
	 */
	if ($("[data-aos]").length) { // Check if elements with 'data-aos' attribute exist (indicating AOS is used)
		AOS.init({ // Initialize AOS
			duration: 1000, // Set default animation duration to 1000ms (1 second)
			mirror: true // Enable mirroring animations (animate elements in both scroll directions)
		});
	}

	// ------------------------------------------------------------------------
	// Price Range Slider (jQuery UI Slider)
	// ------------------------------------------------------------------------
	/**
	 * -----JS for Price Range slider----- - Initializes jQuery UI Slider for price range filtering.
	 *
	 * jQuery UI Slider is a jQuery UI widget for creating interactive range sliders.
	 * This section initializes a range slider for price filtering, using elements with IDs 'slider-range' and 'amount'.
	 * It sets min/max values, initial values, and updates the 'amount' input field with the selected price range on slide.
	 * Make sure to include jQuery UI library and CSS in your project.
	 */
	$(function () { // Shorthand for $(document).ready()
		$("#slider-range").slider({ // Initialize jQuery UI Slider on element with ID 'slider-range'
			range: true, // Enable range selection
			min: 120, // Set minimum value to 120
			max: 200, // Set maximum value to 200
			values: [130, 160], // Set initial values to 130 and 160
			slide: function (event, ui) { // Slide event handler (triggered when slider handle is moved)
				$("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]); // Update the value of element with ID 'amount' to display the current price range
			}
		});
		$("#amount").val("$" + $("#slider-range").slider("values", 0) + // Set initial value of 'amount' input
			" - $" + $("#slider-range").slider("values", 1));
	});

	// ------------------------------------------------------------------------
	// Search Popup Functionality
	// ------------------------------------------------------------------------
	/**
	 * Search Popup - Handles the search popup display and toggling.
	 *
	 * This section manages the search popup functionality, which is likely used for an overlay-style search interface.
	 * It shows the popup when the search toggler is clicked, hides it on escape key press, and hides it when clicking on the close button or overlay.
	 */
	if ($('#search-popup').length) { // Check if element with ID 'search-popup' exists (search popup container)
		// Show Popup
		$('.search-toggler').on('click', function () { // Attach click handler to search toggler button
			$('#search-popup').addClass('popup-visible'); // Add 'popup-visible' class to show the search popup
		});
		$(document).keydown(function (e) { // Attach keydown event handler to the document
			if (e.keyCode === 27) { // Check if the pressed key is Escape (keyCode 27)
				$('#search-popup').removeClass('popup-visible'); // Remove 'popup-visible' class to hide the search popup on Escape key
			}
		});
		// Hide Popup
		$('.close-search,.search-popup .overlay-layer').on('click', function () { // Attach click handler to close button and overlay of search popup
			$('#search-popup').removeClass('popup-visible'); // Remove 'popup-visible' class to hide the search popup
		});
	}

	// ------------------------------------------------------------------------
	// BXSlider Functionality
	// ------------------------------------------------------------------------
	/**
	 * BXSlider - Initializes BXSlider for image sliders.
	 *
	 * BXSlider is a jQuery slider plugin for creating image and content sliders.
	 * This section initializes BXSlider for elements with the class 'bxslider'.
	 * It sets options for navigation, mode, autoplay, speed, and custom pager.
	 * Make sure to include BXSlider library and CSS in your project.
	 */
	if ($('.bxslider').length) { // Check if elements with class 'bxslider' exist
		$('.bxslider').bxSlider({ // Initialize BXSlider on elements with class 'bxslider'
			nextSelector: '.bxslider #slider-next', // Selector for next button
			prevSelector: '.bxslider #slider-prev', // Selector for previous button
			nextText: '<i class="fa fa-angle-right"></i>', // Text for next button (using Font Awesome icon)
			prevText: '<i class="fa fa-angle-left"></i>', // Text for previous button (using Font Awesome icon)
			mode: 'fade', // Set slider mode to 'fade' (crossfade effect)
			auto: 'true', // Enable autoplay
			speed: '700', // Set animation speed to 700ms
			pagerCustom: '.bxslider .slider-pager .thumb-box' // Use custom pager (thumbnails) defined by selector
		});
	};

	// ------------------------------------------------------------------------
	// Donate Popup Functionality
	// ------------------------------------------------------------------------
	/**
	 * donate popup - Handles the donate popup display and toggling.
	 *
	 * This section manages the donate popup functionality, similar to the search popup.
	 * It shows the popup when the donate box button is clicked and hides it when the close button is clicked.
	 */
	function donatepopup() { // Function to handle donate popup
		if ($('#donate-popup').length) { // Check if element with ID 'donate-popup' exists (donate popup container)
			// Show Popup
			$('.donate-box-btn').on('click', function () { // Attach click handler to donate box button
				$('#donate-popup').addClass('popup-visible'); // Add 'popup-visible' class to show donate popup
			});
			// Hide Popup
			$('.close-donate').click(function () { // Attach click handler to close button of donate popup
				$('#donate-popup').removeClass('popup-visible'); // Remove 'popup-visible' class to hide donate popup
			});
		}
	}

	// ------------------------------------------------------------------------
	// Curved Circle Text Effect (CircleType.js)
	// ------------------------------------------------------------------------
	/**
	 * Curved Circle Text Effect - Initializes CircleType.js for curved text effect.
	 *
	 * CircleType.js is a JavaScript library for setting text on a circle.
	 * This section initializes CircleType.js for elements with the class 'curved-circle'.
	 * It sets options for position, direction, radius, and force height/width.
	 * Make sure to include CircleType.js library in your project.
	 */
	if ($('.curved-circle').length) { // Check if elements with class 'curved-circle' exist
		$('.curved-circle').circleType({ // Initialize CircleType.js on elements with class 'curved-circle'
			position: 'absolute', // Set position to absolute
			dir: 0.85, // Set direction of text curve
			radius: 80, // Set radius of the circle to 80px
			forceHeight: true, // Force height to accommodate curved text
			forceWidth: true // Force width to accommodate curved text
		});
	}

	/*	=========================================================================
	When document is on ready, do
	========================================================================== */
	jQuery(document).on('ready', function () { // Execute this code when the document is ready
		(function ($) { // Encapsulate code in an anonymous function with jQuery alias
			// add your functions
			directionswitch(); // Call directionswitch function to enable RTL/LTR switch
			donatepopup(); // Call donatepopup function to enable donate popup functionality
		})(jQuery);
	});

	/* ==========================================================================
	When document is Scrollig, do
	========================================================================== */
	$(window).on('scroll', function () { // Attach scroll event handler to window
		headerStyle(); // Call headerStyle function on scroll to update header styling (fixed header, scroll to top button)
	});

	/* ==========================================================================
	When document is loaded, do
	========================================================================== */
	$(window).on('load', function () { // Attach load event handler to window (fires when all resources are loaded)
		handlePreloader(); // Call handlePreloader function on page load to hide preloader
		enableMasonry(); // Call enableMasonry function on page load to initialize Masonry layout
	});

})(window.jQuery); // Pass window.jQuery to the anonymous function to ensure jQuery is properly scoped
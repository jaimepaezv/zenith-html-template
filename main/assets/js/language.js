/**
 * -------------------------------------------------------------------
 * File Name: language.js
 * Description: This file contains Javascript code for DOM utility functions and
 *              a Language Picker component.
 *
 *              - Util object: Provides helper functions for DOM manipulation like
 *                adding/removing classes, setting attributes, getting children by class,
 *                checking element matching selectors, setting height with animation,
 *                smooth scrolling, moving focus, getting index in array, checking CSS support,
 *                extending objects, and polyfills for Element.matches, Element.closest, and CustomEvent.
 *
 *              - LanguagePicker component: Creates a custom dropdown for language selection,
 *                enhancing the user interface for language switching on a website.
 * -------------------------------------------------------------------
 */

function Util() {}; // Define a utility object named Util

/**
 * Util.hasClass - Checks if an element has a specific class.
 * @param {Element} el - The HTML element to check.
 * @param {string} className - The class name to search for.
 * @returns {boolean} - True if the element has the class, false otherwise.
 */
Util.hasClass = function(el, className) {
    if (el.classList) return el.classList.contains(className); // Use classList API if available for modern browsers
    else return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)')); // For older browsers, use regular expression to check class
};

/**
 * Util.addClass - Adds a class or multiple classes to an element.
 * @param {Element} el - The HTML element to modify.
 * @param {string} className - The class name(s) to add (space-separated for multiple classes).
 */
Util.addClass = function(el, className) {
    var classList = className.split(' '); // Split class names by space to handle multiple classes
    if (el.classList) el.classList.add(classList[0]); // Use classList API for modern browsers
    else if (!Util.hasClass(el, classList[0])) el.className += " " + classList[0]; // For older browsers, append class name if it doesn't already exist
    if (classList.length > 1) Util.addClass(el, classList.slice(1).join(' ')); // Recursively add remaining classes if more than one is provided
};

/**
 * Util.removeClass - Removes a class or multiple classes from an element.
 * @param {Element} el - The HTML element to modify.
 * @param {string} className - The class name(s) to remove (space-separated for multiple classes).
 */
Util.removeClass = function(el, className) {
    var classList = className.split(' '); // Split class names by space
    if (el.classList) el.classList.remove(classList[0]); // Use classList API
    else if (Util.hasClass(el, classList[0])) { // For older browsers, remove class using regular expression
        var reg = new RegExp('(\\s|^)' + classList[0] + '(\\s|$)');
        el.className = el.className.replace(reg, ' '); // Replace the class name with a space
    }
    if (classList.length > 1) Util.removeClass(el, classList.slice(1).join(' ')); // Recursively remove remaining classes
};

/**
 * Util.toggleClass - Toggles a class on an element based on a boolean value.
 * @param {Element} el - The HTML element to modify.
 * @param {string} className - The class name to toggle.
 * @param {boolean} bool - If true, add the class; if false, remove it.
 */
Util.toggleClass = function(el, className, bool) {
    if (bool) Util.addClass(el, className); // Add class if bool is true
    else Util.removeClass(el, className); // Remove class if bool is false
};

/**
 * Util.setAttributes - Sets multiple attributes on an element.
 * @param {Element} el - The HTML element to modify.
 * @param {object} attrs - An object where keys are attribute names and values are attribute values.
 */
Util.setAttributes = function(el, attrs) {
    for (var key in attrs) { // Iterate through the attributes object
        el.setAttribute(key, attrs[key]); // Set each attribute on the element
    }
};

/**
 * Util.getChildrenByClassName - Gets all direct children of an element that have a specific class.
 * @param {Element} el - The parent HTML element.
 * @param {string} className - The class name to filter children by.
 * @returns {Array<Element>} - An array of child elements that have the specified class.
 */
Util.getChildrenByClassName = function(el, className) {
    var children = el.children, // Get the children collection of the element
        childrenByClass = [];
    for (var i = 0; i < el.children.length; i++) { // Iterate through the children
        if (Util.hasClass(el.children[i], className)) childrenByClass.push(el.children[i]); // If child has the class, add it to the array
    }
    return childrenByClass; // Return the array of filtered children
};

/**
 * Util.is - Checks if an element matches a selector or is the same as another element.
 * @param {Element} elem - The HTML element to check.
 * @param {string|Element} selector - A CSS selector string or another HTML element to compare with.
 * @returns {boolean} - True if the element matches the selector or is the same element, false otherwise.
 */
Util.is = function(elem, selector) {
    if (selector.nodeType) { // Check if selector is an HTML element
        return elem === selector; // Compare directly if selector is an element
    }
    var qa = (typeof(selector) === 'string' ? document.querySelectorAll(selector) : selector), // If selector is string, query all matching elements, otherwise use provided selector (assuming it's NodeList)
        length = qa.length,
        returnArr = [];
    while (length--) { // Iterate backwards through the NodeList
        if (qa[length] === elem) { // Check if any element in NodeList is the same as the provided element
            return true; // Return true if a match is found
        }
    }
    return false; // Return false if no match is found
};

/**
 * Util.setHeight - Animates the height of an element from a starting height to a target height.
 * @param {number} start - The starting height in pixels.
 * @param {number} to - The target height in pixels.
 * @param {HTMLElement} element - The HTML element to animate.
 * @param {number} duration - The duration of the animation in milliseconds.
 * @param {function} cb - An optional callback function to execute after the animation is complete.
 */
Util.setHeight = function(start, to, element, duration, cb) {
    var change = to - start, // Calculate the total change in height
        currentTime = null;
    var animateHeight = function(timestamp) { // Animation function using requestAnimationFrame
        if (!currentTime) currentTime = timestamp; // Store the start time of the animation
        var progress = timestamp - currentTime; // Calculate the elapsed time
        var val = parseInt((progress / duration) * change + start); // Calculate the current height based on progress and duration
        element.style.height = val + "px"; // Set the element's height
        if (progress < duration) { // Continue animation if duration is not reached
            window.requestAnimationFrame(animateHeight); // Request the next animation frame
        } else {
            cb(); // Execute callback function after animation completion
        }
    };
    element.style.height = start + "px"; // Set initial height
    window.requestAnimationFrame(animateHeight); // Start the animation
};

/**
 * Util.scrollTo - Smoothly scrolls the window to a specific vertical position.
 * @param {number} final - The target vertical scroll position in pixels.
 * @param {number} duration - The duration of the scroll animation in milliseconds.
 * @param {function} cb - An optional callback function to execute after scrolling is complete.
 */
Util.scrollTo = function(final, duration, cb) {
    var start = window.scrollY || document.documentElement.scrollTop, // Get current scroll position
        currentTime = null;
    var animateScroll = function(timestamp) { // Animation function for smooth scrolling
        if (!currentTime) currentTime = timestamp; // Store animation start time
        var progress = timestamp - currentTime; // Calculate elapsed time
        if (progress > duration) progress = duration; // Cap progress at duration
        var val = Math.easeInOutQuad(progress, start, final - start, duration); // Calculate scroll value using easeInOutQuad easing
        window.scrollTo(0, val); // Scroll to the calculated position
        if (progress < duration) { // Continue animation if duration is not reached
            window.requestAnimationFrame(animateScroll); // Request next animation frame
        } else {
            cb && cb(); // Execute callback after scroll completion
        }
    };
    window.requestAnimationFrame(animateScroll); // Start scroll animation
};

/**
 * Util.moveFocus - Moves focus to a specified element or the body if no element is provided.
 * @param {HTMLElement} element - The HTML element to focus on. If null or undefined, focus is moved to the body.
 */
Util.moveFocus = function(element) {
    if (!element) element = document.getElementsByTagName("body")[0]; // Default to body if no element is provided
    element.focus(); // Attempt to focus on the element
    if (document.activeElement !== element) { // Check if focus was actually moved to the element
        element.setAttribute('tabindex', '-1'); // If not, set tabindex to -1 to allow focus
        element.focus(); // Try focusing again
    }
};

/**
 * Util.getIndexInArray - Gets the index of an element within an array-like object.
 * @param {ArrayLike<T>} array - The array-like object to search within.
 * @param {T} el - The element to find the index of.
 * @returns {number} - The index of the element in the array, or -1 if not found.
 * @template T
 */
Util.getIndexInArray = function(array, el) {
    return Array.prototype.indexOf.call(array, el); // Use Array.prototype.indexOf for array-like objects
};

/**
 * Util.cssSupports - Checks if the browser supports a specific CSS property and value.
 * @param {string} property - The CSS property to check (e.g., 'display').
 * @param {string} value - The CSS value to check (e.g., 'flex').
 * @returns {boolean} - True if the browser supports the property and value, false otherwise.
 */
Util.cssSupports = function(property, value) {
    if ('CSS' in window) { // Modern browsers with CSS.supports API
        return CSS.supports(property, value); // Use CSS.supports for direct property and value check
    } else { // Older browsers
        var jsProperty = property.replace(/-([a-z])/g, function(g) { // Convert CSS property to JavaScript property (e.g., 'background-color' to 'backgroundColor')
            return g[1].toUpperCase();
        });
        return jsProperty in document.body.style; // Check if the JavaScript property exists in the element style object (value support is not checked in older browsers)
    }
};

/**
 * Util.extend - Merges properties of one or more objects into a target object.
 * @returns {object} - The extended object.
 */
Util.extend = function() {
    var extended = {}; // Target object for merging
    var deep = false; // Flag for deep merge (not fully implemented in this version, acts as shallow merge)
    var i = 0;
    var length = arguments.length;
    if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') { // Check for deep flag as the first argument (not fully functional in this version)
        deep = arguments[0];
        i++;
    }
    var merge = function(obj) { // Function to merge object properties
        for (var prop in obj) { // Iterate through object properties
            if (Object.prototype.hasOwnProperty.call(obj, prop)) { // Ensure property is directly on the object and not inherited
                if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') { // Deep merge condition (not fully implemented, will overwrite objects)
                    extended[prop] = extend(true, extended[prop], obj[prop]); // Intended for recursive deep merge, but 'extend' is not defined within 'merge' scope for recursion in this snippet.
                } else {
                    extended[prop] = obj[prop]; // Shallow merge: simply copy property value
                }
            }
        }
    };
    for (; i < length; i++) { // Iterate through objects to be merged
        var obj = arguments[i];
        merge(obj); // Merge each object into the 'extended' object
    }
    return extended; // Return the merged object
};

// Polyfill for Element.matches for older browsers
if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector; // Use browser-specific prefixes if standard 'matches' is not available
}

// Polyfill for Element.closest for older browsers
if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
        var el = this;
        if (!document.documentElement.contains(el)) return null; // Return null if element is not in the document
        do {
            if (el.matches(s)) return el; // Return the element if it matches the selector
            el = el.parentElement || el.parentNode; // Move up to the parent element
        } while (el !== null && el.nodeType === 1); // Continue until document root or non-element node is reached
        return null; // Return null if no matching ancestor is found
    };
}

// Polyfill for CustomEvent for IE
if (typeof window.CustomEvent !== "function") {
    function CustomEvent(event, params) {
        params = params || { // Default parameters for CustomEvent
            bubbles: false,
            cancelable: false,
            detail: undefined
        };
        var evt = document.createEvent('CustomEvent'); // Create a CustomEvent
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail); // Initialize the CustomEvent
        return evt; // Return the created CustomEvent
    }
    CustomEvent.prototype = window.Event.prototype; // Inherit from Event prototype
    window.CustomEvent = CustomEvent; // Assign the polyfill to window.CustomEvent
}

// Easing function for smooth scrolling (easeInOutQuad)
Math.easeInOutQuad = function(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
};
/**/

// Immediately invoked function expression to encapsulate LanguagePicker functionality
(function() {
	/**
	 * LanguagePicker - Constructor function for the Language Picker component.
	 * @param {HTMLElement} element - The container element for the language picker.
	 */
	var LanguagePicker = function(element) {
		this.element = element; // Store the container element
		this.select = this.element.getElementsByTagName('select')[0]; // Get the <select> element inside the container
		this.options = this.select.getElementsByTagName('option'); // Get all <option> elements within the <select>
		this.selectedOption = getSelectedOptionText(this); // Get the text of the currently selected option
		this.pickerId = this.select.getAttribute('id'); // Get the ID of the <select> element
		this.trigger = false; // Placeholder for the button that triggers the dropdown
		this.dropdown = false; // Placeholder for the dropdown element
		this.firstLanguage = false; // Placeholder for the first language item in the dropdown
		// dropdown arrow inside the button element - SVG path for dropdown arrow icon
		this.svgPath = '<svg viewBox="0 0 16 16"><polygon points="3,5 8,11 13,5 "></polygon></svg>';
		initLanguagePicker(this); // Initialize the language picker HTML
		initLanguagePickerEvents(this); // Initialize event listeners for the language picker
	};

	/**
	 * initLanguagePicker - Initializes the HTML structure of the Language Picker.
	 * @param {LanguagePicker} picker - The LanguagePicker object.
	 */
	function initLanguagePicker(picker) {
		// create the HTML for the custom dropdown element
		picker.element.insertAdjacentHTML('beforeend', initButtonPicker(picker) + initListPicker(picker)); // Insert button and dropdown list HTML into the container

		// save picker elements
		picker.dropdown = picker.element.getElementsByClassName('language-picker__dropdown')[0]; // Get the dropdown element
		picker.firstLanguage = picker.dropdown.getElementsByClassName('language-picker__item')[0]; // Get the first language item in the dropdown
		picker.trigger = picker.element.getElementsByClassName('language-picker__button')[0]; // Get the button element that triggers the dropdown
	};

	/**
	 * initLanguagePickerEvents - Initializes event listeners for the Language Picker.
	 * @param {LanguagePicker} picker - The LanguagePicker object.
	 */
	function initLanguagePickerEvents(picker) {
		// make sure to add the icon class to the arrow dropdown inside the button element
		Util.addClass(picker.trigger.getElementsByTagName('svg')[0], 'icon'); // Add 'icon' class to the SVG arrow in the button
		// language selection in dropdown
		// ⚠️ Important: you need to modify the 'initLanguageSelection' function in production to handle actual language switching logic
		initLanguageSelection(picker); // Initialize language selection event handling

		// click events - Toggle dropdown on button click
		picker.trigger.addEventListener('click', function(){
			toggleLanguagePicker(picker, false); // Toggle the language picker dropdown
		});
	};

	/**
	 * toggleLanguagePicker - Toggles the visibility of the Language Picker dropdown.
	 * @param {LanguagePicker} picker - The LanguagePicker object.
	 * @param {boolean|undefined} bool - Optional boolean to force open (true) or close (false) the dropdown. If undefined, toggles the current state.
	 */
	function toggleLanguagePicker(picker, bool) {
		var ariaExpanded;
		if(bool) {
			ariaExpanded = bool; // Use provided boolean value if available
		} else {
			ariaExpanded = picker.trigger.getAttribute('aria-expanded') == 'true' ? 'false' : 'true'; // Toggle aria-expanded attribute
		}
		picker.trigger.setAttribute('aria-expanded', ariaExpanded); // Set aria-expanded attribute on the trigger button
		if(ariaExpanded == 'true') {
			picker.firstLanguage.focus(); // Focus on the first language item when dropdown is opened (accessibility)
			picker.dropdown.addEventListener('transitionend', function cb(){ // Add transitionend listener for smoother focus on open
				picker.firstLanguage.focus(); // Focus again in transitionend callback
				picker.dropdown.removeEventListener('transitionend', cb); // Remove the event listener after execution
			});
		}
	};

	/**
	 * checkLanguagePickerClick - Closes the Language Picker dropdown if a click occurs outside the picker element.
	 * @param {LanguagePicker} picker - The LanguagePicker object.
	 * @param {EventTarget} target - The target of the click event.
	 */
	function checkLanguagePickerClick(picker, target) { // if user clicks outside the language picker -> close it
		if( !picker.element.contains(target) ) toggleLanguagePicker(picker, 'false'); // Close dropdown if click is outside the picker element
	};

	/**
	 * moveFocusToPickerTrigger - Moves focus back to the Language Picker trigger button.
	 * @param {LanguagePicker} picker - The LanguagePicker object.
	 */
	function moveFocusToPickerTrigger(picker) {
		if(picker.trigger.getAttribute('aria-expanded') == 'false') return; // Do nothing if dropdown is already closed
		if(document.activeElement.closest('.language-picker__dropdown') == picker.dropdown) picker.trigger.focus(); // Move focus to trigger button if focus is within the dropdown
	};

	/**
	 * initButtonPicker - Creates the HTML for the Language Picker trigger button.
	 * @param {LanguagePicker} picker - The LanguagePicker object.
	 * @returns {string} - HTML string for the button element.
	 */
	function initButtonPicker(picker) { // create the button element -> picker trigger
		// check if we need to add custom classes to the button trigger
		var customClasses = picker.element.getAttribute('data-trigger-class') ? ' '+picker.element.getAttribute('data-trigger-class') : ''; // Get custom classes from data attribute

		var button = '<button class="language-picker__button'+customClasses+'" aria-label="'+picker.select.value+' '+picker.element.getElementsByTagName('label')[0].innerText+'" aria-expanded="false" aria-contols="'+picker.pickerId+'-dropdown">'; // Start button HTML
		button = button + '<span aria-hidden="true" class="language-picker__label language-picker__flag language-picker__flag--'+picker.select.value+'"><em>'+picker.selectedOption+'</em>'; // Add span for flag and selected language label
		button = button +picker.svgPath+'</span>'; // Add SVG path for dropdown arrow
		return button+'</button>'; // Close button tag and return HTML
	};

	/**
	 * initListPicker - Creates the HTML for the Language Picker dropdown list.
	 * @param {LanguagePicker} picker - The LanguagePicker object.
	 * @returns {string} - HTML string for the dropdown list.
	 */
	function initListPicker(picker) { // create language picker dropdown
		var list = '<div class="language-picker__dropdown" aria-describedby="'+picker.pickerId+'-description" id="'+picker.pickerId+'-dropdown">'; // Start dropdown div HTML
		list = list + '<p class="sr-only" id="'+picker.pickerId+'-description">'+picker.element.getElementsByTagName('label')[0].innerText+'</p>'; // Add sr-only paragraph for accessibility description
		list = list + '<ul class="language-picker__list" role="listbox">'; // Start unordered list with role listbox for accessibility
		for(var i = 0; i < picker.options.length; i++) { // Loop through <option> elements
			var selected = picker.options[i].hasAttribute('selected') ? ' aria-selected="true"' : '', // Check if option is selected
				language = picker.options[i].getAttribute('lang'); // Get language attribute from option
			list = list + '<li><a lang="'+language+'" hreflang="'+language+'" href="'+getLanguageUrl(picker.options[i])+'"'+selected+' role="option" data-value="'+picker.options[i].value+'" class="language-picker__item language-picker__flag language-picker__flag--'+picker.options[i].value+'"><span>'+picker.options[i].text+'</span></a></li>'; // Add list item and link for each language option
		};
		return list + '</ul></div>'; // Close unordered list and dropdown div and return HTML
	};

	/**
	 * getSelectedOptionText - Gets the text of the currently selected option in the <select> element.
	 * @param {LanguagePicker} picker - The LanguagePicker object.
	 * @returns {string} - Text of the selected option.
	 */
	function getSelectedOptionText(picker) { // used to initialize the label of the picker trigger button
		var label = '';
		if('selectedIndex' in picker.select) { // Check if selectedIndex property is supported (modern browsers)
			label = picker.options[picker.select.selectedIndex].text; // Get text from selectedIndex
		} else { // Fallback for older browsers
			label = picker.select.querySelector('option[selected]').text; // Query option with 'selected' attribute
		}
		return label; // Return the selected option text
	};

	/**
	 * getLanguageUrl - Returns the URL for a given language option.
	 * @param {HTMLOptionElement} option - The <option> element.
	 * @returns {string} - The URL for the selected language (currently placeholder '#', **important to modify in production**).
	 */
	function getLanguageUrl(option) {
		// ⚠️ Important: You should replace this return value with the real link to your website in the selected language
		// option.value gives you the value of the language that you can use to create your real url (e.g, 'english' or 'italiano')
		return '#'; // Placeholder URL - **IMPORTANT: Replace with actual language URLs in production**
	};

	/**
	 * initLanguageSelection - Initializes event listener for language selection in the dropdown.
	 * @param {LanguagePicker} picker - The LanguagePicker object.
	 */
	function initLanguageSelection(picker) {
		picker.element.getElementsByClassName('language-picker__list')[0].addEventListener('click', function(event){ // Add click listener to the language list
			var language = event.target.closest('.language-picker__item'); // Find the clicked language item
			if(!language) return; // If no language item clicked, return

			if(language.hasAttribute('aria-selected') && language.getAttribute('aria-selected') == 'true') { // Check if the clicked language is already selected
				// selecting the same language
				event.preventDefault(); // Prevent default link behavior
				picker.trigger.setAttribute('aria-expanded', 'false'); // hide dropdown - Close the dropdown
			} else {
				// ⚠️ Important: this 'else' code needs to be removed in production.
				// The user has to be redirected to the new url -> nothing to do here
				event.preventDefault(); // Prevent default link behavior
				picker.element.getElementsByClassName('language-picker__list')[0].querySelector('[aria-selected="true"]').removeAttribute('aria-selected'); // Remove aria-selected from previously selected language
				language.setAttribute('aria-selected', 'true'); // Set aria-selected on the newly selected language
				picker.trigger.getElementsByClassName('language-picker__label')[0].setAttribute('class', 'language-picker__label language-picker__flag language-picker__flag--'+language.getAttribute('data-value')); // Update flag class on the trigger button
				picker.trigger.getElementsByClassName('language-picker__label')[0].getElementsByTagName('em')[0].innerText = language.innerText; // Update language text on the trigger button
				picker.trigger.setAttribute('aria-expanded', 'false'); // Close the dropdown
			}
		});
	};

	//initialize the LanguagePicker objects
	var languagePicker = document.getElementsByClassName('js-language-picker'); // Find all elements with class 'js-language-picker'
	if( languagePicker.length > 0 ) { // Check if any language picker elements exist
		var pickerArray = [];
		for( var i = 0; i < languagePicker.length; i++) { // Loop through each language picker element
			(function(i){pickerArray.push(new LanguagePicker(languagePicker[i]));})(i); // Create a new LanguagePicker object for each element and store it in pickerArray
		}

		// listen for key events - Global key event listeners for accessibility
		window.addEventListener('keyup', function(event){
			if( event.keyCode && event.keyCode == 27 || event.key && event.key.toLowerCase() == 'escape' ) { // Check for Escape key
				// close language picker on 'Esc'
				pickerArray.forEach(function(element){ // Loop through all LanguagePicker objects
					moveFocusToPickerTrigger(element); // Move focus back to the trigger button
					toggleLanguagePicker(element, 'false'); // Close the dropdown
				});
			}
		});
		// close language picker when clicking outside it - Global click event listener to close dropdown on outside click
		window.addEventListener('click', function(event){
			pickerArray.forEach(function(element){ // Loop through all LanguagePicker objects
				checkLanguagePickerClick(element, event.target); // Check if click is outside the picker and close if necessary
			});
		});
	}
}());
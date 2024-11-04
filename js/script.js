// Toggle dropdown: Shows or hides the dropdown menu when the button is clicked.
function toggleDropdown(element) {
    document.querySelectorAll('.dropdown').forEach(function(dropdown) {
        if (dropdown !== element) {
            dropdown.classList.remove('dropdown-active');
        }
    });
    element.classList.toggle('dropdown-active');
}
// Close dropdown if clicked outside
document.addEventListener('click', function(event) {
    const isDropdown = event.target.closest('.dropdown');
    if (!isDropdown) {
        document.querySelectorAll('.dropdown').forEach(function(dropdown) {
            dropdown.classList.remove('dropdown-active');
        });
    }
});

// Toggle menu: Open the navigation menu when the burger-icon button is clicked.
function toggleMenu() {
    const sideMenu = document.getElementById("sideMenu");
    const burgerIcon = document.querySelector(".burger-icon");

    sideMenu.classList.toggle("active");
    burgerIcon.classList.toggle("active");

    // Toggle icon between burger-icon-button and close-button
    if (burgerIcon.classList.contains("active")) {
        burgerIcon.textContent = "✕";
    } else {
        burgerIcon.textContent = "☰";
    }
}

// Sticky element positioned at the bottom of the container in section 1
window.onscroll = function() {
    const stickyObject = document.getElementById("stickyObject");
    const section1 = document.querySelector('#section1');
    const section1Bottom = section1.getBoundingClientRect().bottom;

    if (section1Bottom <= 0) {
        stickyObject.classList.add("stuck");
    } else {
        stickyObject.classList.remove("stuck");
    }
};

// Scroll-triggered counter
document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".stats-item");

    // Find the maximum target value for full progress calculation
    const maxTarget = Math.max(...[...items].map(item => +item.querySelector(".count").getAttribute("data-target")));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const countElement = entry.target.querySelector(".count");
                const progressBar = entry.target.querySelector(".progress");
                const target = +countElement.getAttribute("data-target");

                // Start counting and progress animation
                animateCountAndProgress(countElement, progressBar, target, maxTarget);

                // Mark the item as active to avoid re-triggering
                entry.target.classList.add("active");

                // Stop observing this item to prevent re-animation
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of the item is in view

    items.forEach(item => observer.observe(item));

    function animateCountAndProgress(countElement, progressBar, target, maxTarget) {
        let count = 0;
        const duration = 1000; // Total duration of the counting animation in ms
        const intervalTime = 20; // Interval time for updating the count and progress in ms
        const step = target / (duration / intervalTime); // Calculate step based on duration

        const interval = setInterval(() => {
            count += step;
            if (count >= target) {
                count = target; // Cap the count at the target value
                clearInterval(interval); // Stop the animation
            }
            countElement.textContent = Math.floor(count); // Display the current count as an integer

            // Set progress bar width proportionally based on maxTarget
            const progressPercentage = (target / maxTarget) * 100;
            progressBar.style.width = `${progressPercentage}%`;
        }, intervalTime);
    }
});

// Show contact information
function openOverlay() {
    document.getElementById("contactOverlay").style.display = "flex";
}

// Close contact information
function closeOverlay() {
    document.getElementById("contactOverlay").style.display = "none";
}

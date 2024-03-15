// Function to handle input events (keyup, blur, focus)
function handleInputEvent(e) {
    var input = e.target,
        label = input.previousElementSibling;

    if (e.type === 'keyup') {
        if (input.value === '') {
            label.classList.remove('active', 'highlight');
        } else {
            label.classList.add('active', 'highlight');
        }
    } else if (e.type === 'blur') {
        if (input.value === '') {
            label.classList.remove('active', 'highlight');
        } else {
            label.classList.remove('highlight');
        }
    } else if (e.type === 'focus') {
        if (input.value === '') {
            label.classList.remove('highlight');
        } else {
            label.classList.add('highlight');
        }
    }
}

// Find all form inputs and attach event listeners
var formInputs = document.querySelectorAll('.form input, .form textarea');
formInputs.forEach(function(input) {
    input.addEventListener('keyup', handleInputEvent);
    input.addEventListener('blur', handleInputEvent);
    input.addEventListener('focus', handleInputEvent);
});

// Function to handle tab click
function handleTabClick(e) {
    e.preventDefault();

    var tab = this.parentElement;
    tab.classList.add('active');
    var siblings = tab.parentNode.children;
    for (var i = 0; i < siblings.length; i++) {
        if (siblings[i] !== tab) {
            siblings[i].classList.remove('active');
        }
    }

    var target = this.getAttribute('href');
    var tabContents = document.querySelectorAll('.tab-content > div');
    tabContents.forEach(function(content) {
        if (content !== document.querySelector(target)) {
            content.style.display = 'none';
        }
    });

    document.querySelector(target).style.display = 'block';
}

// Find all tab links and attach event listeners
var tabLinks = document.querySelectorAll('.tab a');
tabLinks.forEach(function(link) {
    link.addEventListener('click', handleTabClick);
});

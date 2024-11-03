document.addEventListener('DOMContentLoaded', function() {
    const dragDropArea = document.getElementById('dragDropArea');
    const fileInput = document.getElementById('fileInput');
    const previewImage = document.getElementById('previewImage');
    const testimonialForm = document.getElementById('testimonialForm');
    const testimonialsContainer = document.getElementById('testimonialsContainer');

    // Drag and Drop functionality
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dragDropArea.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        dragDropArea.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dragDropArea.addEventListener(eventName, unhighlight, false);
    });

    function highlight(e) {
        dragDropArea.classList.add('dragover');
    }

    function unhighlight(e) {
        dragDropArea.classList.remove('dragover');
    }

    dragDropArea.addEventListener('drop', handleDrop, false);
    fileInput.addEventListener('change', handleFileSelect, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }

    function handleFileSelect(e) {
        const files = e.target.files;
        handleFiles(files);
    }

    function handleFiles(files) {
        if (files.length > 0) {
            const file = files[0];
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    previewImage.src = e.target.result;
                    previewImage.style.display = 'block';
                    dragDropArea.querySelector('.drag-drop-text').style.display = 'none';
                };
                reader.readAsDataURL(file);
            } else {
                alert('Please upload an image file');
            }
        }
    }

    // Form submission
    testimonialForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const testimonial = document.getElementById('testimonial').value;
        const imageUrl = previewImage.src;

        if (imageUrl && name && testimonial) {
            addTestimonial(name, testimonial, imageUrl);
            saveTestimonial(name, testimonial, imageUrl);
            resetForm();
        } else {
            alert('Please fill all fields and upload an image');
        }
    });

    function addTestimonial(name, testimonial, imageUrl) {
        const testimonialCard = document.createElement('div');
        testimonialCard.className = 'testimonial-card';
        testimonialCard.innerHTML = `
            <img src="${imageUrl}" alt="${name}" class="testimonial-image">
            <h3 class="testimonial-name">${name}</h3>
            <p class="testimonial-text">${testimonial}</p>
        `;
        testimonialsContainer.prepend(testimonialCard);
    }

    function saveTestimonial(name, testimonial, imageUrl) {
        // Get existing testimonials from localStorage
        let testimonials = JSON.parse(localStorage.getItem('testimonials') || '[]');
        
        // Add new testimonial
        testimonials.unshift({
            name,
            testimonial,
            imageUrl,
            date: new Date().toISOString()
        });

        // Save to localStorage
        localStorage.setItem('testimonials', JSON.stringify(testimonials));
    }

    function resetForm() {
        testimonialForm.reset();
        previewImage.src = '';
        previewImage.style.display = 'none';
        dragDropArea.querySelector('.drag-drop-text').style.display = 'block';
    }

    // Load existing testimonials
    function loadTestimonials() {
        const testimonials = JSON.parse(localStorage.getItem('testimonials') || '[]');
        testimonials.forEach(testimonial => {
            addTestimonial(testimonial.name, testimonial.testimonial, testimonial.imageUrl);
        });
    }

    // Load testimonials when page loads
    loadTestimonials();
});

const testimonialsContainer = document.getElementById('testimonialsContainer');

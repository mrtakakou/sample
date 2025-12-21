document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const responseMessage = document.getElementById('response-message');

    if (contactForm) {
        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            // Clear previous messages
            responseMessage.textContent = '';
            responseMessage.className = '';

            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                const result = await response.json();

                if (response.ok && result.success) {
                    responseMessage.textContent = result.message;
                    responseMessage.classList.add('success');
                    contactForm.reset();
                } else {
                    responseMessage.textContent = result.message || 'An unexpected error occurred.';
                    responseMessage.classList.add('error');
                }
            } catch (error) {
                console.error('Form submission error:', error);
                responseMessage.textContent = 'Failed to send message. Please try again later.';
                responseMessage.classList.add('error');
            }
        });
    }
});

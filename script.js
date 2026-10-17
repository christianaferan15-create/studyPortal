function toggleHeroAccordion(button) {
  const currentItem = button.parentElement;

  // Close any currently open faculty item to keep the Hero card compact
  document.querySelectorAll('.hero-accordion-item').forEach(item => {
    if (item !== currentItem) {
      item.classList.remove('active');
    }
  });

  // Open or close the selected faculty item
  currentItem.classList.toggle('active');
}


// Switch search tab mode
function switchSearchTab(button, mode) {
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');

  const input = document.getElementById('search-input');
  if (mode === 'course') {
    input.placeholder = "Enter course code (e.g. CSC 201, MAT 101, GST 111)...";
  } else {
    input.placeholder = "Enter topics or keywords (e.g. Data Structures, Calculus, Thermodynamics)...";
  }
}

// Handle Form Submission
function handleQuickSearch(event) {
  event.preventDefault();
  const query = document.getElementById('search-input').value.trim();
  const filter = document.getElementById('resource-type').value;

  if (query) {
    // Redirect to search results page with queries
    window.location.href = `/search?q=${encodeURIComponent(query)}&type=${filter}`;
  }
}
window.addEventListener('scroll', () => {
  const header = document.querySelector('.navbar-header');
  if (window.scrollY > 10) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});
function togglePasswordVisibility() {
  const passwordInput = document.getElementById('password');
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
  } else {
    passwordInput.type = 'password';
  }
}

function togglePasswordVisibility(inputId) {
  const passwordInput = document.getElementById(inputId);
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
  } else {
    passwordInput.type = 'password';
  }
}

async function handlePasswordReset(event) {
  event.preventDefault();

  const emailInput = document.getElementById('reset-email').value;
  const submitBtn = document.getElementById('reset-btn');

  // 1. Loading State
  submitBtn.disabled = true;
  submitBtn.innerHTML = 'Sending link...';

  try {
    // 2. Send request to Express API endpoint
    const response = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: emailInput })
    });

    if (response.ok) {
      // 3. Update Email Display text & Switch Views
      document.getElementById('sent-email-display').textContent = emailInput;
      document.getElementById('reset-request-step').classList.add('hidden');
      document.getElementById('reset-success-step').classList.remove('hidden');
    } else {
      const data = await response.json();
      alert(data.error || 'Something went wrong. Please check your email address.');
    }
  } catch (error) {
    console.error('Password reset error:', error);
    alert('Failed to connect to server. Please try again.');
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<span>Send Reset Link</span>';
  }
}

function resendResetEmail() {
  const email = document.getElementById('sent-email-display').textContent;
  alert(`Resending reset link to ${email}...`);
  // Re-trigger API call logic here if needed
}



function handleTakedownSubmit(event) {
  event.preventDefault();
  
  const submitBtn = document.getElementById('takedown-submit-btn');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Submitting Notice...';

  // Simulate frontend submit action
  setTimeout(() => {
    document.querySelector('.takedown-form').classList.add('hidden');
    document.getElementById('takedown-success').classList.remove('hidden');
  }, 1000);
}
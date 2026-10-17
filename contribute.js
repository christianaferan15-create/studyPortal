function handleFileSelect(input) {
  if (input.files && input.files[0]) {
    const file = input.files[0];
    
    // File size display conversion
    const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
    
    document.getElementById('file-name-display').textContent = file.name;
    document.getElementById('file-size-display').textContent = `${fileSizeMB} MB`;
    
    // Switch state
    document.getElementById('dropzone-prompt').classList.add('hidden');
    document.getElementById('file-preview').classList.remove('hidden');
  }
}

function removeFile(event) {
    event.preventDefault();
  event.stopPropagation(); // Prevents triggering dropzone click
  const fileInput = document.getElementById('file-input');
  fileInput.value = '';
  
  // Reset view state
  document.getElementById('file-preview').classList.add('hidden');
  document.getElementById('dropzone-prompt').classList.remove('hidden');
}

function handleUploadSubmit(event) {
  event.preventDefault();
  
  const submitBtn = document.getElementById('upload-btn');
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span>Publishing Material...</span>';

  // Simulate upload completion
  setTimeout(() => {
    document.querySelector('.contribute-form').classList.add('hidden');
    document.getElementById('upload-success').classList.remove('hidden');
  }, 1200);
}

function handleUploadSubmit(event) {
  event.preventDefault();
  
  const submitBtn = document.getElementById('upload-btn');
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span>Publishing Material...</span>';

  // Simulate server upload processing
  setTimeout(() => {
    // Reset button state
    submitBtn.disabled = false;
    submitBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="17 8 12 3 7 8"></polyline>
        <line x1="12" y1="3" x2="12" y2="15"></line>
      </svg>
      <span>Publish Material</span>
    `;

    // POP UP the Success Modal!
    document.getElementById('success-modal').classList.remove('hidden');
  }, 1200);
}

function resetUploadForm() {
  // Hide modal and clear form
  document.getElementById('success-modal').classList.add('hidden');
  document.querySelector('.contribute-form').reset();
  removeFile({ stopPropagation: () => {} }); // Reset file preview state
}

document.addEventListener('DOMContentLoaded', () => {
  const dropzone = document.getElementById('dropzone');
  const fileInput = document.getElementById('file-input');
  const dropzonePrompt = document.getElementById('dropzone-prompt');
  const filePreview = document.getElementById('file-preview');
  const removeBtn = document.getElementById('remove-file-btn');
  const fileNameDisplay = document.getElementById('file-name-display');
  const fileSizeDisplay = document.getElementById('file-size-display');

  // 1. Trigger file browser when clicking anywhere on the dropzone (unless preview is active)
  dropzone.addEventListener('click', (e) => {
    // If file preview is showing, don't open file picker on dropzone click
    if (!filePreview.classList.contains('hidden')) return;
    fileInput.click();
  });

  // 2. Handle file selection change
  fileInput.addEventListener('change', (e) => {
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);

      fileNameDisplay.textContent = file.name;
      fileSizeDisplay.textContent = `${fileSizeMB} MB`;

      dropzonePrompt.classList.add('hidden');
      filePreview.classList.remove('hidden');
    }
  });

  // 3. Handle literal file removal when clicking the X button
  removeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopImmediatePropagation(); // Kills any other click events bubbling up

    // Clear the file input value completely
    fileInput.value = '';

    // Switch views back
    filePreview.classList.add('hidden');
    dropzonePrompt.classList.remove('hidden');
  });
});
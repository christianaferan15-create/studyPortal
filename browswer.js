function filterMaterials() {
  const searchQuery = document.getElementById('search-input').value.toLowerCase();
  const selectedLevel = document.getElementById('filter-level').value;
  const selectedType = document.getElementById('filter-type').value;
  
  const cards = document.querySelectorAll('.material-card');

  cards.forEach(card => {
    const searchData = card.getAttribute('data-search');
    const cardLevel = card.getAttribute('data-level');
    const cardType = card.getAttribute('data-type');

    const matchesSearch = searchData.includes(searchQuery);
    const matchesLevel = !selectedLevel || cardLevel === selectedLevel;
    const matchesType = !selectedType || cardType === selectedType;

    if (matchesSearch && matchesLevel && matchesType) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

function downloadMaterial(title) {
  alert(`Downloading: ${title}. Your file download will begin shortly.`);
}
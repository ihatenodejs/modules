const dlBtn = document.getElementById('download-btn');
const ddMenu = document.getElementById('dropdown-menu');
const copyBtn = document.getElementById('copy-btn');
const sourceURL = copyBtn.getAttribute('data-source-url');

dlBtn.addEventListener('click', (event) => {
  event.stopPropagation();
  ddMenu.classList.toggle('hidden');
});

document.addEventListener('click', () => {
  ddMenu.classList.add('hidden');
});

copyBtn.addEventListener('click', (event) => {
  event.stopPropagation();
  navigator.clipboard.writeText(sourceURL).then(() => {
    alert('Source URL copied to clipboard');
  }).catch((err) => {
    console.error('Failed to copy: ', err);
  });
});
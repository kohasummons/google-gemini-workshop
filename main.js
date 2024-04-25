import './style.css';

const imagePreviewPanel = document.getElementById('image-preview');
const fileSelectorEl = document.getElementById('file-select');
const imagePreview = document.getElementById('blah');
const solveBtn = document.getElementById('solveBtn');
const solutionEl = document.getElementById('solution-text') 

imagePreviewPanel.addEventListener('click', () => {
  fileSelectorEl.click();
});

fileSelectorEl.addEventListener('change', () => {
  const file = fileSelectorEl.files[0];
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      imagePreview.src = reader.result;
    };
  }
});


// Implement Google Gemini
async function run() {
}

solveBtn.addEventListener('click', () => {
  run();
});

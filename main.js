import './style.css';
import { GOOGLE_GEMINI_API_KEY } from './secrets';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(GOOGLE_GEMINI_API_KEY);

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

// Converts a File object to a GoogleGenerativeAI Part object.
async function fileToGenerativePart(file) {
  const base64EncodedDataPromise = new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
}

// Implement Google Gemini
async function run() {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });

  const prompt = "You are a math solver. Solve the math question in the image and show the workings where possible. Avoid uncessary text";

  const imageParts = await Promise.all(
    [...fileSelectorEl.files].map(fileToGenerativePart)
  );

  const result = await model.generateContent([prompt, ...imageParts]);
  const response = await result.response;
  const text = response.text();

  solutionEl.innerText = text;
}

solveBtn.addEventListener('click', () => {
  run();
});

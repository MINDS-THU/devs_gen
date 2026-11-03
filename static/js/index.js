function setCopyState(button, label, text) {
  button.classList.add('copied');
  label.textContent = text;
  window.setTimeout(() => {
    button.classList.remove('copied');
    label.textContent = 'Copy';
  }, 2000);
}

function copyBibTeX() {
  const bibtex = document.getElementById('bibtex-code');
  const button = document.querySelector('.copy-bibtex-btn');
  const label = button?.querySelector('.copy-text');

  if (!bibtex || !button || !label) return;

  const text = bibtex.textContent;
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(() => setCopyState(button, label, 'Copied'))
      .catch(() => fallbackCopy(text, button, label));
    return;
  }

  fallbackCopy(text, button, label);
}

function fallbackCopy(text, button, label) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
  setCopyState(button, label, 'Copied');
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.copyBibTeX = copyBibTeX;
window.scrollToTop = scrollToTop;

window.addEventListener('scroll', () => {
  const button = document.querySelector('.scroll-to-top');
  if (button) button.classList.toggle('visible', window.scrollY > 300);
}, { passive: true });

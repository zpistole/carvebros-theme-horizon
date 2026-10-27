const form = document.querySelector('#inquiry');
const dialog = document.querySelector('#request-dialog');
const text = document.querySelector('#request-text');
const status = document.querySelector('#copy-status');
const copyButton = document.querySelector('#copy');
const closeButton = document.querySelector('.soundwood .dialog-close');

if (form && dialog && text && status && copyButton && closeButton && !form.dataset.bound) {
  form.dataset.bound = 'true';

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const occasion = document.querySelector('#occasion').value;
    const message = document.querySelector('#message').value.trim();
    const date = document.querySelector('#needed').value;
    text.value = `Hi Carve Bros! I’m interested in a Soundwood keepsake.\n\nOccasion: ${occasion}\nMy idea: ${message || 'I’d love your help choosing a design.'}\n${date ? 'Needed by: ' + date + '\n' : ''}\nCould you share the available wood and size options, pricing, production time, shipping, and recording-page hosting details? I’d also like to confirm the proof approval and personalized-order policies.\n\nThank you!`;
    status.textContent = 'Your inquiry has not been sent.';
    copyButton.textContent = 'Copy inquiry';
    dialog.showModal();
  });

  closeButton.addEventListener('click', () => dialog.close());

  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) {
      dialog.close();
    }
  });

  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(text.value);
      status.textContent = 'Copied. Visit Carve Bros and paste this into your message.';
      copyButton.textContent = 'Inquiry copied';
    } catch {
      text.focus();
      text.select();
      status.textContent = 'Select and copy the message above, then share it with Carve Bros.';
    }
  });
}

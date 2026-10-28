(() => {
  const addressField = document.querySelector("#server-address");
  const copyButton = document.querySelector("#copy-address");
  const feedback = document.querySelector("#copy-feedback");
  const year = document.querySelector("#year");

  if (year) year.textContent = String(new Date().getFullYear());
  if (!addressField || !copyButton || !feedback) return;

  let resetTimer;

  function announce(buttonText, message) {
    copyButton.textContent = buttonText;
    feedback.textContent = message;
    window.clearTimeout(resetTimer);
    resetTimer = window.setTimeout(() => {
      copyButton.textContent = "Copy IP";
    }, 4000);
  }

  function selectAddress() {
    addressField.focus();
    addressField.select();
    addressField.setSelectionRange(0, addressField.value.length);
  }

  async function copyAddress() {
    let clipboardTimer;
    copyButton.disabled = true;
    announce("Copying...", "Copying the server IP...");
    try {
      if (!navigator.clipboard || !window.isSecureContext) {
        throw new Error("Clipboard access is unavailable in this context.");
      }
      await Promise.race([
        navigator.clipboard.writeText(addressField.value),
        new Promise((_, reject) => {
          clipboardTimer = window.setTimeout(() => reject(new Error("Clipboard request timed out.")), 3000);
        })
      ]);
      announce("Copied!", "IP copied to clipboard.");
    } catch {
      selectAddress();
      announce("IP selected", "Automatic copying did not complete. The IP is selected; press Ctrl+C or ⌘C to copy it.");
    } finally {
      window.clearTimeout(clipboardTimer);
      copyButton.disabled = false;
    }
  }

  copyButton.addEventListener("click", () => {
    void copyAddress();
  });
})();

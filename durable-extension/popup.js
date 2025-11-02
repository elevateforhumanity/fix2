/**
 * Popup script
 */

const statusDiv = document.getElementById('status');
const injectBtn = document.getElementById('inject');
const refreshBtn = document.getElementById('refresh');

// Check current tab
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const currentTab = tabs[0];

  if (!currentTab.url || !currentTab.url.includes('elevateforhumanity.org')) {
    statusDiv.textContent = '⚠️ Not on elevateforhumanity.org';
    statusDiv.className = 'status inactive';
    injectBtn.disabled = true;
    return;
  }

  // Check if already injected
  chrome.tabs.sendMessage(
    currentTab.id,
    { action: 'checkInjection' },
    (response) => {
      if (chrome.runtime.lastError) {
        statusDiv.textContent = '⚠️ Extension not loaded on this page';
        statusDiv.className = 'status inactive';
        return;
      }

      if (response && response.injected) {
        statusDiv.textContent = '✅ Enrollment programs active';
        statusDiv.className = 'status active';
        injectBtn.textContent = 'Already Injected';
        injectBtn.disabled = true;
      } else {
        statusDiv.textContent = '⏳ Ready to inject';
        statusDiv.className = 'status inactive';
      }
    }
  );
});

// Inject button
injectBtn.addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript(
      {
        target: { tabId: tabs[0].id },
        files: ['inject.js'],
      },
      () => {
        statusDiv.textContent = '✅ Injection complete!';
        statusDiv.className = 'status active';
        injectBtn.textContent = 'Injected Successfully';
        injectBtn.disabled = true;
      }
    );
  });
});

// Refresh button
refreshBtn.addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.reload(tabs[0].id);
    window.close();
  });
});

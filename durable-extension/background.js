/**
 * Background service worker
 */

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'injectionComplete') {
    console.log('Enrollment programs injected on:', request.url);

    // Show notification
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icon48.png',
      title: 'Enrollment Programs Injected',
      message: 'Successfully added enrollment section to the page!',
    });
  }
});

// Listen for tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    changeInfo.status === 'complete' &&
    tab.url &&
    tab.url.includes('elevateforhumanity.org')
  ) {
    console.log('Page loaded:', tab.url);
  }
});

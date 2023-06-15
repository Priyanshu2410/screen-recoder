chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === "startRecording") {
      chrome.runtime.connect({ name: "recordRTC" });
      // Start recording logic goes here
      // Use the provided streamId to access the user's screen media stream
    } else if (message.action === "stopRecording") {
      // Stop recording logic goes here
      // Use the provided streamId to stop recording the user's screen
      // Send a message back to the background script indicating that recording has stopped
      chrome.runtime.sendMessage({ action: "stopRecording", streamId: message.streamId });
    }
  });
  
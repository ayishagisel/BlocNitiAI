// Check if speech recognition is supported
export function isRecordingSupported(): boolean {
  return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
}

interface RecordingOptions {
  onResult: (text: string) => void;
  onError: (error: string) => void;
  onEnd: () => void;
}

// Start voice recording
export async function startRecording(options: RecordingOptions): Promise<SpeechRecognition> {
  if (!isRecordingSupported()) {
    throw new Error("Speech recognition is not supported in this browser");
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US';

  let finalTranscript = '';

  recognition.onresult = (event) => {
    let interimTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += transcript + ' ';
      } else {
        interimTranscript += transcript;
      }
    }

    options.onResult(finalTranscript + interimTranscript);
  };

  recognition.onerror = (event) => {
    let errorMessage = 'An error occurred during speech recognition.';
    
    switch (event.error) {
      case 'no-speech':
        errorMessage = 'No speech was detected. Please try again.';
        break;
      case 'audio-capture':
        errorMessage = 'No microphone was found. Please check your microphone.';
        break;
      case 'not-allowed':
        errorMessage = 'Microphone access was denied. Please allow microphone access.';
        break;
      case 'network':
        errorMessage = 'Network error occurred. Please check your connection.';
        break;
      default:
        errorMessage = `Speech recognition error: ${event.error}`;
    }
    
    options.onError(errorMessage);
  };

  recognition.onend = () => {
    options.onEnd();
  };

  // Request microphone permission
  try {
    await navigator.mediaDevices.getUserMedia({ audio: true });
    recognition.start();
    return recognition;
  } catch (error) {
    throw new Error("Microphone access denied or not available");
  }
}

// Stop voice recording
export function stopRecording(recognition: SpeechRecognition): void {
  recognition.stop();
}

// Declare global types for speech recognition
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

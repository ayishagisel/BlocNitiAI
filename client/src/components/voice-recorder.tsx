import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { startRecording, stopRecording, isRecordingSupported } from "@/lib/voiceRecording";

interface VoiceRecorderProps {
  onClose: () => void;
  onTranscription?: (text: string) => void;
}

export default function VoiceRecorder({ onClose, onTranscription }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    setIsSupported(isRecordingSupported());
  }, []);

  const handleStartRecording = async () => {
    try {
      const recognition = await startRecording({
        onResult: (text) => {
          setTranscription(text);
        },
        onError: (error) => {
          toast({
            title: "Recording Error",
            description: error,
            variant: "destructive",
          });
          setIsRecording(false);
        },
        onEnd: () => {
          setIsRecording(false);
        },
      });
      
      recognitionRef.current = recognition;
      setIsRecording(true);
      toast({
        title: "Recording Started",
        description: "Speak clearly to describe your repair issue.",
      });
    } catch (error) {
      toast({
        title: "Recording Failed",
        description: "Could not start voice recording. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleStopRecording = () => {
    if (recognitionRef.current) {
      stopRecording(recognitionRef.current);
      setIsRecording(false);
    }
  };

  const handleUseTranscription = () => {
    if (onTranscription && transcription) {
      onTranscription(transcription);
    }
    onClose();
  };

  const handleCancel = () => {
    if (isRecording) {
      handleStopRecording();
    }
    onClose();
  };

  if (!isSupported) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <div className="bg-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-exclamation-triangle text-yellow-600 text-2xl"></i>
          </div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">Voice Recording Not Supported</h4>
          <p className="text-gray-600 mb-4">
            Your browser doesn't support voice recording. Please use a modern browser like Chrome or Firefox.
          </p>
          <Button onClick={onClose}>Close</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="text-center">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
            isRecording ? "bg-red-100 animate-pulse" : "bg-primary/10"
          }`}>
            <i className={`fas fa-microphone text-2xl ${
              isRecording ? "text-red-600" : "text-primary"
            }`}></i>
          </div>
          
          <h4 className="text-lg font-semibold text-gray-900 mb-2">
            {isRecording ? "Recording Active" : "Voice Recording"}
          </h4>
          
          <p className="text-gray-600 mb-4">
            {isRecording 
              ? "Describe your repair issue. I'll help organize and categorize it." 
              : "Click Start Recording to begin describing your repair issue."}
          </p>

          {/* Recording Controls */}
          {!isRecording ? (
            <div className="flex justify-center space-x-4 mb-4">
              <Button 
                onClick={handleStartRecording}
                className="bg-primary hover:bg-blue-700"
              >
                <i className="fas fa-play mr-2"></i>
                Start Recording
              </Button>
              <Button variant="outline" onClick={onClose}>
                <i className="fas fa-times mr-2"></i>
                Cancel
              </Button>
            </div>
          ) : (
            <div className="flex justify-center space-x-4 mb-4">
              <Button 
                onClick={handleStopRecording}
                className="bg-red-600 hover:bg-red-700"
              >
                <i className="fas fa-stop mr-2"></i>
                Stop Recording
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                <i className="fas fa-times mr-2"></i>
                Cancel
              </Button>
            </div>
          )}

          {/* Transcription */}
          {transcription && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transcription (Review and Edit):
              </label>
              <Textarea
                value={transcription}
                onChange={(e) => setTranscription(e.target.value)}
                rows={4}
                className="mb-4"
                placeholder="Your speech will appear here..."
              />
              <div className="flex justify-center space-x-4">
                <Button 
                  onClick={handleUseTranscription}
                  className="bg-secondary hover:bg-green-700"
                  disabled={!transcription.trim()}
                >
                  <i className="fas fa-check mr-2"></i>
                  Use This Text
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setTranscription("")}
                >
                  <i className="fas fa-redo mr-2"></i>
                  Clear & Try Again
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

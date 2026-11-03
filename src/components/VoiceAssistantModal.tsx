import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, VolumeX, X, Sparkles, AlertCircle, Play, Square } from 'lucide-react';
import { isSpeechRecognitionSupported, isSpeechSynthesisSupported, createSpeechRecognizer, speakText, stopSpeaking } from '../utils/speech';
import { StudentProfile } from '../types/career';

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentProfile: StudentProfile;
  onActionTrigger?: (action: string, payload?: any) => void;
}

export const VoiceAssistantModal: React.FC<VoiceAssistantModalProps> = ({
  isOpen,
  onClose,
  studentProfile,
  onActionTrigger
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [lastResponse, setLastResponse] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [audioPermissionError, setAudioPermissionError] = useState<string | null>(null);

  const recognizerRef = useRef<any>(null);

  useEffect(() => {
    if (!isOpen) {
      handleStopAll();
    } else {
      setLastResponse(
        `Hi ${studentProfile.name.split(' ')[0]}! I'm your PathFinder Voice Assistant. Tap the microphone to ask me anything about careers, skill gaps, or interview prep.`
      );
    }
    return () => {
      handleStopAll();
    };
  }, [isOpen]);

  const handleStopAll = () => {
    if (recognizerRef.current) {
      try {
        recognizerRef.current.abort();
      } catch (e) {}
      recognizerRef.current = null;
    }
    stopSpeaking();
    setIsListening(false);
    setIsSpeaking(false);
  };

  const startListening = () => {
    setAudioPermissionError(null);
    stopSpeaking();
    setIsSpeaking(false);
    setTranscript('');

    if (!isSpeechRecognitionSupported()) {
      setAudioPermissionError('Speech recognition is not supported in this browser. You can type or use desktop Chrome.');
      return;
    }

    try {
      const recognizer = createSpeechRecognizer(
        (text, isFinal) => {
          setTranscript(text);
          if (isFinal) {
            handleVoiceQuery(text);
          }
        },
        (error) => {
          console.warn('Speech recognition error:', error);
          setIsListening(false);
          if (error === 'not-allowed') {
            setAudioPermissionError('Microphone access was denied. Please allow microphone permissions.');
          }
        },
        () => {
          setIsListening(false);
        }
      );

      recognizerRef.current = recognizer;
      recognizer.start();
      setIsListening(true);
    } catch (err: any) {
      console.error('Failed to start speech recognizer:', err);
      setIsListening(false);
      setAudioPermissionError('Could not start microphone.');
    }
  };

  const stopListening = () => {
    if (recognizerRef.current) {
      try {
        recognizerRef.current.stop();
      } catch (e) {}
    }
    setIsListening(false);
  };

  const handleVoiceQuery = async (queryText: string) => {
    if (!queryText.trim()) return;
    setLoading(true);
    stopSpeaking();

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: queryText,
          history: [],
          studentProfile
        })
      });

      const data = await res.json();
      const reply = data.reply || 'I found some career insights for your request!';
      setLastResponse(reply);

      // Speak reply aloud
      if (isSpeechSynthesisSupported()) {
        speakText(
          reply,
          () => setIsSpeaking(true),
          () => setIsSpeaking(false)
        );
      }
    } catch (err) {
      console.error('Voice query error:', err);
      const fallbackMsg = `Based on your profile in ${studentProfile.major}, I recommend exploring our full-stack or data tracks and reviewing the skill gap analyzer.`;
      setLastResponse(fallbackMsg);
      speakText(fallbackMsg, () => setIsSpeaking(true), () => setIsSpeaking(false));
    } finally {
      setLoading(false);
    }
  };

  const replaySpokenResponse = () => {
    if (!lastResponse) return;
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else {
      speakText(
        lastResponse,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false)
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 text-white rounded-3xl shadow-2xl max-w-lg w-full p-6 border border-slate-800 relative flex flex-col items-center text-center">
        {/* Close Button */}
        <button
          onClick={() => {
            handleStopAll();
            onClose();
          }}
          aria-label="Close voice assistant"
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/60 hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-4 border border-indigo-500/30">
          <Sparkles className="w-3.5 h-3.5" />
          Voice Counselor Mode
        </div>

        <h3 className="text-xl font-bold text-white mb-1">Talk to PathFinder AI</h3>
        <p className="text-xs text-slate-400 mb-6 max-w-xs">
          Ask questions naturally with your voice, and receive spoken audio career guidance.
        </p>

        {/* Interactive Pulsing Waveform Visualizer */}
        <div className="relative my-4 flex items-center justify-center">
          {/* Outer glow rings */}
          <div
            className={`absolute w-36 h-36 rounded-full transition-all duration-700 ${
              isListening
                ? 'bg-rose-500/20 animate-ping'
                : isSpeaking
                ? 'bg-indigo-500/20 animate-pulse'
                : 'bg-indigo-500/10'
            }`}
          />
          <div
            className={`absolute w-28 h-28 rounded-full transition-all duration-500 ${
              isListening
                ? 'bg-rose-500/30'
                : isSpeaking
                ? 'bg-indigo-500/30'
                : 'bg-slate-800'
            }`}
          />

          {/* Central Mic Button */}
          <button
            onClick={isListening ? stopListening : startListening}
            aria-label={isListening ? 'Stop listening' : 'Start voice input'}
            className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 ${
              isListening
                ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/50'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/50'
            }`}
          >
            {isListening ? (
              <Square className="w-8 h-8 fill-current" />
            ) : (
              <Mic className="w-8 h-8" />
            )}
          </button>
        </div>

        {/* Dynamic Status / Frequency Bars */}
        <div className="h-6 flex items-center justify-center gap-1 my-3">
          {isListening ? (
            <>
              <span className="w-1 bg-rose-400 h-3 animate-pulse rounded-full" />
              <span className="w-1 bg-rose-400 h-6 animate-pulse delay-75 rounded-full" />
              <span className="w-1 bg-rose-400 h-4 animate-pulse delay-150 rounded-full" />
              <span className="w-1 bg-rose-400 h-5 animate-pulse rounded-full" />
              <span className="text-xs text-rose-300 font-medium ml-2">Listening... speak now</span>
            </>
          ) : isSpeaking ? (
            <>
              <span className="w-1 bg-indigo-400 h-4 animate-bounce rounded-full" />
              <span className="w-1 bg-indigo-400 h-6 animate-bounce delay-100 rounded-full" />
              <span className="w-1 bg-indigo-400 h-3 animate-bounce delay-200 rounded-full" />
              <span className="w-1 bg-indigo-400 h-5 animate-bounce rounded-full" />
              <span className="text-xs text-indigo-300 font-medium ml-2">Speaking answer...</span>
            </>
          ) : loading ? (
            <span className="text-xs text-slate-400 animate-pulse">Thinking with Gemini AI...</span>
          ) : (
            <span className="text-xs text-slate-400">Tap the mic to ask a question</span>
          )}
        </div>

        {/* Audio Error Alert if any */}
        {audioPermissionError && (
          <div className="w-full my-2 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2 text-left">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
            <span>{audioPermissionError}</span>
          </div>
        )}

        {/* Transcript / Spoken Message Card */}
        <div className="w-full bg-slate-800/80 rounded-2xl p-4 border border-slate-700/60 my-2 text-left max-h-48 overflow-y-auto">
          {transcript && (
            <div className="mb-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">You said:</span>
              <p className="text-sm font-medium text-slate-200 italic mt-0.5">"{transcript}"</p>
            </div>
          )}

          {lastResponse && (
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">PathFinder AI:</span>
                <button
                  onClick={replaySpokenResponse}
                  aria-label={isSpeaking ? 'Stop speech' : 'Replay audio'}
                  className="p-1 text-slate-400 hover:text-indigo-300 rounded hover:bg-slate-700 transition-colors"
                >
                  {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
              </div>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed whitespace-pre-line">
                {lastResponse}
              </p>
            </div>
          )}
        </div>

        {/* Suggested Voice Prompts */}
        <div className="w-full mt-3">
          <p className="text-[11px] text-slate-400 mb-2">Try asking these sample questions:</p>
          <div className="flex flex-wrap gap-1.5 justify-center">
            {[
              'What career matches my computer science major?',
              'What are the highest paying tech jobs for college grads?',
              'How can I get a summer internship?',
              'What skills am I missing for full-stack engineer?'
            ].map(prompt => (
              <button
                key={prompt}
                onClick={() => {
                  setTranscript(prompt);
                  handleVoiceQuery(prompt);
                }}
                className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs border border-slate-700 transition-colors"
              >
                "{prompt}"
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

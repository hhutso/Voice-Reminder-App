//Function to access System Microphone and Record
import { useState, useEffect } from 'react';
import {
  useAudioRecorder,
  useAudioRecorderState,
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioPlayer,
} from 'expo-audio';

export function useRecorder() {
  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(recorder);
  const audioPlayer = useAudioPlayer();
  const [recordingUri, setRecordingUri] = useState<string | null>(null);
  const [playingId, setPlayingId] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      const status = await AudioModule.requestRecordingPermissionsAsync();
      if (!status.granted) {
        alert('Permission to access microphone was denied');
      }
      await setAudioModeAsync({
        allowsRecording: true,
        playsInSilentMode: true,
      });
    })();
  }, []);

  const startRecording = async () => {
    try {
      await recorder.prepareToRecordAsync();
      recorder.record();
      console.log("recording started");
    }

    catch (error){
      console.error("Recording Failed:", error);
    }
  };

  const stopRecording = async (): Promise<string | null> => {
    try {
      const result = await recorder.stop();
      console.log("Recording Stopped");

      const uri = recorder.uri;

      if (uri){
        console.log("recording saved at: ", uri);
        setRecordingUri(uri);
        return uri;
      }
      
      else {
        console.log("No uri found");
        return null;
      }
    }

    catch (error){
      console.error('error stopped recording:', error);
      return null;
    }
  };


  return {
    isRecording: recorderState.isRecording,
    recordingUri,
    startRecording,
    stopRecording,
  };
}

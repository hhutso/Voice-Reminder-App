//Function to access System Microphone and Record
import { useState, useEffect } from 'react';
import { File, Directory, Paths } from 'expo-file-system';
import {
  useAudioRecorder,
  useAudioRecorderState,
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
} from 'expo-audio';

export function useRecorder() {
  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(recorder);
  const [recordingUri, setRecordingUri] = useState<string | null>(null);

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
      await recorder.stop();
      console.log("Recording Stopped");
      const uri = recorder.uri;

      if (uri) {
        const savedUri = await saveRecording(uri);
        setRecordingUri(savedUri); // Update state
        console.log("recording saved at: ", savedUri);
        return savedUri;
      }
      else {
        console.log("No uri found");
        return null;
      }
    } 
    catch (error) {
      console.error('error stopped recording:', error);
      return null;
    }
  };

  const saveRecording = async (recordingUri: string) => {
    const fileName = `recording-${Date.now()}.m4a`;
    const documentDir = new Directory(Paths.document);
    const destinationFile = new File (documentDir, fileName);
  
    const sourceFile = new File(recordingUri);
    await sourceFile.move(destinationFile);

    return destinationFile.uri;
  };

  return {
    isRecording: recorderState.isRecording,
    recordingUri,
    startRecording,
    stopRecording,
  };
}

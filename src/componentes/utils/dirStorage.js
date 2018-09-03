import { Platform } from 'react-native';
import RNFS  from 'react-native-fs';

export const dirHome = Platform.select({
  ios: `${RNFS.DocumentDirectoryPath}/rconsulters`,
  android: `${RNFS.ExternalStorageDirectoryPath}/DCIM`
});

export const dirPicutures = `${dirHome}/Camera`;
export const dirAudio = `${dirHome}/Audio`;
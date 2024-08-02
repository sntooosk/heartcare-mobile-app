import React from 'react';
import { Image, TouchableOpacity, Platform } from 'react-native';
import { styles } from './styles';
import shadow from '../../../utils/styles';

interface ProfileImageProps {
  photo: string | null;
  onPress: () => void;
}

export default function ProfileImage({ photo, onPress }: ProfileImageProps) {
  return (
    <TouchableOpacity
      style={[
        styles.profileImageContainer,
        Platform.OS !== 'web' && {
          ...shadow.shadowOverlay, 
        },
      ]}
      onPress={onPress}
    >
      <Image
        source={photo ? { uri: photo } : require('../../../assets/user.png')}
        style={styles.profileImage}
        defaultSource={require('../../../assets/user.png')}
      />
    </TouchableOpacity>
  );
}

import {Button} from '@rneui/themed';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useAuth} from '../../hooks/useAuth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
});

const ProfileScreen = () => {
  const auth = useAuth();
  return (
    <View style={styles.container}>
      <Button color="warning" onPress={async () => auth.signOut()}>
        Log out
      </Button>
    </View>
  );
};

export default ProfileScreen;

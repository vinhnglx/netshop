import {Button, Text} from '@rneui/themed';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useAuth} from '../../hooks/useAuth';
import {useGetUser} from '../../hooks/useGetUser';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  userName: {
    marginBottom: 20,
  },
});

const ProfileScreen = () => {
  const {authResponse, signOut} = useAuth();
  const user = useGetUser(authResponse?.userId);

  return (
    <View style={styles.container}>
      <Text h4 h4Style={styles.userName}>
        User name: {user.data?.username}
      </Text>
      <Button color="warning" onPress={async () => signOut()}>
        Log out
      </Button>
    </View>
  );
};

export default ProfileScreen;

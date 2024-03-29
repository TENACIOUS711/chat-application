import React from 'react';
import { Drawer, Button, Loader, Divider, Alert } from 'rsuite';
import { useProfile } from '../../context/profile.context';
import EditableInput from '../EditableInputs';
import { database } from '../../misc/firebase';
import ProviderBlock from './ProviderBlock';
import AvatarUploadBtn from './AvatarUploadBtn';

const Dashboard = ({ onSignOut }) => {
  const { profile } = useProfile();
  if (!profile) {
    return <Loader center vertical size="md" speed="slow" />;
  }
  const onSave = async newData => {
    const userNickNameRef = database
      .ref(`/profiles/${profile.uid}`)
      .child('name');

    try {
      await userNickNameRef.set(newData);
      Alert.success('Nickname has been updated', 4000);
    } catch (err) {
      Alert.error(err.message || 'Something went wrong!', 4000);
    }
  };
  return (
    <>
      <Drawer.Header>
        <Drawer.Title></Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        <h3>Hey, {profile.name}</h3>
        <ProviderBlock />
        <Divider />
        <EditableInput
          name="nickname"
          initialValue={profile.name}
          onSave={onSave}
          label={<h6 className="mb-2">Nickname</h6>}
        />
        <AvatarUploadBtn />
      </Drawer.Body>
      <Drawer.Footer>
        <Button block color="red" onClick={onSignOut}>
          Sign Out
        </Button>
      </Drawer.Footer>
    </>
  );
};
export default Dashboard;

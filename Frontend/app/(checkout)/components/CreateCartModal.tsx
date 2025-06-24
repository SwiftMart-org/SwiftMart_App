 import React from 'react';
import { Modal, View, Text, Button } from 'react-native';

const CreateCartModal = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000aa' }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
          <Text>Create a new cart</Text>
          {/* adds input fields here */}
          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

export default CreateCartModal;
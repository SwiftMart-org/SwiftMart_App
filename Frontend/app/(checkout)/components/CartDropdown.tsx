// app/(checkout)/components/CartDropdown.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, TextInput, StyleSheet } from 'react-native';
import { Entypo, Feather } from '@expo/vector-icons';
import { useCart } from '../../context/CartContext';

const CartDropdown = () => {
  const { carts, selectedCartId, addCart, removeCart, selectCart } = useCart();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [newCartName, setNewCartName] = useState('');
  const [inviteLink, setInviteLink] = useState('');
  const [inviteVisible, setInviteVisible] = useState(false);

  const selectedCart = carts.find((cart) => cart.id === selectedCartId);

  const generateInviteLink = (cartId: string) => {
    const link = `https://swiftmart.com/invite/${cartId}`;
    setInviteLink(link);
    setInviteVisible(true);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setDropdownVisible(!dropdownVisible)} style={styles.header}>
        <Text style={styles.headerText}>{selectedCart?.name}</Text>
        <Entypo name="chevron-down" size={24} color="black" />
      </TouchableOpacity>

      {dropdownVisible && (
        <View style={styles.dropdown}>
          {carts.length <= 1 ? (
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.createButton}>
              <Text style={styles.createButtonText}>Create Cart</Text>
            </TouchableOpacity>
          ) : (
            <FlatList
              data={carts.filter((cart) => cart.id !== '1')}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.cartItem}>
                  <TouchableOpacity onPress={() => selectCart(item.id)}>
                    <Text style={styles.cartName}>{item.name}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => removeCart(item.id)}>
                    <Feather name="trash-2" size={20} color="red" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => generateInviteLink(item.id)}>
                    <Feather name="user-plus" size={20} color="blue" />
                  </TouchableOpacity>
                </View>
              )}
            />
          )}
        </View>
      )}

      {/* Modal to create cart */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              placeholder="Cart Name"
              value={newCartName}
              onChangeText={setNewCartName}
              style={styles.input}
            />
            <TouchableOpacity onPress={() => { addCart(newCartName); setModalVisible(false); setNewCartName(''); }}>
              <Text style={styles.modalButton}>Create</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButton}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal for invite link */}
      <Modal visible={inviteVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.inviteText}>Invite Link:</Text>
            <Text style={styles.link}>{inviteLink}</Text>
            <TouchableOpacity onPress={() => setInviteVisible(false)}>
              <Text style={styles.modalButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CartDropdown;

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginTop: 20 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#f0f0f0', borderRadius: 5 },
  headerText: { fontSize: 18, marginRight: 10 },
  dropdown: { marginTop: 10, backgroundColor: '#fff', padding: 10, borderRadius: 5 },
  createButton: { padding: 10, backgroundColor: 'green', borderRadius: 5 },
  createButtonText: { color: 'white', fontWeight: 'bold' },
  cartItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 5 },
  cartName: { fontSize: 16 },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' },
  input: { borderBottomWidth: 1, marginBottom: 10, padding: 5 },
  modalButton: { textAlign: 'center', color: 'blue', marginTop: 10 },
  inviteText: { fontSize: 16, fontWeight: 'bold' },
  link: { marginVertical: 10, color: 'blue' }
});

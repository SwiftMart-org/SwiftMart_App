import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import CartItem from "./components/CartItem";
import { useState } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Modal from "react-native-modal";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import Button from "@/components/Button";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import InvitedList from "./components/InvitedList";

const cartObject = [
  {
    id: "default",
    name: "My Cart",
    items: [
      {
        id: "1",
        image: require("../../assets/images/yellow-chair.png"),
        title: "EKERÖ",
        price: 230.0,
        oldPrice: 512.58,
        color: "Yellow",
        quantity: 1,
      },
      {
        id: "2",
        image: require("../../assets/images/yellow-chair.png"),
        title: "STRANDMON",
        price: 274.13,
        oldPrice: 865.66,
        color: "Grey",
        quantity: 1,
      },
    ],
    invited: [],
  },
  {
    id: "newcart",
    name: "Christmas Cart",
    items: [
      {
        id: "1",
        image: require("../../assets/images/yellow-chair.png"),
        title: "EKERÖ",
        price: 230.0,
        oldPrice: 512.58,
        color: "Yellow",
        quantity: 1,
      },
      {
        id: "2",
        image: require("../../assets/images/yellow-chair.png"),
        title: "STRANDMON",
        price: 274.13,
        oldPrice: 865.66,
        color: "Grey",
        quantity: 1,
      },
    ],
    invited: ["user1@example.com", "user2@example.com"],
  },
];

const CartScreen = () => {
  const router = useRouter();
  const [carts, setCarts] = useState(cartObject);
  const [selectedCartId, setSelectedCartId] = useState("default");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isInviteVisible, setIsInviteVisible] = useState(false);
  const [isCreatingCart, setIsCreatingCart] = useState(false);
  const [newCartName, setNewCartName] = useState("");
  const [showCartList, setShowCartList] = useState(false);

  const selectedCart = carts.find((cart) => cart.id === selectedCartId);

  const updateQuantity = (itemId: string, amount: number) => {
    setCarts((prevCarts) =>
      prevCarts.map((cart) =>
        cart.id === selectedCartId
          ? {
              ...cart,
              items: cart.items.map((item) =>
                item.id === itemId
                  ? { ...item, quantity: Math.max(1, item.quantity + amount) }
                  : item
              ),
            }
          : cart
      )
    );
  };

  const handleDeleteCart = (cartId: string) => {
    if (cartId === "default") return;

    Alert.alert("Delete Cart", "Are you sure you want to delete this cart?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: () => {
          setCarts((prevCarts) => prevCarts.filter((cart) => cart.id !== cartId));
          if (selectedCartId === cartId) {
            setSelectedCartId("default");
          }
        },
      },
    ]);
  };

  const handleRemovePerson = (person: string) => {
    setCarts((prevCarts) =>
      prevCarts.map((cart) =>
        cart.id === selectedCartId
          ? {
              ...cart,
              invited: cart.invited.filter((p) => p !== person),
            }
          : cart
      )
    );
  };

  const subtotal =
    selectedCart?.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    ) || 0;

  const shipping = 5.99;
  const total = subtotal + shipping;

  const handleCreateCart = () => {
    if (newCartName.trim() === "") return;

    const newCartId = Date.now().toString();
    const newCart = { id: newCartId, name: newCartName, items: [], invited: [] };
    setCarts([...carts, newCart]);
    setSelectedCartId(newCartId);
    setNewCartName("");
    setIsCreatingCart(false);
    setShowCartList(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral-20 p-4">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-4">
        <TouchableOpacity
          onPress={() => router.push("/")}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Entypo name="chevron-left" size={24} color="#156651" />
          <Text className="font-Manrope text-primary text-BodyBold">Go To Home</Text>
        </TouchableOpacity>
      </View>

      {/* Cart Selection */}
      <View className="mb-4 z-50">
        <TouchableOpacity
          style={{ position: "relative", alignItems: "center" }}
          onPress={() => setShowCartList(!showCartList)}
          className="w-full gap-2 flex-row items-center justify-center border-b border-neutral-30 pb-2"
        >
          <View className="flex-row items-center justify-center w-full">
            <Text className="font-semibold text-[30px]">{selectedCart?.name}</Text>
            {showCartList ? (
              <Entypo name="chevron-up" size={20} color="black" />
            ) : (
              <Entypo name="chevron-down" size={20} color="black" />
            )}
          </View>

          {selectedCartId !== "default" && (
            <TouchableOpacity
              style={{ position: "absolute", right: 0, top: 5 }}
              onPress={() => setIsInviteVisible(true)}
            >
              <Ionicons name="person-add-outline" size={28} color="#156651" />
              {(selectedCart?.invited?.length ?? 0) > 0 && (
                <View className="absolute -top-2 -right-2 bg-primary rounded-full w-5 h-5 flex items-center justify-center">
                  <Text className="text-white text-xs">{(selectedCart?.invited?.length ?? 0)}</Text>
                </View>
              )}
            </TouchableOpacity>
          )}
        </TouchableOpacity>

        {showCartList && (
          <View className="bg-transparent w-full shadow p-4 rounded-lg max-h-60">
            <ScrollView showsVerticalScrollIndicator={false}>
              {carts.map((cart) => (
                <TouchableOpacity
                  key={cart.id}
                  onPress={() => {
                    setSelectedCartId(cart.id);
                    setShowCartList(false);
                  }}
                  className="flex bg-white py-3 rounded-xl px-8 h-[50px] flex-row justify-between items-center mb-3"
                >
                  <Text
                    style={{ fontSize: 16 }}
                    className={`${cart.id === selectedCartId ? "font-bold text-primary" : ""}`}
                  >
                    {cart.name}
                  </Text>

                  {cart.id === "default" ? (
                    <Text style={{ color: "#888", fontSize: 14, marginLeft: 8 }}>(default)</Text>
                  ) : (
                    <View className="flex-row items-center gap-4">
                      <Ionicons
                        name="person-add-outline"
                        size={20}
                        color="#156651"
                      />
                      <TouchableOpacity onPress={() => handleDeleteCart(cart.id)}>
                        <MaterialCommunityIcons
                          name="trash-can-outline"
                          size={20}
                          color="#156651"
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                </TouchableOpacity>
              ))}

              <Button
                BtnText="Create New Cart"
                bgColor="bg-white"
                textColor="text-primary"
                hasBorder={true}
                disabled={false}
                onPress={() => {
                  setIsCreatingCart(true);
                  setShowCartList(false);
                }}
              />
            </ScrollView>
          </View>
        )}
      </View>

      {/* Cart Items */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <FlatList
          data={selectedCart?.items || []}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <CartItem
              {...item}
              onDecrease={() => updateQuantity(item.id, -1)}
              onIncrease={() => updateQuantity(item.id, 1)}
            />
          )}
        />
      </ScrollView>

      {/* Cart Total Button */}
      <TouchableOpacity
        className="bg-primary shadow-slate-950 shadow-xl p-4 rounded-2xl mb-2 absolute bottom-6 right-4 w-16 h-16"
        onPress={() => setIsModalVisible(true)}
      >
        <AntDesign name="shoppingcart" size={24} color="white" />
      </TouchableOpacity>

      {/* Cart Total Modal */}
      <Modal
        isVisible={isModalVisible}
        swipeDirection="down"
        onSwipeComplete={() => setIsModalVisible(false)}
        onBackdropPress={() => setIsModalVisible(false)}
        style={{ justifyContent: "flex-end", margin: 0 }}
      >
        <View className="flex-1 justify-end bg-black/30">
          <View
            className="bg-white p-4 rounded-t-2xl shadow"
            style={{ height: 290,  padding: 16, gap: 8}} 
          >
            <View className="flex-row justify-center mb-4">
              <View className="w-16 h-1.5 bg-neutral-40 rounded-full" />
            </View>

            <View className="flex-row justify-between mb-2">
              <Text className="font-Manrope text-BodyRegular text-neutral-80">Subtotal</Text>
              <Text className="font-Manrope text-BodyBold text-text">${subtotal.toFixed(2)}</Text>
            </View>

            <View className="flex-row justify-between mb-2">
              <Text className="font-Manrope text-BodyRegular text-neutral-80">Shipping</Text>
              <Text className="font-Manrope text-BodyBold text-text">${shipping.toFixed(2)}</Text>
            </View>

            <View className="flex-row justify-between mb-4 border-t pt-2 border-neutral-30">
              <Text className="font-Manrope text-Heading5 text-text">Total</Text>
              <Text className="font-Manrope text-Heading5 text-text">${total.toFixed(2)}</Text>
            </View>

            <Button
              BtnText="Checkout"
              bgColor="bg-primary"
              textColor="text-neutral-10"
              hasBorder={true}
              disabled={false}
              onPress={() => setIsModalVisible(false)}
            />
          </View>
        </View>
      </Modal>

      {/* Invite List Modal */}
      <Modal
        isVisible={isInviteVisible}
        onBackdropPress={() => setIsInviteVisible(false)}
        style={{ justifyContent: "center", margin: 20 }}
      >
        <InvitedList
          people={selectedCart?.invited || []}
          onRemove={handleRemovePerson}
          onClose={() => setIsInviteVisible(false)}
        />
      </Modal>

      {/* Create Cart Modal */}
      <Modal
        isVisible={isCreatingCart}
        onBackdropPress={() => setIsCreatingCart(false)}
        style={{ justifyContent: "center", margin: 20 }}
      >
        <View className="bg-white p-4 rounded-2xl">
          <Text className="font-Manrope text-BodyBold mb-4 text-center">Create New Cart</Text>
          <TextInput
            placeholder="Enter cart name"
            value={newCartName}
            onChangeText={setNewCartName}
            className="border p-2 rounded mb-4"
          />
          <TouchableOpacity
            className="bg-primary p-4 rounded-2xl"
            onPress={handleCreateCart}
          >
            <Text className="font-Manrope text-BodyBold text-neutral-10 text-center">Create Cart</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default CartScreen;

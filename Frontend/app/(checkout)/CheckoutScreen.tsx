import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Text } from 'react-native';
import type { ReactNode } from 'react';
import Button from '@/components/Button';
import OrderStatusModal from './components/OrderStatusModal';
import { ChevronLeft } from 'lucide-react-native';
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useRoute } from '@react-navigation/native';
import ShoppingCartTotalModal from './components/ShoppingCartTotalModal';

// Image imports
const houseIcon = require('../../assets/images/house.png');
const mastercardIcon = require('../../assets/images/mastercard.png');

type Address = {
  name: string;
  street: string;
  city: string;
  country: string;
  region?: string;
  zipCode?: string;
  phone?: string;
};

type PaymentMethod = {
  type: string;
  last4: string;
  fullNumber?: string;
  network?: string;
  phone?: ReactNode;
};

type RouteParams = {
  savedCard?: string;
  savedMobile?: string;
  selectedAddress?: string;
  [key: string]: any;
};

const CheckoutScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const route = useRoute() as { params?: RouteParams };
  const { savedCard, savedMobile, selectedAddress } = route.params || {};

  // Parse cart from params
  const cart = params.cart ? JSON.parse(params.cart as string) : undefined;

  // Calculate subtotal and shipping based on cart items
  const subtotal =
    cart?.items?.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    ) || 0;
  const shipping = 6.96; 
  const total = subtotal + shipping;

  // State for address and payment method
  const [address, setAddress] = useState<Address | undefined>({
    name: 'John Doe',
    street: '5482 Adobe Falls Road',
    city: 'Accra',
    region: 'Greater Accra',
    country: 'Ghana',
    zipCode: '00233',
    phone: '+233 123 456 789'
  });
  
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | undefined>({
    type: 'MasterCard',
    last4: '1234',
    fullNumber: '**** **** **** 1234'
  });

  //  useEffect to update paymentMethod when a new card is added
  useEffect(() => {
    if (savedCard) {
      let cardObj;
      try {
        cardObj = typeof savedCard === 'string' ? JSON.parse(savedCard) : savedCard;
        setPaymentMethod(cardObj);
      } catch {
        // fallback or error handling
      }
    }
  }, [savedCard]);

  // useEffect to update address when a new address is selected
  useEffect(() => {
    if (selectedAddress) {
      let addressObj;
      try {
        addressObj = typeof selectedAddress === 'string' ? JSON.parse(selectedAddress) : selectedAddress;
        setAddress(addressObj);
      } catch {
        // fallback or error handling
      }
    }
  }, [selectedAddress]);

  // State for modal visibility
  const [isOrderModalVisible, setIsOrderModalVisible] = useState(false);
  const [isCartModalVisible, setIsCartModalVisible] = useState(false);

  // Handlers
  const handleEditAddress = () => {
    // Navigate to address selection/edit screen
    router.push('/(checkout)/AddressSelectionScreen');
    console.log('Edit address');
  };

  const handleEditPayment = () => {
    // Navigate to payment selection screen
    router.push('/(checkout)/PaymentSelectionScreen');
  };

  const handleOpenOrderModal = () => {
    if (!address || !paymentMethod) {
      // You can add a toast or alert here to inform the user
      console.log('Please select address and payment method first');
      return;
    }
    console.log('Opening order status modal');
    setIsOrderModalVisible(true);
  };

  const handleCloseOrderModal = () => {
    console.log('Closing order status modal');
    setIsOrderModalVisible(false);
  };

  const handleCheckoutNow = () => {
    if (!address || !paymentMethod) {
      // You can add a toast or alert here to inform the user
      console.log('Please select address and payment method first');
      return;
    }
    console.log('Proceeding to checkout now');
    setIsCartModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsCartModalVisible(false);
  };

  const getPaymentIcon = () => {
    if (!paymentMethod) return mastercardIcon;
    if (paymentMethod.type === 'VISA') return require('../../assets/images/visa.png');
    if (paymentMethod.type === 'MasterCard') return require('../../assets/images/mastercard.png');
    if (paymentMethod.type === 'VISA/MasterCard') return require('../../assets/images/visa-mastercard.png');
    if (paymentMethod.type === 'MobileMoney') {
      switch (paymentMethod.network) {
        case 'MTN': return require('../../assets/images/mtn.png');
        case 'Vodafone': return require('../../assets/images/vodafone.png');
        case 'AirtelTigo': return require('../../assets/images/airteltigo.png');
        default: return require('../../assets/images/mobile-money.png');
      }
    }
    return mastercardIcon;
  };

  return (
    <>
      <SafeAreaView className="flex-1 bg-neutral-20">
        {/* Header with Back button */}
        <View className="flex-row items-center p-4" style={{ marginTop: 16 }}>
          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => router.push('/(checkout)/CartScreen')}
          >
            <ChevronLeft size={24} color="#156651" />
            <Text className="text-BodyRegular font-Manrope text-primary ml-2">Back To Cart</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="px-4 pb-4">
          {/* Checkout Title */}
          <View className="items-center mb-6">
            <Text className="text-Heading3 font-Manrope text-text">Checkout</Text>
          </View>
          
          {/* Address Section */}
          <View className="mb-6">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-xl font-semibold font-Manrope">Address</Text>
              <TouchableOpacity onPress={handleEditAddress}>
                <Text className="text-BodyRegular font-Manrope text-primary">Edit</Text>
              </TouchableOpacity>
            </View>
            {address ? (
              <View className="bg-neutral-10 rounded-lg p-4 shadow-sm flex-row">
                <Image 
                  source={houseIcon} 
                  className="h-16 w-16 mr-4" 
                  resizeMode="contain"
                />
                <View className="flex-1">
                  {/* Contact name and ZIP code row */}
                  <View className="flex-row justify-between items-center mb-2">
                    <Text className="text-BodyBold font-Manrope text-text">{address.name || 'No name provided'}</Text>
                    <View className="bg-neutral-20 px-2 py-1 rounded">
                      <Text className="text-sm font-medium text-neutral-60">ZIP: {address.zipCode}</Text>
                    </View>
                  </View>
                  
                  {/* Address details */}
                  <Text className="text-BodyRegular font-Manrope text-text mb-1">{address.street}</Text>
                  <Text className="text-BodyRegular font-Manrope text-text mb-1">{address.city}{address.region ? `, ${address.region}` : ''}</Text>
                  <Text className="text-BodyRegular font-Manrope text-text">{address.country}</Text>
                </View>
              </View>
            ) : (
              <View style={{ alignItems: 'center', marginTop: 12 }}>
                <Text className="text-BodyRegular font-Manrope text-neutral-60 italic">
                  No address has been chosen.
                </Text>
              </View>
            )}
          </View>
          
          {/* Payment Method Section */}
          <View className="mb-6">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-xl font-semibold font-Manrope">Payment method</Text>
              <TouchableOpacity onPress={handleEditPayment}>
                <Text className="text-BodyRegular font-Manrope text-primary">Edit</Text>
              </TouchableOpacity>
            </View>
            {paymentMethod ? (
              <View className="bg-neutral-10 rounded-lg p-4 shadow-sm flex-row">
                <Image 
                  source={getPaymentIcon()} 
                  className="h-16 w-16 mr-4" 
                  resizeMode="contain"
                />
                <View className="flex-1">
                  <Text className="text-BodyBold font-Manrope text-text mb-1">{paymentMethod.type}</Text>
                  <Text className="text-BodyRegular font-Manrope text-text">
                    {paymentMethod.type === 'MobileMoney'
                      ? paymentMethod.phone // show full phone number
                      : `**** **** **** ${paymentMethod.last4}`} {/* show only last 4 for cards */}
                  </Text>
                </View>
              </View>
            ) : (
              <View style={{ alignItems: 'center', marginTop: 12 }}>
                <Text className="text-BodyRegular font-Manrope text-neutral-60 italic">
                  No payment method has been chosen.
                </Text>
              </View>
            )}
          </View>
         
        </ScrollView>

        {/* Bottom Container with Cart Icon and Checkout Button */}
        <View className="absolute bottom-6 left-4 right-4">
          <View className="relative">
            {/* Shopping Cart Button - Small Square */}
            <TouchableOpacity 
              className="absolute -top-14 right-0 bg-primary shadow-sm p-3 rounded-md z-10"
              onPress={handleCheckoutNow}
              style={{ opacity: address && paymentMethod ? 1 : 0.5 }}
              disabled={!address || !paymentMethod}
            >
              <AntDesign name="shoppingcart" size={20} color="white" />
            </TouchableOpacity>

            {/* Checkout Button */}
            <Button 
              BtnText="Checkout"
              onPress={handleOpenOrderModal}
              bgColor="bg-primary"
              disabled={!address || !paymentMethod}
            />
          </View>
        </View>
      </SafeAreaView>

      {/* Shopping Cart Total Modal */}
      <ShoppingCartTotalModal
        isVisible={isCartModalVisible}
        subtotal={subtotal}
        shipping={shipping}
        onClose={handleCloseModal}
      />

      {/* Order Status Modal */}
      <OrderStatusModal
        isVisible={isOrderModalVisible}
        onClose={handleCloseOrderModal}
      />
    </>
  );
};

export default CheckoutScreen;

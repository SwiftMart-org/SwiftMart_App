import React from 'react';
import { View, Text } from 'react-native';

type TextBoxProps = {
  title: string;
  description: string;
};

export default function TextBox({ title, description }: TextBoxProps) {
  return (
    <View className='flex gap-2 w-[342px]'>
      <Text className=" text-center text-Heading2 text-text">
        {title}
      </Text>
      <Text className="text-center text-Heading5 text-neutral-70">
        {description}
      </Text>
    </View>
  );
}

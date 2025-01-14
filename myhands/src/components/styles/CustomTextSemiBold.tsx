import React from 'react';
import {Text as RNText, TextProps} from 'react-native';

interface CustomTextProps extends TextProps {}

const CustomTextSemiBold: React.FC<CustomTextProps> = ({style, ...rest}) => {
  const customStyle = {
    fontFamily: 'Pretendard-SemiBold',
  };

  return <RNText style={[customStyle, style]} {...rest} />;
};

export default CustomTextSemiBold;

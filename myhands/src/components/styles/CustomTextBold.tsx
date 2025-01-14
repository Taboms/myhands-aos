import React from 'react';
import {Text as RNText, TextProps} from 'react-native';

interface CustomTextProps extends TextProps {}

const CustomTextBold: React.FC<CustomTextProps> = ({style, ...rest}) => {
  const customStyle = {
    fontFamily: 'Pretendard-Bold',
  };

  return <RNText style={[customStyle, style]} {...rest} />;
};

export default CustomTextBold;

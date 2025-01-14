import React from 'react';
import {Text as RNText, TextProps} from 'react-native';

interface CustomTextProps extends TextProps {}

const CustomTextSemoBold: React.FC<CustomTextProps> = ({style, ...rest}) => {
  const customStyle = {
    fontFamily: 'Pretendard-SemiBold.ttf',
  };

  return <RNText style={[customStyle, style]} {...rest} />;
};

export default CustomTextSemoBold;

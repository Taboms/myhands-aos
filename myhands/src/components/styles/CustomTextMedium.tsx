import React from 'react';
import {Text as RNText, TextProps} from 'react-native';

interface CustomTextProps extends TextProps {}

const CustomTextRegular: React.FC<CustomTextProps> = ({style, ...rest}) => {
  const customStyle = {
    fontFamily: 'Pretendard-Medium',
  };

  return <RNText style={[customStyle, style]} {...rest} />;
};

export default CustomTextRegular;

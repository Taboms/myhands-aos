import React from 'react';
import {
  Modal as RNModal,
  TouchableWithoutFeedback,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {styles, ICON_COLORS} from './CustomModal.style';
import {stateMap, buttonMap} from './modalConstants';
import {modalIcons} from '@/assets/icons/modalIcons';

type ModalType = 'warning' | 'success' | 'logout';

interface CustomModalProps {
  state: keyof typeof stateMap;
  type: ModalType;
  isOpen: boolean;
  onClose: () => void;
  onButtonClick?: () => void;
  nickname?: string;
}

const CustomModal = ({
  state,
  type,
  isOpen,
  onClose,
  onButtonClick,
}: CustomModalProps) => {
  const renderIcon = () => {
    const iconContainerStyle = [
      styles.iconContainer,
      {backgroundColor: ICON_COLORS[type]},
    ];

    return (
      <View style={iconContainerStyle}>
        <SvgXml xml={modalIcons[type]} />
      </View>
    );
  };

  const renderTitle = () => {
    return stateMap[state]?.title;
  };

  const renderSubtitle = () => {
    return stateMap[state]?.subtitle;
  };

  const handleBtnClick = (index: number) => {
    if (index !== 0 && onButtonClick) {
      onButtonClick();
    }
    onClose();
  };

  const renderBtn = () => {
    const btnArray = stateMap[state]?.btn || [];
    return btnArray.map((btnType: number, index: number) => {
      const {color, label} = buttonMap[btnType];
      if (label === '취소') {
        return (
          <TouchableOpacity
            key={index}
            style={[styles.button, {backgroundColor: color}]}
            onPress={() => handleBtnClick(index)}
          >
            <Text style={(styles.buttonText, {color: '#1a1a1a'})}>{label}</Text>
          </TouchableOpacity>
        );
      } else {
        return (
          <TouchableOpacity
            key={index}
            style={[styles.button, {backgroundColor: color}]}
            onPress={() => handleBtnClick(index)}
          >
            <Text style={(styles.buttonText, {color: '#fff'})}>{label}</Text>
          </TouchableOpacity>
        );
      }
    });
  };

  const btnArray = stateMap[state]?.btn || [];
  const buttonContainerStyle = [
    styles.buttonContainer,
    btnArray.length === 1
      ? styles.buttonContainerSingle
      : styles.buttonContainerMultiple,
  ];

  return (
    <RNModal
      visible={isOpen}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalBackdrop}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.backdropTouchable} />
        </TouchableWithoutFeedback>
        <View style={styles.container}>
          {renderIcon()}
          <Text style={styles.title}>{renderTitle()}</Text>
          {stateMap[state]?.subtitle && (
            <Text style={styles.subtitle}>{renderSubtitle()}</Text>
          )}
          <View style={buttonContainerStyle}>{renderBtn()}</View>
        </View>
      </View>
    </RNModal>
  );
};

export default CustomModal;

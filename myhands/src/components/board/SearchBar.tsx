import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '@/constants';

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  onSearch: () => void;
};

const SearchBar = ({value, onChangeText, onSearch}: SearchBarProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <Ionicons name="search-outline" size={18} color={colors.GRAY_500} />
        <TextInput
          style={styles.input}
          placeholder="검색어를 입력하세요."
          placeholderTextColor={colors.GRAY_500}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={onSearch}>
        <Text style={styles.buttonText}>검색</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: colors.BLACK,
  },
  button: {
    marginLeft: 8,
    backgroundColor: colors.RED_800,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    color: colors.WHITE,
    fontWeight: 'bold',
  },
});

export default SearchBar;

import EncryptStorage from 'react-native-encrypted-storage';

const setEncryptStorage = async <T>(key: string, data: T) => {
  await EncryptStorage.setItem(key, JSON.stringify(data));
};

const getEncryptStorage = async (key: string) => {
  const storedData = await EncryptStorage.getItem(key);
  // 저장된 데이터가 있다면 파싱해서 가져오기
  return storedData ? JSON.parse(storedData) : null;
};

const removeEncryptStorage = async (key: string) => {
  const data = await getEncryptStorage(key);
  if (data) {
    await EncryptStorage.removeItem(key);
  }
};

export {setEncryptStorage, getEncryptStorage, removeEncryptStorage};

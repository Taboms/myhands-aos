// import {
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';

// const MonthYearPicker = () => {
//   const generateYearOptions = () => {
//     const currentYear = new Date().getFullYear();
//     const years = [];
//     for (let i = currentYear - 5; i <= currentYear; i++) {
//       years.push(i);
//     }
//     return years;
//   };

//   return (
//     <View style={styles.modalContent}>
//       <View style={styles.pickerContainer}>
//         <View style={styles.pickerHeader}>
//           <Text style={styles.pickerTitle}>날짜 선택</Text>
//           <TouchableOpacity onPress={() => setIsDatePickerVisible(false)}>
//             <Icon name="close" size={24} color="#666" />
//           </TouchableOpacity>
//         </View>

//         <ScrollView style={styles.yearContainer}>
//           {generateYearOptions().map(year => (
//             <TouchableOpacity
//               key={year}
//               style={[
//                 styles.yearItem,
//                 currentDate.getFullYear() === year && styles.selectedItem,
//               ]}
//               onPress={() => {
//                 const newDate = new Date(currentDate);
//                 newDate.setFullYear(year);
//                 setCurrentDate(newDate);
//                 fetchDataForDate(newDate);
//               }}
//             >
//               <Text
//                 style={[
//                   styles.yearText,
//                   currentDate.getFullYear() === year && styles.selectedText,
//                 ]}
//               >
//                 {year}년
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>

//         <View style={styles.monthContainer}>
//           {Array.from({length: 12}, (_, i) => i + 1).map(month => (
//             <TouchableOpacity
//               key={month}
//               style={[
//                 styles.monthItem,
//                 currentDate.getMonth() + 1 === month && styles.selectedItem,
//               ]}
//               onPress={() => {
//                 const newDate = new Date(currentDate);
//                 newDate.setMonth(month - 1);
//                 setCurrentDate(newDate);
//                 setIsDatePickerVisible(false);
//                 fetchDataForDate(newDate);
//               }}
//             >
//               <Text
//                 style={[
//                   styles.monthText,
//                   currentDate.getMonth() + 1 === month && styles.selectedText,
//                 ]}
//               >
//                 {month}월
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   modalContent: {
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 20,
//     margin: 20,
//   },
//   pickerContainer: {
//     backgroundColor: 'white',
//   },
//   pickerHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingBottom: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#EAEAEA',
//   },
//   pickerTitle: {
//     fontSize: 18,
//     fontFamily: 'Pretendard-SemiBold',
//   },
//   yearContainer: {
//     maxHeight: 200,
//     marginVertical: 10,
//   },
//   yearItem: {
//     padding: 10,
//     alignItems: 'center',
//   },
//   monthContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     paddingTop: 10,
//   },
//   monthItem: {
//     width: '25%',
//     padding: 10,
//     alignItems: 'center',
//   },
//   selectedItem: {
//     backgroundColor: '#FF8366',
//     borderRadius: 5,
//   },
//   yearText: {
//     fontSize: 16,
//     fontFamily: 'Pretendard-Medium',
//   },
//   monthText: {
//     fontSize: 16,
//     fontFamily: 'Pretendard-Medium',
//   },
//   selectedText: {
//     color: 'white',
//   },
// });

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { windowHeight } from '@/utils/device';

interface CustomDatePickerModalProps {
  visible: boolean; // Điều khiển hiển thị Modal
  initialDate: Date; // Giá trị ngày ban đầu
  onDateSelected: (date: Date) => void; // Callback để trả về ngày đã chọn
  onClose: () => void; // Callback khi đóng Modal
}

const CustomDatePickerModal: React.FC<CustomDatePickerModalProps> = ({
  visible,
  initialDate,
  onDateSelected,
  onClose,
}) => {
  const [selectedDay, setSelectedDay] = useState(initialDate.getDate());
  const [selectedMonth, setSelectedMonth] = useState(initialDate.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(initialDate.getFullYear());

  // Cập nhật giá trị khi initialDate thay đổi
  useEffect(() => {
    setSelectedDay(initialDate.getDate());
    setSelectedMonth(initialDate.getMonth() + 1);
    setSelectedYear(initialDate.getFullYear());
  }, [initialDate]);

  // Tạo danh sách giá trị
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from({ length: 126 }, (_, i) => 1900 + i);

  // Hàm lấy số ngày trong tháng
  const getDaysInMonth = (month: number, year: number): number => {
    return new Date(year, month, 0).getDate();
  };

  // Xử lý thay đổi tháng
  const handleMonthChange = (month: number) => {
    setSelectedMonth(month);
    const maxDays = getDaysInMonth(month, selectedYear);
    if (selectedDay > maxDays) setSelectedDay(maxDays);
  };

  // Xử lý thay đổi năm
  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    const maxDays = getDaysInMonth(selectedMonth, year);
    if (selectedDay > maxDays) setSelectedDay(maxDays);
  };

  // Xác nhận ngày đã chọn
  const confirmDate = () => {
    const newDate = new Date(selectedYear, selectedMonth - 1, selectedDay);
    onDateSelected(newDate);
    onClose();
  };

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* <Text style={styles.modalTitle}>Chọn ngày</Text> */}
          <View style={styles.pickerContainer}>
            {/* Cột Ngày */}
            <Picker
              selectedValue={selectedDay}
              onValueChange={(itemValue) => setSelectedDay(itemValue as number)}
              style={styles.picker}
              itemStyle={styles.itemStyle}
            >
              {days.map((day) => (
                <Picker.Item 
                    key={day} label={`${day}`} value={day} />
              ))}
            </Picker>

            {/* Cột Tháng */}
            <Picker
              selectedValue={selectedMonth}
              onValueChange={(itemValue) => handleMonthChange(itemValue as number)}
              style={styles.picker}
              itemStyle={styles.itemStyle}
            >
              {months.map((month) => (
                <Picker.Item key={month} label={`${month}`} value={month} />
              ))}
            </Picker>

            {/* Cột Năm */}
            <Picker
              selectedValue={selectedYear}
              onValueChange={(itemValue) => handleYearChange(itemValue as number)}
              style={styles.picker}
              itemStyle={styles.itemStyle}
            >
              {years.map((year) => (
                <Picker.Item key={year} label={`${year}`} value={year} />
              ))}
            </Picker>
          </View>

          {/* Nút xác nhận và hủy */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.buttonText}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={confirmDate} style={styles.confirmButton}>
              <Text style={styles.buttonText}>Xác nhận</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    maxHeight: windowHeight * 0.5,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  picker: {
    flex: 1,
    height: 150,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#007AFF', // Màu xanh mặc định, bạn có thể dùng AppStyle.blue
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  itemStyle: {
    color: '#333', // Màu chữ của các item
    fontSize: 14, // Kích thước chữ
    fontWeight: 'bold', // Độ đậm của chữ
    textAlign: 'center',
  }
});

export default CustomDatePickerModal;
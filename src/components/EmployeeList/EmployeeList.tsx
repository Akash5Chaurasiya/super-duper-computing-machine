import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Feather from 'react-native-vector-icons/Feather';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Checkbox } from 'react-native-paper';
import { useSSR } from 'react-i18next';

const EmployeeList = ({ setEmployeeModal, searched, filteredTrueEmployees }: any) => {
    const [search, setSearch] = useState('')
    const [selectedItems, setSelectedItems] = useState<any>([]);
    const handleItemPress = (item: any) => {
        if (selectedItems.includes(item)) {
            setSelectedItems(selectedItems.filter((selectedItem: any) => selectedItem !== item));
        } else {
            setSelectedItems([...selectedItems, item]);
        }
    };
    const isItemSelected = (item: any) => selectedItems.includes(item);
    const empIds = filteredTrueEmployees?.map((mac: any) => mac.employeeId)
    const empIDs2 = selectedItems?.map((item: any) => item.employeeId)
    const confirmIds = empIDs2.length != 0 ? [empIDs2, selectedItems] : [empIds, filteredTrueEmployees]
    const handleConfirmData = () => {
        console.log("hii");
    }
    return (
        <View style={{ backgroundColor: 'white', marginTop: '20%', borderWidth: 0.2, elevation: 9, padding: '3%', marginLeft: '10%', marginRight: '5%' }}>
            <Feather
                name={"x"}
                size={20}
                color={'#949494'}
                style={{ marginLeft: '90%' }}
                onPress={() => setEmployeeModal(false)}
            />
            <View style={{ height: '70%' }}>
                <Text style={{ color: '#2E2E2E', fontWeight: '700', fontSize: 20 }}> Employees </Text>
                <TextInput
                    style={{
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 5,
                        padding: 10,
                        marginBottom: 10,
                        width: "95%"
                    }}
                    placeholder="Search..."
                    value={search}
                    onChangeText={(item) => setSearch(item)}
                />
                <FlatList
                    data={searched}
                    renderItem={({ item, index }: any) => (
                        console.log(item),
                        (
                            <TouchableOpacity
                                style={[
                                    styles.card,
                                    {
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        // marginLeft: responsiveWidth(2.5),
                                        backgroundColor: isItemSelected(item) ? 'lightblue' : 'transparent'
                                    },
                                ]}
                                key={index}
                                onLongPress={() => handleItemPress(item)}
                            >
                                <View>
                                    {item.profilePicture ? (<Image
                                        source={{ uri: item.profilePicture }}
                                        style={{
                                            width: responsiveHeight(8),
                                            height: responsiveHeight(8),
                                            borderRadius: responsiveHeight(10),
                                        }}
                                    />) : (<Image
                                        source={{ uri: "https://cdn.dribbble.com/users/1179255/screenshots/3869804/media/128901c4ce0bbbe670bfb35a6b204b93.png?resize=400x300&vertical=center" }}
                                        style={{
                                            width: responsiveHeight(8),
                                            height: responsiveHeight(8),
                                            borderRadius: responsiveHeight(10),
                                        }}
                                    />)}
                                </View>
                                <View>
                                    <Text
                                        ellipsizeMode='tail'
                                        style={{
                                            color: '#666666',
                                            fontWeight: '500',
                                            fontSize: 14,
                                            lineHeight: 16.94,
                                            marginLeft: responsiveWidth(3.5)
                                        }}
                                    >
                                        {item.employeeName.length > 15 ? item.employeeName.substring(0, 15) + ' ...' : item.employeeName}
                                    </Text>
                                </View>
                                <View >
                                    <Checkbox.Android
                                        status={isItemSelected(item) ? 'checked' : 'unchecked'}
                                        onPress={() => handleItemPress(item)}
                                    />
                                </View>
                            </TouchableOpacity>
                        )
                    )}
                />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <TouchableOpacity
                    onPress={handleConfirmData}
                    style={{
                        borderWidth: 1,
                        borderColor: '#283093',
                        borderRadius: 5,
                        padding: 18,
                        backgroundColor: '#283093',
                        marginTop: '20%',
                        width: '100%'
                    }}
                >
                    <Text style={{ color: 'white', alignSelf: 'center' }}>Confirm</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default EmployeeList

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        width: '100%',
    }
})
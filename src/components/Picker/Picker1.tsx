import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Picker } from '@react-native-picker/picker';

const Picker1 = ({setSelected,selectedOption,val}:any) => {
    return (
        <View style={{
            width: 170,
            backgroundColor: 'white',
            borderColor: '#DEDEDE',
            borderRadius: 10,
            borderWidth: 1,
            height: 48,
            marginRight: 10,
        }}>
            <Picker
                style={{
                    color: 'black',
                    fontWeight: '600',
                }}
                selectedValue={selectedOption}
                onValueChange={(itemValue: any) => setSelected(itemValue)}
            >
                {
                    val.map((el:any)=>(
                        <Picker.Item label={el.label} value={el.value} />
                    ))
                }
            </Picker>
        </View>
    )
}

export default Picker1

const styles = StyleSheet.create({})
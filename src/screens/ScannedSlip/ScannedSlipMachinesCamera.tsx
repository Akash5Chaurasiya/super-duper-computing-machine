import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar, Vibration, Alert, Button, Modal, Text, FlatList, TouchableOpacity, BackHandler, Image } from 'react-native';
import { Camera, useCameraDevices, useFrameProcessor } from 'react-native-vision-camera';
import { useScanBarcodes, BarcodeFormat } from 'vision-camera-code-scanner';
import { RNHoleView } from 'react-native-hole-view';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { findEmployeeAsync, findMachineAsync } from '../../redux/Slice/productionSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { XMarkIcon } from 'react-native-heroicons/solid';


interface CamProps {
    navigation: any; // Replace 'any' with the appropriate navigation prop type if available
}

const ScannedSlipMachinesCamera: React.FC<CamProps> = ({ navigation }) => {
    const route = useRoute();
    const ele: any = route.params
    console.log("i am calling from camera of slip", ele);
    const devices = useCameraDevices();
    const dispatch = useDispatch()
    const device = devices.back;
    const [torchOn, setTorchOn] = useState(false);
    const [isFocused, setIsFocused] = useState(true); // Track screen focus

    const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.ALL_FORMATS]);
    const [barcode, setBarcode] = useState<string>(''); // Provide a default value of an empty string
    const [hasPermission, setHasPermission] = useState(false);
    const [isScanning, setIsScanning] = useState(true); // State to control scanning
    const [scannedData, setScannedData] = useState<string[]>([]); // State to hold scanned barcode data
    const [scannedMachineData, setScannedMachineData] = useState<string[]>([]); // State to hold scanned barcode data
    const [scannedMData, setScannedMData] = useState<string[]>([]); // State to hold scanned barcode data
    const [modalVisible, setModalVisible] = useState(false);
    const [scannedBarcodes, setScannedBarcodes] = useState<string[]>([]); // Specify the type as 'string[]'
    const [additionalData, setAdditionalData] = useState<any | null>(null);

    useEffect(() => {
        checkCameraPermission();
    }, []);

    useEffect(() => {
        checkCameraPermission();
        AsyncStorage.getItem('scannedMData')
            .then((data) => {
                if (data) {
                    const scannedMDataFromStorage = JSON.parse(data);
                    setScannedMData(scannedMDataFromStorage)
                    console.log('scannedEData retrieved from AsyncStorage:', scannedMDataFromStorage);
                } else {
                    console.log('No scannedEData found in AsyncStorage');
                }
            })
            .catch((error) => {
                console.error('Error retrieving scannedEData from AsyncStorage:', error);
            });
            AsyncStorage.getItem('scannedMachinesData')
            .then((data) => {
                if (data) {
                    const scannedDataFromStorage = JSON.parse(data);
                    setScannedBarcodes(scannedDataFromStorage)
                    console.log('scannedEData retrieved from AsyncStorage:', scannedDataFromStorage);
                } else {
                    console.log('No scannedEData found in AsyncStorage');
                }
            })
            .catch((error) => {
                console.error('Error retrieving scannedEData from AsyncStorage:', error);
            });
    }, []);

    const checkCameraPermission = async () => {
        const status = await Camera.getCameraPermissionStatus();
        setHasPermission(status === 'authorized');
    };

    useEffect(() => {
        toggleActiveState();
    }, [barcodes]);
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButton);

        // Clean up the event listener when the component unmounts
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
        };
    }, []);

    const toggleActiveState = () => {
        if (barcodes && barcodes.length > 0 && isScanning) {
            barcodes.forEach(async (scannedBarcode) => {
                if (scannedBarcode.rawValue && scannedBarcode.rawValue !== '') {
                    let data = scannedBarcode.rawValue;
                    if (scannedBarcodes.includes(data)) {
                        // Display an error message for duplicate barcode
                        Toast.show({
                            type: ALERT_TYPE.DANGER,
                            title: "Error",
                            textBody: "Barcode already scanned.",
                        });
                        return; // Stop processing this barcode
                    }
                    setIsScanning(false); // Stop scanning on successful detection
                    setBarcode(data);
                    // Alert.alert(data);
                    dispatch(findMachineAsync(data)).then((response: any) => {
                        console.log("Employee slip camera", response.payload);
                        Toast.show({
                            type: ALERT_TYPE.SUCCESS,
                            title: "success",
                            textBody: response.payload.machine.machineName,
                        })
                        setAdditionalData(response.payload);
                        const updatedScannedData = [...scannedBarcodes, data];
                        setScannedBarcodes(updatedScannedData);
                        AsyncStorage.setItem('scannedMachinesData', JSON.stringify(updatedScannedData))
                            .then(() => {
                                console.log('scannedEData stored in AsyncStorage');
                            })
                            .catch((error) => {
                                console.error('Error storing scannedEData in AsyncStorage:', error);
                            });
                        // setScannedMData((prevData) => [...prevData, response.payload.machine]);
                        const updatedScannedMData = [...scannedMData, response.payload]; // Update the state value
                        setScannedMData(updatedScannedMData);
                        AsyncStorage.setItem('scannedMData', JSON.stringify(updatedScannedMData))
                            .then(() => {
                                console.log('scannedEData stored in AsyncStorage');
                            })
                            .catch((error) => {
                                console.error('Error storing scannedEData in AsyncStorage:', error);
                            });
                        setScannedMachineData((prevData) => [...prevData, response.payload.machine._id]); // Add scanned data to the array
                        setModalVisible(true); // Show the modal on successful scan
                    }).catch((error: any) => {
                        console.log("eooer meessage", error);
                        Toast.show({
                            type: ALERT_TYPE.DANGER,
                            title: "failed",
                            textBody: error.message,
                        })
                    })
                }
            });
        }
    };
    console.log("aditional data geeting after scanning machine ", additionalData?.machine?.machineName)
    let pic = additionalData?.machine?.proofPicture

    const finishAllotment = () => {
        // Perform any action needed when the "Finish Allotment" button is pressed
        // For example, navigate to another screen with the scanned data
        const existingParams = route.params || {}; // Access the current route's params
        console.log("Scanned Slip Data", existingParams, scannedMachineData);
        navigation.navigate("ScannedSlip", { ...existingParams, params2: scannedMachineData, params6: scannedMData });

    };
    const handleBackButton = () => {
        // Prevent default behavior (going back)
        navigation.navigate("ScannedSlip")
        return true;
    };

    const scanMore = () => {
        // Perform any action needed when the "Scan More" button is pressed
        // You can clear the scanned data and resume scanning
        setIsScanning(true);
        setBarcode('');
        setModalVisible(false); // Hide the modal
    };

    return (
        device != null &&
        hasPermission && (
            <>
                <StatusBar barStyle="light-content" backgroundColor="#000000" />
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        top: 20,
                        right: 20,
                        zIndex: 1,
                    }}
                    onPress={() => handleBackButton()}
                >
                <Text>
                    <XMarkIcon color="red" fill="white" size={42}/>
                </Text>
                </TouchableOpacity>
                <Camera
                    style={StyleSheet.absoluteFill}
                    device={device}
                    isActive={isScanning}
                    frameProcessor={frameProcessor}
                    frameProcessorFps="auto"
                    audio={false}
                    enableZoomGesture
                />

                <RNHoleView
                    holes={[
                        {
                            x: widthPercentageToDP('10.5%'),
                            y: heightPercentageToDP('25%'),
                            width: widthPercentageToDP('80%'),
                            height: heightPercentageToDP('30%'),
                            borderRadius: 10,
                        },
                    ]}
                    style={styles.rnholeView}
                />
                {scannedData.length > 0 && (
                    <FlatList
                        data={scannedData}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <Text style={styles.scannedItem}>{item}</Text>
                        )}
                    />
                )}
                {isScanning ? (
                    <Text style={styles.instructions}>Scanning...</Text>
                ) : (
                    <View style={{ marginTop: responsiveHeight(68), justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={styles.loginButton} onPress={scanMore} ><Text style={styles.buttonText}>Scan More</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.loginButton} onPress={finishAllotment} ><Text style={styles.buttonText}>Finish Allotment</Text></TouchableOpacity>
                    </View>
                )}
                <Modal
                    visible={modalVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalText}>Scan Successful!</Text>
                        {additionalData && (
                            <View style={styles.container}>
                                {pic ? (<Image source={{ uri: pic }} style={styles.profileImage} />) : (<Image
                                    source={{
                                        uri: 'https://cdn-icons-png.flatcon.com/512/3135/3135715.png',
                                    }}
                                    style={styles.profileImage}
                                />)}
                                <Text style={styles.name}>{additionalData?.machine?.machineName}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ color: '#2E2E2E', fontSize: 18, }}>{additionalData?.machine?.code}</Text>
                                    {/* <Text style={{ color: '#2E2E2E', fontSize: 18, marginLeft: 8, fontWeight: '700' }}>|</Text> */}
                                </View>
                            </View>
                        )}
                        <TouchableOpacity style={{ ...styles.loginButton, width: '60%' }} onPress={() => setModalVisible(false)}  ><Text style={{ color: 'white', paddingLeft: 3, fontSize: 30 }}>OK</Text></TouchableOpacity>
                    </View>
                </Modal>
            </>
        )
    );
};

// Styles:
const styles = StyleSheet.create({
    rnholeView: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    instructions: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20,
    },
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    modalText: {
        fontSize: 20,
        color: 'white',
        marginBottom: 20,
    },
    scannedItem: {
        fontSize: 18,
        marginVertical: 5,
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
    },
    bottomButtons: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        backgroundColor: 'white', // Change this to the desired background color
    },
    button: {
        zIndex: 1, // Adjust the z-index as needed
        // Other button styles
    },
    loginButton: {
        backgroundColor: '#283093',
        justifyContent: 'center',
        alignItems: 'center',
        height: responsiveHeight(8),
        borderRadius: 10,
        width: '90%',
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        paddingLeft: 10,
    },
    profileImage: {
        width: responsiveHeight(30),
        height: responsiveHeight(30),
        borderRadius: 50,
        marginBottom: 10,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    },
    email: {
        fontSize: 18,
        color: 'gray',
    },
    container: {
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F0F0F0',
        marginLeft: '5%',
        marginRight: '5%',
        borderRadius: 9,
        borderWidth: 1,
        borderColor: '#DEDEDE',


    },
});
export default ScannedSlipMachinesCamera;
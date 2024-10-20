import { View, Text, Modal as RNModal, StatusBar, Pressable } from 'react-native'
import React, { useEffect } from 'react'





const Modal = ({ children, visible, style, onOutsidePress }) => {




    return (
        <RNModal
            transparent={true}
            visible={visible}
            animationType="fade"
        >
            <Pressable
                onPress={onOutsidePress}
                style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    flex: 1,
                    justifyContent: 'center',
                    padding: 10,

                }}>
                <View
                    style={{
                        width: '100%',
                        backgroundColor: 'white',
                        borderRadius: 10,
                        ...style
                    }}
                >
                    {children}
                </View>
            </Pressable>
        </RNModal>
    )
}

export default Modal
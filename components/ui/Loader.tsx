import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export default function Loader() {
    return (
        <View style={styles.container}>
            <View style={styles.backgroundDim} />
            <ActivityIndicator size="large" color="#ffffff" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
    },
    backgroundDim: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});
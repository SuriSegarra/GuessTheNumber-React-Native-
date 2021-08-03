import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = props => {
    return (
        <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
    )
}

const styles = StyleSheet.create({
    card: {
        shadowColor: 'black',
        // the shadows here only work in IOS
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        // use elevation for shadowing in Android 
        elevation: 5,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10
    }
})
export default Card;
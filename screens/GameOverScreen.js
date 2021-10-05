import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import Colors from '../constants/colors';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

const GamerOverScreen = props => {
    return (
        <View style={styles.screen}>
            <TitleText>The Game is Over!</TitleText>
            <View style={styles.imageContainer}>
                <Image source={require('../assets/success.png')}
                    style={styles.image}
                    resizeMode='cover'
                />
            </View>
            <View style={styles.resultsContainer}>
                <BodyText style={styles.resultText}>
                    Your phone needed{' '}
                    <Text style={styles.highlight}>{props.roundsNumber} </Text>
                    round to get the number{' '}
                    <Text style={styles.highlight}>{props.userNumber} </Text>
                </BodyText>
            </View>
            <MainButton title='NEW GAME' onPress={props.onRestart}>NEW GAME</MainButton>
        </View>

    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        overflow: 'hidden',
        marginVertical: 30
    },
    image: {
        width: '100%',
        height: '100%',
    },
    resultsContainer: {
        marginHorizontal: 30,
        marginVertical:15
    },
    resultText: {
        textAlign: 'center',
        fontSize: 20
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold',

    }
});

export default GamerOverScreen;
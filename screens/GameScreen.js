import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText';

const generateRandomBetween = (min, max, exclude) => {
    // have an interger number if a non integer is entered and round it up 
    min = Math.ceil(min);
    // to do the same but to round it down 
    max = Math.floor(max)
    // give us number between 0-1 
    // so to have a number between min and mac, we have to multiply this with max - min 
    // and at the end add min 
    const rndom = Math.floor(Math.random() * (max - min)) + min;
    // if random number is equal to number we want to exclude (rare coincidence) will return the result of 
    // another generate random between call where I simply forward min, max and exlcude 
    // so we simply repeat generate random and return the value of repeated run 
    if (rndom === exclude) {
        return generateRandomBetween(min, max, exclude)
        // if we dont have the excluded number which should be the case in most cases,
        // then return random number
    } else {
        return rndom
    }
};

const renderListItem = (value, numOfRound) => (
    <View key={value} style={styles.listItem}>
        <BodyText>#{numOfRound}</BodyText>
        <BodyText>{value}</BodyText>
    </View>
)

const GameScreen = props => {
    const initialGuess = generateRandomBetween(1, 100, props.userChoice)
    const [currentGuess, setCurrentGuess] = useState(initialGuess);

    // initial boundaries we are ising for the random number 
    // this values willl not be regenerated 
    const [pastGuesses, setPastGuesses] = useState([initialGuess])
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = (direction) => {
        if ((direction === 'lower' && currentGuess < userChoice) ||
            (direction === 'greater' && currentGuess > userChoice)
        ) {
            Alert.alert('Don\'t lie', 'You know that this is wrong...', [
                { text: 'Sorry!', style: 'cancel' }
            ]);
            return;
        }
        // if I am telling you, the computer that number you guessed is too big 
        // and you should guess a lower one 
        // then I know this number which I guessed is my currentHIgh
        // the number which is correct cant be higher than this one 
        // so save the number I just guessed as my current high 
        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            // we ensure that the new lower boundary included in the random
            // its actually one higher than the current guess which was false
            currentLow.current = currentGuess + 1
        }
        const nextNumber = generateRandomBetween(
            currentLow.current,
            currentHigh.current,
            currentGuess
        );
        setCurrentGuess(nextNumber)
        // setPastGuesses(curRounds => curRounds + 1)
        setPastGuesses(curPastGuesses => [nextNumber, ...curPastGuesses]);
    };

    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')}><Ionicons name='md-remove' size={24} color='white' /></MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')}><Ionicons name='md-add' size={24} color='white' /></MainButton>
            </Card>
            <View style={styles.list}>
            <ScrollView>
                {pastGuesses.map((guess, index)=> (
                renderListItem(guess, pastGuesses.length - index)))}
            </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 400,
        maxWidth: '90%',
    },
    list:{
        width: '80%'
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection:'row',
        justifyContent: 'space-between',

    }
})

export default GameScreen;

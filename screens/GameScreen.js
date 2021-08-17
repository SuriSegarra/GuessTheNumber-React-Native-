import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const generateRandomBetween = (min, max, exclude) => {
    // have an interger number if a non integer is entered and round it up 
    min = Math.ceil(min);
    // to do the same but to round it down 
    max = Math.floor(max)
    // give us number between 0-1 
    // so to have a number between min and mac, we have to multiply this with max - min 
    // and at the end add min 
    const rndom = Mat.floor(Math.random() * (max - min)) + min;
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

const GameScreen = props => {
    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1,100, props.userChoice));

}

const styles = StyleSheet.create()

export default GameScreen;
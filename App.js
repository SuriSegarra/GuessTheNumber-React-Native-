import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Font from './expo-font';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GamerOverScreen from './screens/GameOverScreen';

const fetchFonts = () => {
  Font.loadAsync({
    'open-sans': required('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': required('./assets/fonts/OpenSans-Bold.ttf')
  });
}

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0)


  const configureNewGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null)
  }

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  }

  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds);
  }

  let content = <StartGameScreen onStartGame={startGameHandler} />;

  if (userNumber && guessRounds <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />;
  } else if (guessRounds > 0) {
    content = <GamerOverScreen roundsNumber={guessRounds} userNumber={userNumber} onRestart={configureNewGameHandler} />
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess a Number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

import React, {useState} from 'react';

import Icons from './components/Icons';

import Snackbar from 'react-native-snackbar';

import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

function App(): React.JSX.Element {
  const [isCross, setIsCross] = useState<boolean>(false);
  const [gameWinner, setGameWinner] = useState<string>('');
  const [gameState, setGameState] = useState(new Array(9).fill('empty', 0, 9));

  const reloadGame = () => {
    setIsCross(false);
    setGameWinner('');
    setGameState(new Array(9).fill('empty', 0, 9));
  };

  const checkIsWinner = () => {
    if (
      gameState[0] === gameState[1] &&
      gameState[0] === gameState[2] &&
      gameState[0] !== 'empty'
    ) {
      setGameWinner(`${gameState[0]} won the game! 🥳`);
    } else if (
      gameState[3] !== 'empty' &&
      gameState[3] === gameState[4] &&
      gameState[4] === gameState[5]
    ) {
      setGameWinner(`${gameState[3]} won the game! 🥳`);
    } else if (
      gameState[6] !== 'empty' &&
      gameState[6] === gameState[7] &&
      gameState[7] === gameState[8]
    ) {
      setGameWinner(`${gameState[6]} won the game! 🥳`);
    } else if (
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[3] &&
      gameState[3] === gameState[6]
    ) {
      setGameWinner(`${gameState[0]} won the game! 🥳`);
    } else if (
      gameState[1] !== 'empty' &&
      gameState[1] === gameState[4] &&
      gameState[4] === gameState[7]
    ) {
      setGameWinner(`${gameState[1]} won the game! 🥳`);
    } else if (
      gameState[2] !== 'empty' &&
      gameState[2] === gameState[5] &&
      gameState[5] === gameState[8]
    ) {
      setGameWinner(`${gameState[2]} won the game! 🥳`);
    } else if (
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[4] &&
      gameState[4] === gameState[8]
    ) {
      setGameWinner(`${gameState[0]} won the game! 🥳`);
    } else if (
      gameState[2] !== 'empty' &&
      gameState[2] === gameState[4] &&
      gameState[4] === gameState[6]
    ) {
      setGameWinner(`${gameState[2]} won the game! 🥳`);
    } else if (!gameState.includes('empty', 0)) {
      setGameWinner('Draw game... ⌛️');
    }
  };

  const onChangeItem = (itemNumber: number) => {
    if (gameWinner) {
      return Snackbar.show({
        text: gameWinner,
        backgroundColor: '#000000',
        textColor: '#FFFFFF',
      });
    }

    if (gameState[itemNumber] === 'empty') {
      gameState[itemNumber] = isCross ? 'cross' : 'circle';
      setIsCross(!isCross);
    } else {
      return Snackbar.show({
        text: 'Position is already filled',
        backgroundColor: 'red',
        textColor: '#FFF',
      });
    }

    checkIsWinner();
  };

  return (
    <SafeAreaView>
      <StatusBar />
      {gameWinner ? (
        <View style={[styles.playerInfo, styles.winnerInfo]}>
          <Text style={styles.winnerTxt}>{gameWinner}</Text>
        </View>
      ) : (
        <View
          style={[
            styles.playerInfo,
            isCross ? styles.playerX : styles.playerO,
          ]}>
          <Text style={styles.gameTurnTxt}>
            Player {isCross ? 'X' : 'O'}'s Turn
          </Text>
        </View>
      )}
      {/* Game Grid */}
      <FlatList
        numColumns={3}
        data={gameState}
        style={styles.grid}
        renderItem={({item, index}) => (
          <Pressable
            key={index}
            style={styles.card}
            onPress={() => onChangeItem(index)}>
            <Icons name={item} />
          </Pressable>
        )}
      />
      {/* game action */}
      <Pressable style={styles.gameBtn} onPress={reloadGame}>
        <Text style={styles.gameBtnText}>
          {gameWinner ? 'Start new game' : 'reLoad the game'}
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  playerInfo: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    paddingVertical: 8,
    marginVertical: 12,
    marginHorizontal: 14,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  gameTurnTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '700',
    textShadowColor: '#000',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1,
  },
  playerX: {
    backgroundColor: '#1ABC9C', // Vibrant green
  },
  playerO: {
    backgroundColor: '#F39C12', // Vibrant orange
  },
  grid: {
    margin: 16,
  },
  card: {
    height: 100,
    width: '33.33%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#BDC3C7',
    borderRadius: 8,
    margin: 4,
    backgroundColor: '#ECF0F1',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  winnerInfo: {
    borderRadius: 12,
    backgroundColor: '#27AE60', // Winning green
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  winnerTxt: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '700',
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  gameBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 12,
    marginHorizontal: 36,
    backgroundColor: '#9B59B6', // Vibrant purple
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  gameBtnText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});


export default App;

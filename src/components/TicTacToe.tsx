import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TicTacToeButton from './TicTacToeButton';

export default function TicTacToe() {
    const [isCross, setIsCross] = useState<boolean>(false);
    const [gameWinner, setGameWinner] = useState<string>("");
    const [gameState, setGameState] = useState<string[]>(new Array(9).fill('empty'));

    const gameReload = () => {
        setIsCross(false);
        setGameWinner("");
        setGameState(new Array(9).fill('empty'));
    };

    const checkWinner = () => {
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];

        for (const [a, b, c] of winningCombos) {
            if (
                gameState[a] === gameState[b] &&
                gameState[b] === gameState[c] &&
                gameState[a] !== 'empty'
            ) {
                setGameWinner(`${gameState[a]} Won this Game🥳`);
                return;
            }
        }

        if (!gameState.includes('empty')) {
            setGameWinner("It's a Draw! 🤝");
        }
    };

    const onChangeItem = (itemsNumber: number) => {
        if (gameWinner) {
            return Alert.alert("The Real winner is", gameWinner);
        }
        if (gameState[itemsNumber] === 'empty') {
            const updatedGameState = [...gameState];
            updatedGameState[itemsNumber] = isCross ? 'cross' : 'circle';
            setGameState(updatedGameState);
            setIsCross(!isCross);
            const winner = getWinner(updatedGameState);
            if (winner) setGameWinner(winner);
        } else {
            return Alert.alert("Position is already Filled!");
        }
    };

    // Helper that returns winner string (or null) given a game state
    const getWinner = (state: string[]): string | null => {
        const combos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        for (const [a, b, c] of combos) {
            if (state[a] === state[b] && state[b] === state[c] && state[a] !== 'empty') {
                return `${state[a]} Won this Game🥳`;
            }
        }
        if (!state.includes('empty')) return "It's a Draw! 🤝";
        return null;
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.HeadingText}>Simple TicTacToe</Text>

            {gameWinner ? (
                <Text style={styles.winnerText}>{gameWinner}</Text>
            ) : (
                <Text style={styles.turnText}>
                    Player {isCross ? 'Cross' : 'Circle'}'s Turn
                </Text>
            )}

            <FlatList
                numColumns={3}
                data={gameState}
                keyExtractor={(_, index) => index.toString()}
                scrollEnabled={false}
                contentContainerStyle={styles.board}
                renderItem={({ item, index }) => (
                    <Pressable
                        key={index}
                        onPress={() => onChangeItem(index)}
                        style={styles.cell}
                    >
                        <TicTacToeButton name={item} />
                    </Pressable>
                )}
            />

            <Pressable onPress={gameReload} style={styles.reloadButton}>
                <Text style={styles.reloadText}>
                    {gameWinner ? "Start New Game" : "Reload"}
                </Text>
            </Pressable>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    HeadingText: {
        fontSize: 29,
        fontWeight: "bold",
        textAlign: "center",
        color: "navy",
        marginBottom: 40,
    },
    winnerText: {
        fontSize: 20,
        textAlign: "center",
        color: "green",
        marginBottom: 20,
        fontWeight: "bold",
    },
    turnText: {
        fontSize: 18,
        textAlign: "center",
        color: "gray",
        marginBottom: 20,
    },
    board: {
        alignItems: "center",
        justifyContent: "center",
    },
    cell: {
        width: 100,
        height: 100,
        borderWidth: 1,
        borderColor: "navy",
        alignItems: "center",
        justifyContent: "center",
    },
    reloadButton: {
        marginBottom: 90,
        alignSelf: "center",
        paddingVertical: 12,
        paddingHorizontal: 30,
        backgroundColor: "navy",
        borderRadius: 10,
    },
    reloadText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});
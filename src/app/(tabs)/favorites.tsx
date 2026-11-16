import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useAppContext } from "../context";

export default function FavoritesScreen() {
  const router = useRouter();
  const { flashcards } = useAppContext();

  const favoriteCards = flashcards.filter((card) => card.isFavorite);

  return (
    <View style={styles.container}>
      {favoriteCards.length === 0 ? (
        <Text style={styles.emptyText}>No cards bookmarked for review.</Text>
      ) : (
        <FlatList
          data={favoriteCards}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              style={styles.card}
              onPress={() => router.push(`/details/${item.id}`)}
            >
              <Text style={styles.questionText}>{item.question}</Text>
              <Ionicons name="chevron-forward" size={20} color="#4f46e5" />
            </Pressable>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#d5d7d8" },
  emptyText: {
    textAlign: "center",
    marginTop: 250,
    fontWeight: "bold",
    fontSize: 16,
    color: "#64748b",
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    marginBottom: 12,
    backgroundColor: "#e0e7ff",
    borderRadius: 12,
  },
  questionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: "#312e81",
    marginRight: 10,
  },
});

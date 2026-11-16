import { Ionicons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Flashcard, useAppContext } from "../context";

export default function HomeScreen() {
  const router = useRouter();
  const { flashcards, addFlashcard } = useAppContext();

  const [modalVisible, setModalVisible] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleCreateCard = async () => {
    if (!question.trim() || !answer.trim()) {
      return;
    }

    const cleanQuestion = question.trim();
    const cleanAnswer = answer.trim();

    addFlashcard(cleanQuestion, cleanAnswer);
    setQuestion("");
    setAnswer("");
    setModalVisible(false);

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Flashcard Created!",
        body: `Added: "${cleanQuestion}"`,
      },
      trigger: null,
    });
  };

  const renderItem = ({ item }: { item: Flashcard }) => (
    <Pressable
      style={styles.card}
      onPress={() => router.push(`/details/${item.id}`)}
    >
      <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/2232/2232688.png",
        }}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.questionText} numberOfLines={2}>
          {item.question}
        </Text>
      </View>
      {item.isFavorite ? (
        <Ionicons name="bookmark" size={20} color="#6366f1" />
      ) : null}
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={flashcards}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No flashcards yet. Tap + to create your first card!
          </Text>
        }
      />

      <Pressable style={styles.fab} onPress={() => setModalVisible(true)}>
        <Ionicons name="add" size={30} color="#fff" />
      </Pressable>

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>CREATE NEW FLASHCARD</Text>

            <Text style={styles.inputLabel}>Question</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your question..."
              placeholderTextColor="#94a3b8"
              value={question}
              onChangeText={setQuestion}
            />

            <Text style={styles.inputLabel}>Answer</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter the answer..."
              placeholderTextColor="#94a3b8"
              value={answer}
              onChangeText={setAnswer}
              multiline={true}
            />

            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.modalBtn, styles.cancelBtn]}
                onPress={() => {
                  setQuestion("");
                  setAnswer("");
                  setModalVisible(false);
                }}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>

              <Pressable
                style={[styles.modalBtn, styles.saveBtn]}
                onPress={handleCreateCard}
              >
                <Text style={styles.saveText}>Save Card</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#d5d7d8" },
  listContent: { padding: 16, paddingBottom: 90 },
  emptyText: {
    textAlign: "center",
    marginTop: 250,
    fontSize: 16,
    fontWeight: "bold",
    color: "#64748b",
  },
  card: {
    flexDirection: "row",
    padding: 20,
    marginBottom: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    alignItems: "center",
    elevation: 2,
  },
  image: { width: 40, height: 40, marginRight: 16 },
  textContainer: { flex: 1 },
  questionText: { fontSize: 16, fontWeight: "bold", color: "#1e293b" },

  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#6366f1",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalBox: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 16,
    width: "85%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 16,
    textAlign: "center",
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#475569",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    marginBottom: 16,
    backgroundColor: "#f8fafc",
    color: "#1e293b",
  },
  textArea: { height: 80, textAlignVertical: "top" },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  modalBtn: { flex: 1, padding: 12, borderRadius: 8, alignItems: "center" },
  cancelBtn: { backgroundColor: "#e2e8f0", marginRight: 8 },
  cancelText: { color: "#475569", fontWeight: "bold" },
  saveBtn: { backgroundColor: "#6366f1", marginLeft: 8 },
  saveText: { color: "#fff", fontWeight: "bold" },
});

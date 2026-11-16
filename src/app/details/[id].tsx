import * as Notifications from "expo-notifications";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { useAppContext } from "../context";

export default function DetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { flashcards, toggleFavorite, deleteFlashcard } = useAppContext();

  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const card = flashcards.find((c) => c.id === id);

  if (!card) {
    return <Text style={styles.errorText}>Card not found</Text>;
  }

  const confirmBookmark = async () => {
    toggleFavorite(card.id);
    setModalVisible(false);

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Study List Updated",
        body: `Flashcard was ${
          card.isFavorite ? "removed from" : "added to"
        } your review list.`,
      },
      trigger: null,
    });
  };

  const confirmDelete = async () => {
    const deletedQuestion = card.question;
    setDeleteModalVisible(false);
    deleteFlashcard(card.id);
    router.back();

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Flashcard Deleted",
        body: `"${deletedQuestion}" was deleted.`,
      },
      trigger: null,
    });
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.flashcard}
        onPress={() => setShowAnswer(!showAnswer)}
      >
        <Text style={styles.cardLabel}>
          {showAnswer ? "ANSWER" : "QUESTION"}
        </Text>
        <Text style={styles.cardContent}>
          {showAnswer ? card.answer : card.question}
        </Text>
        <Text style={styles.tapPrompt}>Tap card to flip</Text>
      </Pressable>

      {/* Bookmark Button */}
      <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>
          {card.isFavorite ? "Remove from Review List" : "Bookmark for Review"}
        </Text>
      </Pressable>

      {/* Delete Button */}
      <Pressable
        style={styles.deleteButton}
        onPress={() => setDeleteModalVisible(true)}
      >
        <Text style={styles.deleteButtonText}>Delete Flashcard</Text>
      </Pressable>

      {/* Bookmark Confirmation Modal */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Update Review List?</Text>
            <Text style={styles.modalText}>
              Do you want to {card.isFavorite ? "remove" : "bookmark"} this
              card?
            </Text>

            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.modalBtn, styles.cancelBtn]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.modalBtn, styles.confirmBtn]}
                onPress={confirmBookmark}
              >
                <Text style={styles.confirmText}>Yes, Update</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        visible={deleteModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Delete Flashcard?</Text>
            <Text style={styles.modalText}>
              Are you sure you want to delete this flashcard? This cannot be
              undone.
            </Text>

            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.modalBtn, styles.cancelBtn]}
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.modalBtn, styles.confirmDeleteBtn]}
                onPress={confirmDelete}
              >
                <Text style={styles.confirmText}>Yes, Delete</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#f8fafc",
  },
  errorText: { marginTop: 20, fontSize: 18 },
  flashcard: {
    backgroundColor: "#fff",
    width: "100%",
    minHeight: 300,
    padding: 30,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    marginBottom: 30,
  },
  cardLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#94a3b8",
    position: "absolute",
    top: 20,
    left: 20,
  },
  cardContent: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1e293b",
    textAlign: "center",
  },
  tapPrompt: {
    fontSize: 14,
    color: "#94a3b8",
    position: "absolute",
    bottom: 20,
  },
  button: {
    backgroundColor: "#6366f1",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    marginBottom: 12,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  deleteButton: {
    backgroundColor: "#fee2e2",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fca5a5",
  },
  deleteButtonText: { color: "#dc2626", fontSize: 16, fontWeight: "bold" },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalBox: {
    backgroundColor: "white",
    padding: 24,
    borderRadius: 16,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalText: {
    fontSize: 14,
    color: "#475569",
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: { flexDirection: "row", justifyContent: "space-between" },
  modalBtn: { flex: 1, padding: 12, borderRadius: 8, alignItems: "center" },
  cancelBtn: { backgroundColor: "#e2e8f0", marginRight: 8 },
  cancelText: { color: "#475569", fontWeight: "bold" },
  confirmBtn: { backgroundColor: "#6366f1", marginLeft: 8 },
  confirmDeleteBtn: { backgroundColor: "#dc2626", marginLeft: 8 },
  confirmText: { color: "#fff", fontWeight: "bold" },
});

import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  isFavorite: boolean;
}

interface AppContextType {
  flashcards: Flashcard[];
  toggleFavorite: (id: string) => void;
  addFlashcard: (question: string, answer: string) => void;
  deleteFlashcard: (id: string) => void;
}

const STORAGE_KEY = "@flashcards_data";

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);

  // Load saved flashcards when the app opens
  useEffect(() => {
    const loadFlashcards = async () => {
      try {
        const savedData = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedData !== null) {
          setFlashcards(JSON.parse(savedData));
        }
      } catch (error) {
        console.error("Error loading flashcards:", error);
      }
    };

    loadFlashcards();
  }, []);

  // Helper function to save flashcards to phone storage
  const saveFlashcards = async (updatedCards: Flashcard[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCards));
    } catch (error) {
      console.error("Error saving flashcards:", error);
    }
  };

  const toggleFavorite = (id: string) => {
    setFlashcards((prevCards) => {
      const updated = prevCards.map((card) =>
        card.id === id ? { ...card, isFavorite: !card.isFavorite } : card,
      );
      saveFlashcards(updated);
      return updated;
    });
  };

  const addFlashcard = (question: string, answer: string) => {
    const newCard: Flashcard = {
      id: Date.now().toString(),
      question,
      answer,
      isFavorite: false,
    };
    setFlashcards((prevCards) => {
      const updated = [newCard, ...prevCards];
      saveFlashcards(updated);
      return updated;
    });
  };

  const deleteFlashcard = (id: string) => {
    setFlashcards((prevCards) => {
      const updated = prevCards.filter((card) => card.id !== id);
      saveFlashcards(updated);
      return updated;
    });
  };

  return (
    <AppContext.Provider
      value={{ flashcards, toggleFavorite, addFlashcard, deleteFlashcard }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

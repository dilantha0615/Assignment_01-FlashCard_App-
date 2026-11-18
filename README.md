# Name: K A D SANDARUWAN

# Student ID: PE/2022/014

# Flashcard App

## Overview & Problem Statement

The **Flashcard App** is a cross-platform mobile study application built with **React Native**, **Expo**, and **TypeScript**.

Students often rely on paper flashcards for active recall and exam preparation, but physical cards are easy to lose, difficult to carry everywhere, and hard to organize when separating mastered topics from difficult ones. This application solves that problem by providing a digital flashcard manager that works offline. Students can create custom question-and-answer cards, store them permanently on their device using local storage, bookmark difficult cards into a separate review list, and receive instant confirmation notifications when managing their study deck.

---

## Application Screens

The application consists of **3 main screens** (supported by interactive modal dialogs for creating and deleting cards):

1. **All Cards Screen (`src/app/(tabs)/index.tsx`)**
   - **Purpose:** Serves as the main home screen of the app. It displays all saved flashcards in a scrollable list, shows a bookmark icon next to favorited cards, and includes a floating action button (`+`) in the bottom-right corner that opens the **Create New Flashcard** modal.

2. **Review List Screen (`src/app/(tabs)/review.tsx`)**
   - **Purpose:** Acts as a focused study screen. It automatically filters the flashcard list to display only the cards marked as favorites/bookmarked so students can concentrate on questions they need to practice more.

3. **Card Details Screen (`src/app/details/[id].tsx`)**
   - **Purpose:** Displays the full question and answer for a single selected flashcard. From this screen, users can toggle the card's bookmark status (to add or remove it from the Review List) or delete the card safely through a confirmation modal.

---

## Core React Native Components Used

| Component | Where Implemented | Purpose in the App |

| _`View`_ | All screens and layouts (`_layout.tsx`, `index.tsx`, `review.tsx`, `[id].tsx`) | Acts as the primary layout container for structuring screens, card rows, headers, and modal dialogs. |
| _`Text`_ | All screens (`index.tsx`, `review.tsx`, `[id].tsx`) | Renders screen titles, flashcard questions, answers, input labels, button text, and empty-list messages. |
| _`FlatList`_ | `src/app/(tabs)/index.tsx`, `src/app/(tabs)/review.tsx` | Efficiently renders scrollable lists of flashcards and displays a fallback empty state message when no cards exist. |
| _`Pressable`_ | `src/app/(tabs)/index.tsx`, `src/app/(tabs)/review.tsx`, `src/app/details/[id].tsx` | Handles touch interactions for opening card details, pressing the floating `+` button, saving/canceling modals, toggling bookmarks, and deleting cards. |
| _`Modal`_ | `src/app/(tabs)/index.tsx`, `src/app/details/[id].tsx` | Displays popup overlays for the **Create New Flashcard** form and the **Delete Confirmation** prompt. |
| _`TextInput`_ | `src/app/(tabs)/index.tsx` | Captures user text input for the flashcard question and multiline answer inside the creation modal. |
| _`Image`_ | `src/app/(tabs)/_layout.tsx`, `src/app/(tabs)/index.tsx` | Renders the custom app icon in the top-right navigation header and displays thumbnail icons on each flashcard item. |
| _`StyleSheet`_ | All screen and layout files | Defines clean, consistent styling, spacing, colors, rounded cards, and readable dark-mode text colors across the app. |

---

## Expo Router Structure (`src/app/`)

This project uses **Expo Router** for file-based navigation, where the folder and file structure inside `src/app/` directly defines the app's screens and navigation flow:

text
src/app/
\_layout.tsx # Root Stack layout that wraps the entire app in <AppProvider>
context.tsx # Global React Context state + AsyncStorage data persistence
(tabs)/ # Route group for bottom tab navigation
\_layout.tsx # Configures the custom top header (with app logo)
index.tsx # Default route ("All Cards" tab)
review.tsx # Secondary tab ("Review List" tab)
details/
[id].tsx # Dynamic route that loads a specific flashcard using its unique ID

# Demonstration Video link

--> " https://drive.google.com/file/d/1pDicxRK66OzDWiAq0Y0qtwgh6cdIFw5O/view?usp=sharing "

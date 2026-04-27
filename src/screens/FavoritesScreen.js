import React, { useState, useRef } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  TouchableOpacity, Image, SafeAreaView, Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../context/FavoritesContext';
import { getCoverUrl } from '../services/api';

const CATEGORIES = [
  { key: 'liked', label: 'Liked Books', icon: 'heart', removeAction: 'removeFromLiked' },
  { key: 'toRead', label: 'To Read', icon: 'bookmark', removeAction: 'removeFromToRead' },
  { key: 'finished', label: 'Finished', icon: 'checkmark-circle', removeAction: 'removeFromFinished' },
];

function BookItem({ book, onRemove }) {
  const coverUrl = getCoverUrl(book.cover_i || book.covers?.[0], 'S');
  const title = book.title || 'Unknown Title';
  const author = book.author_name?.[0] || 'Unknown Author';

  return (
    <View style={styles.bookItem}>
      {coverUrl ? (
        <Image source={{ uri: coverUrl }} style={styles.cover} />
      ) : (
        <View style={styles.coverPlaceholder}>
          <Text style={{ fontSize: 20 }}>📚</Text>
        </View>
      )}
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle} numberOfLines={2}>{title}</Text>
        <Text style={styles.bookAuthor} numberOfLines={1}>{author}</Text>
      </View>
      <TouchableOpacity style={styles.removeButton} onPress={onRemove}>
        <Ionicons name="trash-outline" size={18} color="#FF4444" />
      </TouchableOpacity>
    </View>
  );
}

function CategorySection({ categoryKey, label, icon, books, removeAction, favorites }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const animatedHeight = useRef(new Animated.Value(1)).current;
  const animatedRotation = useRef(new Animated.Value(1)).current;

  const toggleExpand = () => {
    const toValue = isExpanded ? 0 : 1;

    Animated.parallel([
      Animated.timing(animatedHeight, {
        toValue,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(animatedRotation, {
        toValue,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();

    setIsExpanded(!isExpanded);
  };

  const maxHeightInterpolate = animatedHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 500],
  });

  const rotateInterpolate = animatedRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View style={styles.categorySection}>
      <TouchableOpacity style={styles.categoryHeader} onPress={toggleExpand}>
        <View style={styles.categoryLeft}>
          <Ionicons name={icon} size={20} color="#F5C842" />
          <Text style={styles.categoryLabel}>{label}</Text>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{books.length}</Text>
          </View>
        </View>
        <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
          <Ionicons name="chevron-down" size={18} color="#888888" />
        </Animated.View>
      </TouchableOpacity>

      <Animated.View style={{ maxHeight: maxHeightInterpolate, overflow: 'hidden' }}>
        {books.length === 0 ? (
          <Text style={styles.emptyCategory}>No books here yet</Text>
        ) : (
          books.map((book, index) => (
            <BookItem
              key={book.key || index}
              book={book}
              onRemove={() => favorites[removeAction](book.key)}
            />
          ))
        )}
      </Animated.View>
    </View>
  );
}

export default function FavoritesScreen() {
  const favorites = useFavorites();
  const totalBooks = favorites.liked.length + favorites.toRead.length + favorites.finished.length;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Your Favorites</Text>
          <Text style={styles.headerSubtitle}>{totalBooks} books in collection</Text>
        </View>

        {totalBooks === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📚</Text>
            <Text style={styles.emptyTitle}>No favorites yet</Text>
            <Text style={styles.emptySubtitle}>
              Go to any book and add it to your collection!
            </Text>
          </View>
        ) : (
          CATEGORIES.map(({ key, label, icon, removeAction }) => (
            <CategorySection
              key={key}
              categoryKey={key}
              label={label}
              icon={icon}
              books={favorites[key]}
              removeAction={removeAction}
              favorites={favorites}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0D0D0D' },
  container: { flex: 1, backgroundColor: '#0D0D0D' },
  header: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 24,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#888888',
    fontSize: 14,
    marginTop: 4,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    paddingHorizontal: 40,
  },
  emptyIcon: { fontSize: 60, marginBottom: 16 },
  emptyTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptySubtitle: {
    color: '#888888',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
  },
  categorySection: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    overflow: 'hidden',
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  categoryLabel: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  countBadge: {
    backgroundColor: '#F5C842',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  countText: {
    color: '#0D0D0D',
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyCategory: {
    color: '#555555',
    fontSize: 13,
    textAlign: 'center',
    paddingBottom: 16,
  },
  bookItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 0.5,
    borderTopColor: '#2A2A2A',
    gap: 12,
  },
  cover: {
    width: 45,
    height: 65,
    borderRadius: 6,
    backgroundColor: '#2A2A2A',
  },
  coverPlaceholder: {
    width: 45,
    height: 65,
    borderRadius: 6,
    backgroundColor: '#2A2A2A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookInfo: { flex: 1 },
  bookTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  bookAuthor: { color: '#888888', fontSize: 12 },
  removeButton: { padding: 8 },
});
import React from 'react';
import { TouchableOpacity, Image, Text, View, StyleSheet } from 'react-native';
import { getCoverUrl } from '../services/api';

export default function BookCard({ book, onPress, size = 'small' }) {
  const coverUrl = getCoverUrl(book.cover_i || book.covers?.[0]);
  const title = book.title || 'Unknown Title';
  const author = book.author_name?.[0] || book.authors?.[0]?.name || 'Unknown Author';

  if (size === 'large') {
    return (
      <TouchableOpacity style={styles.largeCard} onPress={onPress}>
        {coverUrl ? (
          <Image source={{ uri: coverUrl }} style={styles.largeCover} />
        ) : (
          <View style={styles.largePlaceholder}>
            <Text style={styles.placeholderText}>📚</Text>
          </View>
        )}
        <Text style={styles.largeTitle} numberOfLines={2}>{title}</Text>
        <Text style={styles.largeAuthor} numberOfLines={1}>{author}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.smallCard} onPress={onPress}>
      {coverUrl ? (
        <Image source={{ uri: coverUrl }} style={styles.smallCover} />
      ) : (
        <View style={styles.smallPlaceholder}>
          <Text style={styles.placeholderText}>📚</Text>
        </View>
      )}
      <Text style={styles.smallTitle} numberOfLines={2}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  largeCard: {
    width: 160,
    marginRight: 16,
  },
  largeCover: {
    width: 160,
    height: 220,
    borderRadius: 12,
    backgroundColor: '#1A1A1A',
  },
  largePlaceholder: {
    width: 160,
    height: 220,
    borderRadius: 12,
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  largeTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 8,
  },
  largeAuthor: {
    color: '#888888',
    fontSize: 12,
    marginTop: 4,
  },
  smallCard: {
    width: 110,
    marginRight: 12,
  },
  smallCover: {
    width: 110,
    height: 155,
    borderRadius: 8,
    backgroundColor: '#1A1A1A',
  },
  smallPlaceholder: {
    width: 110,
    height: 155,
    borderRadius: 8,
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallTitle: {
    color: '#CCCCCC',
    fontSize: 11,
    marginTop: 6,
  },
  placeholderText: {
    fontSize: 30,
  },
});
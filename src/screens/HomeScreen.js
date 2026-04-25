import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  TouchableOpacity, RefreshControl, SafeAreaView,
} from 'react-native';
import { getTrendingBooks, getCoverUrl } from '../services/api';
import BookCard from '../components/BookCard';
import SectionHeader from '../components/SectionHeader';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorMessage from '../components/ErrorMessage';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchBooks = async () => {
    try {
      setError(null);
      const data = await getTrendingBooks();
      setBooks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchBooks();
  }, []);

  const goToDetail = (book) => {
    navigation.navigate('DetailScreen', { book });
  };

  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorMessage message={error} onRetry={fetchBooks} />;

  const heroBook = books[0];
  const trending = books.slice(1, 8);
  const recommended = books.slice(8, 15);
  const recentlyAdded = books.slice(15, 22);

  const heroCoverUrl = getCoverUrl(heroBook?.cover_i, 'L');

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#F5C842" />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>BookShelf</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity onPress={() => navigation.getParent()?.navigate('Search')}>
              <Ionicons name="search-outline" size={24} color="#FFFFFF" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.getParent()?.navigate('About')}>
              <Ionicons name="person-outline" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Hero Section */}
        {heroBook && (
          <TouchableOpacity style={styles.heroCard} onPress={() => goToDetail(heroBook)}>
            {heroCoverUrl ? (
              <Image source={{ uri: heroCoverUrl }} style={styles.heroCover} />
            ) : (
              <View style={styles.heroPlaceholder}>
                <Text style={{ fontSize: 60 }}>📚</Text>
              </View>
            )}
            <View style={styles.heroOverlay}>
              <Text style={styles.heroLabel}>Editor's Choice</Text>
              <Text style={styles.heroTitle} numberOfLines={2}>{heroBook.title}</Text>
              <Text style={styles.heroAuthor}>
                {heroBook.author_name?.[0] || 'Unknown Author'}
              </Text>
              <TouchableOpacity style={styles.heroButton} onPress={() => goToDetail(heroBook)}>
                <Text style={styles.heroButtonText}>▶ Start Reading</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}

        {/* Trending Section */}
        <SectionHeader title="Trending Now" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalList}>
          {trending.map((book, index) => (
            <BookCard
              key={book.key || index}
              book={book}
              onPress={() => goToDetail(book)}
              size="small"
            />
          ))}
        </ScrollView>

        {/* Recommended Section */}
        <SectionHeader title="Recommended" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalList}>
          {recommended.map((book, index) => (
            <BookCard
              key={book.key || index}
              book={book}
              onPress={() => goToDetail(book)}
              size="large"
            />
          ))}
        </ScrollView>

        {/* Recently Added Section */}
        <SectionHeader title="Recently Added" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={[styles.horizontalList, styles.lastSection]}>
          {recentlyAdded.map((book, index) => (
            <BookCard
              key={book.key || index}
              book={book}
              onPress={() => goToDetail(book)}
              size="small"
            />
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  logo: {
    color: '#F5C842',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  icon: {
    marginRight: 4,
  },
  heroCard: {
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 28,
    height: 320,
    backgroundColor: '#1A1A1A',
  },
  heroCover: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  heroPlaceholder: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1A1A1A',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.65)',
  },
  heroLabel: {
    color: '#F5C842',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  heroAuthor: {
    color: '#CCCCCC',
    fontSize: 13,
    marginBottom: 14,
  },
  heroButton: {
    backgroundColor: '#F5C842',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  heroButtonText: {
    color: '#0D0D0D',
    fontWeight: 'bold',
    fontSize: 13,
  },
  horizontalList: {
    paddingLeft: 16,
    marginBottom: 28,
  },
  lastSection: {
    marginBottom: 40,
  },
});
import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity,
  FlatList, Image, SafeAreaView, ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { searchBooks, getCoverUrl } from '../services/api';

const HOT_SEARCHES = ['Philosophy', 'Psychology', 'Fiction', 'History', 'Science', 'Romance'];

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const validate = () => {
    if (!query.trim()) {
      setError('Search query cannot be empty');
      return false;
    }
    if (query.trim().length < 3) {
      setError('Minimum 3 characters required');
      return false;
    }
    setError('');
    return true;
  };

  const handleSearch = async (searchQuery = query) => {
    if (!validate()) return;
    try {
      setLoading(true);
      setSearched(true);
      setError('');
      const data = await searchBooks(searchQuery);
      setResults(data);
    } catch (err) {
      setError('Failed to search. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChipPress = (chip) => {
    setQuery(chip);
    handleSearch(chip);
  };

  const goToDetail = (book) => {
    navigation.navigate('Home', {
      screen: 'DetailScreen',
      params: { book },
    });
  };

  const renderBook = ({ item }) => {
    const coverUrl = getCoverUrl(item.cover_i, 'M');
    return (
      <TouchableOpacity style={styles.resultItem} onPress={() => goToDetail(item)}>
        {coverUrl ? (
          <Image source={{ uri: coverUrl }} style={styles.resultCover} />
        ) : (
          <View style={styles.resultPlaceholder}>
            <Text style={{ fontSize: 24 }}>📚</Text>
          </View>
        )}
        <View style={styles.resultInfo}>
          <Text style={styles.resultTitle} numberOfLines={2}>{item.title}</Text>
          <Text style={styles.resultAuthor} numberOfLines={1}>
            {item.author_name?.[0] || 'Unknown Author'}
          </Text>
          <Text style={styles.resultYear}>
            {item.first_publish_year ? `First published ${item.first_publish_year}` : ''}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color="#555555" />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Search Books</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchRow}>
          <View style={styles.searchInputWrapper}>
            <Ionicons name="search-outline" size={18} color="#888888" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search books..."
              placeholderTextColor="#555555"
              value={query}
              onChangeText={(text) => {
                setQuery(text);
                if (error) setError('');
              }}
              onSubmitEditing={() => handleSearch()}
              returnKeyType="search"
            />
            {query.length > 0 && (
              <TouchableOpacity onPress={() => { setQuery(''); setResults([]); setSearched(false); }}>
                <Ionicons name="close-circle" size={18} color="#555555" />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity style={styles.searchButton} onPress={() => handleSearch()}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>

        {/* Error */}
        {error ? (
          <Text style={styles.errorText}>⚠️ {error}</Text>
        ) : null}

        {/* Hot Searches */}
        {!searched && (
          <View style={styles.hotSection}>
            <Text style={styles.hotTitle}>Hot Searches</Text>
            <View style={styles.chipsRow}>
              {HOT_SEARCHES.map((chip) => (
                <TouchableOpacity
                  key={chip}
                  style={styles.chip}
                  onPress={() => handleChipPress(chip)}
                >
                  <Text style={styles.chipText}>{chip}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Loading */}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#F5C842" />
          </View>
        )}

        {/* Results */}
        {!loading && searched && (
          <>
            <Text style={styles.resultCount}>
              {results.length} results for "{query}"
            </Text>
            {results.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyIcon}>🔍</Text>
                <Text style={styles.emptyText}>No books found</Text>
                <Text style={styles.emptySubtext}>Try a different keyword</Text>
              </View>
            ) : (
              <FlatList
                data={results}
                keyExtractor={(item, index) => item.key || String(index)}
                renderItem={renderBook}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.resultsList}
              />
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0D0D0D' },
  container: { flex: 1, backgroundColor: '#0D0D0D' },
  header: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
  },
  searchRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 10,
    marginBottom: 8,
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 10,
    paddingHorizontal: 12,
    gap: 8,
  },
  searchIcon: { marginRight: 4 },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
    paddingVertical: 12,
    outlineStyle: 'none',
  },
  searchButton: {
    backgroundColor: '#F5C842',
    paddingHorizontal: 18,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButtonText: {
    color: '#0D0D0D',
    fontWeight: 'bold',
    fontSize: 14,
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 13,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  hotSection: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  hotTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  chipText: {
    color: '#F5C842',
    fontSize: 13,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultCount: {
    color: '#888888',
    fontSize: 13,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  resultsList: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    gap: 12,
  },
  resultCover: {
    width: 55,
    height: 80,
    borderRadius: 6,
    backgroundColor: '#2A2A2A',
  },
  resultPlaceholder: {
    width: 55,
    height: 80,
    borderRadius: 6,
    backgroundColor: '#2A2A2A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultInfo: { flex: 1 },
  resultTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  resultAuthor: {
    color: '#888888',
    fontSize: 12,
    marginBottom: 4,
  },
  resultYear: {
    color: '#555555',
    fontSize: 11,
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyIcon: { fontSize: 48, marginBottom: 16 },
  emptyText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptySubtext: { color: '#888888', fontSize: 14 },
});
import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  TouchableOpacity, Image, SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getBookDetail, getCoverUrl } from '../services/api';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorMessage from '../components/ErrorMessage';
import { useFavorites } from '../context/FavoritesContext';

export default function DetailScreen({ navigation, route }) {
  const { book } = route.params;
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToLiked, addToRead, addToFinished, isLiked, isToRead, isFinished } = useFavorites();

  const coverUrl = getCoverUrl(book.cover_i || book.covers?.[0], 'L');
  const title = book.title || 'Unknown Title';
  const author = book.author_name?.[0] || book.authors?.[0]?.name || 'Unknown Author';

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setError(null);
        const data = await getBookDetail(book.key);
        setDetail(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [book.key]);

  const getDescription = () => {
    if (!detail?.description) return 'No description available.';
    if (typeof detail.description === 'string') return detail.description;
    if (typeof detail.description === 'object') return detail.description.value || 'No description available.';
    return 'No description available.';
  };

  return (
    <SafeAreaView style={styles.safe}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      <ScrollView style={styles.container}>
        <View style={styles.coverContainer}>
          {coverUrl ? (
            <Image source={{ uri: coverUrl }} style={styles.cover} />
          ) : (
            <View style={styles.coverPlaceholder}>
              <Text style={{ fontSize: 60 }}>📚</Text>
            </View>
          )}
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.author}>by {author}</Text>

          <View style={styles.ratingRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Ionicons
                key={star}
                name={star <= 4 ? 'star' : 'star-outline'}
                size={18}
                color="#F5C842"
              />
            ))}
            <Text style={styles.ratingText}>4.0</Text>
          </View>

          <Text style={styles.sectionTitle}>About this Book</Text>
          {loading ? (
            <LoadingIndicator />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : (
            <Text style={styles.description}>{getDescription()}</Text>
          )}

          <Text style={styles.sectionTitle}>Reader Perspectives</Text>
          <View style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <Ionicons name="person-circle" size={36} color="#F5C842" />
              <View style={styles.reviewMeta}>
                <Text style={styles.reviewName}>Alex Reader</Text>
                <View style={styles.reviewStars}>
                  {[1,2,3,4,5].map(s => (
                    <Ionicons key={s} name="star" size={12} color="#F5C842" />
                  ))}
                </View>
              </View>
            </View>
            <Text style={styles.reviewText}>
              "A truly remarkable book that changed my perspective on life. Highly recommended!"
            </Text>
          </View>
          <View style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <Ionicons name="person-circle" size={36} color="#888888" />
              <View style={styles.reviewMeta}>
                <Text style={styles.reviewName}>Jane Bookworm</Text>
                <View style={styles.reviewStars}>
                  {[1,2,3,4].map(s => (
                    <Ionicons key={s} name="star" size={12} color="#F5C842" />
                  ))}
                  <Ionicons name="star-outline" size={12} color="#F5C842" />
                </View>
              </View>
            </View>
            <Text style={styles.reviewText}>
              "Beautifully written, deeply moving. One of the best reads this year."
            </Text>
          </View>

          <Text style={styles.sectionTitle}>Book Details</Text>
          <View style={styles.detailCard}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>First Published</Text>
              <Text style={styles.detailValue}>{book.first_publish_year || 'N/A'}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Edition Count</Text>
              <Text style={styles.detailValue}>{book.edition_count || 'N/A'}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Language</Text>
              <Text style={styles.detailValue}>{book.language?.[0]?.toUpperCase() || 'EN'}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Subject</Text>
              <Text style={styles.detailValue} numberOfLines={1}>
                {book.subject?.[0] || detail?.subjects?.[0] || 'General'}
              </Text>
            </View>
          </View>

        <Text style={styles.sectionTitle}>Tambah ke Koleksi</Text>
        <View style={styles.favButtonsRow}>
        <TouchableOpacity
            style={[styles.favButton, isLiked(book.key) && styles.favButtonActive]}
            onPress={() => isLiked(book.key) ? null : addToLiked(book)}
        >
            <Ionicons name={isLiked(book.key) ? 'heart' : 'heart-outline'} size={18} color="#0D0D0D" />
            <Text style={styles.favButtonText}>{isLiked(book.key) ? 'Liked ✓' : 'Liked'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={[styles.favButton, isToRead(book.key) && styles.favButtonActive]}
            onPress={() => isToRead(book.key) ? null : addToRead(book)}
        >
            <Ionicons name={isToRead(book.key) ? 'bookmark' : 'bookmark-outline'} size={18} color="#0D0D0D" />
            <Text style={styles.favButtonText}>{isToRead(book.key) ? 'To Read ✓' : 'To Read'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={[styles.favButton, isFinished(book.key) && styles.favButtonActive]}
            onPress={() => isFinished(book.key) ? null : addToFinished(book)}
        >
            <Ionicons name={isFinished(book.key) ? 'checkmark-circle' : 'checkmark-circle-outline'} size={18} color="#0D0D0D" />
            <Text style={styles.favButtonText}>{isFinished(book.key) ? 'Finished ✓' : 'Finished'}</Text>
        </TouchableOpacity>
        </View>
        </View>
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
  backButton: {
    position: 'absolute',
    top: 50,
    left: 16,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 6,
  },
  coverContainer: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 24,
    backgroundColor: '#1A1A1A',
  },
  cover: {
    width: 180,
    height: 260,
    borderRadius: 12,
  },
  coverPlaceholder: {
    width: 180,
    height: 260,
    borderRadius: 12,
    backgroundColor: '#2A2A2A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
    padding: 20,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  author: {
    color: '#888888',
    fontSize: 15,
    marginBottom: 12,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 4,
  },
  ratingText: {
    color: '#F5C842',
    fontSize: 14,
    marginLeft: 6,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 8,
  },
  description: {
    color: '#AAAAAA',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 24,
  },
  reviewCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  reviewMeta: {
    flex: 1,
  },
  reviewName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  reviewStars: {
    flexDirection: 'row',
    gap: 2,
  },
  reviewText: {
    color: '#AAAAAA',
    fontSize: 13,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  detailCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#2A2A2A',
  },
  detailLabel: {
    color: '#888888',
    fontSize: 13,
  },
  detailValue: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
    maxWidth: '60%',
    textAlign: 'right',
  },
  favButton: {
    backgroundColor: '#F5C842',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
    marginBottom: 40,
  },
  favButtonText: {
    color: '#0D0D0D',
    fontWeight: 'bold',
    fontSize: 15,
  },
  favButtonsRow: {
  flexDirection: 'row',
  gap: 8,
  marginBottom: 40,
},
favButton: {
  flex: 1,
  backgroundColor: '#F5C842',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 12,
  borderRadius: 12,
  gap: 4,
},
favButtonActive: {
  backgroundColor: '#C9A227',
},
favButtonText: {
  color: '#0D0D0D',
  fontWeight: 'bold',
  fontSize: 11,
},
});
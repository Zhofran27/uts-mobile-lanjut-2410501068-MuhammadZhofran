import React from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView, Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const LINKS = [
  {
    icon: 'logo-github',
    label: 'GitHub',
    value: 'github.com/Zhofran27',
    color: '#FFFFFF',
  },
  {
    icon: 'book-outline',
    label: 'OpenLibrary API',
    value: 'openlibrary.org/developers/api',
    color: '#F5C842',
  },
  {
    icon: 'document-text-outline',
    label: 'Documentation',
    value: 'openlibrary.org/developers',
    color: '#4A9EFF',
  },
];

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>About</Text>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>👤</Text>
            </View>
            <View style={styles.onlineDot} />
          </View>
          <Text style={styles.profileName}>Muhammad Zhofran</Text>
          <Text style={styles.profileNim}>NIM: 2410501068</Text>
          <View style={styles.profileBadge}>
            <Text style={styles.profileBadgeText}>Kelas A</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.appInfo}>
            <Text style={styles.appInfoLabel}>App Theme</Text>
            <Text style={styles.appInfoValue}>BookShelf</Text>
          </View>
        </View>

        {/* Links Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Resources</Text>
          {LINKS.map((link, index) => (
            <TouchableOpacity key={index} style={styles.linkItem}>
              <View style={[styles.linkIconBox, { backgroundColor: '#2A2A2A' }]}>
                <Ionicons name={link.icon} size={18} color={link.color} />
              </View>
              <View style={styles.linkInfo}>
                <Text style={styles.linkLabel}>📌 {link.label}</Text>
                <Text style={styles.linkValue}>{link.value}</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#555555" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Vision Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>The Vision</Text>
          <Text style={styles.visionText}>
            BookShelf is a modern book catalog application designed to make discovering
            great literature effortless and enjoyable. By leveraging the vast OpenLibrary
            database, users can explore millions of books, save their favorites, and
            discover new reads tailored to their interests.
          </Text>
          <Text style={styles.visionText}>
            Built with React Native and Expo, BookShelf demonstrates the power of
            cross-platform mobile development combined with real-world API integration,
            delivering a seamless reading discovery experience.
          </Text>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          © Muhammad Zhofran • 2410501068
        </Text>
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
    paddingBottom: 16,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
  },
  profileCard: {
    marginHorizontal: 16,
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#2A2A2A',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#F5C842',
  },
  avatarText: { fontSize: 40 },
  onlineDot: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#1A1A1A',
  },
  profileName: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileNim: {
    color: '#888888',
    fontSize: 14,
    marginBottom: 12,
  },
  profileBadge: {
    backgroundColor: '#F5C842',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 16,
  },
  profileBadgeText: {
    color: '#0D0D0D',
    fontWeight: 'bold',
    fontSize: 13,
  },
  divider: {
    width: '100%',
    height: 0.5,
    backgroundColor: '#2A2A2A',
    marginBottom: 16,
  },
  appInfo: {
    alignItems: 'center',
  },
  appInfoLabel: {
    color: '#888888',
    fontSize: 12,
    marginBottom: 4,
  },
  appInfoValue: {
    color: '#F5C842',
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    marginHorizontal: 16,
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#2A2A2A',
    gap: 12,
  },
  linkIconBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkInfo: { flex: 1 },
  linkLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  linkValue: {
    color: '#888888',
    fontSize: 12,
  },
  visionText: {
    color: '#AAAAAA',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 12,
  },
  footer: {
    color: '#555555',
    fontSize: 12,
    textAlign: 'center',
    paddingVertical: 24,
  },
});
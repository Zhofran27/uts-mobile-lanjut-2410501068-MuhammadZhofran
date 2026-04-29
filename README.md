# BookShelf 

## Informasi Mahasiswa
- **Nama** : Muhammad Zhofran  
- **NIM**  : 2410501068  
- **Kelas** : A  

---

## Tema 
Tema yang dipilih: C - BookShelf - Katalog Buku

Aplikasi mobile katalog buku yang memungkinkan pengguna menjelajahi buku-buku trending, mencari buku berdasarkan kata kunci, menyimpan buku favorit, dan melihat detail lengkap setiap buku.

---

## Tech Stack

- react-native: 0.76.x
- expo: ~52.0.x
- @react-navigation/native: ^6.x
- @react-navigation/bottom-tabs: ^6.x
- @react-navigation/stack: ^6.x
- react-native-screens: ~4.4.x
- react-native-safe-area-context: 4.12.x
- react-native-gesture-handler: ~2.20.x
- react-native-reanimated: ~3.16.x
- @expo/vector-icons: ^14.x

---

## Cara Menjalankan

Aplikasi ini menggunakan **Expo**.

### 1. Clone Repository
```bash
git clone (https://github.com/Zhofran27/uts-mobile-lanjut-2410501068-MuhammadZhofran)
```

### 2. Masuk Ke Folder Project
```bash
cd BookShelf
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Jalankan Aplikasi
```bash
npx expo start
```

---
## Screenshot Preview

<p>

</p>

## Video Demo
Link demo aplikasi:
https://your-video-link.com

---

## State Management
Aplikasi ini menggunakan Context API dikombinasikan dengan useReducer sebagai solusi state management.

Justifikasi pemilihan:

Context API dipilih karena sesuai dengan skala aplikasi yang tidak terlalu kompleks. Dibandingkan Redux yang membutuhkan boilerplate lebih banyak, atau Zustand yang memerlukan instalasi library tambahan, Context API sudah tersedia secara built in di React sehingga tidak menambah ukuran bundle aplikasi.

useReducer digunakan bersama Context API untuk mengelola state favorit yang memilik beberapa aksi seperti tambah liked, tambah to read, tambah finished, dan hapus dari masing-masing kategori. Pola ini mirip dengan Redux namun lebih ringan dan cocok untuk kebutuhan aplikasi ini.

---

## Daftar Referensi
- OpenLibrary API Documentation: https://openlibrary.org/developers/api
- OpenLibrary API Developers: https://openlibrary.org/developers
- React Navigation Documentation: https://reactnavigation.org/docs/getting-started
- Expo Documentation: https://docs.expo.dev
- React Native Documentation: https://reactnative.dev/docs/getting-started
- Context API React Docs: https://react.dev/reference/react/createContext
- useReducer React Docs: https://react.dev/reference/react/useReducer
- Stack Overflow  React Navigation Tab to Stack: https://stackoverflow.com/questions/70493872
- Stack Overflow  FlatList keyExtractor: https://stackoverflow.com/questions/44545148

---

## Refleksi Pengerjaan

Selama pengerjaan aplikasi BookShelf, terdapat beberapa tantangan yang cukup memakan waktu dan memberikan pelajaran tersendiri.

Tantangan pertama muncul saat setup navigasi. Kombinasi Stack Navigator dan Bottom Tab Navigator memerlukan pemahaman tentang urutan pemasangan provider yang benar. Kesalahan kecil di bagian ini langsung menyebabkan aplikasi error dan cukup sulit dilacak penyebabnya.

Tantangan berikutnya datang dari struktur data OpenLibrary API yang tidak selalu konsisten. Field description pada beberapa buku mengembalikan string biasa, namun pada buku lain mengembalikan object dengan property value. Hal ini sempat menyebabkan aplikasi crash sebelum akhirnya ditangani dengan pengecekan tipe data secara eksplisit.

Bug yang cukup menyita waktu adalah tampilan browser yang kosong tanpa pesan error yang jelas. Setelah ditelusuri, penyebabnya adalah file screen yang belum memiliki export default, sehingga proses bundling gagal tanpa keterangan yang spesifik.

Untuk bagian animasi dropdown pada FavoritesScreen, LayoutAnimation yang umum digunakan di React Native tidak berjalan di platform web, sehingga perlu diganti menggunakan Animated API dengan interpolasi maxHeight.

Dari keseluruhan proses pengerjaan ini, pemahaman tentang nested navigation, konsistensi struktur data API, dan perbedaan perilaku komponen antara platform mobile dan web menjadi hal yang paling banyak memberikan pelajaran.

import React, { createContext, useContext, useReducer } from 'react';

const FavoritesContext = createContext();

const initialState = {
  liked: [],
  toRead: [],
  finished: [],
};

function favoritesReducer(state, action) {
  switch (action.type) {
    case 'ADD_LIKED':
      if (state.liked.find(b => b.key === action.payload.key)) return state;
      return { ...state, liked: [...state.liked, action.payload] };

    case 'ADD_TO_READ':
      if (state.toRead.find(b => b.key === action.payload.key)) return state;
      return { ...state, toRead: [...state.toRead, action.payload] };

    case 'ADD_FINISHED':
      if (state.finished.find(b => b.key === action.payload.key)) return state;
      return { ...state, finished: [...state.finished, action.payload] };

    case 'REMOVE_LIKED':
      return { ...state, liked: state.liked.filter(b => b.key !== action.payload) };

    case 'REMOVE_TO_READ':
      return { ...state, toRead: state.toRead.filter(b => b.key !== action.payload) };

    case 'REMOVE_FINISHED':
      return { ...state, finished: state.finished.filter(b => b.key !== action.payload) };

    default:
      return state;
  }
}

export function FavoritesProvider({ children }) {
  const [state, dispatch] = useReducer(favoritesReducer, initialState);

  const addToLiked = (book) => dispatch({ type: 'ADD_LIKED', payload: book });
  const addToRead = (book) => dispatch({ type: 'ADD_TO_READ', payload: book });
  const addToFinished = (book) => dispatch({ type: 'ADD_FINISHED', payload: book });
  const removeFromLiked = (key) => dispatch({ type: 'REMOVE_LIKED', payload: key });
  const removeFromToRead = (key) => dispatch({ type: 'REMOVE_TO_READ', payload: key });
  const removeFromFinished = (key) => dispatch({ type: 'REMOVE_FINISHED', payload: key });

  const isLiked = (key) => state.liked.some(b => b.key === key);
  const isToRead = (key) => state.toRead.some(b => b.key === key);
  const isFinished = (key) => state.finished.some(b => b.key === key);

  return (
    <FavoritesContext.Provider value={{
      liked: state.liked,
      toRead: state.toRead,
      finished: state.finished,
      addToLiked,
      addToRead,
      addToFinished,
      removeFromLiked,
      removeFromToRead,
      removeFromFinished,
      isLiked,
      isToRead,
      isFinished,
    }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used within FavoritesProvider');
  return context;
}
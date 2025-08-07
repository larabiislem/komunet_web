'use client';
import { Provider } from 'react-redux';
import postStore from '../../store';
import FavoritesList from '@/composents/favorites';

export default function LoginPage() {
  return (
     <Provider store={postStore}>
  <FavoritesList/>

     </Provider>
  
  );
}
import { configureStore } from '@reduxjs/toolkit'
import postReducer from './app/home/postslicer'
import favreducer from './app/favorites/favortisslisers'

export default configureStore({
  reducer: {
    post: postReducer,
    favorites: favreducer

  }
})
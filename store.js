import { configureStore } from '@reduxjs/toolkit'
import postReducer from './app/home/postslicer'
import favreducer from './app/favorites/favortisslisers'
import eventReducer from './app/events/eventslicer'

export default configureStore({
  reducer: {
    post: postReducer,
    favorites: favreducer,
    events: eventReducer

  }
})
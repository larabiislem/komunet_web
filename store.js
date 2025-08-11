import { configureStore } from '@reduxjs/toolkit'
import postReducer from './app/home/postslicer'
import favreducer from './app/favorites/favortisslisers'
import eventReducer from './app/events/eventslicer'
import posteventReducer from './app/events/post_events/post_event_slicer'

export default configureStore({
  reducer: {
    post: postReducer,
    favorites: favreducer,
    events: eventReducer,
    post_events: posteventReducer

  }
})
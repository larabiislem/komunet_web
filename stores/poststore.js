import { configureStore } from '@reduxjs/toolkit'
import postReducer from '../app/home/postslicer'

export default configureStore({
  reducer: {
    post: postReducer  
  }
})
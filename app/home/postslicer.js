import { createSlice } from '@reduxjs/toolkit'
import postdata from '../../data/postdata.json'

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    value: {
      announcement: [],
      regular: []
    }
  },
  reducers: {
    getPosts: state => {
      const announcement = []
      const regular = []
      postdata.forEach(post => {
        if (post.postType === "annonce") {
          announcement.push(post)
        } else if (post.postType === "régulier") {
          regular.push(post)
        }
      })
      state.value.announcement = announcement
      state.value.regular = regular
    }
  }
})

export const { getPosts } = postSlice.actions

export default postSlice.reducer
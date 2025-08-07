import { createSlice } from '@reduxjs/toolkit'
import  postdata from '../../data/postdata.json'


export const postSlice = createSlice({
  name: 'post',
  initialState: {
    value: []
  },
  reducers: {
    getPosts: state => {
     state.value = postdata.posts
      
    }
  }
})


export const { getPosts } = counterSlice.actions

export default counterSlice.reducer
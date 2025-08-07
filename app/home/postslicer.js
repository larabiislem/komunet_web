import { createSlice } from '@reduxjs/toolkit'
import  postdata from '../../data/postdata.json'


export const postSlice = createSlice({
  name: 'post',
  initialState: {
    value: []
  },
  reducers: {
    getPosts: state => {
     state.value = postdata
      
    }
  }
})


export const { getPosts } = postSlice.actions

export default postSlice.reducer
import { createSlice } from '@reduxjs/toolkit'
import postdata from '../../data/postdata.json'
import { get } from 'http'

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    value:  []
  },
  reducers: {
    getFavorites: state => {
     
      state.value = postdata
    }
  }
})
export const { getFavorites } = favoritesSlice.actions

export default favoritesSlice.reducer
import { createSlice } from '@reduxjs/toolkit'
import eventdata from '../../data/eventdata.json'
import { get } from 'http'

export const eventSlice = createSlice({
  name: 'events',
  initialState: {
    value:  []
  },
  reducers: {
    getevents: state => {
     
      state.value = eventdata
    }
  }
})
export const { getevents} = eventSlice.actions

export default eventSlice.reducer
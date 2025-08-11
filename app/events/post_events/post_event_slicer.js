import { createSlice } from '@reduxjs/toolkit'
import eventdata from '../../../data/postevent.json'
import { get } from 'http'

export const posteventSlice = createSlice({
  name: 'post_events',
  initialState: {
    value:  []
  },
  reducers: {
    getpostevents: state => {
     
      state.value = eventdata
    }
  }
})
export const { getpostevents} = posteventSlice.actions

export default posteventSlice.reducer
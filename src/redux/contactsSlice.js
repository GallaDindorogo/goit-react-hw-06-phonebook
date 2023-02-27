import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const contactsSlise = createSlice({
  name: 'contacts',
  initialState: [],
  reducers: {
    addContact: {
      reducer: (state, { payload }) => {
        state.push(payload);
      },
      prepare: data => {
        return {
          payload: {
            id: nanoid(),
            ...data,
          },
        };
      },
    },
    deleteContact: {
      reducer: (state, { payload }) => state.filter(({ id }) => id !== payload),
    },
  },
});

export const { addContact, deleteContact } = contactsSlise.actions;
export default contactsSlise.reducer;

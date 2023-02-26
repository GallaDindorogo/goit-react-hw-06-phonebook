import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const contactsSlise = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
  },
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
    deleteContacts: {
      reducer: (state, { payload }) => state.filter(({ id }) => id !== payload),
    },
  },
});

export const { addContact, deleteContacts } = contactsSlise.actions;
export default contactsSlise.reducer;

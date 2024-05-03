import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const CONVERSATION_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/conversation`;

const initialState = {
  status: "",
  error: "",
  conversations: [],
  activeConversations: {},
  notifications: [],
};

export const getConversations = createAsyncThunk(
  "conversation/all",
  async (token, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(CONVERSATION_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveConversation: (state, action) => {
      state.activeConversations = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getConversations.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getConversations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.conversations = action.payload;
      })
      .addCase(getConversations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
    //   .addCase(open_create_conversation.pending, (state, action) => {
    //     state.status = "loading";
    //   })
    //   .addCase(open_create_conversation.fulfilled, (state, action) => {
    //     state.status = "succeeded";
    //     state.activeConversation = action.payload;
    //     state.files = [];
    //   })
    //   .addCase(open_create_conversation.rejected, (state, action) => {
    //     state.status = "failed";
    //     state.error = action.payload;
    //   })
    //   .addCase(getConversationMessages.pending, (state, action) => {
    //     state.status = "loading";
    //   })
    //   .addCase(getConversationMessages.fulfilled, (state, action) => {
    //     state.status = "succeeded";
    //     state.messages = action.payload;
    //   })
    //   .addCase(getConversationMessages.rejected, (state, action) => {
    //     state.status = "failed";
    //     state.error = action.payload;
    //   })
    //   .addCase(sendMessage.pending, (state, action) => {
    //     state.status = "loading";
    //   })
    //   .addCase(sendMessage.fulfilled, (state, action) => {
    //     state.status = "succeeded";
    //     state.messages = [...state.messages, action.payload];
    //     let conversation = {
    //       ...action.payload.conversation,
    //       latestMessage: action.payload,
    //     };
    //     let newConvos = [...state.conversations].filter(
    //       (c) => c._id !== conversation._id
    //     );
    //     newConvos.unshift(conversation);
    //     state.conversations = newConvos;
    //     state.files = [];
    //   })
    //   .addCase(sendMessage.rejected, (state, action) => {
    //     state.status = "failed";
    //     state.error = action.payload;
    //   });
  },
});

export const {} = chatSlice.actions;

export default chatSlice.reducer;

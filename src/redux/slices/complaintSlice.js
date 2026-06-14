import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentStep: 1,
  totalSteps: 7,
  complaintData: {
    category: null,
    answers: {},
    email: '',
    name: '',
    organization: '',
    confidential: false,
    files: [],
    submittedAt: null,
  },
  submissionStatus: null,
  error: null,
};

const complaintSlice = createSlice({
  name: 'complaint',
  initialState,
  reducers: {
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    updateCategory: (state, action) => {
      state.complaintData.category = action.payload;
    },
    updateComplaintData: (state, action) => {
      state.complaintData = { ...state.complaintData, ...action.payload };
    },
    updateAnswers: (state, action) => {
      state.complaintData.answers = {
        ...state.complaintData.answers,
        ...action.payload,
      };
    },
    addFile: (state, action) => {
      if (state.complaintData.files.length < 5) {
        state.complaintData.files.push(action.payload);
      }
    },
    removeFile: (state, action) => {
      state.complaintData.files = state.complaintData.files.filter(
        (_, index) => index !== action.payload
      );
    },
    setSubmissionStatus: (state, action) => {
      state.submissionStatus = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetComplaint: (state) => {
      state.currentStep = 1;
      state.complaintData = initialState.complaintData;
      state.submissionStatus = null;
      state.error = null;
    },
  },
});

export const {
  setCurrentStep,
  updateCategory,
  updateComplaintData,
  updateAnswers,
  addFile,
  removeFile,
  setSubmissionStatus,
  setError,
  resetComplaint,
} = complaintSlice.actions;

export default complaintSlice.reducer;

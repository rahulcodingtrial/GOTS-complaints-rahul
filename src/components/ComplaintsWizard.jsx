import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCurrentStep,
  updateCategory,
  updateComplaintData,
  updateAnswers,
  addFile,
  removeFile,
  setSubmissionStatus,
  setError,
  resetComplaint,
} from '../redux/slices/complaintSlice.js';
import StepIndicator from './StepIndicator';
import Step1Welcome from './steps/Step1Welcome';
import Step2Category from './steps/Step2Category';
import Step3Questions from './steps/Step3Questions';
import Step4FileUpload from './steps/Step4FileUpload';
import Step5ContactInfo from './steps/Step5ContactInfo';
import Step6Confidentiality from './steps/Step6Confidentiality';
import Step7Review from './steps/Step7Review';
import SuccessMessage from './SuccessMessage';

export default function ComplaintsWizard() {
  const dispatch = useDispatch();
  const { currentStep, totalSteps, complaintData, submissionStatus, error } =
    useSelector((state) => state.complaint);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      dispatch(setCurrentStep(currentStep + 1));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      dispatch(setCurrentStep(currentStep - 1));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    dispatch(setError(null));

    try {
      const formData = new FormData();
      formData.append('category', complaintData.category);
      formData.append('email', complaintData.email);
      formData.append('name', complaintData.name);
      formData.append('organization', complaintData.organization);
      formData.append('confidential', complaintData.confidential);
      formData.append('answers', JSON.stringify(complaintData.answers));

      complaintData.files.forEach((file) => {
        formData.append('files', file);
      });

      const response = await fetch('/api/complaints', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Submission failed: ${response.statusText}`);
      }

      dispatch(setSubmissionStatus('success'));
      dispatch(updateComplaintData({ submittedAt: new Date().toISOString() }));
    } catch (err) {
      dispatch(setError(err.message || 'Failed to submit complaint'));
      dispatch(setSubmissionStatus('error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submissionStatus === 'success') {
    return (
      <SuccessMessage
        onReset={() => dispatch(resetComplaint())}
      />
    );
  }

  return (
    <div className="max-w-container mx-auto px-4 md:px-6">
      <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
        <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

        <div className="mt-8">
          {currentStep === 1 && <Step1Welcome onNext={handleNextStep} />}
          {currentStep === 2 && (
            <Step2Category
              onNext={handleNextStep}
              onPrev={handlePrevStep}
              category={complaintData.category}
              onCategoryChange={(cat) => dispatch(updateCategory(cat))}
            />
          )}
          {currentStep === 3 && (
            <Step3Questions
              onNext={handleNextStep}
              onPrev={handlePrevStep}
              category={complaintData.category}
              answers={complaintData.answers}
              onAnswersChange={(ans) => dispatch(updateAnswers(ans))}
            />
          )}
          {currentStep === 4 && (
            <Step4FileUpload
              onNext={handleNextStep}
              onPrev={handlePrevStep}
              files={complaintData.files}
              onAddFile={(file) => dispatch(addFile(file))}
              onRemoveFile={(index) => dispatch(removeFile(index))}
            />
          )}
          {currentStep === 5 && (
            <Step5ContactInfo
              onNext={handleNextStep}
              onPrev={handlePrevStep}
              email={complaintData.email}
              name={complaintData.name}
              organization={complaintData.organization}
              onDataChange={(data) => dispatch(updateComplaintData(data))}
            />
          )}
          {currentStep === 6 && (
            <Step6Confidentiality
              onNext={handleNextStep}
              onPrev={handlePrevStep}
              confidential={complaintData.confidential}
              onConfidentialChange={(val) =>
                dispatch(updateComplaintData({ confidential: val }))
              }
            />
          )}
          {currentStep === 7 && (
            <Step7Review
              onPrev={handlePrevStep}
              complaint={complaintData}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              error={error}
            />
          )}
        </div>
      </div>
    </div>
  );
}

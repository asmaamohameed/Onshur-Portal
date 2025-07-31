import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PageMeta from '../components/common/PageMeta';
import ProgressStepper from '../components/common/ProgressStepper';
import Input from '../components/form/input/InputField';
import Select from '../components/form/Select';
import Label from '../components/form/Label';
import Button from '../components/ui/button/Button';
import Checkbox from '../components/form/input/Checkbox';
import TextArea from '../components/form/input/TextArea';
import FileUpload from '../components/form/FileUpload';
import { ProgramApplicationService, type ProgramApplication } from '../services/programApplicationService';
import { Icon } from '../components/common/Icon';
import Toast from '../components/common/Toast';
import { getProgramByType } from '../data/programs';
import { useApplicationForm } from '../hooks/useApplicationForm';

const steps = [
  { id: 1, title: 'Company Info' },
  { id: 2, title: 'Team' },
  { id: 3, title: 'Project Details' },
  { id: 4, title: 'Financials' },
  { id: 5, title: 'Upload Documents' },
];

const countries = [
  { value: 'uae', label: 'United Arab Emirates' },
  { value: 'saudi', label: 'Saudi Arabia' },
  { value: 'kuwait', label: 'Kuwait' },
  { value: 'qatar', label: 'Qatar' },
  { value: 'bahrain', label: 'Bahrain' },
  { value: 'oman', label: 'Oman' },
  { value: 'jordan', label: 'Jordan' },
  { value: 'egypt', label: 'Egypt' },
  { value: 'lebanon', label: 'Lebanon' },
  { value: 'other', label: 'Other' },
];

const industries = [
  { value: 'saas', label: 'SaaS (Software as a Service)' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'fintech', label: 'Fintech' },
  { value: 'healthtech', label: 'Healthtech' },
  { value: 'edtech', label: 'Edtech' },
  { value: 'media', label: 'Media & Entertainment' },
  { value: 'logistics', label: 'Logistics & Transportation' },
  { value: 'realestate', label: 'Real Estate' },
  { value: 'tourism', label: 'Tourism & Hospitality' },
  { value: 'other', label: 'Other' },
];

export default function ProgramApplication() {
  const { programType } = useParams<{ programType: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
    isVisible: boolean;
  }>({
    message: '',
    type: 'info',
    isVisible: false,
  });

  // Use the custom hook for form management
  const {
    formData,
    errors,
    updateField,
    updateFields,
    validateStep,
    getStepData,
    setStepErrors,
    clearErrors,
  } = useApplicationForm();

  // Initialize application
  useEffect(() => {
    const initializeApplication = async () => {
      if (!user?.uid || !programType) return;
      
      try {
        setLoading(true);
        const id = await ProgramApplicationService.createApplication(user.uid, programType as any);
        setApplicationId(id);
        
        // Load existing data if available
        const existingApp = await ProgramApplicationService.getApplication(id);
        if (existingApp) {
          setCurrentStep(existingApp.currentStep);
          updateFields({
            companyName: existingApp.companyName || '',
            industry: existingApp.industry || '',
            country: existingApp.country || '',
            website: existingApp.website || '',
            teamSize: existingApp.teamSize || 0,
            keyRoles: existingApp.keyRoles || '',
            foundersBackground: existingApp.foundersBackground || '',
            businessModel: existingApp.businessModel || '',
            targetMarket: existingApp.targetMarket || '',
            competitiveAdvantage: existingApp.competitiveAdvantage || '',
            currentRevenue: existingApp.currentRevenue || '',
            fundingStage: existingApp.fundingStage || '',
            investors: existingApp.investors || '',
            receiveMarketingEmails: existingApp.receiveMarketingEmails || false,
            pitchDeck: existingApp.pitchDeck || [],
            businessLicense: existingApp.businessLicense || [],
            financialSummary: existingApp.financialSummary || [],
          });
        }
      } catch (error) {
        console.error('Error initializing application:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeApplication();
  }, [user?.uid, programType, updateFields]);

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type, isVisible: true });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  const handleSaveAsDraft = async () => {
    if (!applicationId) return;
    
    // Validate current step
    const validation = validateStep(currentStep);
    if (!validation.isValid) {
      setStepErrors(validation.errors);
      showToast('Please fill in all required fields before saving draft.', 'error');
      return;
    }
    
    try {
      setSaving(true);
      const stepData = getStepData(currentStep);
      await ProgramApplicationService.saveAsDraft(applicationId, stepData);
      showToast('Draft saved successfully!', 'success');
    } catch (error) {
      console.error('Error saving draft:', error);
      showToast(error instanceof Error ? error.message : 'Failed to save draft. Please try again.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleNext = async () => {
    if (!applicationId) return;
    
    // Validate current step
    const validation = validateStep(currentStep);
    if (!validation.isValid) {
      setStepErrors(validation.errors);
      showToast('Please fill in all required fields before proceeding.', 'error');
      return;
    }
    
    try {
      setLoading(true);
      const stepData = getStepData(currentStep);
      await ProgramApplicationService.moveToNextStep(applicationId, currentStep, stepData);
      setCurrentStep(prev => prev + 1);
      clearErrors();
    } catch (error) {
      console.error('Error moving to next step:', error);
      showToast(error instanceof Error ? error.message : 'Failed to proceed to next step. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      clearErrors();
    }
  };

  const getProgramTitle = () => {
    const program = getProgramByType(programType || '');
    return program ? program.title.toUpperCase() : 'PROGRAM';
  };

  if (loading && !applicationId) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Initializing application...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageMeta
        title={`Apply for ${getProgramTitle()} | Onshur Portal`}
        description={`Apply for the ${getProgramTitle()} - Support program for UAE publishers and content creators`}
      />
      
      <div className="py-6 px-4 md:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <button
                  onClick={() => navigate('/SupportProgram')}
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-brand-500"
                >
                  <Icon set="fa" name="FaHome" className="mr-2" size={16} />
                  Support Programs
                </button>
              </li>
              <li>
                <div className="flex items-center">
                  <Icon set="fa" name="FaChevronRight" className="text-gray-400" size={14} />
                  <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                    Company Info
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        {/* Progress Stepper */}
        <div className="mb-8">
          <ProgressStepper steps={steps} currentStep={currentStep} />
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                APPLY FOR {getProgramTitle()}
              </h1>
              <p className="text-gray-600">
                Step {currentStep} of {steps.length}: {steps[currentStep - 1]?.title}
              </p>
            </div>

            {/* Step 1: Company Info */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Company Name */}
                  <div>
                    <Label htmlFor="companyName" className={errors.companyName ? 'text-red-600' : ''}>
                      Company Name *
                    </Label>
                    <Input
                      id="companyName"
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => updateField('companyName', e.target.value)}
                      placeholder="Enter your company name"
                      className={`w-full ${errors.companyName ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                    />
                    {errors.companyName && (
                      <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>
                    )}
                  </div>

                  {/* Industry */}
                  <div>
                    <Label htmlFor="industry" className={errors.industry ? 'text-red-600' : ''}>
                      Industry *
                    </Label>
                    <Select
                      options={industries}
                      value={formData.industry}
                      onChange={(value) => updateField('industry', value)}
                      placeholder="Select your industry"
                      className={`w-full ${errors.industry ? 'border-red-500' : ''}`}
                    />
                    {errors.industry && (
                      <p className="text-red-500 text-sm mt-1">{errors.industry}</p>
                    )}
                  </div>

                  {/* Country */}
                  <div>
                    <Label htmlFor="country" className={errors.country ? 'text-red-600' : ''}>
                      Country *
                    </Label>
                    <Select
                      options={countries}
                      value={formData.country}
                      onChange={(value) => updateField('country', value)}
                      placeholder="Select your country"
                      className={`w-full ${errors.country ? 'border-red-500' : ''}`}
                    />
                    {errors.country && (
                      <p className="text-red-500 text-sm mt-1">{errors.country}</p>
                    )}
                  </div>

                  {/* Website */}
                  <div>
                    <Label htmlFor="website">Website (Optional)</Label>
                    <Input
                      id="website"
                      type="url"
                      value={formData.website}
                      onChange={(e) => updateField('website', e.target.value)}
                      placeholder="https://your-website.com"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Team */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Team Size */}
                  <div>
                    <Label htmlFor="teamSize" className={errors.teamSize ? 'text-red-600' : ''}>
                      Team Size *
                    </Label>
                    <Input
                      id="teamSize"
                      type="number"
                      value={formData.teamSize || ''}
                      onChange={(e) => updateField('teamSize', parseInt(e.target.value) || 0)}
                      placeholder="Enter team size"
                      className={`w-full ${errors.teamSize ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                    />
                    {errors.teamSize && (
                      <p className="text-red-500 text-sm mt-1">{errors.teamSize}</p>
                    )}
                  </div>

                  {/* Key Roles */}
                  <div>
                    <Label htmlFor="keyRoles" className={errors.keyRoles ? 'text-red-600' : ''}>
                      Key Roles *
                    </Label>
                    <Input
                      id="keyRoles"
                      type="text"
                      value={formData.keyRoles}
                      onChange={(e) => updateField('keyRoles', e.target.value)}
                      placeholder="e.g., CEO, CTO, Head of Marketing"
                      className={`w-full ${errors.keyRoles ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                    />
                    {errors.keyRoles && (
                      <p className="text-red-500 text-sm mt-1">{errors.keyRoles}</p>
                    )}
                  </div>
                </div>

                {/* Founders Background */}
                <div>
                  <Label htmlFor="foundersBackground" className={errors.foundersBackground ? 'text-red-600' : ''}>
                    Founders' Background *
                  </Label>
                  <TextArea
                    value={formData.foundersBackground}
                    onChange={(value) => updateField('foundersBackground', value)}
                    placeholder="Describe the founders' background and experience"
                    rows={4}
                    className={`w-full ${errors.foundersBackground ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                  />
                  {errors.foundersBackground && (
                    <p className="text-red-500 text-sm mt-1">{errors.foundersBackground}</p>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Project Details */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  {/* Business Model */}
                  <div>
                    <Label htmlFor="businessModel" className={errors.businessModel ? 'text-red-600' : ''}>
                      Business Model *
                    </Label>
                    <Input
                      id="businessModel"
                      type="text"
                      value={formData.businessModel}
                      onChange={(e) => updateField('businessModel', e.target.value)}
                      placeholder="Describe your business model"
                      className={`w-full ${errors.businessModel ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                    />
                    {errors.businessModel && (
                      <p className="text-red-500 text-sm mt-1">{errors.businessModel}</p>
                    )}
                  </div>

                  {/* Target Market */}
                  <div>
                    <Label htmlFor="targetMarket" className={errors.targetMarket ? 'text-red-600' : ''}>
                      Target Market *
                    </Label>
                    <Input
                      id="targetMarket"
                      type="text"
                      value={formData.targetMarket}
                      onChange={(e) => updateField('targetMarket', e.target.value)}
                      placeholder="Describe your target market"
                      className={`w-full ${errors.targetMarket ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                    />
                    {errors.targetMarket && (
                      <p className="text-red-500 text-sm mt-1">{errors.targetMarket}</p>
                    )}
                  </div>

                  {/* Competitive Advantage */}
                  <div>
                    <Label htmlFor="competitiveAdvantage" className={errors.competitiveAdvantage ? 'text-red-600' : ''}>
                      Competitive Advantage *
                    </Label>
                                      <TextArea
                    value={formData.competitiveAdvantage}
                    onChange={(value) => updateField('competitiveAdvantage', value)}
                    placeholder="Describe your competitive advantage"
                    rows={4}
                    className={`w-full ${errors.competitiveAdvantage ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                  />
                    {errors.competitiveAdvantage && (
                      <p className="text-red-500 text-sm mt-1">{errors.competitiveAdvantage}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Financials */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Current Revenue */}
                  <div>
                    <Label htmlFor="currentRevenue" className={errors.currentRevenue ? 'text-red-600' : ''}>
                      Current Revenue *
                    </Label>
                    <Input
                      id="currentRevenue"
                      type="text"
                      value={formData.currentRevenue}
                      onChange={(e) => updateField('currentRevenue', e.target.value)}
                      placeholder="e.g., $18,000/month"
                      className={`w-full ${errors.currentRevenue ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                    />
                    {errors.currentRevenue && (
                      <p className="text-red-500 text-sm mt-1">{errors.currentRevenue}</p>
                    )}
                  </div>

                  {/* Funding Stage */}
                  <div>
                    <Label htmlFor="fundingStage" className={errors.fundingStage ? 'text-red-600' : ''}>
                      Funding Stage *
                    </Label>
                    <Input
                      id="fundingStage"
                      type="text"
                      value={formData.fundingStage}
                      onChange={(e) => updateField('fundingStage', e.target.value)}
                      placeholder="e.g., Seed – $250,000 raised"
                      className={`w-full ${errors.fundingStage ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                    />
                    {errors.fundingStage && (
                      <p className="text-red-500 text-sm mt-1">{errors.fundingStage}</p>
                    )}
                  </div>
                </div>

                {/* Investors */}
                <div>
                  <Label htmlFor="investors">Investors (if any)</Label>
                  <Input
                    id="investors"
                    type="text"
                    value={formData.investors}
                    onChange={(e) => updateField('investors', e.target.value)}
                    placeholder="e.g., Flat6Labs, Individual Angel Investor (UAE)"
                    className="w-full"
                  />
                </div>

                {/* Marketing Emails */}
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="receiveMarketingEmails"
                    checked={formData.receiveMarketingEmails}
                    onChange={(checked) => updateField('receiveMarketingEmails', checked)}
                  />
                  <Label htmlFor="receiveMarketingEmails" className="text-sm">
                    Receive Marketing Emails
                  </Label>
                </div>
              </div>
            )}

            {/* Step 5: Upload Documents */}
            {currentStep === 5 && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Pitch Deck */}
                  <FileUpload
                    title="Upload Pitch Deck"
                    description="Add Your Documents Here, And You Can Upload Up To 5 Files Max"
                    uploadedFiles={formData.pitchDeck}
                    onFilesChange={(files) => updateField('pitchDeck', files)}
                    onError={(message) => showToast(message, 'error')}
                  />

                  {/* Business License */}
                  <FileUpload
                    title="Upload Business License"
                    description="Add Your Documents Here, And You Can Upload Up To 5 Files Max"
                    uploadedFiles={formData.businessLicense}
                    onFilesChange={(files) => updateField('businessLicense', files)}
                    onError={(message) => showToast(message, 'error')}
                  />
                </div>

                {/* Financial Summary */}
                <FileUpload
                  title="Upload Financial Summary"
                  description="Add Your Documents Here, And You Can Upload Up To 5 Files Max"
                  uploadedFiles={formData.financialSummary}
                  onFilesChange={(files) => updateField('financialSummary', files)}
                  onError={(message) => showToast(message, 'error')}
                />
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-200">
              {/* Back Button */}
              {currentStep > 1 && (
                <Button
                  onClick={handleBack}
                  disabled={loading}
                  className="flex-1 sm:flex-none bg-brand-500 text-gray-700 border border-gray-300 hover:bg-gray-200"
                >
                  <Icon set="fa" name="FaArrowLeft" className="mr-2" size={16} />
                  Back
                </Button>
              )}
              
              <Button
                onClick={handleSaveAsDraft}
                disabled={saving}
                className="flex-1 sm:flex-none bg-white text-brand-500 border border-brand-500 hover:bg-brand-800 hover:text-brand-500"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-brand-500 mr-2"></div>
                    Saving...
                  </>
                ) : (
                  'Save As Draft'
                )}
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={loading || currentStep === steps.length}
                className="flex-1 sm:flex-none bg-brand-500 text-white hover:bg-brand-500/90"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : currentStep === steps.length ? (
                  'Submit Application'
                ) : (
                  'Next'
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </>
  );
} 
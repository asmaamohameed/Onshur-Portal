import { useState, useCallback } from 'react';
import { ValidationService, type ValidationResult } from '../services/validationService';
import { type ProgramApplication, type UploadedFile } from '../services/programApplicationService';

export interface FormState {
  // Step 1: Company Info
  companyName: string;
  industry: string;
  country: string;
  website: string;
  
  // Step 2: Team
  teamSize: number;
  keyRoles: string;
  foundersBackground: string;
  
  // Step 3: Project Details
  businessModel: string;
  targetMarket: string;
  competitiveAdvantage: string;
  
  // Step 4: Financials
  currentRevenue: string;
  fundingStage: string;
  investors: string;
  receiveMarketingEmails: boolean;
  
  // Step 5: Documents
  pitchDeck: UploadedFile[];
  businessLicense: UploadedFile[];
  financialSummary: UploadedFile[];
}

export interface FormErrors {
  [key: string]: string;
}

export function useApplicationForm(initialData?: Partial<ProgramApplication>) {
  const [formData, setFormData] = useState<FormState>({
    // Step 1
    companyName: initialData?.companyName || '',
    industry: initialData?.industry || '',
    country: initialData?.country || '',
    website: initialData?.website || '',
    
    // Step 2
    teamSize: initialData?.teamSize || 0,
    keyRoles: initialData?.keyRoles || '',
    foundersBackground: initialData?.foundersBackground || '',
    
    // Step 3
    businessModel: initialData?.businessModel || '',
    targetMarket: initialData?.targetMarket || '',
    competitiveAdvantage: initialData?.competitiveAdvantage || '',
    
    // Step 4
    currentRevenue: initialData?.currentRevenue || '',
    fundingStage: initialData?.fundingStage || '',
    investors: initialData?.investors || '',
    receiveMarketingEmails: initialData?.receiveMarketingEmails || false,
    
    // Step 5
    pitchDeck: initialData?.pitchDeck || [],
    businessLicense: initialData?.businessLicense || [],
    financialSummary: initialData?.financialSummary || [],
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // Update form field
  const updateField = useCallback((field: keyof FormState, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  }, [errors]);

  // Update multiple fields
  const updateFields = useCallback((updates: Partial<FormState>) => {
    setFormData(prev => ({
      ...prev,
      ...updates
    }));

    // Clear errors for updated fields
    setErrors(prev => {
      const newErrors = { ...prev };
      Object.keys(updates).forEach(key => {
        delete newErrors[key];
      });
      return newErrors;
    });
  }, []);

  // Validate current step
  const validateStep = useCallback((step: number): ValidationResult => {
    const stepData = getStepData(step);
    return ValidationService.validateStep(step, stepData);
  }, [formData]);

  // Get data for specific step
  const getStepData = useCallback((step: number): Partial<ProgramApplication> => {
    switch (step) {
      case 1:
        return {
          companyName: formData.companyName,
          industry: formData.industry,
          country: formData.country,
          website: formData.website,
        };
      case 2:
        return {
          teamSize: formData.teamSize,
          keyRoles: formData.keyRoles,
          foundersBackground: formData.foundersBackground,
        };
      case 3:
        return {
          businessModel: formData.businessModel,
          targetMarket: formData.targetMarket,
          competitiveAdvantage: formData.competitiveAdvantage,
        };
      case 4:
        return {
          currentRevenue: formData.currentRevenue,
          fundingStage: formData.fundingStage,
          investors: formData.investors,
          receiveMarketingEmails: formData.receiveMarketingEmails,
        };
      case 5:
        return {
          pitchDeck: formData.pitchDeck,
          businessLicense: formData.businessLicense,
          financialSummary: formData.financialSummary,
        };
      default:
        return {};
    }
  }, [formData]);

  // Set errors for current step
  const setStepErrors = useCallback((stepErrors: Record<string, string>) => {
    setErrors(stepErrors);
  }, []);

  // Clear all errors
  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  // Get all form data for database
  const getAllFormData = useCallback((): Partial<ProgramApplication> => {
    return {
      companyName: formData.companyName,
      industry: formData.industry,
      country: formData.country,
      website: formData.website,
      teamSize: formData.teamSize,
      keyRoles: formData.keyRoles,
      foundersBackground: formData.foundersBackground,
      businessModel: formData.businessModel,
      targetMarket: formData.targetMarket,
      competitiveAdvantage: formData.competitiveAdvantage,
      currentRevenue: formData.currentRevenue,
      fundingStage: formData.fundingStage,
      investors: formData.investors,
      receiveMarketingEmails: formData.receiveMarketingEmails,
      pitchDeck: formData.pitchDeck,
      businessLicense: formData.businessLicense,
      financialSummary: formData.financialSummary,
    };
  }, [formData]);

  return {
    formData,
    errors,
    updateField,
    updateFields,
    validateStep,
    getStepData,
    setStepErrors,
    clearErrors,
    getAllFormData,
  };
} 
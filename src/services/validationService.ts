import { ProgramApplication } from './programApplicationService';

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export class ValidationService {
  // Step 1: Company Info validation
  static validateCompanyInfo(data: Partial<ProgramApplication>): ValidationResult {
    const errors: Record<string, string> = {};
    
    if (!data.companyName?.trim()) {
      errors.companyName = 'Company name is required';
    }
    
    if (!data.industry?.trim()) {
      errors.industry = 'Industry is required';
    }
    
    if (!data.country?.trim()) {
      errors.country = 'Country is required';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  // Step 2: Team validation
  static validateTeam(data: Partial<ProgramApplication>): ValidationResult {
    const errors: Record<string, string> = {};
    
    if (!data.teamSize || data.teamSize <= 0) {
      errors.teamSize = 'Team size must be greater than 0';
    }
    
    if (!data.keyRoles?.trim()) {
      errors.keyRoles = 'Key roles are required';
    }
    
    if (!data.foundersBackground?.trim()) {
      errors.foundersBackground = 'Founders background is required';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  // Step 3: Project Details validation
  static validateProjectDetails(data: Partial<ProgramApplication>): ValidationResult {
    const errors: Record<string, string> = {};
    
    if (!data.businessModel?.trim()) {
      errors.businessModel = 'Business model is required';
    }
    
    if (!data.targetMarket?.trim()) {
      errors.targetMarket = 'Target market is required';
    }
    
    if (!data.competitiveAdvantage?.trim()) {
      errors.competitiveAdvantage = 'Competitive advantage is required';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  // Step 4: Financials validation
  static validateFinancials(data: Partial<ProgramApplication>): ValidationResult {
    const errors: Record<string, string> = {};
    
    if (!data.currentRevenue?.trim()) {
      errors.currentRevenue = 'Current revenue is required';
    }
    
    if (!data.fundingStage?.trim()) {
      errors.fundingStage = 'Funding stage is required';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  // Step 5: Documents validation
  static validateDocuments(data: Partial<ProgramApplication>): ValidationResult {
    const errors: Record<string, string> = {};
    
    if (!data.pitchDeck || data.pitchDeck.length === 0) {
      errors.pitchDeck = 'At least one pitch deck document is required';
    }
    
    if (!data.businessLicense || data.businessLicense.length === 0) {
      errors.businessLicense = 'At least one business license document is required';
    }
    
    if (!data.financialSummary || data.financialSummary.length === 0) {
      errors.financialSummary = 'At least one financial summary document is required';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  // Generic validation for any step
  static validateStep(step: number, data: Partial<ProgramApplication>): ValidationResult {
    switch (step) {
      case 1:
        return this.validateCompanyInfo(data);
      case 2:
        return this.validateTeam(data);
      case 3:
        return this.validateProjectDetails(data);
      case 4:
        return this.validateFinancials(data);
      case 5:
        return this.validateDocuments(data);
      default:
        return { isValid: true, errors: {} };
    }
  }
} 
import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where,
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../firebase';

export interface ProgramApplication {
  id?: string;
  userId: string;
  programType: 'launch' | 'scale' | 'disrupt';
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected';
  currentStep: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  
  // Step 1: Basic Application Info
  companyName?: string;
  industry?: string;
  country?: string;
  website?: string;
  
  // Step 2: Team
  teamSize?: number;
  keyRoles?: string;
  foundersBackground?: string;
  
  // Step 3: Project Details
  businessModel?: string;
  targetMarket?: string;
  competitiveAdvantage?: string;
  
  // Step 4: Financials
  currentRevenue?: string;
  fundingStage?: string;
  investors?: string;
  receiveMarketingEmails?: boolean;
  
  // Step 5: Documents
  pitchDeck?: Array<{
    name: string;
    url: string;
    size: number;
  }>;
  businessLicense?: Array<{
    name: string;
    url: string;
    size: number;
  }>;
  financialSummary?: Array<{
    name: string;
    url: string;
    size: number;
  }>;
}

export class ProgramApplicationService {
  private static collectionName = 'Applications';

  // Create a new application
  static async createApplication(userId: string, programType: ProgramApplication['programType']): Promise<string> {
    try {
      const application: Omit<ProgramApplication, 'id'> = {
        userId,
        programType,
        status: 'draft',
        currentStep: 1,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };

      const docRef = await addDoc(collection(db, this.collectionName), application);
      return docRef.id;
    } catch (error) {
      console.error('Error creating application:', error);
      throw new Error('Failed to create application');
    }
  }

  // Update application data
  static async updateApplication(applicationId: string, data: Partial<ProgramApplication>): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, applicationId);
      await updateDoc(docRef, {
        ...data,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error('Error updating application:', error);
      throw new Error('Failed to update application');
    }
  }

  // Get application by ID
  static async getApplication(applicationId: string): Promise<ProgramApplication | null> {
    try {
      const docRef = doc(db, this.collectionName, applicationId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as ProgramApplication;
      }
      return null;
    } catch (error) {
      console.error('Error getting application:', error);
      throw new Error('Failed to get application');
    }
  }

  // Get user's applications
  static async getUserApplications(userId: string): Promise<ProgramApplication[]> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ProgramApplication[];
    } catch (error) {
      console.error('Error getting user applications:', error);
      throw new Error('Failed to get user applications');
    }
  }

  // Save application as draft
  static async saveAsDraft(applicationId: string, stepData: Partial<ProgramApplication>): Promise<void> {
    try {
      await this.updateApplication(applicationId, {
        ...stepData,
        status: 'draft',
      });
    } catch (error) {
      console.error('Error saving draft:', error);
      throw new Error(error instanceof Error ? error.message : 'Failed to save draft');
    }
  }

  // Submit application
  static async submitApplication(applicationId: string): Promise<void> {
    try {
      await this.updateApplication(applicationId, {
        status: 'submitted',
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      throw new Error('Failed to submit application');
    }
  }

  // Move to next step
  static async moveToNextStep(applicationId: string, currentStep: number, stepData: Partial<ProgramApplication>): Promise<void> {
    try {
      await this.updateApplication(applicationId, {
        ...stepData,
        currentStep: currentStep + 1,
      });
    } catch (error) {
      console.error('Error moving to next step:', error);
      throw new Error(error instanceof Error ? error.message : 'Failed to move to next step');
    }
  }
} 
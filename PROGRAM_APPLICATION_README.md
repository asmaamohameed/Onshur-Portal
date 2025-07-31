# Program Application System

This document describes the Program Application system that allows users to apply for different support programs (Launch, Scale, Disrupt) through a multi-step form.

## Features

- **Multi-step Application Form**: 5-step application process with progress tracking
- **Firebase Integration**: All application data is stored in Firestore
- **Draft Saving**: Users can save their progress and continue later
- **Real-time Validation**: Form validation with user-friendly error messages
- **Responsive Design**: Works on desktop and mobile devices
- **Toast Notifications**: Better UX with toast notifications instead of alerts

## Firebase Setup

### Required Collections

The system uses the following Firestore collection:

#### `Applications`
This collection stores all program applications with the following structure:

```typescript
interface ProgramApplication {
  id?: string;
  userId: string;                    // Firebase Auth user ID
  programType: 'launch' | 'scale' | 'disrupt';
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected';
  currentStep: number;               // Current step in the application (1-5)
  createdAt: Timestamp;
  updatedAt: Timestamp;
  
  // Step 1: Basic Application Info
  companyName?: string;
  industry?: string;
  country?: string;
  website?: string;
  
  // Step 2: Team (to be implemented)
  teamMembers?: Array<{
    name: string;
    role: string;
    email: string;
  }>;
  
  // Step 3: Project Details (to be implemented)
  projectTitle?: string;
  projectDescription?: string;
  targetMarket?: string;
  
  // Step 4: Financials (to be implemented)
  annualRevenue?: number;
  fundingNeeded?: number;
  fundingPurpose?: string;
  
  // Step 5: Documents (to be implemented)
  documents?: Array<{
    name: string;
    url: string;
    type: string;
  }>;
}
```

### Firestore Security Rules

Add the following security rules to your Firestore:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Program Applications
    match /Applications/{applicationId} {
      allow read, write: if request.auth != null && 
        (resource == null || resource.data.userId == request.auth.uid);
    }
  }
}
```

## Usage

### For Users

1. **Navigate to Support Programs**: Go to the Support Programs page
2. **Select a Program**: Click "Apply Now" on any open program (Scale or Disrupt)
3. **Fill the Application**: Complete the multi-step form
4. **Save Progress**: Use "Save As Draft" to save your progress
5. **Submit**: Complete all steps to submit your application

### For Developers

#### Adding New Steps

To add new steps to the application form:

1. **Update the Interface**: Add new fields to the `ProgramApplication` interface in `programApplicationService.ts`
2. **Add Step Data**: Update the `steps` array in `ProgramApplication.tsx`
3. **Create Step Component**: Add the form fields for the new step
4. **Update Validation**: Add validation logic for the new step

#### Example: Adding Step 2 (Team)

```typescript
// In ProgramApplication.tsx
{currentStep === 2 && (
  <div className="space-y-6">
    {/* Team member fields */}
    <div>
      <Label htmlFor="teamMemberName">Team Member Name</Label>
      <Input
        id="teamMemberName"
        type="text"
        value={formData.teamMemberName}
        onChange={(e) => handleInputChange('teamMemberName', e.target.value)}
        placeholder="Enter team member name"
      />
    </div>
    {/* Add more team fields */}
  </div>
)}
```

## File Structure

```
src/
├── components/
│   ├── common/
│   │   ├── ProgressStepper.tsx    # Progress indicator component
│   │   └── Toast.tsx              # Toast notification component
│   └── form/                      # Form components
├── pages/
│   ├── ProgramApplication.tsx     # Main application page
│   └── SupportProgram.tsx         # Updated with navigation
├── services/
│   └── programApplicationService.ts  # Firebase service
└── App.tsx                        # Updated with new route
```

## Routes

- `/SupportProgram` - List of available programs
- `/apply/:programType` - Application form (where `:programType` is `launch`, `scale`, or `disrupt`)

## Styling

The application uses the existing design system with:
- **Primary Color**: `#5951A2` (purple)
- **Typography**: Consistent with the rest of the application
- **Components**: Reuses existing form components
- **Responsive**: Mobile-first design approach

## Future Enhancements

1. **Step 2 - Team**: Add team member management
2. **Step 3 - Project Details**: Add project information fields
3. **Step 4 - Financials**: Add financial information
4. **Step 5 - Documents**: Add file upload functionality
5. **Application Dashboard**: View and manage submitted applications
6. **Email Notifications**: Notify users of application status changes
7. **Admin Panel**: Review and approve applications

## Troubleshooting

### Common Issues

1. **Firebase Connection**: Ensure Firebase is properly configured in `src/firebase.ts`
2. **Authentication**: Users must be logged in to access the application form
3. **Form Validation**: All required fields must be filled before proceeding
4. **Network Issues**: Check internet connection for Firebase operations

### Debug Mode

Enable debug logging by adding this to your browser console:
```javascript
localStorage.setItem('debug', 'program-application:*');
```

## Support

For technical support or questions about the program application system, please refer to the main project documentation or contact the development team. 
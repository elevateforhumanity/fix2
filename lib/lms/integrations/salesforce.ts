// Salesforce Integration for Universal LMS

export class SalesforceIntegration {
  private instanceUrl: string;
  private accessToken: string;
  private refreshToken: string;
  
  constructor(config: {
    instanceUrl: string;
    accessToken: string;
    refreshToken: string;
  }) {
    this.instanceUrl = config.instanceUrl;
    this.accessToken = config.accessToken;
    this.refreshToken = config.refreshToken;
  }
  
  // Sync student to Salesforce as Contact
  async syncStudent(student: any): Promise<string> {
    const contact = {
      FirstName: student.firstName,
      LastName: student.lastName,
      Email: student.email,
      Phone: student.phone,
      LMS_Student_ID__c: student.id,
    };
    
    const response = await fetch(`${this.instanceUrl}/services/data/v57.0/sobjects/Contact`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    });
    
    const data = await response.json();
    return data.id;
  }
  
  // Create enrollment as Opportunity
  async createEnrollment(enrollment: any): Promise<string> {
    const opportunity = {
      Name: `${enrollment.studentName} - ${enrollment.courseName}`,
      StageName: 'Enrolled',
      CloseDate: new Date().toISOString().split('T')[0],
      Amount: enrollment.price,
      LMS_Enrollment_ID__c: enrollment.id,
    };
    
    const response = await fetch(`${this.instanceUrl}/services/data/v57.0/sobjects/Opportunity`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(opportunity),
    });
    
    const data = await response.json();
    return data.id;
  }
  
  // Update completion status
  async updateCompletion(enrollmentId: string, completed: boolean): Promise<void> {
    await fetch(`${this.instanceUrl}/services/data/v57.0/sobjects/Opportunity/${enrollmentId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        StageName: completed ? 'Completed' : 'In Progress',
      }),
    });
  }
}

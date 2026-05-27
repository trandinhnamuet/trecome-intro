/**
 * Google Sheets Integration Guide
 *
 * To enable automatic row insertion into Google Sheets:
 *
 * 1. Create a Google Apps Script webhook:
 *    - Go to https://script.google.com
 *    - Create a new project
 *    - Paste the code below into the editor:
 *
 *    ---START CODE---
 *    function doPost(e) {
 *      const sheet = SpreadsheetApp.openById('YOUR_SHEET_ID').getActiveSheet();
 *      const data = JSON.parse(e.postData.contents);
 *      
 *      sheet.appendRow([
 *        new Date(),
 *        data.name,
 *        data.email,
 *        data.phone,
 *        data.brand,
 *        data.plan,
 *        data.msg
 *      ]);
 *      
 *      return ContentService.createTextOutput(JSON.stringify({success: true}))
 *        .setMimeType(ContentService.MimeType.JSON);
 *    }
 *    ---END CODE---
 *
 *    - Deploy as new deployment > Web app
 *    - Execute as: your account
 *    - Who has access: Anyone
 *    - Copy the deployment URL
 *
 * 2. Add the deployment URL to .env.local:
 *    GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/usercontent
 *
 * 3. Create column headers in your Google Sheet (row 1):
 *    - Timestamp
 *    - Name
 *    - Email
 *    - Phone
 *    - Brand
 *    - Plan
 *    - Message
 */

interface ContactData {
  name: string;
  email: string;
  phone: string;
  brand: string;
  plan: string;
  msg: string;
}

export async function addToGoogleSheet(data: ContactData): Promise<boolean> {
  const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;

  if (!scriptUrl) {
    console.log('Google Apps Script URL not configured. Skipping sheet insertion.');
    return true; // Don't fail if not configured
  }

  try {
    const response = await fetch(scriptUrl, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log('Data added to Google Sheet');
      return true;
    } else {
      console.error('Failed to add data to Google Sheet:', response.statusText);
      return false;
    }
  } catch (error) {
    console.error('Google Sheet API error:', error);
    return false; // Don't fail the main request if sheets fails
  }
}

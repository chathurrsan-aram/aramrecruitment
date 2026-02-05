/**
 * Google Apps Script for Aram Recruitment Form
 *
 * SETUP INSTRUCTIONS:
 * 1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1Bk21f7_cQTWDbQXatp2T_aTQHR_akNtOLob6UOCGtZo/edit
 * 2. Go to Extensions > Apps Script
 * 3. Delete any existing code and paste this entire script
 * 4. Click "Deploy" > "New deployment"
 * 5. Select type: "Web app"
 * 6. Set "Execute as": "Me"
 * 7. Set "Who has access": "Anyone"
 * 8. Click "Deploy" and authorize when prompted
 * 9. Copy the Web app URL and add it to your .env file as VITE_GOOGLE_SCRIPT_URL
 */

// Configuration - change this to match your sheet tab name
const SHEET_NAME = 'Form Responses';

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    // Create sheet if it doesn't exist
    if (!sheet) {
      const newSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet(SHEET_NAME);
      // Add headers
      newSheet.appendRow([
        'Timestamp',
        'Name',
        'Email',
        'Roles',
        'Why Aram',
        'Experience',
        'Hours/Week',
        'Previous Trip',
        'Role-Specific Answers'
      ]);
      newSheet.getRange(1, 1, 1, 9).setFontWeight('bold');
    }

    const data = JSON.parse(e.postData.contents);

    // Format roles as comma-separated list
    const rolesText = data.roles ? data.roles.join(', ') : '';

    // Format role-specific answers
    const roleSpecificText = data.roleSpecific
      ? Object.entries(data.roleSpecific)
          .map(([key, value]) => `${key}: ${value}`)
          .join('\n\n')
      : '';

    // Get the sheet (may have been just created)
    const targetSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    // Append the row
    targetSheet.appendRow([
      new Date().toISOString(),
      data.name || '',
      data.email || '',
      rolesText,
      data.about || '',
      data.experience || '',
      data.hours || '',
      data.previousTrip || '',
      roleSpecificText
    ]);

    // Return success response with CORS headers
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Application submitted successfully' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET requests (for testing)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'Aram Recruitment API is running' }))
    .setMimeType(ContentService.MimeType.JSON);
}

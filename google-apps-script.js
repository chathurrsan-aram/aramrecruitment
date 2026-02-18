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

// Configuration
const SHEET_NAME = '26-27 Recruitment';

// All headers in order — core fields first, then one column per role-specific question
const HEADERS = [
  'Timestamp',
  'Name',
  'Email',
  'Roles Applied For',
  'Why Aram',
  'Relevant Experience',
  'Hours/Week',
  'Attended Previous Trip',
  // Media Director
  'Media: Portfolio Link',
  'Media: Team/Creative Leadership',
  // Finance Director
  'Finance: Budgeting/Accounting Experience',
  'Finance: Tools & Software',
  // Trip Director
  'Trip: Event/Trip Organisation Experience',
  'Trip: 2027 Improvement Ideas',
  // Healthcare Lead
  'Healthcare: Why This Sector',
  'Healthcare: Initiative Idea',
  // SEN Lead
  'SEN: Why This Sector',
  'SEN: Initiative Idea',
  // Education Lead
  'Education: Why This Sector',
  'Education: Initiative Idea',
  // Technology Lead
  'Technology: Why This Sector',
  'Technology: Initiative Idea',
  // Wellbeing Lead
  'Wellbeing: Why This Sector',
  'Wellbeing: Initiative Idea',
  // Economic Development Lead
  'Econ Dev: Why This Sector',
  'Econ Dev: Initiative Idea',
  // Research Lead
  'Research: Research/Analysis Example',
  // Head of Socials
  'Socials: Social Account/Content Link',
  // Events Lead
  'Events: Event Planning Experience',
];

// Maps roleSpecific keys (roleId-questionId) to their column header
const ROLE_QUESTION_MAP = {
  'media-director-portfolio':       'Media: Portfolio Link',
  'media-director-team-experience': 'Media: Team/Creative Leadership',
  'finance-director-finance-exp':   'Finance: Budgeting/Accounting Experience',
  'finance-director-tools':         'Finance: Tools & Software',
  'trip-director-2027-event-exp':   'Trip: Event/Trip Organisation Experience',
  'trip-director-2027-improvement': 'Trip: 2027 Improvement Ideas',
  'healthcare-lead-why-sector':     'Healthcare: Why This Sector',
  'healthcare-lead-initiative-idea':'Healthcare: Initiative Idea',
  'sen-lead-why-sector':            'SEN: Why This Sector',
  'sen-lead-initiative-idea':       'SEN: Initiative Idea',
  'education-lead-why-sector':      'Education: Why This Sector',
  'education-lead-initiative-idea': 'Education: Initiative Idea',
  'technology-lead-why-sector':     'Technology: Why This Sector',
  'technology-lead-initiative-idea':'Technology: Initiative Idea',
  'wellbeing-lead-why-sector':      'Wellbeing: Why This Sector',
  'wellbeing-lead-initiative-idea': 'Wellbeing: Initiative Idea',
  'economic-dev-lead-why-sector':   'Econ Dev: Why This Sector',
  'economic-dev-lead-initiative-idea':'Econ Dev: Initiative Idea',
  'research-lead-research-exp':     'Research: Research/Analysis Example',
  'head-of-socials-social-exp':     'Socials: Social Account/Content Link',
  'events-lead-event-exp':          'Events: Event Planning Experience',
};

/**
 * Initialises the sheet with headers, formatting, and frozen header row.
 * Called automatically on first submission or can be run manually.
 */
function setupSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  // Write headers
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);

  // Format header row
  const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#6D4A9E'); // Aram purple
  headerRange.setFontColor('#FFFFFF');
  headerRange.setWrap(true);

  // Freeze header row
  sheet.setFrozenRows(1);

  // Set column widths for readability
  sheet.setColumnWidth(1, 160);  // Timestamp
  sheet.setColumnWidth(2, 150);  // Name
  sheet.setColumnWidth(3, 220);  // Email
  sheet.setColumnWidth(4, 280);  // Roles
  sheet.setColumnWidth(5, 300);  // Why Aram
  sheet.setColumnWidth(6, 300);  // Experience
  sheet.setColumnWidth(7, 100);  // Hours
  sheet.setColumnWidth(8, 120);  // Previous Trip

  // Role-specific columns
  for (let i = 9; i <= HEADERS.length; i++) {
    sheet.setColumnWidth(i, 280);
  }

  return sheet;
}

/**
 * Checks if an application with the same email already exists.
 * Returns the row number if found, or -1 if not found.
 */
function findExistingApplication(sheet, email) {
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) return -1; // Only header row

  const emailCol = HEADERS.indexOf('Email') + 1;
  const emails = sheet.getRange(2, emailCol, lastRow - 1, 1).getValues();

  for (let i = 0; i < emails.length; i++) {
    if (emails[i][0].toString().toLowerCase() === email.toLowerCase()) {
      return i + 2; // +2 because array is 0-indexed and row 1 is headers
    }
  }
  return -1;
}

/**
 * Builds a row array from the submitted data, placing role-specific
 * answers in their dedicated columns.
 */
function buildRow(data) {
  // Create a map of header -> column index for fast lookup
  const headerIndex = {};
  HEADERS.forEach((h, i) => { headerIndex[h] = i; });

  // Start with empty row
  const row = new Array(HEADERS.length).fill('');

  // Core fields
  row[headerIndex['Timestamp']] = new Date().toISOString();
  row[headerIndex['Name']] = data.name || '';
  row[headerIndex['Email']] = data.email || '';
  row[headerIndex['Roles Applied For']] = data.roles ? data.roles.join(', ') : '';
  row[headerIndex['Why Aram']] = data.about || '';
  row[headerIndex['Relevant Experience']] = data.experience || '';
  row[headerIndex['Hours/Week']] = data.hours || '';
  row[headerIndex['Attended Previous Trip']] = data.previousTrip || '';

  // Role-specific answers — each goes into its own column
  if (data.roleSpecific) {
    for (const [key, value] of Object.entries(data.roleSpecific)) {
      const header = ROLE_QUESTION_MAP[key];
      if (header && headerIndex[header] !== undefined) {
        row[headerIndex[header]] = value;
      }
    }
  }

  return row;
}

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    // Auto-setup if sheet doesn't exist or has no headers
    if (!sheet || sheet.getLastRow() === 0) {
      sheet = setupSheet();
    }

    const data = JSON.parse(e.postData.contents);

    // Validate required fields
    if (!data.name || !data.email) {
      return ContentService
        .createTextOutput(JSON.stringify({ success: false, error: 'Name and email are required' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const row = buildRow(data);

    // Check for duplicate submission by email
    const existingRow = findExistingApplication(sheet, data.email);

    if (existingRow > 0) {
      // Update the existing row instead of creating a duplicate
      sheet.getRange(existingRow, 1, 1, row.length).setValues([row]);
      return ContentService
        .createTextOutput(JSON.stringify({
          success: true,
          message: 'Application updated successfully',
          updated: true
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Append new row
    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Application submitted successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET requests (for testing the deployment)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'ok',
      message: 'Aram Recruitment API is running',
      headers: HEADERS
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

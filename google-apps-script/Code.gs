/**
 * OpenSTEM Recruitment — Dual Form Submission Handler
 * Appends enquiries to Google Sheets & sends immediate email notifications.
 *
 * Google Sheet: OpenSTEM Recruitment — Enquiries
 * Sheet ID: 1lgt5RfTNqWcDrEIzxE26OBeSlJUXVIvKLmUQqQ7Uaaw
 * Notification Recipient: shahriyarkarimsiam@gmail.com
 */

const SPREADSHEET_ID = "1lgt5RfTNqWcDrEIzxE26OBeSlJUXVIvKLmUQqQ7Uaaw";
const NOTIFICATION_EMAIL = "shahriyarkarimsiam@gmail.com";

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "ok",
    message: "OpenSTEM Recruitment Apps Script API is active."
  })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    let data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const timestamp = new Date();
    const type = (data.form_type || data.type || "").toLowerCase().trim();

    if (type === "student" || data.interest) {
      // 1. Student Enquiry
      const sheet = ss.getSheetByName("Student Enquiries");
      const name = data.name || "Anonymous Student";
      const email = data.email || "Not provided";
      const level = data.level || "Not specified";
      const interest = data.interest || "Not specified";
      const message = data.message || "Not provided";

      sheet.appendRow([timestamp, name, email, level, interest, message]);

      const subject = `[Student Enquiry] ${name} — ${interest}`;
      const htmlBody = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; border: 1px solid #dce4db; border-radius: 10px; overflow: hidden; background: #ffffff;">
          <div style="background: #14342F; color: #ffffff; padding: 22px 28px;">
            <span style="font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #d4edbf; font-weight: bold;">OpenSTEM Recruitment</span>
            <h2 style="margin: 6px 0 0; font-size: 22px; color: #ffffff; font-weight: 600;">🎓 New Student Enquiry</h2>
          </div>
          <div style="padding: 26px 28px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; line-height: 1.6;">
              <tr style="border-bottom: 1px solid #eef2ec;">
                <td style="padding: 10px 0; color: #64756d; width: 34%; font-weight: 600;">Full Name:</td>
                <td style="padding: 10px 0; color: #17332f; font-weight: bold;">${escapeHtml(name)}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eef2ec;">
                <td style="padding: 10px 0; color: #64756d; font-weight: 600;">Email Address:</td>
                <td style="padding: 10px 0;"><a href="mailto:${escapeHtml(email)}" style="color: #a95535; font-weight: bold; text-decoration: none;">${escapeHtml(email)}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #eef2ec;">
                <td style="padding: 10px 0; color: #64756d; font-weight: 600;">Current Study Level:</td>
                <td style="padding: 10px 0; color: #17332f;">${escapeHtml(level)}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eef2ec;">
                <td style="padding: 10px 0; color: #64756d; font-weight: 600;">Main Interest:</td>
                <td style="padding: 10px 0; color: #17332f; font-weight: 600;">${escapeHtml(interest)}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eef2ec;">
                <td style="padding: 10px 0; color: #64756d; vertical-align: top; font-weight: 600;">Goals / Questions:</td>
                <td style="padding: 10px 0; color: #17332f; white-space: pre-wrap;">${escapeHtml(message)}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #64756d; font-weight: 600;">Recorded In:</td>
                <td style="padding: 10px 0; color: #17332f;">Google Sheet &rarr; <em>Student Enquiries</em></td>
              </tr>
            </table>
            <div style="margin-top: 24px; padding: 14px 18px; background: #f6f8f3; border-radius: 6px; font-size: 13px; color: #435b51;">
              &bull; <strong>Direct Reply:</strong> Hit <em>Reply</em> in your email app to write directly to ${escapeHtml(name)} (${escapeHtml(email)}).
            </div>
          </div>
        </div>
      `;

      MailApp.sendEmail({
        to: NOTIFICATION_EMAIL,
        replyTo: email,
        subject: subject,
        htmlBody: htmlBody
      });

      return ContentService.createTextOutput(JSON.stringify({
        result: "success",
        type: "student",
        message: "Enquiry saved to Google Sheet and emailed."
      })).setMimeType(ContentService.MimeType.JSON);

    } else if (type === "university" || data.institution) {
      // 2. University / Institutional Enquiry
      const sheet = ss.getSheetByName("University Enquiries");
      const name = data.name || "University Contact";
      const email = data.email || "Not provided";
      const institution = data.institution || "Not specified";
      const role = data.role || "Not specified";
      const topic = data.topic || "General introduction";
      const message = data.message || "Not provided";

      sheet.appendRow([timestamp, name, email, institution, role, topic, message]);

      const subject = `[University Enquiry] ${name} from ${institution}`;
      const htmlBody = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; border: 1px solid #dce4db; border-radius: 10px; overflow: hidden; background: #ffffff;">
          <div style="background: #173A35; color: #ffffff; padding: 22px 28px;">
            <span style="font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #f7c899; font-weight: bold;">OpenSTEM Recruitment</span>
            <h2 style="margin: 6px 0 0; font-size: 22px; color: #ffffff; font-weight: 600;">🏛️ New Institutional Enquiry</h2>
          </div>
          <div style="padding: 26px 28px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; line-height: 1.6;">
              <tr style="border-bottom: 1px solid #eef2ec;">
                <td style="padding: 10px 0; color: #64756d; width: 34%; font-weight: 600;">Contact Name:</td>
                <td style="padding: 10px 0; color: #17332f; font-weight: bold;">${escapeHtml(name)}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eef2ec;">
                <td style="padding: 10px 0; color: #64756d; font-weight: 600;">Work Email:</td>
                <td style="padding: 10px 0;"><a href="mailto:${escapeHtml(email)}" style="color: #a95535; font-weight: bold; text-decoration: none;">${escapeHtml(email)}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #eef2ec;">
                <td style="padding: 10px 0; color: #64756d; font-weight: 600;">Institution / Org:</td>
                <td style="padding: 10px 0; color: #17332f; font-weight: bold;">${escapeHtml(institution)}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eef2ec;">
                <td style="padding: 10px 0; color: #64756d; font-weight: 600;">Role / Title:</td>
                <td style="padding: 10px 0; color: #17332f;">${escapeHtml(role)}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eef2ec;">
                <td style="padding: 10px 0; color: #64756d; font-weight: 600;">Area of Interest:</td>
                <td style="padding: 10px 0; color: #17332f; font-weight: 600;">${escapeHtml(topic)}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eef2ec;">
                <td style="padding: 10px 0; color: #64756d; vertical-align: top; font-weight: 600;">Discussion Details:</td>
                <td style="padding: 10px 0; color: #17332f; white-space: pre-wrap;">${escapeHtml(message)}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #64756d; font-weight: 600;">Recorded In:</td>
                <td style="padding: 10px 0; color: #17332f;">Google Sheet &rarr; <em>University Enquiries</em></td>
              </tr>
            </table>
            <div style="margin-top: 24px; padding: 14px 18px; background: #f6f8f3; border-radius: 6px; font-size: 13px; color: #435b51;">
              &bull; <strong>Direct Reply:</strong> Hit <em>Reply</em> in your email app to write directly to ${escapeHtml(name)} (${escapeHtml(email)}).
            </div>
          </div>
        </div>
      `;

      MailApp.sendEmail({
        to: NOTIFICATION_EMAIL,
        replyTo: email,
        subject: subject,
        htmlBody: htmlBody
      });

      return ContentService.createTextOutput(JSON.stringify({
        result: "success",
        type: "university",
        message: "Enquiry saved to Google Sheet and emailed."
      })).setMimeType(ContentService.MimeType.JSON);

    } else {
      return ContentService.createTextOutput(JSON.stringify({
        result: "error",
        message: "Unrecognized form submission type."
      })).setMimeType(ContentService.MimeType.JSON);
    }

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      result: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function escapeHtml(text) {
  if (!text) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

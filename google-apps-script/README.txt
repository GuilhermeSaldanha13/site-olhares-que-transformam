Google Apps Script: append form submissions to your spreadsheet

1) Open https://script.google.com and create a new script project.
2) Replace the default code with the following and set the SPREADSHEET_ID to your sheet's ID.

/* BEGIN script */
function doPost(e) {
  try {
    const SPREADSHEET_ID = "1FdT0BsJ37IVQkdaWagCC9Qs2Z3I-ADw4u-7gmbvnk08";
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName("Sheet1") || ss.getSheets()[0];

    var payload = {};
    if (e.postData && e.postData.contents) {
      payload = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      payload = e.parameter;
    }

    const nome = payload.nome || payload.name || "";
    const email = (payload.email || "").toString();
    const whatsapp = payload.whatsapp || payload.phone || "";
    const cpf = payload.cpf || "";
    const profissao = payload.profissao || "";
    const cidade = payload.cidade || "";
    const motivacao = payload.motivacao || payload.message || "";
    const indicacao = payload.indicacao || "";

    // Duplicate check: read emails from column C starting at row 2
    try {
      var lastRow = sheet.getLastRow();
      var existing = [];
      if (lastRow >= 2) {
        var emailRange = sheet.getRange(2, 3, lastRow - 1, 1).getValues();
        existing = emailRange.map(function (r) { return (r[0] || "").toString().trim().toLowerCase(); });
      }
      if (email && existing.indexOf(email.toString().trim().toLowerCase()) !== -1) {
        return ContentService
          .createTextOutput(JSON.stringify({ error: 'email already registered' }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    } catch (e) {
      // ignore duplicate-check failures and continue
    }

    // Ordem: Data, Nome, E-mail, WhatsApp, CPF, Profissão, Cidade, Motivação, Como conheceu
    const row = [new Date(), nome, email, whatsapp, cpf, profissao, cidade, motivacao, indicacao];
    sheet.appendRow(row);
    return ContentService
      .createTextOutput(JSON.stringify({ok:true}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: err.message || String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
/* END script */

3) Save the project.
4) Deploy -> New deployment -> Select "Web app".
   - Execute as: "Me" (the owner)
   - Who has access: "Anyone" or "Anyone with Google account" (choose what you prefer)
5) Deploy and copy the Web app URL (it will look like https://script.google.com/macros/s/XXXXX/exec).
6) In your project `.env.local` set:
   NEXT_PUBLIC_SUBMIT_URL="<web app URL>"
7) On the spreadsheet, ensure the account you used to deploy the web app has edit permissions (the web app runs as you if "Execute as: Me").

Notes:
- If you choose "Execute as: User accessing the web app" you'll need to require sign-in and share the sheet accordingly.
- For CORS testing in local dev, the Apps Script web app accepts POST from browser; if you run into CORS issues, deploy with access "Anyone, even anonymous" and it will work without auth.

If you want, I can also generate a PowerShell script to create `.env.local` with the `NEXT_PUBLIC_SUBMIT_URL` you paste.

---

Notes about the `doPost` you provided:
- Your `doPost` expects parameter names: `nome`, `email`, `whatsapp`, `cpf`, `profissao`, `cidade`, `motivacao`, `indicacao`.
- I updated the site's form to send those Portuguese keys and also English keys (`name`, `email`, `phone`, `message`) so the same submission works with either the Apps Script web app or the internal `/api/submit` route.

How to deploy your `doPost`:
1. Create a new Apps Script project and paste your `doPost` function.
2. Save and Deploy → New deployment → Select "Web app".
  - Execute as: "Me"
  - Who has access: "Anyone" (or "Anyone, even anonymous" to avoid auth/CORS issues)
3. Copy the Web app URL and set `NEXT_PUBLIC_SUBMIT_URL` in `.env.local` or use the PowerShell helper to add it.

After that, open http://localhost:3000 and test the form — submissions will be appended to your spreadsheet.

Recommended sheet header
------------------------
Before you start testing, set the first row of your `Sheet1` to the column headers exactly like this (tabs shown for clarity):

Data\tNome\tE-mail\tWhatsApp\tCPF\tProfissão\tCidade\tMotivação\tComo conheceu

This ensures new rows append under these columns in the expected order.

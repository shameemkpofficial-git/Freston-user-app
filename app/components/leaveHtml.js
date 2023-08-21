export const MyHTML = LeaveInfo => {
  return `<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
  
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>file_1666699506166</title>
    <style type="text/css">
        * {
            margin: 0;
            padding: 0;
            text-indent: 0;
        }
  
        p {
            color: #222;
            font-family: Calibri, sans-serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: none;
            font-size: 14pt;
            margin: 0pt;
        }
  
        .s1 {
            color: #222;
            font-family: Calibri, sans-serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: none;
            font-size: 12pt;
        }
  
        .s2 {
            color: #222;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 12pt;
        }
  
        table,
        tbody {
            vertical-align: top;
            overflow: visible;
        }
    </style>
  </head>
  
  <body>
    <p style="padding-left: 5pt;text-indent: 0pt;text-align: left;"><span>
            <table border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td><img width="261" height="25"
                            src="data:image/png;base64,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" />
                    </td>
                </tr>
            </table>
        </span></p>
    <p style="text-indent: 0pt;text-align: left;"><br /></p>
    <p style="padding-top: 5pt;padding-left: 100pt;text-indent: 0pt;text-align: left;">${LeaveInfo.LeaveType} APPLICATION FORM</p>
    <p style="text-indent: 0pt;text-align: left;"><br /></p>
    <table style="border-collapse:collapse;margin-left:5.25pt" cellspacing="0">
        <tr style="height:37pt">
            <td
                style="width:292pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                <p class="s1" style="padding-top: 10pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">Full Name
                </p>
            </td>
            <td
                style="width:200pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                <p class="s2" style="padding-top: 11pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">${LeaveInfo.Name}
                </p>
            </td>
        </tr>
        <tr style="height:37pt">
            <td
                style="width:292pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                <p class="s1" style="padding-top: 10pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">Designation
                </p>
            </td>
            <td
                style="width:153pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                <p class="s2" style="padding-top: 11pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">${LeaveInfo.Designation}
                    </p>
            </td>
        </tr>
        <tr style="height:37pt">
            <td
                style="width:292pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                <p class="s1" style="padding-top: 10pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">Department
                </p>
            </td>
            <td
                style="width:153pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                <p class="s2" style="padding-top: 11pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">${LeaveInfo.Department}
                    </p>
            </td>
        </tr>
        <tr style="height:37pt">
            <td
                style="width:292pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                <p class="s1" style="padding-top: 10pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">Date of
                    Joining</p>
            </td>
            <td
                style="width:153pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                <p class="s2" style="padding-top: 11pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">${LeaveInfo.JoiningDate}</p>
            </td>
        </tr>
        <tr style="height:60pt">
            <td
                style="width:292pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                <p class="s1" style="padding-top: 24pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">Date of Leave 
                    </p>
            </td>
            <td
            style="width:183pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
            <p class="s2" style="padding-top: 10pt;padding-left: 5pt;text-indent: 0pt;text-align: left;font-weight: 600;">From Date: <span>${LeaveInfo.FromDate}</span>
            </p>
            <p class="s2" style="padding-top: 10pt;padding-left: 5pt;text-indent: 0pt;text-align: left;font-weight: 600;">To Date: <span>${LeaveInfo.ToDate}</span>
            </p>
        </td>
        </tr>
        <tr style="height:47pt">
            <td
                style="width:292pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                <p style="text-indent: 0pt;text-align: left;"><br /></p>
                <p class="s1" style="padding-left: 5pt;text-indent: 0pt;text-align: left;">Type of Leave
                    (Casual/Earned/Emergency)</p>
            </td>
            <td
                style="width:153pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                <p style="text-indent: 0pt;text-align: left;"><br /></p>
                <p class="s2" style="padding-left: 5pt;text-indent: 0pt;text-align: left;">${LeaveInfo.Leave}</p>
            </td>
        </tr>
        <tr style="height:37pt">
            <td
                style="width:292pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                <p class="s1" style="padding-top: 10pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">Date of
                    Reporting back to work</p>
            </td>
            <td
                style="width:153pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                <p class="s2" style="padding-top: 11pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">${LeaveInfo.RejoinDate}</p>
            </td>
        </tr>
        <tr style="height:auto">
            <td
                style="width:292pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                <p class="s1" style="padding-left: 5pt;text-indent: 0pt;text-align: left;padding-top: 20pt">Reason for the Leave</p>
            </td>
            <td
            style="width:153pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
            <p class="s2" style="padding-top: 11pt;padding-bottom: 11pt;padding-left: 5pt;text-indent: 0pt;text-align: left;overflow: hidden;">${LeaveInfo.Reason}</p>
        </td>
        </tr>
        <!-- <tr style="height:auto">
            <td
                style="width:292pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                <p style="text-indent: 0pt;text-align: left;"><br /></p>
                <p class="s1" style="padding-left: 5pt;text-indent: 0pt;text-align: left;">Approved By</p>
            </td>
            <td
                style="width:153pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                <p style="text-indent: 0pt;text-align: left;"><br /></p>
            </td> -->
        </tr>
    </table>
  </body>
  
  </html>
      `;
};

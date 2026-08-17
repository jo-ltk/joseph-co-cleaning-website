import * as React from "react";

export function CareStaffRequestEmail({
  name,
  organisation,
  email,
  phone,
  facilityType,
  staffingNeed,
  message,
  timestamp,
}: {
  name: string;
  organisation: string;
  email: string;
  phone: string;
  facilityType: string;
  staffingNeed: string;
  message: string;
  timestamp: string;
}) {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "640px", color: "#172033" }}>
      <h2 style={{ borderBottom: "2px solid #C0312D", paddingBottom: "10px" }}>New staffing request</h2>
      <p>A care facility has submitted a request via the Care Connect website.</p>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          {[
            ["Name", name],
            ["Organisation", organisation],
            ["Email", email],
            ["Phone", phone],
            ["Facility type", facilityType],
            ["Staffing requirement", staffingNeed],
            ["Message", message || "No additional details"],
            ["Submitted", timestamp],
          ].map(([label, value]) => (
            <tr key={label}>
              <td style={{ padding: "8px", border: "1px solid #e6e1d8", fontWeight: 700, width: "180px" }}>{label}</td>
              <td style={{ padding: "8px", border: "1px solid #e6e1d8" }}>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function CareApplicationEmail({
  fullName,
  email,
  phone,
  location,
  position,
  experience,
  summary,
  timestamp,
}: {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  position: string;
  experience: string;
  summary: string;
  timestamp: string;
}) {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "640px", color: "#172033" }}>
      <h2 style={{ borderBottom: "2px solid #C0312D", paddingBottom: "10px" }}>Application Submission</h2>
      <p>A new job application has been submitted via the Care Connect website. The candidate&apos;s CV is attached.</p>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          {[
            ["Full Name", fullName],
            ["Email", email],
            ["Phone", phone],
            ["Location", location],
            ["Position Applied For", position],
            ["Years of Experience", experience],
            ["Professional Summary", summary || "Not provided"],
            ["Application submission date/time", timestamp],
          ].map(([label, value]) => (
            <tr key={label}>
              <td style={{ padding: "8px", border: "1px solid #e6e1d8", fontWeight: 700, width: "180px" }}>{label}</td>
              <td style={{ padding: "8px", border: "1px solid #e6e1d8", whiteSpace: "pre-wrap" }}>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

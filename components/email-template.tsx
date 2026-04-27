import * as React from "react";

interface AdminEmailProps {
  name: string;
  email: string;
  phone: string;
  service: string;
  location: string;
  message: string;
  leadSource: string;
  timestamp: string;
}

export const AdminBookingEmail: React.FC<Readonly<AdminEmailProps>> = ({
  name,
  email,
  phone,
  service,
  location,
  message,
  leadSource,
  timestamp,
}) => (
  <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "0 auto", color: "#120f0c" }}>
    <h2 style={{ color: "#2b454e", borderBottom: "2px solid #b5c235", paddingBottom: "10px" }}>New Service Request</h2>
    <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
      <tbody>
        <tr>
          <td style={{ padding: "10px", border: "1px solid #e0e0e0", fontWeight: "bold", width: "150px" }}>Customer Name</td>
          <td style={{ padding: "10px", border: "1px solid #e0e0e0" }}>{name}</td>
        </tr>
        <tr>
          <td style={{ padding: "10px", border: "1px solid #e0e0e0", fontWeight: "bold" }}>Email</td>
          <td style={{ padding: "10px", border: "1px solid #e0e0e0" }}><a href={`mailto:${email}`}>{email}</a></td>
        </tr>
        <tr>
          <td style={{ padding: "10px", border: "1px solid #e0e0e0", fontWeight: "bold" }}>Phone</td>
          <td style={{ padding: "10px", border: "1px solid #e0e0e0" }}><a href={`tel:${phone}`}>{phone}</a></td>
        </tr>
        <tr>
          <td style={{ padding: "10px", border: "1px solid #e0e0e0", fontWeight: "bold" }}>Service Requested</td>
          <td style={{ padding: "10px", border: "1px solid #e0e0e0" }}>{service || "Not specified"}</td>
        </tr>
        <tr>
          <td style={{ padding: "10px", border: "1px solid #e0e0e0", fontWeight: "bold" }}>Location</td>
          <td style={{ padding: "10px", border: "1px solid #e0e0e0" }}>{location || "Not specified"}</td>
        </tr>
        <tr>
          <td style={{ padding: "10px", border: "1px solid #e0e0e0", fontWeight: "bold" }}>Message/Details</td>
          <td style={{ padding: "10px", border: "1px solid #e0e0e0", whiteSpace: "pre-wrap" }}>{message || "No additional details provided."}</td>
        </tr>
        <tr>
          <td style={{ padding: "10px", border: "1px solid #e0e0e0", fontWeight: "bold" }}>Lead Source</td>
          <td style={{ padding: "10px", border: "1px solid #e0e0e0" }}>{leadSource || "Direct / Organic"}</td>
        </tr>
        <tr>
          <td style={{ padding: "10px", border: "1px solid #e0e0e0", fontWeight: "bold" }}>Submitted At</td>
          <td style={{ padding: "10px", border: "1px solid #e0e0e0" }}>{timestamp}</td>
        </tr>
      </tbody>
    </table>
    <p style={{ marginTop: "30px", fontSize: "14px", color: "#666" }}>Generated automatically by Joseph & Co Booking Engine</p>
  </div>
);

interface CustomerEmailProps {
  name: string;
  service: string;
  location: string;
}

export const CustomerConfirmationEmail: React.FC<Readonly<CustomerEmailProps>> = ({
  name,
  service,
  location,
}) => (
  <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "0 auto", color: "#120f0c" }}>
    <h2 style={{ color: "#2b454e" }}>Thank You for Your Request, {name}</h2>
    <p>We have successfully received your service inquiry at Joseph & Co. Our team is currently reviewing your details.</p>
    <div style={{ backgroundColor: "#f5f5f3", padding: "20px", borderLeft: "4px solid #b5c235", margin: "20px 0" }}>
      <h3 style={{ marginTop: "0", fontSize: "16px", color: "#2b454e" }}>Request Summary</h3>
      <p style={{ margin: "5px 0" }}><strong>Service:</strong> {service || "Not specified"}</p>
      <p style={{ margin: "5px 0" }}><strong>Location:</strong> {location || "Not specified"}</p>
    </div>
    <p>One of our directors, Julia or Dickson, will be in touch with you shortly to discuss your requirements, provide a clear quote, and arrange availability.</p>
    <p>If you need immediate assistance, you can call us at <strong>+44 7787 857305</strong>.</p>
    <br />
    <p style={{ marginBottom: "0" }}>Warm regards,</p>
    <p style={{ marginTop: "5px", fontWeight: "bold" }}>The Joseph & Co Team</p>
  </div>
);

// Keep for compatibility with user test snippet
export const EmailTemplate: React.FC<Readonly<{ firstName: string }>> = ({ firstName }) => (
  <div style={{ fontFamily: "Arial, sans-serif", color: "#120f0c" }}>
    <h2 style={{ color: "#2b454e" }}>Hello {firstName},</h2>
    <p>This is a test of the Resend React email template integration for Joseph & Co.</p>
    <p>The booking system automation flow is working correctly!</p>
    <br />
    <p>Warm regards,</p>
    <p><strong>The Joseph & Co Team</strong></p>
  </div>
);

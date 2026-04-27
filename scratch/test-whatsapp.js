
const whatsappPrimary = "447787857305";
const name = "Test User";
const phone = "0123456789";
const email = "test@example.com";
const service = "Deep Cleaning";
const location = "Bristol";
const preferredDate = "Next Monday";
const leadSource = "Contact Page";
const message = "Hello, I need a deep clean.";
const timestamp = new Date().toLocaleString("en-GB", {
  timeZone: "Europe/London",
  dateStyle: "medium",
  timeStyle: "short",
});

const waText = `*New Service Request - Joseph & Co*%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Email:* ${email}%0A*Service:* ${service || "Not specified"}%0A*Location:* ${location || "Not specified"}%0A*Preferred Date:* ${preferredDate || "Not specified"}%0A*Lead Source:* ${leadSource}%0A%0A*Message:*%0A${message || "N/A"}%0A%0A*Submitted:* ${timestamp}`;
const waUrl = `https://wa.me/${whatsappPrimary}?text=${waText}`;

console.log("Generated WhatsApp URL:");
console.log(waUrl);

if (waUrl.includes("Test User") && waUrl.includes("Deep Cleaning") && waUrl.includes("Bristol")) {
    console.log("TEST PASSED: URL contains lead data.");
} else {
    console.log("TEST FAILED: URL missing data.");
}

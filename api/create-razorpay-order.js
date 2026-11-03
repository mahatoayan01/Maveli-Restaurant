/**
 * Serverless Function: Create Razorpay Order & Payment Verification
 * Target: Vercel Serverless Function or Netlify Function
 * 
 * To switch to Live Mode:
 * 1. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in your server environment variables.
 * 2. Never expose RAZORPAY_KEY_SECRET on the frontend client.
 */

import crypto from "crypto";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  const { action, amount, currency = "INR", receipt, orderId, paymentId, signature } = req.body;

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return res.status(500).json({ 
      error: "Razorpay server keys not configured in environment.",
      hint: "Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in server environment variables."
    });
  }

  // Action 1: Create Order on Razorpay Server
  if (action === "create-order") {
    try {
      const authHeader = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
      
      const response = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Basic ${authHeader}`
        },
        body: JSON.stringify({
          amount: Math.round(amount * 100), // amount in paise (1 INR = 100 paise)
          currency: currency,
          receipt: receipt || `rcpt_${Date.now()}`,
          payment_capture: 1
        })
      });

      const orderData = await response.json();
      return res.status(200).json(orderData);
    } catch (error) {
      console.error("Razorpay order creation error:", error);
      return res.status(500).json({ error: "Failed to create Razorpay order." });
    }
  }

  // Action 2: Verify Payment Signature (Server-side HMAC-SHA256 validation)
  if (action === "verify-signature") {
    try {
      const generatedSignature = crypto
        .createHmac("sha256", keySecret)
        .update(`${orderId}|${paymentId}`)
        .digest("hex");

      const isSignatureValid = generatedSignature === signature;

      if (isSignatureValid) {
        return res.status(200).json({ status: "verified", valid: true });
      } else {
        return res.status(400).json({ status: "invalid_signature", valid: false });
      }
    } catch (error) {
      console.error("Signature verification error:", error);
      return res.status(500).json({ error: "Failed to verify signature." });
    }
  }

  return res.status(400).json({ error: "Unknown action requested." });
}

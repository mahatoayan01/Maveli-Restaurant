/**
 * Firebase Cloud Function for Razorpay Order Creation and Signature Verification
 */

const functions = require("firebase-functions");
const crypto = require("crypto");
const Razorpay = require("razorpay");

exports.createRazorpayOrder = functions.https.onCall(async (data, context) => {
  const { amount, receipt } = data;

  const key_id = functions.config().razorpay?.key_id || process.env.RAZORPAY_KEY_ID;
  const key_secret = functions.config().razorpay?.key_secret || process.env.RAZORPAY_KEY_SECRET;

  if (!key_id || !key_secret) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "Razorpay API keys not configured in Firebase environment."
    );
  }

  const razorpay = new Razorpay({ key_id, key_secret });

  try {
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // in paise
      currency: "INR",
      receipt: receipt || `rcpt_${Date.now()}`,
      payment_capture: 1,
    });
    return order;
  } catch (error) {
    throw new functions.https.HttpsError("internal", error.message);
  }
});

exports.verifyRazorpayPayment = functions.https.onCall(async (data, context) => {
  const { orderId, paymentId, signature } = data;
  const key_secret = functions.config().razorpay?.key_secret || process.env.RAZORPAY_KEY_SECRET;

  const generatedSignature = crypto
    .createHmac("sha256", key_secret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  if (generatedSignature === signature) {
    return { status: "verified" };
  } else {
    throw new functions.https.HttpsError("invalid-argument", "Invalid payment signature.");
  }
});

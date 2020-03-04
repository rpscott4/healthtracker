const functions = require("firebase-functions");
const admin = require("firebase-admin");
const twilio = require("twilio");

admin.initializeApp();

const db = admin.firestore();

/**
 * Creates a document with ID -> uid in the `Users` collection.
 *
 * @param {Object} userRecord Contains the auth, uid and displayName info.
 * @param {Object} context Details about the event.
 */
const createProfile = (userRecord, context) => {
  const { email, uid } = userRecord;

  return db
    .collection("users")
    .doc(uid)
    .set({ email })
    .catch(console.error);
};

//Twilio Stuff
const accountSid = "AC60e256b3bdfded6b03310feeeaa11fbd";
const authToken = "9bca7156cf98fd9b7b04440671526da1";
const client = new twilio(accountSid, authToken);

const sendSMS = (to, body) => {
  client.messages.create({
    body: body,
    to: "+1" + to,
    from: "+15865224384"
  });
};

module.exports = {
  authOnCreate: functions.auth.user().onCreate(createProfile),
  sendReminder: functions.pubsub.schedule("every day 09:00").onRun(context => {
    sendSMS(
      "4802827143",
      "Take your Health Tracker Survey. https://healthtracker-8243e.web.app/"
    );
    return null;
  }),
  sendInvite: functions.https.onCall((data, context) => {
    sendSMS(data.number, data.message);
    return null;
  })
};

// firebase deploy --only functions

const twilio = require('twilio');

exports.handler = async () => {
  const AccessToken = twilio.jwt.AccessToken;
  const token = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY,
    process.env.TWILIO_API_SECRET
  );

  token.identity = 'StreamBlitzOverlay';

  const syncGrant = new AccessToken.SyncGrant({
    serviceSid: process.env.TWILIO_SERVICE_SID,
  });

  token.addGrant(syncGrant);

  return {
    statusCode: 200,
    body: token.toJwt(),
  };
};

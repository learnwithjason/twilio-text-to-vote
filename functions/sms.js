const qs = require('querystring');
const twilio = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

exports.handler = async (event) => {
  const content = qs.parse(event.body);
  console.log(content.Body);

  // TODO make this an env var
  await twilio.sync
    .services('IS4092c74ea7114dbd561c6788bea4d7cc')
    .documents.create({
      uniqueName: 'LWJ Text To Vote',
    });

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/xml',
    },
    body: `
      <Response>
        <Message>you sent me: ${content.Body}</Message>
      </Response>
    `,
  };
};

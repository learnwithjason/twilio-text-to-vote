const qs = require('querystring');
const twilio = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

exports.handler = async (event) => {
  const content = qs.parse(event.body);
  console.log(content.Body);

  const vote = content.Body.match(/yes/i) ? 'yes' : 'no';

  // TODO make this an env var
  const { data } = await twilio.sync
    .services(process.env.TWILIO_SERVICE_SID)
    .documents('ET1d2de572e051445f8c7ba65a4d12f52b')
    .fetch();

  const newData = {
    ...data,
    [vote]: data[vote] + 1,
  };

  await twilio.sync
    .services('IS4092c74ea7114dbd561c6788bea4d7cc')
    .documents('ET1d2de572e051445f8c7ba65a4d12f52b')
    .update({ data: newData });

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/xml',
    },
    body: `
      <Response>
        <Message>you voted ${vote} on sandwiches</Message>
      </Response>
    `,
  };
};

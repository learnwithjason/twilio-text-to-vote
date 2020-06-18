const qs = require('querystring');

exports.handler = async (event) => {
  const { body } = qs.parse(event.body);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/xml',
    },
    body: `
      <Response>
        <Message>you sent me: ${body}</Message>
      </Response>
    `,
  };
};

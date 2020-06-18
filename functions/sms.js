const qs = require('querystring');

exports.handler = async (event) => {
  const content = qs.parse(event.body);
  console.log(content.Body);

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

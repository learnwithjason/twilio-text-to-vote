exports.handler = async () => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/xml',
    },
    body: `
      <Response>
        <Message>boop!</Message>
      </Response>
    `,
  };
};

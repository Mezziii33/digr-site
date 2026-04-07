exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    var body = JSON.parse(event.body);
    var email = body.email;

    if (!email) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Email required' }) };
    }

    var response = await fetch('https://api.beehiiv.com/v2/publications/pub_56688fa0-d1f4-4765-87b4-45d3a35ccdd3/subscriptions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer LWdSwXKmP0IvWZ3nX0IwpSjgqUYBwJ8ezxQRY9uE8ZgT79PYqWpDO883Ru7aj8UD'
      },
      body: JSON.stringify({
        email: email,
        reactivate_existing: false,
        send_welcome_email: false,
        utm_source: 'landing_page',
        utm_medium: 'organic'
      })
    });

    var data = await response.json();

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ success: true })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};

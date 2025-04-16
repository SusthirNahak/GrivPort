const twilio = require('twilio');

const client = twilio('AC3f6df0bd9356855f8069e30e659fdf86', '308e42bbaf6a2545b77ac6f6d851e627');

async function sendWhatsAppMessage(message) {
  try {
    const response = await client.messages.create({
      from: 'whatsapp:+14155238886',
      to: 'whatsapp:+919348020443',
      body: message,
    });
    checkMessageStatus(response.sid)
    console.log('Message sent!', response.sid);
  } catch (error) {
    console.error('Failed to send message:', error);
  }
}

async function checkMessageStatus(sid) {
  try {
    const message = await client.messages(sid).fetch();
    console.log('📬 Delivery status:', message.status);
  } catch (error) {
    console.error('❌ Failed to check status:', error.message);
  }
}


// Call the function directly
sendWhatsAppMessage('Hello from standalone WhatsApp sender! 🎯');

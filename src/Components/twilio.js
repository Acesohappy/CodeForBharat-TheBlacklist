import twilio from 'twilio';

class TwilioService {
  constructor() {
    // Twilio credentials (use environment variables in production)
    this.accountSid = process.env.TWILIO_ACCOUNT_SID;
    this.authToken = process.env.TWILIO_AUTH_TOKEN;
    this.twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

    // Initialize Twilio client
    this.client = twilio(this.accountSid, this.authToken);
  }

  // Send emergency SMS
  async sendEmergencySMS(emergencyContacts, location) {
    try {
      // Validate inputs
      if (!emergencyContacts || !Array.isArray(emergencyContacts)) {
        throw new Error('Invalid emergency contacts');
      }

      // Send SMS to multiple contacts
      const messages = emergencyContacts.map(contact => 
        this.client.messages.create({
          body: `EMERGENCY ALERT! 🚨

Location: ${location}
GPS Coordinates: ${location.latitude}, ${location.longitude}

User is in potential danger and has activated the SOS feature. Please respond immediately or contact local authorities.

This is an automated emergency message.`,
          from: this.twilioPhoneNumber,
          to: contact.phoneNumber
        })
      );

      // Wait for all messages to be sent
      const results = await Promise.all(messages);
      
      return {
        success: true,
        sentTo: emergencyContacts.map(contact => contact.phoneNumber),
        messageIds: results.map(message => message.sid)
      };
    } catch (error) {
      console.error('SMS Send Error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Send location update SMS
  async sendLocationUpdateSMS(contact, location) {
    try {
      const message = await this.client.messages.create({
        body: `Location Update 📍
Current Location: ${location}
Coordinates: ${location.latitude}, ${location.longitude}
Timestamp: ${new Date().toLocaleString()}`,
        from: this.twilioPhoneNumber,
        to: contact.phoneNumber
      });

      return {
        success: true,
        messageId: message.sid
      };
    } catch (error) {
      console.error('Location Update SMS Error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

export default new TwilioService();
// EmailAuthentication.js
 
// const express = require('express');
// const app = express();
// app.use(express.json());
// const NEVERBOUNCE_API_KEY = 'public_317525200d932ba8b533dc62e629b029';
// async function verifyEmailDirectly(email) {
//     if (!email) {
//         console.error('Email is required');
//         return;
//     }

//     try {
//         const params = new URLSearchParams({
//             key: NEVERBOUNCE_API_KEY,
//             email: email,
//         });

//         const response = await fetch(`https://api.neverbounce.com/v4/single/check?${params}`);
//         const result = await response.json();

//         console.log('Verification Result:', {
//             verdict: result.result,
//             details: result,
//         });

//     } catch (err) {
//         console.error('Verification failed:', err);
//     }
// }
// verifyEmailDirectly('test@example.com');

const dns = require('dns').promises;
const net = require('net');

async function checkEmailExists(email) {
  try {
    // Step 1: Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { valid: false, reason: 'Invalid email format' };
    }

    // Step 2: Extract domain from email
    const domain = email.split('@')[1];

    // Step 3: Resolve MX records for the domain
    const mxRecords = await dns.resolveMx(domain);
    if (!mxRecords || mxRecords.length === 0) {
      return { valid: false, reason: 'No MX records found for domain' };
    }

    // Step 4: (Optional) Attempt SMTP connection to verify mailbox
    const primaryMx = mxRecords.sort((a, b) => a.priority - b.priority)[0].exchange;
    return await verifySmtp(email, primaryMx);
  } catch (error) {
    return { valid: false, reason: `Error checking email: ${error.message}` };
  }
}

async function verifySmtp(email, mxHost) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    let response = '';

    socket.setTimeout(5000); // 5-second timeout

    socket.on('connect', () => {
      socket.write(`HELO localhost\r\n`);
      socket.write(`MAIL FROM:rakeshkumarsahoo398@gmail.com
        \r\n`);
      socket.write(`RCPT TO:<${email}>\r\n`);
    });

    socket.on('data', (data) => {
      response += data.toString();
      if (response.includes('250') || response.includes('251')) {
        socket.write('QUIT\r\n');
        socket.destroy();
        resolve({ valid: true, reason: 'Email likely exists' });
      } else if (response.includes('550') || response.includes('553')) {
        socket.destroy();
        resolve({ valid: false, reason: 'Email does not exist' });
      }
    });

    socket.on('timeout', () => {
      socket.destroy();
      resolve({ valid: false, reason: 'SMTP connection timed out' });
    });

    socket.on('error', (err) => {
      socket.destroy();
      resolve({ valid: false, reason: `SMTP error: ${err.message}` });
    });

    socket.connect(25, mxHost);
  });
}

// Example usage
async function main() {
  const email = 'rakeshkumarsahoo398@gmail.com';
  const result = await checkEmailExists(email);
  console.log(result);
}

main();
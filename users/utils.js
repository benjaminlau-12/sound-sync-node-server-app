import crypto from 'crypto';

export async function sha256(str) {
    // Encode the string as a Uint8Array
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
  
    // Generate the hash
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  
    // Convert the hash to a hexadecimal string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
  
    return hashHex;
  }
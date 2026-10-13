/**
 * Admin account creation utility.
 *
 * Usage:
 *   node server/scripts/create-admin.js
 *
 * You will be prompted for a username and password (password input is hidden).
 * The script outputs a bcrypt hash and the env vars to add to server/.env:
 *
 *   ADMIN_USERNAME=your_username
 *   ADMIN_PASSWORD_HASH=$2a$12$...
 *   JWT_SECRET=your_generated_secret
 */
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import readline from 'readline';

function ask(question, hidden = false) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    if (hidden) {
      const stdin = process.stdin;
      const wasRaw = stdin.isTTY ? stdin.isRaw : false;
      if (stdin.isTTY) stdin.setRawMode(true);

      rl.question(question, (answer) => {
        if (stdin.isTTY) stdin.setRawMode(wasRaw);
        console.log('');
        rl.close();
        resolve(answer);
      });

      // Mask typed characters
      stdin.on('data', (char) => {
        const c = char.toString();
        if (c === '\r' || c === '\n') return;
        if (c === '\u0003') { // Ctrl+C
          process.exit(0);
        }
        process.stdout.write('\r\x1b[2K');
        process.stdout.write(question + '*'.repeat(rl.line.length));
      });
    } else {
      rl.question(question, (answer) => {
        rl.close();
        resolve(answer);
      });
    }
  });
}

async function main() {
  console.log('\n--- Maison Élégance Admin Creation ---\n');

  const username = (await ask('Admin username: ')).trim();
  if (!username) {
    console.error('Username cannot be empty.');
    process.exit(1);
  }

  const password = await ask('Admin password (hidden): ', true);
  if (password.length < 8) {
    console.error('Password must be at least 8 characters.');
    process.exit(1);
  }

  const hash = await bcrypt.hash(password, 12);
  const jwtSecret = crypto.randomBytes(48).toString('hex');

  console.log('\n✓ Admin account generated. Add these to your server/.env:\n');
  console.log(`ADMIN_USERNAME=${username}`);
  console.log(`ADMIN_PASSWORD_HASH=${hash}`);
  console.log(`JWT_SECRET=${jwtSecret}`);
  console.log('\nNever share the password hash or JWT secret.');
}

main();

import bcrypt from 'bcrypt';

// Function to hash a password
const hashPassword = async (password) => {
  try {
    // Generate a salt
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    
    // Hash the password with the salt
    const hashedPassword = await bcrypt.hash(password, salt);
    
    return hashedPassword;
  } catch (error) {
    throw new Error('Error hashing password');
  }
};

export default hashPassword;

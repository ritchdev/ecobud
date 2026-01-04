const firebaseAdmin = require('../config/firebase');
const User = require('../models/user');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    // 1. Verify Firebase ID Token
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
    const { uid, email, name } = decodedToken;

    // 2. Find or Create User by Firebase UID (NOT email)
    let user = await User.findOne({ firebaseUid: uid });

    if (!user) {
      user = await User.create({
        firebaseUid: uid,
        email,
        name: name || 'Firebase User',
        role: 'citizen',
      });
    }

    // 3. Attach user to request
    req.user = user;
    req.firebaseUid = uid;

    next();
  } catch (error) {
    console.error('Firebase Auth Error:', error.message);
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

// Role-based access (this part is fine)
const adminMiddleware = (req, res, next) => {
  if (req.user?.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Admin access required' });
  }
};

module.exports = { protect, admin: adminMiddleware };

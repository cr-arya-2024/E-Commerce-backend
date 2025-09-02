import jwt from 'jsonwebtoken'

const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';
    let token = null;
    if (authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    } else if (req.headers.token) {
      token = req.headers.token;
    }

    if (!token) {
      return res.status(401).json({ success: false, message: "Not authorized. Login again." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const decodedEmail = (decoded.email || '').trim().toLowerCase();
    const adminEmail = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();

    const isRoleAdminWithEmailMatch = decoded.role === 'admin' && decodedEmail === adminEmail;
    const isLegacyAdminId = decoded.id === 'admin';

    if (!isRoleAdminWithEmailMatch && !isLegacyAdminId) {
      return res.status(403).json({ success: false, message: "Forbidden: admin only" });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export default adminAuth;

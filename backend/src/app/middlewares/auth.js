// const jwt = require('jsonwebtoken');
// const { promisify } = require('util');

// const jwtSecret = process.env.JWT_SECRET;

// module.exports = async (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader) {
//     return res.status(401).json({ error: 'Token not provided' });
//   }
//   const [, token] = authHeader.split(' ');

//   try {
//     const decoded = await promisify(jwt.verify)(token, jwtSecret);
//     req.userId = decoded.id;

//     if (typeof req.params.user !== 'undefined' && req.params.user) {
//       if (decoded.id != req.params.user) {
//         return res.status(401).json({ error: 'Usuário com o token inválido' });
//       }
//     }

//     return next();
//   } catch (err) {
//     return res.status(401).json({ error: 'Token invalid' });
//   }
// };
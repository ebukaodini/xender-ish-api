
function success(res, message = 'success', data = [], code = 200) {
  res.status(code);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({
    status: true,
    message: message,
    data: data
  }));
}

function error(res, message = 'success', data = [], code = 200) {
  res.status(code);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({
    status: false,
    message: message,
    data: data
  }));
}

/**
 * method to generate token
 */
function generateToken() {
  let token = ""; count = 0;
  while (count < 6) {
    token += Math.floor(Math.random() * 9 + 1).toString();
    count++;
  }
  return token;
}

module.exports = { success, error, generateToken }
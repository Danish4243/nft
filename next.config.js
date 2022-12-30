const withTM = require("next-transpile-modules")(["@mui/material"]); // As per comment.
const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([withTM], {
  trailingSlash: true,
});

//Simple express server
const express = require('express');
// sets the local environment to port 4000
const port    = process.env.PORT || 4000;
// sets the app to be hosted by express
const app     = express();
// stores the public destination as a var
const dest    = `${__dirname}/public`;

app.use(express.static(dest));

//sends all files to public
app.get('/*', (req, res) => res.sendFile(`${dest}/index.html`));

app.listen(port, () => console.log(`Express has started on port: ${port}`));

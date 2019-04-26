const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const languages = require('./routes/api/languages');
app.use('/api/languages', languages);

if(process.end.NODE_ENV === 'production') {
	app.use(express.static(__dirname + './frontend/public/'));
	
	app.get(/.*/, (req, res) => res.sendFile(__dirname + './frontend/public/index.html'));
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server listening on port %s', port));

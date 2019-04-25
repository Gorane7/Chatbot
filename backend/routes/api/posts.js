const express = require('express');
const mongodb = require('mongodb');

const uri = 'mongodb+srv://user_0:bir_725@cluster0-dtenk.mongodb.net/test?retryWrites=true'

const router = express.Router();

router.get('/', async (req, res) => {
	const languages = await loadLanguagesCollection();
	res.send(await languages.find({}).toArray());
});

router.post('/', async (req, res) => {
	const posts = await loadLanguagesCollection();
	await posts.insertOne({
		name: req.body.text
	});
	res.status(201).send();
});

router.delete('/:id', async (req, res) => {
	const posts = await loadLanguagesCollection();
	await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
	res.status(200).send();
});

async function loadLanguagesCollection() {
	const client = await mongodb.MongoClient.connect(uri, {useNewUrlParser: true});
	return client.db('chatbot').collection('languages');
}

module.exports = router;

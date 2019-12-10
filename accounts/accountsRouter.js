const express = require('express');

const knex = require('../data/dbConfig');

const router = express.Router();

router.get('/', (req, res) => {
	knex
		.select('*')
        .from('accounts')
		.then((accounts) => {
			res.status(200).json(accounts);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ errorMessage: 'there was an error trying to retrive all accounts' });
		});
});

router.get('/:id', (req, res) => {
	knex
		('accounts')
		.where({ id: req.params.id })
		.first()
		.then((account) => {
			res.status(200).json(account);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ errorMessage: 'There was an error trying to retrieve all accounts using the account id' });
		});
});

router.post('/', (req, res) => {
	const accountData = req.body;
	knex('accounts')
        .insert(req.body, 'id')
        .then(([id]) => id)
        .then(id => {
            knex('accounts')
            .where({ id })
            .first()
            .then(account => {
                res.status(201).json(account);
            });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ errorMessage: 'There was an error with POST of that account data' });
        });
});

router.put('/:id', (req, res) => {
	const { id } = req.params;
	const changes = req.body;
	knex('accounts')
		.where({ id })
		.update(changes)
		.then((count) => {
			res.status(200).json({ message: `${count} record(s) updated` });
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ errorMessage: 'There was an error updating or PUTing that ACCOUNT' });
		});
});

router.delete('/:id', (req, res) => {
	knex('accounts')
		.where({ id: req.params.id })
		.del()
		.then((count) => {
			if (count > 0) {
				res.status(200).json({ message: `${count} record(s) deleted` });
			} else {
				res.status(404).json({ message: 'There was no account with that id in our database' });
			}
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ errorMessage: 'Some other error trying to delete that account other than the ID not being there idk sorry bud' });
		});
});

module.exports = router;
const fs = require('fs');
const express = require('express');

const app = express();
const PORT = 5000;

app.use(express.json());

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours.json`, 'utf-8'));

app.get('/api/v1/tours', (req, res) => {
	res.status(200).json({
		status: 'success',
		results: tours.length,
		data: {
			tours
		}
	});
});

app.get('/api/v1/tours/:tourId', (req, res) => {

	const { tourId } = req.params;
	const tour = tours.find(el => el.id === parseInt(tourId));

	// if (parseInt(tourId) > tours.length) {
	if (!tour) {
		return res.status(404).json({
			status: 'failed',
			data: 'Invalid ID!'
		})
	}

	res.status(200).json({
		status: 'success',
		data: tour
	});

});

app.post('/api/v1/tours', (req, res) => {

	const newId = tours[tours.length - 1].id + 1;

	const newTour = Object.assign({ id: newId }, req.body);

	tours.push(newTour);

	fs.writeFile(`${__dirname}/dev-data/data/tours.json`, JSON.stringify(tours), err => {

		if (err) console.log('error', err.message);

		res.status(201).json({
			status: 'success',
			data: {
				tour : newTour
			}
		})
	})

	console.log('newTour-->', newTour);
});

// PUT - update the entire object.
// PATCH - properties to update from a specific object.
app.patch('/api/v1/tours/:id', (req, res) => {

	const id = parseInt(req.params.id);
	const tour = tours.find(el => el.id === id);

	if (!tour) {
		return res.status(404).json({
			status: 'failed',
			data: 'Could not find the tour!'
		});
	}

	const updatedTour = Object.assign(tour, req.body);
	const indexOfElement = tours.findIndex(el => el.id === id);
	tours.splice(indexOfElement, 1, updatedTour);

	fs.writeFile(`${__dirname}/dev-data/data/tours.json`, JSON.stringify(tours), (err => {

		if (err) console.log('error', err.message);

		res.status(201).json({
			status: 'success',
			data: updatedTour
		});
	}));

});

app.delete('/api/v1/tours/:id', (req, res) => {

	const id = parseInt(req.params.id);
	const tour = tours.findIndex(el => el.id === id);

	if (tour < 0) {
		return res.status(404).json({
			status: 'failed',
			data: 'Could not find the tour'
		});
	}

	tours.splice(tour, 1);

	fs.writeFile(`${__dirname}/dev-data/data/tours.json`, JSON.stringify(tours), (err => {
		if (err) console.log(err.message);

		res.status(204).json({
			status: 'succes',
			data: 'null'
		});
	}))

});

app.listen(PORT, () => {
	console.log(`The app is running at port : ${PORT}...`);
});

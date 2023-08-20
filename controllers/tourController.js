const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours.json`, 'utf-8'));

exports.getAllTours = (req, res) => {
	res.status(200).json({
		status: 'success',
		results: tours.length,
		data: {
			tours
		}
	});
}

exports.getTour = (req, res) => {

	const { id } = req.params;
	const tour = tours.find(el => el.id === parseInt(id));

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
}

exports.createTour = (req, res) => {

	const newId = tours[tours.length - 1].id + 1;
	const newTour = Object.assign({ id: newId }, req.body);
	tours.push(newTour);

	fs.writeFile(`${__dirname}/../dev-data/data/tours.json`, JSON.stringify(tours), err => {

		if (err) console.log('error', err.message);

		res.status(201).json({
			status: 'success',
			data: {
				tour : newTour
			}
		});
	});
}

exports.updateTour = (req, res) => {

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

	fs.writeFile(`${__dirname}/../dev-data/data/tours.json`, JSON.stringify(tours), (err => {

		if (err) console.log('error', err.message);

		res.status(201).json({
			status: 'success',
			data: updatedTour
		});
	}));
}

exports.deleteTour = (req, res) => {

	const id = parseInt(req.params.id);
	const tour = tours.findIndex(el => el.id === id);

	if (tour < 0) {
		return res.status(404).json({
			status: 'failed',
			data: 'Could not find the tour'
		});
	}

	tours.splice(tour, 1);

	fs.writeFile(`${__dirname}/../dev-data/data/tours.json`, JSON.stringify(tours), (err => {
		if (err) console.log(err.message);

		res.status(204).json({
			status: 'succes',
			data: 'null'
		});
	}));
}
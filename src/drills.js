require('dotenv').config()
const knex = require('knex')

const knexInstance = knex({
	client: 'pg',
	connection: process.env.DB_URL
})

// Get all items that contain text
function getSearch(searchTerm) {
	knexInstance
		.select('*')
		.from('shopping_list')
		.where('name', 'ILIKE', `%${searchTerm}%`)
		.then(res => console.log(res));
}

// getSearch('ham');

// Get all items paginated
function paginate(pageNumber) {
	const perPage = 6;
	const offset = perPage * (pageNumber - 1);
	knexInstance
		.select('*')
		.from('shopping_list')
		.limit(perPage)
		.offset(offset)
		.then(res => console.log(res));
}

// paginate(2);

// Get all items added after date
function afterDate(daysAgo) {
	knexInstance
		.select('*')

		.where(
			'date_added',
			'>',
			knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
		)
		.from('shopping_list')
		.then(res => console.log(res));
}

// afterDate(10);

//total cost for each category
function totalCost() {
	knexInstance
		.from('shopping_list')
		.select('category')
		.sum('price as total')
		.groupBy('category')
		.then(res => console.log(res));
}

totalCost();
const Car = require('../../../database/models/Car');
const sequelize = require('../../../database/config');

// Inicializa o banco de dados
sequelize.sync()
    .then(() => console.log('Database synchronized'))
    .catch(err => console.error('Error synchronizing database:', err));

export async function GET(request) {
    try {
        const cars = await Car.findAll();
        return new Response(JSON.stringify(cars), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

export async function POST(request) {
    try {
        const data = await request.json();
        const car = await Car.create(data);
        return new Response(JSON.stringify(car), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

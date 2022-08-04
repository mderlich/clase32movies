const db = require('../database/models');
const sequelize = db.sequelize;

//Otra forma de llamar a los modelos
const Movies = db.Movie;

const moviesController = {

    list: async function (req, res) {
        const movies = await db.Movie.findAll();
        res.render('moviesList', {movies})
    },

    detail: async function (req, res) {
        const movie = await db.Movie.findByPk(req.params.id)
        res.render('moviesDetail', {movie});
    },

    new: async function (req, res) {
        const movies = await db.Movie.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
        res.render('newestMovies', {movies});
    },

    recomended: async function (req, res) {
        const movies = await db.Movie.findAll({
            where: {
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
        
        res.render('recommendedMovies', {movies});
    
    }, 
    
    // *****************************************
    // CRUD
    // *****************************************

    add: function (req, res) {
        
        res.render('moviesAdd');

    },

    create: async function (req, res) {
        
        await db.Movie.create({
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            release_date: req.body.release_date,
            length: req.body.length
        });

        res.redirect('/movies');

    },

    edit: async function(req, res) {
        
        const Movie = await db.Movie.findByPk(req.params.id)
        res.render('moviesEdit', { Movie });
        
    },

    update: async function (req,res) {

        await db.Movie.update(
        {
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            release_date: req.body.release_date,
            length: req.body.length
        },
        {
            where: { id: req.params.id }
        }
        )

        res.redirect('/movies');

    },
    delete: async function (req, res) {

        const Movie = await db.Movie.findByPk(req.params.id)
        res.render('moviesDelete', { Movie });

    },
    destroy: async function (req, res) {
        
        await db.Movie.destroy({
            where: {id: req.params.id}
        })
        
    }

}

module.exports = moviesController;
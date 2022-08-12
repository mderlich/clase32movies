const db = require('../database/models');

/* 
Otra forma de denominar...
const sequelize = db.sequelize;
const Movies = db.Movie;
const Genres = db.Genre;
*/

const moviesController = {

    list: async function (req, res) {
        const movies = await db.Movie.findAll();
        res.render('moviesList', {movies})
    },

    detail: async function (req, res) {

        const movie = await db.Movie.findByPk(req.params.id)

        let parseDate = {
            year: movie.release_date.getFullYear(),
            month: ("0" + (movie.release_date.getMonth() + 1)).slice(-2),
            day: ("0" + movie.release_date.getDate().toString()).slice(-2)
        }

        res.render('moviesDetail', {movie, parseDate});
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

    add: async function (req, res) {
        
        const allGenres = await db.Genre.findAll()
        res.render('moviesAdd',{ allGenres });

    },

    create: async function (req, res) {
        
        await db.Movie.create({
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            release_date: req.body.release_date,
            length: req.body.length,
            genre_id: req.body.genre_id,
        });

        res.redirect('/movies');

    },

    edit: async function(req, res) {
        
        const Movie = await db.Movie.findByPk(req.params.id);
        const allGenres = await db.Genre.findAll();

        let parseDate = {
            year: Movie.release_date.getFullYear(),
            month: ("0" + (Movie.release_date.getMonth() + 1)).slice(-2),
            day: ("0" + Movie.release_date.getDate().toString()).slice(-2)
        }

        res.render('moviesEdit', { Movie, allGenres, parseDate });
        
    },

    update: async function (req,res) {

        await db.Movie.update(
        {
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            release_date: req.body.release_date,
            length: req.body.length,
            genre_id: req.body.genre_id,
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
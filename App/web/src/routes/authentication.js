const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isLoggedIn } = require('../lib/auth');
const { isNotLoggedIn } = require('../lib/auth');
const pool = require('../database');

router.get('/signup', isNotLoggedIn, (req, res) => {
    res.render('auth/signup');
});

router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.get('/signin', isNotLoggedIn, (req, res) => {
    res.render('auth/signin');

});

router.post('/signin', isNotLoggedIn, (req, res, next) => {

    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
});

router.get('/profile', isLoggedIn, async(req, res) => {
    if (req.user.id == 1) {
        res.redirect('admin')
    } else {
        const bookings = await pool.query('SELECT * FROM bookings WHERE user_id = ?', [req.user.id]);
        console.log(bookings);
        res.render('profile', { bookings });
    }
});

router.post('/profile', (req, res) => {

})

router.get('/logout', isLoggedIn, (req, res) => {
    req.logOut();
    res.redirect('/signin');
});

router.get('/home', isLoggedIn, (req, res) => {
    res.render('home');
});

router.get('/booking', isLoggedIn, (req, res) => {
    res.render('booking');
});

router.post('/booking', isLoggedIn, async(req, res) => {
    const { bk_date, phone } = req.body;
    const newLink = {
        bk_date,
        user_name: req.user.username,
        phone,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO bookings set ?', [newLink]);
    req.flash('success', 'Link saved successfully');
    res.redirect('/profile');
});

router.get('/contact', isLoggedIn, (req, res) => {
    res.render('contact');
});

router.get('/events', isLoggedIn, async(req, res) => {
    const events = await pool.query('SELECT * FROM events');
    console.log(events);
    res.render('events', { events });

});

router.get('/admin', isLoggedIn, async(req, res) => {
    const bookings = await pool.query('SELECT * FROM bookings');
    console.log('BOOKINGS: ' + bookings);
    const events = await pool.query('SELECT * FROM events');
    console.log('EVENTS: ' + events);
    res.render('admin', { bookings, events });

});

router.get('/events_admin', isLoggedIn, (req, res) => {
    res.render('events_admin');
});

router.post('/events_admin', isLoggedIn, async(req, res) => {
    const { event_name, event_date, description, phone } = req.body;
    const newLink = {
        event_name,
        event_date,
        description,
        phone,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO events set ?', [newLink]);
    req.flash('success', 'Link saved successfully');
    res.redirect('/admin');
});

router.get('/event_delete/:id', isLoggedIn, async(req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM events WHERE ID = ?', [id]);
    req.flash('success', 'Event removed successfully');
    res.redirect('/admin');
});


module.exports = router;
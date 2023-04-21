import express from "express";
import bcrypt from "bcrypt";
import passport from "passport";
import passportLocal from "passport-local";

const authentication = express.Router()

const db = []
passport.use( new passportLocal.Strategy( {
    usernameField: 'email'
}, async (email, password, done) => {
    const user = db.find( item => item.email === email )
    if (user === undefined) {
        return done( null, null, {msg: 'incorrect email'} )
    }
    
    if (await bcrypt.compare( password, user.password )) {
        return done( null, user )
    }
    
    return done( null, null, {msg: 'incorrect password'} )
} ) );

passport.serializeUser( (user, done) => {
    done( null, user.id )
} );

passport.deserializeUser( (id, done) => {
    done( null, db.find( item => item.id === id ) )
} );

authentication.get( '/', (req, res) => {
    res.send( 'login' )
} )

authentication.post( '/signUp', async (req, res) => {
    const user = req.body;
    user.password = await bcrypt.hash( req.body.password, 10 );
    user.id = `${Date()}_${Math.random()}`
    db.push( user )
    res.send( req.body )
} )

authentication.post( '/login', passport.authenticate( 'local' ), (req, res) => {
    res.send( req.body )
} )

export default authentication

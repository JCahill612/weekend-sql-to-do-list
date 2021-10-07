// requires
const express = require( 'express' );
const app = express();
const bodyParser = require( 'body-parser' );
// must require modules to use 'em
const pool = require( './modules/pool' );
// uses
app.use( express.static( 'server/public' ) );
app.use( bodyParser.urlencoded( { extended: true } ) );
// globals
const port = 5000;
// spin up server
app.listen( port, ()=>{
    console.log( 'server is up on:', port );
})
// routes
app.get( '/', ( req, res )=>{
    console.log( 'get route hit' );
    res.send( 'meow' );
})

app.get( '/counter', ( req, res )=>{
    console.log( '/counter GET hit' );
    res.send( 'woof' );
})


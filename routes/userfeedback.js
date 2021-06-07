var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');
//const status = require('http-status');
var  moment =require('moment');

router.get('/', function(req, res, next) {
      
    dbConn.query('SELECT * FROM userfeedback ORDER BY id desc',function(err,rows)     {
 
        if(err) {
            req.flash('error', err);
            
            res.render('userfeedback',{data:''});   
        } else {
            
            res.render('userfeedback',{data:rows});
        }
    });
});

// display add feedback page
router.get('/add', function(req, res, next) {    
    // render to add.ejs
    res.render('userfeedback/add', {
        name: '',
       feedback : '',
       rating:''  ,
      // time     :''
    })
})

// add a new feedback
router.post('/add', function(req, res, next) {    

    let name = req.body.name;
    let feedback = req.body.feedback;
    let rating =req.body.rating;
    //let time =req.body.time;
    let errors = false;

    if(name.length === 0 || feedback.length === 0  || rating.length === 0  )  {
        errors = true;

        // set flash message
        req.flash('error', "Please enter name , feedback and rating");
        // render to add.ejs with flash message
        res.render('userfeedback/add', {
            name: name,
           feedback: feedback,
           rating:rating,
           //time:time
        })
    }

    // if no error
    if(!errors) {

        var form_data = {
            name: name,
            feedback: feedback,
            rating:rating,
           // time:time
        }
        
        // insert query
        dbConn.query('INSERT INTO userfeedback SET ?', form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                 
                // render to add.ejs
                res.render('userfeedback/add', {
                    name: form_data.name,
                    feedback: form_data.feedback,
                    rating: form_data.rating,
                   // time: form_data.time
                })
            } else {                
                req.flash('success', '');
                res.redirect('/userfeedback');
            }
        })
    }
})

// display edit  page
router.get('/edit/(:id)', function(req, res, next) {

    let id = req.params.id;
   
    dbConn.query('SELECT * FROM userfeedback WHERE id = ' + id, function(err, rows, fields) {
        if(err) throw err
         
        // if user not found
        if (rows.length <= 0) {
            req.flash('error', 'feedback form not found with id = ' + id)
            res.redirect('/userfeedback')
        }
        // if  found
        else {
            // render to edit.ejs
            res.render('userfeedback/edit', {
                title: 'Edit ', 
                id: rows[0].id,
                name: rows[0].name,
                feedback: rows[0].feedback,
                rating: row[0].rating,
                //time: row[0].time
            })
        }
    })
})

// update data
router.post('/update/:id', function(req, res, next) {

    let id = req.params.id;
    let name = req.body.name;
    let feedback = req.body.feedback;
    let rating = req.body.rating;
  //  let time= req.body.time;
    let errors = false;

    if(name.length === 0 || feedback.length === 0 || rating.length === 0 )  {
        errors = true;
        
        // set flash message
        req.flash('error', "Please enter name ,feedback and rating");
        // render to add.ejs with flash message
        res.render('userfeedback/edit', {
            id: req.params.id,
            name: name,
            feedback:feedback,
            rating:rating
           // time:time
        })
    }

    // if no error
    if( !errors ) {   
 
        var form_data = {
            name: name,
            feedback:feedback,
            rating:rating
    //        time:time
        }
        // update query
        dbConn.query('UPDATE userfeedback SET ? WHERE id = ' + id, form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                // set flash message
                req.flash('error', err)
                // render to edit.ejs
                res.render('userfeedback/edit', {
                    id: req.params.id,
                    name: form_data.name,
                    feedback: form_data.feedback,
                    rating: form_data.rating
      //              time: form_data.time
                })
            } else {
                req.flash('success', 'your feedback form is successfully updated');
                res.redirect('/userfeedback');
            }
        })
    }
})
   
// delete book
router.get('/delete/(:id)', function(req, res, next) {

    let id = req.params.id;
     
    dbConn.query('DELETE FROM userfeedback WHERE id = ' + id, function(err , result) {
        //if(err) throw err
        if (err) {
            // set flash message
            //return res.send(status.INTERNAL_SERVER_ERROR);
            req.flash('error', err)
            // redirect to books page
            res.redirect('/userfeedback')
        } else {
            // set flash message
            req.flash('success', ' ' + id)
            // redirect to books page
            
           // res.send(msg, status.OK);
            res.redirect('/userfeedback')
        }
    })
})

module.exports = router;
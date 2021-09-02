const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');

const https = require('https');
const request = require('request');
const api=require('./Razorpay_key');
const Razorpay = require('razorpay-node-master');
// const Razorpay = require('https://api.razorpay.com/v1/payment_links/');
// app.get('https://api.razorpay.com/v1/payment_links')



const app=express();
const rzp= new Razorpay({
	key_id:api.key,
	key_secret:api.secrete,
	headers:{"Content-Type": "application/json"}
	});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors())

//index route of the server:
app.get('/',function(req,resp){
	resp.send("Your server is running.")
});



app.post('/requestPaymentLink',function(req,resp){
	

	// let data = JSON.parse(JSON.stringify(req.body))

// console.log(data);

	let url = req.body.url
	let method = req.body.method
	let username = api.key
	let password = api.secrete

	if(req.body.username!=undefined && req.body.password!=undefined){
		username = req.body.username
		password = req.body.password
	}



	var options = {
		url: url,
		method:method,
		headers: {
			// "Content-Type": "application/json",
		   'Authorization': 'Basic ' + new Buffer(username + ':' + password).toString('base64'),
		   "Content-Type": "application/json"
		},
		json:true,
		body:req.body.body
	 };

	 

	request(options, (err, res, body) => {
		if (err) {
			resp.status(res.statusCode).send(err)
		}
		
		resp.status(res.statusCode).send(body)
	})
});


//Payment route:
// app.use('/payment',require('./paymentsApi'));


const PORT = process.env.PORT || 3000
app.listen(PORT);
console.log(`localhost started on the PORT:${PORT}`);

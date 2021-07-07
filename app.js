
var express= require("express");
var bodyparser= require("body-parser");
var mongoose= require("mongoose");
//var Campground=require("Campground");
var seedDB= require("seed");
var app=express();

mongoose.connect("mongodb://localhost/yelpcamp2"); //connecting to database

app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");
seedDB();

var campgroundSchema= new mongoose.Schema({			
	name: String,
	image: String,
	description: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
       ref: "Comment"
    }]
});												

var Campground = mongoose.model("Campground",campgroundSchema); 


 app.listen(3000,function(){
 	console.log("Yelpcamp_server has started on port 3000");
 });

app.get("/", function(req,res){
	res.render("home");
});

 app.get("/signup",function(req,res){
 	res.render("signup");
 });

 app.get("/login",function(req,res){
 	res.render("login");
 });

 app.get("/campground",function(req,res){                   //rendering campground page with data
 	Campground.find({}, function(err,allcamps){
 		if(err)
 		{
 			console.log(err);
 		}
 		else
 		{
 			res.render("campground", {campground: allcamps});
 		}
 	});
 });

app.post("/campground", function(req,res){ 				//collecting data from newcampground page

	var name= req.body.name;
	var image= req.body.image;
	var description= req.body.description;
    var comment=[{author:"tarak", text: "help me!!!!!"}];
	var newdata={name: name, image: image, description: description};

	Campground.create(newdata,
							function(err,newcamp){
							if (err) 
							{
						console.log(err);
						}
							else
								{
									console.log(newdata);
								}
       					 })
      res.redirect("/campground");
   					 });
							

 app.get("/newcampground",function(req,res){
 	res.render("newcampground");
 });

app.get("/campground/:id",function(req,res){

		Campground.findById(req.params.id,function(err,findcamp){
			if(err)
			{
				console.log(err);
			}
			else
			{    console.log("this is 2nd");
                console.log(findcamp);
				res.render("show", {foundcamp :findcamp});
			}

		});

});

app.get("/campground/:id/comments/new", function(req,res){
    res.render("newcomment");
});



app.get("*",function(req,res){
	res.send("Page not found");
});
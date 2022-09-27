const express = require("express")
const bodyParser = require("body-parser")
const request = require("request");
const https = require("https")
const { options } = require("request");
const { json } = require("express");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", function (req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscriber",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }
    const jsonData = JSON.stringify(data);
    const url = "https://us13.api.mailchimp.com/3.0/lists/39084f4c4f"
    const options = {
        method: "POST",
        auth: "vivek:53068c9d70c599f48064d085f41020c8-us13"
    }
    const request = https.request(url, options, function (response) {
        if (response.statusCode === 200) {
            res.send(__dirname + "/sucess.html")
        } else {
            res.send(__dirname + "/failure.html")
        }

        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();

})

app.listen(process.env.PORT || 3000, function () {
    console.log("server started on port 4000");
})

//API Key
//  53068c9d70c599f48064d085f41020c8-us13
//   39084f4c4f.
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/users");
const articleRoute = require("./routes/article");
const commentRoute = require("./routes/comment");
var hateoasLinker = require("express-hateoas-links");

dotenv.config();

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.DATABASE);
}

app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/articles", articleRoute);
app.use("/api/comments", commentRoute);

// hateoasLinker(app);
app.use(hateoasLinker);
app.get("/", function (req, res) {
  // create an example JSON Schema
  var personSchema = {
    name: "Mohammed Atef",
    description:
      "This JSON Schema defines the parameters required to create a Person object",
    properties: {
      name: {
        title: "hello world",
        description: "web services course",
        type: "string",
        maxLength: 30,
        minLength: 1,
        required: true,
      },
      jobTitle: {
        title: "Job Title",
        type: "string",
      },
      telephone: {
        title: "Telephone Number",
        description: "Please enter telephone number including country code",
        type: "string",
        required: true,
      },
    },
  };

  // call res.json as normal but pass second param as array of links
  res.json(personSchema, [
    { rel: "self", method: "GET", href: "http://127.0.0.1" },
    {
      rel: "create",
      method: "POST",
      title: "Create Person",
      href: "http://127.0.0.1/person",
    },
  ]);
});

app.listen(8000, () => {
  console.log("Backend server is running !");
});

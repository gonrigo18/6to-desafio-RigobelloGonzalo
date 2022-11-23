const express = require("express");
const Contenedor = require("./container");
const handlebars = require("express-handlebars");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./views/layouts"));

const products = new Contenedor(__dirname + "/data/products.json");
const messages = []

app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    partialsDir: __dirname + "/views/partials",
  })
);
app.set("views", "./views");
app.set("views engine", "hbs");

app.get("/", (req, res) => {
  let content = products.content;
  let boolean = content.length !== 0;
  return res.render("layouts/main.hbs", {
    list: content,
    showList: boolean,
  });
});

app.post("/", (req, res) => {
  products.save(req.body);
  let content = products.content;
  let boolean = content.length !== 0;
  return res.render("layouts/main.hbs", { list: content, showList: boolean });
});

const port = 8080;

const server = httpServer.listen(port, () =>{
    console.log (`Server listening en http://localhost:${port}`);
});

/* CHAT */
io.on("connection", (socket) => {
    socket.emit("messages", messages);
  
    socket.on("new-message", (data) => {
      data.time = new Date().toLocaleString();
      messages.push(data);
      io.sockets.emit("messages", [data]);
    });
  });
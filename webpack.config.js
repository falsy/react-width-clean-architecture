const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      constants: path.resolve(__dirname, "./src/constants/"),
      adapters: path.resolve(__dirname, "./src/adapters/"),
      di: path.resolve(__dirname, "./src/di/index.ts"),
      utils: path.resolve(__dirname, "./src/utils/"),
      pages: path.resolve(__dirname, "./src/pages/"),
      hooks: path.resolve(__dirname, "./src/hooks/"),
      containers: path.resolve(__dirname, "./src/containers/"),
      components: path.resolve(__dirname, "./src/components/")
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./dist/index.html"
    })
  ],
  devServer: {
    compress: true,
    port: 9000,
    setupMiddlewares: (middlewares, devServer) => {
      const todoList = [
        { id: 1, title: "todo1" },
        { id: 2, title: "todo2" }
      ]

      devServer.app.use(require("express").json())
      devServer.app.post("/api/login", function (req, res) {
        const { id, pw } = req.body
        setTimeout(() => {
          if (id !== "" || pw !== "") {
            res.json({ isError: false, data: "mock-jwt-token" })
          } else {
            res
              .status(401)
              .json({ isError: true, message: "Invalid credentials" })
          }
        }, 1000)
      })
      devServer.app.get("/api/todos", function (req, res) {
        setTimeout(() => {
          res.json({
            isError: false,
            data: todoList
          })
        }, 1000)
      })
      devServer.app.post("/api/todo", function (req, res) {
        const { title } = req.body
        todoList.push({ id: todoList.length + 1, title })
        setTimeout(() => {
          res.json({
            isError: false
          })
        }, 1000)
      })
      return middlewares
    },
    historyApiFallback: true
  }
}

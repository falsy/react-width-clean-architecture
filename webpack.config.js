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
      devServer.app.use(require("express").json())
      devServer.app.use("/api/user", function (req, res) {
        setTimeout(() => {
          res.json({
            isError: false,
            data: {
              id: "user1",
              name: "Falsy",
              email: "mail@mail.com",
              phone: "",
              address: ""
            }
          })
        }, 200)
      })
      devServer.app.use("/api/transactions", function (req, res) {
        setTimeout(() => {
          res.json({
            isError: false,
            data: [
              {
                id: "txn1",
                amount: 1000,
                keyword: "McDonald's",
                categoryId: "category1",
                cardId: "card1",
                createdAt: "2024-01-01 00:00:00"
              },
              {
                id: "txn2",
                amount: 2000,
                keyword: "Starbucks",
                categoryId: "category1",
                cardId: "card2",
                createdAt: "2024-01-02 00:00:00"
              },
              {
                id: "txn3",
                amount: 1500,
                keyword: "Withdrawal",
                categoryId: "category5",
                accountId: "account1",
                createdAt: "2024-01-03 00:00:00"
              },
              {
                id: "txn4",
                amount: 3000,
                keyword: "Burger King",
                categoryId: "category1",
                cardId: "card1",
                createdAt: "2024-01-04 00:00:00"
              }
            ]
          })
        }, 200)
      })
      devServer.app.use("/api/txnCategories", function (req, res) {
        setTimeout(() => {
          res.json({
            isError: false,
            data: [
              {
                id: "category1",
                name: "Food",
                description: "Food and beverage"
              },
              {
                id: "category5",
                name: "Withdrawal",
                description: "Withdraw money from account"
              }
            ]
          })
        }, 200)
      })
      devServer.app.use("/api/cards", function (req, res) {
        setTimeout(() => {
          res.json({
            isError: false,
            data: [
              {
                id: "card1",
                cardType: "CREDIT",
                cardCompany: "CitiBank",
                cardNumber: "4*2*"
              },
              {
                id: "card2",
                cardType: "CREDIT",
                cardCompany: "CitiBank",
                cardNumber: "1*3*"
              }
            ]
          })
        }, 200)
      })
      devServer.app.use("/api/accounts", function (req, res) {
        setTimeout(() => {
          res.json({
            isError: false,
            data: [
              {
                id: "account1",
                accountType: "CURRENT",
                bankName: "CitiBank",
                accountNumber: "5*5*",
                balance: 10000
              },
              {
                id: "account2",
                accountType: "CURRENT",
                bankName: "CitiBank",
                accountNumber: "6*2*",
                balance: 20000
              }
            ]
          })
        }, 200)
      })
      return middlewares
    },
    historyApiFallback: true
  }
}

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
      const transactions = [
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
          categoryId: "category2",
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

      devServer.app.use(require("express").json())
      devServer.app.use("/api/user", function (req, res) {
        setTimeout(() => {
          res.json({
            isError: false,
            data: {
              id: "user1",
              name: "Developer",
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
            data: transactions
          })
        }, 500)
      })

      devServer.app.use("/api/transaction", function (req, res) {
        const { amount, keyword, categoryId, cardId, accountId } =
          req.body.transaction

        const makeDateSet = () => {
          const date = new Date()
          const year = date.getFullYear()
          const month = (date.getMonth() + 1).toString().padStart(2, "0")
          const day = date.getDate().toString().padStart(2, "0")
          const hour = date.getHours().toString().padStart(2, "0")
          const minute = date.getMinutes().toString().padStart(2, "0")
          const second = date.getSeconds().toString().padStart(2, "0")
          return `${year}-${month}-${day} ${hour}:${minute}:${second}`
        }

        const newTransaction = {
          id: `txn${transactions.length + 1}`,
          amount,
          keyword,
          categoryId,
          cardId,
          accountId,
          createdAt: makeDateSet()
        }

        transactions.push(newTransaction)

        setTimeout(() => {
          res.json({
            isError: false,
            data: true
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
                name: "category1",
                description: "Food and beverage"
              },
              {
                id: "category2",
                name: "category2",
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
                cardCompany: "Financial",
                cardNumber: "4*2*"
              },
              {
                id: "card2",
                cardType: "CREDIT",
                cardCompany: "Financial",
                cardNumber: "1*3*"
              },
              {
                id: "card3",
                cardType: "DEBIT",
                cardCompany: "Financial",
                cardNumber: "5*3*"
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
                bankName: "Financial",
                accountNumber: "5*5*",
                balance: 10000
              },
              {
                id: "account2",
                accountType: "SAVINGS",
                bankName: "Financial",
                accountNumber: "6*2*",
                balance: 20000
              },
              {
                id: "account3",
                accountType: "CURRENT",
                bankName: "Financial",
                accountNumber: "8*4*",
                balance: 30000
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

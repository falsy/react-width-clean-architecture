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
          keyword: "hambuger",
          franchise_id: "franchise1",
          card_id: "card1",
          location: {
            name: "City",
            latitude: 37.5665,
            longitude: 126.978
          },
          updated_at: "2024-01-01T00:00:00",
          created_at: "2024-01-01T00:00:00"
        },
        {
          id: "txn2",
          amount: 2000,
          keyword: "Store2",
          card_id: "card2",
          location: {
            name: "City",
            latitude: 37.5665,
            longitude: 126.978
          },
          updated_at: "2024-01-02T00:00:00",
          created_at: "2024-01-02T00:00:00"
        },
        {
          id: "txn3",
          amount: 1500,
          keyword: "Withdrawal",
          account_id: "account1",
          location: {
            name: "City",
            latitude: 37.5665,
            longitude: 126.978
          },
          updated_at: "2024-01-03T00:00:00",
          created_at: "2024-01-03T00:00:00"
        },
        {
          id: "txn4",
          amount: 3000,
          keyword: "Store3",
          franchise_id: "franchise2",
          card_id: "card3",
          location: {
            name: "City",
            latitude: 37.5665,
            longitude: 126.978
          },
          updated_at: "2024-01-04T00:00:00",
          created_at: "2024-01-04T00:00:00"
        },
        {
          id: "txn5",
          amount: 5000,
          keyword: "Store4",
          franchise_id: "franchise2",
          card_id: "card3",
          location: {
            name: "City",
            latitude: 37.5665,
            longitude: 126.978
          },
          updated_at: `${new Date().getFullYear()}-${String(
            new Date().getMonth() + 1
          ).padStart(2, "0")}-05T00:00:00`,
          created_at: `${new Date().getFullYear()}-${String(
            new Date().getMonth() + 1
          ).padStart(2, "0")}-05T00:00:00`
        },
        {
          id: "txn6",
          amount: 15000,
          keyword: "Store1",
          account_id: "account1",
          location: {
            name: "City",
            latitude: 37.5665,
            longitude: 126.978
          },
          updated_at: `${new Date().getFullYear()}-${String(
            new Date().getMonth() + 1
          ).padStart(2, "0")}-07T00:00:00`,
          created_at: `${new Date().getFullYear()}-${String(
            new Date().getMonth() + 1
          ).padStart(2, "0")}-07T00:00:00`
        }
      ]

      devServer.app.use(require("express").json())
      devServer.app.use("/api/user", function (req, res) {
        setTimeout(() => {
          res.json({
            id: "user1",
            name: "Developer",
            email: "mail@mail.com",
            phone: "",
            address: ""
          })
        }, 200)
      })

      devServer.app.use("/api/transactions", function (req, res) {
        const { year, month } = req.query

        let filteredTransactions = transactions

        if (year && month) {
          filteredTransactions = transactions.filter((txn) => {
            const date = new Date(txn.created_at)
            return (
              date.getFullYear() === parseInt(year) &&
              date.getMonth() + 1 === parseInt(month)
            )
          })
        }

        setTimeout(() => {
          res.json(filteredTransactions)
        }, 500)
      })

      devServer.app.use("/api/transaction", function (req, res) {
        const { amount, keyword, cardId, accountId } = req.body.transaction

        const makeDateSet = () => {
          const date = new Date()
          const year = date.getFullYear()
          const month = (date.getMonth() + 1).toString().padStart(2, "0")
          const day = date.getDate().toString().padStart(2, "0")
          const hour = date.getHours().toString().padStart(2, "0")
          const minute = date.getMinutes().toString().padStart(2, "0")
          const second = date.getSeconds().toString().padStart(2, "0")
          return `${year}-${month}-${day}T${hour}:${minute}:${second}`
        }

        const newTransaction = {
          id: `txn${transactions.length + 1}`,
          amount,
          keyword,
          cardId,
          accountId,
          createdAt: makeDateSet()
        }

        transactions.push(newTransaction)

        setTimeout(() => {
          res.json(true)
        }, 200)
      })

      devServer.app.use("/api/franchises", function (req, res) {
        setTimeout(() => {
          res.json([
            {
              id: "franchise1",
              name: "franchise1",
              address: "address1",
              brand: "brand1"
            },
            {
              id: "franchise2",
              name: "franchise2",
              address: "address2",
              brand: "brand2"
            }
          ])
        }, 200)
      })

      devServer.app.use("/api/cards", function (req, res) {
        setTimeout(() => {
          res.json([
            {
              id: "card1",
              card_type: "CREDIT",
              card_company: "Card1",
              card_number: "4*2*",
              branch: "Branch1",
              created_at: "2023-01-01T00:00:00"
            },
            {
              id: "card2",
              card_type: "CREDIT",
              card_company: "Card2",
              card_number: "1*3*",
              branch: "Branch2",
              created_at: "2023-01-01T00:00:00"
            },
            {
              id: "card3",
              card_type: "DEBIT",
              card_company: "Card3",
              card_number: "5*3*",
              branch: "Branch3",
              created_at: "2023-01-01T00:00:00"
            }
          ])
        }, 200)
      })

      devServer.app.use("/api/accounts", function (req, res) {
        setTimeout(() => {
          res.json([
            {
              id: "account1",
              account_type: "CURRENT",
              bank_name: "Bank1",
              account_number: "5*5*",
              balance: 10000,
              branch: "Branch4",
              created_at: "2023-04-01T00:00:00"
            },
            {
              id: "account2",
              account_type: "SAVINGS",
              bank_name: "Bank2",
              account_number: "6*2*",
              balance: 20000,
              branch: "Branch5",
              created_at: "2023-05-01T00:00:00"
            },
            {
              id: "account3",
              account_type: "CURRENT",
              bank_name: "Bank3",
              account_number: "8*4*",
              balance: 30000,
              branch: "Branch6",
              created_at: "2023-06-01T00:00:00"
            }
          ])
        }, 200)
      })

      return middlewares
    },
    historyApiFallback: true
  }
}

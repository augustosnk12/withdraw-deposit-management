import React from "react";
import ReactDOM from "react-dom";
import { createServer, Model } from "miragejs";

import App from "./App";

createServer({
  //banco de dados do miraje
  models: {
    //aqui são as tabelas
    transaction: Model,
  },

  //inicializar já com valores padrão
  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelance de website',
          type: 'deposit', 
          category: 'Dev',
          value : 9000,
          createdAt: new Date('2022-02-23 22:25:00')
        },
        {
          id: 2,
          title: 'Carne de porco',
          type: 'withdraw', 
          category: 'Food',
          value : 1,
          createdAt: new Date('2022-02-23 22:25:00')
        },
        {
          id: 3,
          title: 'Ovo assado',
          type: 'deposit', 
          category: 'Food',
          value : 50,
          createdAt: new Date('2021-12-23 22:25:00')
        },
      ]
    })
  },

  routes() {
    this.namespace = "api";

    this.post("/transactions", (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create("transaction", data);
    });

    this.get("/transactions", () => {
      return this.schema.all("transaction");
    });
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

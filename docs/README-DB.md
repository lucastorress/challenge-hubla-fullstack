# Database Diagram

## URL: <a href="https://dbdiagram.io/d/62c835b0cc1bc14cc58085ab">https://dbdiagram.io/d/62c835b0cc1bc14cc58085ab</a>

## UML Preview: [diagram-db.png](diagram-db.png)

```
Table products {
  id uuid [PK]
  title string
  producer_id uuid
}

Table transactions {
  id uuid [PK]
  batch_id uuid [not null]
  type number
  date datetime
  product_id uuid
  price char(30)
  user_id uuid
}

enum Roles {
  PRODUCER
  AFFILIATE
}

Table users {
  id uuid [PK]
  name string [not null, unique]
  email string [null]
  password string [null]
  role Roles
}

Table producer_affiliate {
  producer_id uuid
  affiliate_id uuid
}

Ref: transactions.product_id > products.id
Ref: transactions.user_id > users.id

Ref: products.producer_id > users.id

Ref: users.id < producer_affiliate.producer_id
Ref: users.id < producer_affiliate.affiliate_id
```

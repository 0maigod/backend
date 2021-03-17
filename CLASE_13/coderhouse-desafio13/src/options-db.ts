import { Knex } from 'knex'

const options: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: './DB/mensajes.sqlite',
  },
    useNullAsDefault: true,
}

export default options
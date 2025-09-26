from databases import Database

DATABASE_URL = "mysql+mysqlconnector://username:password@localhost:3306/dbname"

database = Database(DATABASE_URL)

/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tjz4pmhzvz4i1ti")

  collection.updateRule = ""
  collection.deleteRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tjz4pmhzvz4i1ti")

  collection.updateRule = "@request.auth.id = author.id"
  collection.deleteRule = "@request.auth.id = author.id"

  return dao.saveCollection(collection)
})

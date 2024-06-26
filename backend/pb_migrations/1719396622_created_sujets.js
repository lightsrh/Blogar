/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "tjz4pmhzvz4i1ti",
    "created": "2024-06-26 10:10:22.114Z",
    "updated": "2024-06-26 10:10:22.114Z",
    "name": "sujets",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "hxecj2c1",
        "name": "title",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "tqyd3opg",
        "name": "author",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": "@request.auth.id = author.id",
    "deleteRule": "@request.auth.id = author.id",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("tjz4pmhzvz4i1ti");

  return dao.deleteCollection(collection);
})

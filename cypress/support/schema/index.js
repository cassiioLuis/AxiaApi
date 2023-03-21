exports.books = 
{
    "title": "Root Schema",
    "type": "object",
    "required": [
        "books"
    ],
    "properties": {
        "books": {
            "title": "The books Schema",
            "type": "array",
            "items": {
                "title": "A Schema",
                "type": "object",
                "required": [
                    "isbn",
                    "title",
                    "subTitle",
                    "author",
                    "publish_date",
                    "publisher",
                    "pages",
                    "description",
                    "website"
                ],
                "properties": {
                    "isbn": {
                        "title": "The isbn Schema",
                        "type": "string"
                    },
                    "title": {
                        "title": "The title Schema",
                        "type": "string"
                    },
                    "subTitle": {
                        "title": "The subTitle Schema",
                        "type": "string"
                    },
                    "author": {
                        "title": "The author Schema",
                        "type": "string"
                    },
                    "publish_date": {
                        "title": "The publish_date Schema",
                        "type": "string"
                    },
                    "publisher": {
                        "title": "The publisher Schema",
                        "type": "string"
                    },
                    "pages": {
                        "title": "The pages Schema",
                        "type": "integer"
                    },
                    "description": {
                        "title": "The description Schema",
                        "type": "string"
                    },
                    "website": {
                        "title": "The website Schema",
                        "type": "string"
                    }
                }
            }
        }
    }
}

exports.book =
{
    "title": "Root Schema",
    "type": "object",
    "required": [
        "isbn",
        "title",
        "subTitle",
        "author",
        "publish_date",
        "publisher",
        "pages",
        "description",
        "website"
    ],
    "properties": {
        "isbn": {
            "title": "The isbn Schema",
            "type": "string"
        },
        "title": {
            "title": "The title Schema",
            "type": "string"
        },
        "subTitle": {
            "title": "The subTitle Schema",
            "type": "string"
        },
        "author": {
            "title": "The author Schema",
            "type": "string"
        },
        "publish_date": {
            "title": "The publish_date Schema",
            "type": "string"
        },
        "publisher": {
            "title": "The publisher Schema",
            "type": "string"
        },
        "pages": {
            "title": "The pages Schema",
            "type": "integer"
        },
        "description": {
            "title": "The description Schema",
            "type": "string"
        },
        "website": {
            "title": "The website Schema",
            "type": "string"
        }
    }
}
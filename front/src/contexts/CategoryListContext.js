import {createContext} from 'react';

export const categoryList = [
    {
        "id": "1",
        "name": "Mobile",
        "providers": [
            {
                "id": "1",
                "name": "Bakcell",
                "fields": [
                    {
                        "id": "prefix_id",
                        "type": 4,
                        "label": "Prefix",
                        "options": [
                            {"k": "1", "v": "055"},
                        ]
                    },
                    {
                        "id": "phone_number",
                        "type": 2,
                        "label": "Phone number",
                    }
                ]
            },
            {
                "id": "2",
                "name": "Nar",
                "fields": [
                    {
                        "id": "prefix_id",
                        "type": 4,
                        "label": "Prefix",
                        "options": [
                            {"k": "1", "v": "055"},
                            {"k": "2", "v": "077"},
                        ]
                    }
                ]
            },
            {
                "id": "3",
                "name": "Azercell",
                "fields": [
                    {
                        "id": "prefix_id",
                        "type": 4,
                        "label": "Prefix",
                        "options": [
                            {"k": "1", "v": "050"},
                            {"k": "2", "v": "051"},
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "2",
        "name": "Utilities",
        "providers": [
            {
                "id": "1",
                "name": "Azeriqaz",
                "fields": [
                    {
                        "id": "subscriber_id",
                        "type": 1,
                        "label": "Subscriber"
                    }
                ]
            },
            {
                "id": "2",
                "name": "Azerisu",
                "fields": [
                    {
                        "id": "prefix_id",
                        "type": 4,
                        "label": "Prefix",
                        "options": [
                            {"k": "1", "v": "Residential"},
                            {"k": "2", "v": "Commercial"},
                        ]
                    },
                    {
                        "id": "subscriber_id",
                        "type": 1,
                        "label": "Subscriber"
                    }
                ]
            },
            {
                "id": "3",
                "name": "Grand Hayat",
                "fields": [
                    {
                        "id": "client_code",
                        "type": 2,
                        "label": "Client code"
                    }
                ]
            }
        ]
    },
    // {
    //     "id": "3",
    //     "name": "Banks",
    //     "providers": [
    //         {
    //             "id": "1",
    //             "name": "Kapital Bank",
    //             "fields": [
    //                 {}
    //             ]
    //         },
    //         {
    //             "id": "1",
    //             "name": "Pasha Bank",
    //             "fields": [
    //                 {}
    //             ]
    //         },
    //         {
    //             "id": "1",
    //             "name": "Access Bank",
    //             "fields": [
    //                 {}
    //             ]
    //         }
    //     ]
    // }
]

export const CategoryListContext = createContext(categoryList);

import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('address.db');

export const init = () => new Promise((resolve, reject) => {
    db.transaction(tx => {
        tx.executeSql(
            ('CREATE TABLE IF NOT EXISTS address (' +
                ' id INTEGER PRIMARY KEY NOT NULL,' +
                ' title TEXT NOT NULL,' +
                ' image TEXT NOT NULL,' +
                ' address TEXT NOT NULL,' +
                ' lat REAL NOT NULL,' +
                ' lng REAL NOT NULL);'
            ),
            [],
            () => {resolve()},
            (_, err) => {reject(err)}
        );
    });
});

export const insertAddress = (title, image, address, lat, lng) => new Promise((resolve, reject) => {
    db.transaction(tx => {
        tx.executeSql(
            'INSERT INTO address (title, image, address, lat, lng) VALUES (?, ?, ?, ?, ?)',
            [title, image, address, lat, lng],
            (_, result) => {resolve(result)},
            (_, err) => {reject(err)}
        );
    });
});

export const fetchAddress = () => new Promise((resolve, reject) => {
    db.transaction(tx => {
        tx.executeSql(
            'SELECT * FROM address',
            [],
            (_, result) => {resolve(result)},
            (_, err) => {reject(err)}
        );
    });
});

export const deleteAddress = (id) => new Promise((resolve, reject) => {
    db.transaction(tx => {
        tx.executeSql(
            'DELETE FROM address WHERE id = ?',
            [id],
            (_, result) => {resolve(result)},
            (_, err) => {reject(err)}
        );
    });
});

export const deleteAllAdresses = () => new Promise((resolve, reject) => {
    db.transaction(tx => {
        tx.executeSql(
            'DELETE FROM address',
            [],
            (_, result) => {resolve(result)},
            (_, err) => {reject(err)}
        );
    });
});
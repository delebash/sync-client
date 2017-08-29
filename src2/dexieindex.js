//import SyncClient from 'sync-client';
import Dexie from 'dexie';
// SyncClient is a subclass of Dexie
let db;
let id;
const DB_NAME = 'vdrs';

const versions = [{
            version: 1,
            stores: { // Has the same format as https://github.com/dfahlander/Dexie.js/wiki/Version.stores()
                friends: '$$id,name,shoeSize'
            },
        }];

async function opendb() {
   //let db = new Dexie(DB_NAME);
    db = new Dexie(DB_NAME);
    db.version(1).stores({
        friends: '++id,name,shoeSize,age'
    });
    db.open();
   // db.connect("http://localhost:3000");
    console.log(db.isOpen())
}

async function add() {
    try {
       //  id = db.getID();
        // or make a new one
        await db.friends.add({
            name: 'Camilla',
            age: 25
        });

        //The each function is usually from jquery but in this case it is just built into dexie, it is not native
        //foreach is but you have to make this .toArray()

        // let friends = await db.friends
        //     .where('age')
        //     .below(75);

        // friends.each (function (friend) {
        //     console.log (friend.name);
        // })
// or toArray
        let friends = await db.friends
            .where('age')
            .below(75).toArray();

        for (let friend of friends) {
            console.log(friend);
        }

    }
    catch (e) {
        alert(e)
    }
}

async function edit() {
    try {
        let friend = await db.friends.where("name").equalsIgnoreCase("dan")
        await db.friends.put({id:friend.id,name: "dan", shoeSize: 10})
        alert(friend.name + " has shoe size " + friend.shoeSize);
    }
    catch (e) {
        alert(e)
    }
}

async function get() {
    try {
        let friend = await db.friends.where({name: "cc"})
       // let friend = await db.friends.where("name").equalsIgnoreCase("dan")
        alert(friend.name + " has shoe size " + friend.shoeSize);
    }
    catch (e) {
        alert(e)
    }
}

document.querySelector('#opendb').addEventListener("click", function() {
    opendb();
});
document.querySelector('#add').addEventListener("click", function() {
    add()
});
document.querySelector('#edit').addEventListener("click", function() {
    edit()
});
document.querySelector('#get').addEventListener("click", function() {
    get()
});

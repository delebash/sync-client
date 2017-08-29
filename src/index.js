import SyncClient from 'sync-client';

let db;
let id;
const DB_NAME = 'aaa';

const versions = [{
    version: 1,
    stores: { // Has the same format as https://github.com/dfahlander/Dexie.js/wiki/Version.stores()
        test: '$$id,json'
    },
}];

async function opendb() {
    db = new SyncClient(DB_NAME, versions);
    db.connect("http://localhost:3001");
    db.open();
}

async function add() {
    try {
        //  id = db.getID();
        // or make a new one
        await db.test.add({
            json: {"this":"is","some":"test","json":"info"}
        });

        //The each function is usually from jquery but in this case it is just built into dexie, it is not native
        //foreach is but you have to make this .toArray()

        // let friends = await db.test
        //     .where('age')
        //     .below(75);

        // friends.each (function (friend) {
        //     console.log (friend.name);
        // })
// or toArray

        let friends = await db.test.toArray()

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

        let friends = await db.test
            .where("id").equalsIgnoreCase("1").toArray()
        for (let friend of friends) {
            let result = await db.test.put({id:friend.id,name: "dan", shoeSize: 22, age:43})
            console.log('New id ' + result);
            let updated = await db.test.get(result);
            console.log(updated)
        }
    }
    catch (e) {
        alert(e)
    }
}

async function get() {
    try {
        let friends = await db.test.toArray()

        for (let friend of friends) {
            console.log(friend);
        }
    }
    catch (e) {
        alert(e)
    }
}
async function cleartable() {
    let result = await db.test.clear()
    console.log(result)
}
async function deletedb() {
    db.remove("http://localhost:3001");
    //let result = await db.delete()
   // console.log(result)
}

function isonline(){
    console.log(window.navigator.onLine)
}

document.querySelector('#opendb').addEventListener("click", function () {
    opendb();
});
document.querySelector('#add').addEventListener("click", function () {
    add()
});
document.querySelector('#edit').addEventListener("click", function () {
    edit()
});
document.querySelector('#get').addEventListener("click", function () {
    get()
});
document.querySelector('#cleartable').addEventListener("click", function () {
    cleartable();
});
document.querySelector('#deletedb').addEventListener("click", function () {
    deletedb();
});
document.querySelector('#isonline').addEventListener("click", function () {
    isonline();
});
const Entities = require('html-entities').XmlEntities;
 
const entities = new Entities();


let str = "McDonald&#039;s";
// let conversion = he.decode(str);
// console.log(conversion);

console.log(entities.decode(str));
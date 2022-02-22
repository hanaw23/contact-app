const fs = require("fs");
const chalk = require("chalk");
const validator = require("validator");
// const readline = require("readline");

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// * Membuat file data contacts jika belum ada
// * CARA 1:
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// * Membuat file contcts.json jika belum ada
const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

// * Memasukan data input kedalam contacts.json
// ! Input pertanyaan seperti ini memakan banyak line data dan pengulangan
// const pertanyaan_1 = () => {
//   return new Promise((resolve, reject) => {
//     rl.question("Input nama anda: ", (nama) => {
//       resolve(nama);
//     });
//   });
// };

// const pertanyaan_2 = () => {
//     return new Promise((resolve, reject) => {
//       rl.question("Input email anda: ", (email) => {
//         resolve(email);
//       });
//     });
// };

// const pertanyaan = (pertanyaan) => {
//   return new Promise((resolve, reject) => {
//     rl.question(pertanyaan, (input) => {
//       resolve(input);
//     });
//   });
// };

const loadContact = () => {
  const readJson = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(readJson);
  return contacts;
};

const simpanContacts = (nama, email, noHp) => {
  const contact = { nama, email, noHp };

  // ! Karena code ini akan selalu dipanggil di banyak proses maka dikeluarkan menjadi sebuah function
  // const readJson = fs.readFileSync("data/contacts.json", "utf-8");
  // const contacts = JSON.parse(readJson);
  const contacts = loadContact();

  // ! Cek duplikat
  const duplikat = contacts.find((contact) => contact.nama === nama);
  if (duplikat) {
    console.log(chalk.bgRed.black.bold("Contact sudah terdaftar, gunakan nama lain!"));
    return false;
  }

  // ! Cek email
  if (email) {
    if (!validator.isEmail(email)) {
      console.log(chalk.red.inverse.bold("Email tidak valid"));
      return false;
    }
  }

  // ! Cek nomor HP
  if (!validator.isMobilePhone(noHp, "id-ID")) {
    console.log(chalk.red.inverse.bold("nomor HP tidak valid"));
    return false;
  }

  contacts.push(contact);

  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));

  console.log(chalk.blue.inverse.bold(`Terimakasih ${contact.nama} sudah mengisi data.`));
};

const listContacts = () => {
  const contacts = loadContact();
  console.log(chalk.yellow.inverse.bold(`Daftar contact: `));
  contacts.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.nama} - ${contact.noHp}`);
  });
};

const detailContact = (nama) => {
  const contacts = loadContact();
  const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());

  if (!contact) {
    console.log(chalk.red.bold(`${nama} tidak ditemukan`));
    return false;
  }

  console.log(chalk.cyan.bold(contact.nama));
  console.log(contact.noHp);

  if (contact.email) {
    console.log(contact.email);
  }
};

const deleteContact = (nama) => {
  const contacts = loadContact();
  const newContacts = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase());

  if (contacts.length === newContacts.length) {
    console.log(chalk.red.bold(`${nama} tidak ditemukan`));
    return false;
  }

  fs.writeFileSync("data/contacts.json", JSON.stringify(newContacts));

  console.log(chalk.green.inverse.bold(`data contact ${nama} berhasil dihapus.`));
};

module.exports = { simpanContacts, listContacts, detailContact, deleteContact }; //pertanyaan };

/** 
 * * CARA 2:
 * ! Cara ini bisa menjadi call-back hell, apabila nambah input codingan akan semakin menjorok ke dalam
 * rl.question("Input nama anda: ", (nama) => {
   rl.question("Input nomor telepon anda: ", (noHp) => {
    const contact = {
      nama: nama,
      noHp: noHp,
    };

    const readJson = fs.readFileSync("data/contacts.json", "utf-8");
    const contacts = JSON.parse(readJson);

    contacts.push(contact);

    fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));

    console.log(`Terimakasih ${contact.nama} sudah mengisi data.`);

    rl.close();
  });
});
 */

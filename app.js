// * Mengambil argumen dari command line
// * Teknik menggunakan NPM
const contacts = require("./contacts");
const yargs = require("yargs");
const { demandCommand } = require("yargs");

yargs.command({
  command: "add",
  describe: "Menambahkan contact baru",
  builder: {
    nama: {
      describe: "Nama lengkap",
      demandOption: true,
      type: "string",
    },
    email: {
      describe: "email",
      demandOption: false,
      type: "string",
    },
    noHp: {
      describe: "Nomor handphone",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    contacts.simpanContacts(argv.nama, argv.email, argv.noHp);
  },
});
demandCommand();

// * Menampilkan daftar semua nama & no hp contact
yargs.command({
  command: "list",
  describe: "Menampilkan daftar semua nama & no hp contact",
  handler() {
    contacts.listContacts();
  },
});

// * Menampilkan detail sebuah contact
yargs.command({
  command: "detail",
  describe: "Menampilkan detail sebuah contact berdasarkan nama",
  builder: {
    nama: {
      describe: "Nama lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    contacts.detailContact(argv.nama);
  },
});

// * Menghapus contact berdasarkan nama
yargs.command({
  command: "delete",
  describe: "Menghapus contact berdasarkan nama",
  builder: {
    nama: {
      describe: "Nama lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    contacts.deleteContact(argv.nama);
  },
});

yargs.parse();

/**
 * * CARA 2: Tidak menggunakan NPM
 *  const contacts = require("./contacts");
    const main = async () => {
    const nama = await contacts.pertanyaan("Masukkan nama Anda: ");
    const email = await contacts.pertanyaan("Masukkan email Anda: ");
    const noHp = await contacts.pertanyaan("Masukkan no HP Anda: ");

    contacts.simpanContacts(nama, email, noHp);
    };

    main();
 * 
 */

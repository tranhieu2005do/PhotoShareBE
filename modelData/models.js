"use strict";

const schemaInfo = {
  load_date_time: "Fri Apr 29 2016 01:45:15 GMT-0700 (PDT)",
  __v: 0,
  _id: "57231f1b30e4351f4e9f4bf6",
};

const im = {
  _id: "57231f1a30e4351f4e9f4bd7",
  first_name: "Ian",
  last_name: "Malcolm",
  location: "Austin, TX",
  description: "Should've stayed in the car.",
  occupation: "Mathematician",
};
const er = {
  _id: "57231f1a30e4351f4e9f4bd8",
  first_name: "Ellen",
  last_name: "Ripley",
  location: "Nostromo",
  description: "Lvl 6 rating. Pilot.",
  occupation: "Warrant Officer",
};
const pt = {
  _id: "57231f1a30e4351f4e9f4bd9",
  first_name: "Peregrin",
  last_name: "Took",
  location: "Gondor",
  description: "Home is behind, the world ahead... And there are many paths to tread.",
  occupation: "Thain",
};
const rk = {
  _id: "57231f1a30e4351f4e9f4bda",
  first_name: "Rey",
  last_name: "Kenobi",
  location: "D'Qar",
  description: "Excited to be here!",
  occupation: "Rebel",
};
const al = {
  _id: "57231f1a30e4351f4e9f4bdb",
  first_name: "April",
  last_name: "Ludgate",
  location: "Pawnee, IN",
  description: "Witch",
  occupation: "Animal Control",
};
const jo = {
  _id: "57231f1a30e4351f4e9f4bdc",
  first_name: "John",
  last_name: "Ousterhout",
  location: "Stanford, CA",
  description: "<i>CS142!</i>",
  occupation: "Professor",
};

const users = [im, er, pt, rk, al, jo];

const photo1 = {
  _id: "57231f1a30e4351f4e9f4bdd",
  date_time: "2012-08-30 10:44:23",
  file_name: "ouster.jpg",
  user_id: jo._id,
};
const photo2 = {
  _id: "57231f1a30e4351f4e9f4bde",
  date_time: "2009-09-13 20:00:00",
  file_name: "malcolm2.jpg",
  user_id: im._id,
};
const photo3 = {
  _id: "57231f1a30e4351f4e9f4bdf",
  date_time: "2009-09-13 20:05:03",
  file_name: "malcolm1.jpg",
  user_id: im._id,
};
const photo4 = {
  _id: "57231f1a30e4351f4e9f4be0",
  date_time: "2013-11-18 18:02:00",
  file_name: "ripley1.jpg",
  user_id: er._id,
};
const photo5 = {
  _id: "57231f1a30e4351f4e9f4be1",
  date_time: "2013-09-20 17:30:00",
  file_name: "ripley2.jpg",
  user_id: er._id,
};
const photo6 = {
  _id: "57231f1a30e4351f4e9f4be2",
  date_time: "2009-07-10 16:02:49",
  file_name: "kenobi1.jpg",
  user_id: rk._id,
};
const photo7 = {
  _id: "57231f1a30e4351f4e9f4be3",
  date_time: "2010-03-18 23:48:00",
  file_name: "kenobi2.jpg",
  user_id: rk._id,
};
const photo8 = {
  _id: "57231f1a30e4351f4e9f4be4",
  date_time: "2010-08-30 14:26:00",
  file_name: "kenobi3.jpg",
  user_id: rk._id,
};
const photo9 = {
  _id: "57231f1a30e4351f4e9f4be5",
  date_time: "2013-12-03 09:02:00",
  file_name: "took1.jpg",
  user_id: pt._id,
};
const photo10 = {
  _id: "57231f1a30e4351f4e9f4be6",
  date_time: "2013-12-03 09:03:00",
  file_name: "took2.jpg",
  user_id: pt._id,
};
const photo11 = {
  _id: "57231f1a30e4351f4e9f4be7",
  date_time: "2013-09-04 09:16:32",
  file_name: "ludgate1.jpg",
  user_id: al._id,
};
const photo12 = {
  _id: "57231f1a30e4351f4e9f4be8",
  date_time: "2008-10-16 17:12:28",
  file_name: "kenobi4.jpg",
  user_id: rk._id,
};

const photos = [photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8, photo9, photo10, photo11, photo12];

const comment1 = {
  _id: "57231f1a30e4351f4e9f4be9",
  date_time: "2012-09-02 14:01:00",
  comment: "Learning to code!",
  user: jo,
  photo_id: photo1._id,
};
const comment2 = {
  _id: "57231f1a30e4351f4e9f4bea",
  date_time: "2013-09-06 14:02:00",
  comment: "Checking wrapping text...",
  user: jo,
  photo_id: photo1._id,
};
const comment3 = {
  _id: "57231f1a30e4351f4e9f4bed",
  date_time: "2013-11-28 17:45:13",
  comment: "Back from my trip!",
  user: er,
  photo_id: photo5._id,
};
const comment4 = {
  _id: "57231f1a30e4351f4e9f4bee",
  date_time: "2013-11-02 14:07:00",
  comment: "Great form Rey!",
  user: er,
  photo_id: photo7._id,
};

const comments = [comment1, comment2, comment3, comment4];

comments.forEach(function (comment) {
  const photo = photos.find(p => p._id === comment.photo_id);
  if (photo) {
    if (!photo.comments) {
      photo.comments = [];
    }
    photo.comments.push(comment);
  }
});

const userListModel = () => users;
const userModel = (userId) => users.find(u => u._id === userId) || null;
const photoOfUserModel = (userId) => photos.filter(photo => photo.user_id === userId);
const schemaModel = () => schemaInfo;

module.exports = {
  userListModel,
  userModel,
  photoOfUserModel,
  schemaInfo: schemaModel,
};

// import { db } from "../../../models";
// export default {

//   async index(req, res, next) {
//     try {
//       const { email,
//         message, 
//         subject, 
//         name,
//         time,
//         company } = req.body;
//       db.receiverdetails
//         .findOne({ where: { email: email } })
//         .then((data) => {
//           if (data) {
//             return db.receiverdetails.create(
//               {
//                 name: name,
//                 email: email,
//                 message: message,
//                 subject: subject,
//                 time: time,
//                 company: company,
//               },-
//             );
//           }
//           return db.deliveryslot.create({
//             name: name,
//             end_time: end_time,
//             start_time: start_time,
//           });
//         })
//         .then((deliveryslot) => {
//           res
//             .status(200)
//             .json({ success: true, msg: "Successfully inserted deliveryslot" });
//         })
//         .catch(function (err) {
//           next(err);
//         });
//     } catch (err) {
//       throw new RequestError("Error");
//     }
//   },

//   async List(req, res, next) {
//     try {
//       db.deliveryslot
//         .findAll()
//         .then((list) => {
//           res.status(200).json({ success: true, data: list });
//         })
//         .catch(function (err) {
//           next(err);
//         });
//     } catch (err) {
//       throw new RequestError("Error");
//     }
//   },

//   async Delete(req, res, next) {
//     try {
//       db.deliveryslot
//         .findOne({ where: { id: parseInt(req.query.id) } })
//         .then((row) => {
//           if (row) {
//             return db.deliveryslot.destroy({ where: { id: row.id } });
//           }
//           throw new RequestError("deliveryslot is not found");
//         })
//         .then((re) => {
//           return res.status(200).json({
//             msg: "success",
//             status: "Deleted deliveryslot Seccessfully",
//           });
//         })
//         .catch((err) => {
//           next(err);
//         });
//     } catch (err) {
//       throw new RequestError("Error");
//     }
//   },

//   // async Update(req, res, next) {
//   //   try {
//   //     console.log(req.params)
//   //     db.deliveryslot
//   //       .findOne({ where: { id: parseInt(req.params.id) } })
//   //       .then((row) => {
//   //         if (row) {
//   //           return db.deliveryslot.update(
//   //             { ...req.body },
//   //             { where: { id: row.id } }
//   //           );
//   //         }
//   //         throw new RequestError("No data found");
//   //       })
//   //       .then((re) => {
//   //         return res
//   //           .status(200)
//   //           .json({ msg: "success", status: "Update deliveryslot Seccessfully" });
//   //       })
//   //       .catch((err) => {
//   //         next(err);
//   //       });
//   //   } catch (err) {
//   //     throw new RequestError("Error");
//   //   }
//   // },
//   async Update(req, res, next) {
//     try {
//       const { id, start_time, name, end_time, is_active } = req.body;
//       db.deliveryslot
//         .findOne({ where: { id: parseInt(id) } })
//         .then((row) => {
//           if (row) {
//             return db.deliveryslot.update(
//               {
//                 id: id,
//                 start_time: start_time,
//                 name: name,
//                 end_time: end_time,
//                 is_active: parseInt(is_active) ? "1" : "0",
//               },
//               { where: { id: row.id } }
//             );
//           }
//           throw new RequestError("No data found");
//         })
//         .then((re) => {
//           return res
//             .status(200)
//             .json({ msg: "success", status: "Update deliveryslot Seccessfully" });
//         })
//         .catch((err) => {
//           next(err);
//         });
//     } catch (err) {
//       throw new RequestError("Error");
//     }
//   },
// };
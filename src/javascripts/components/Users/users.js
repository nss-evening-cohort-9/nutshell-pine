// import 'bootstrap';
// import usersData from '../../helpers/data/usersData';
// import util from '../../helpers/util';

// // Build the Modal if we have determined there is no Username for the existing User

// const userNameModal = (user) => {
//   const newUsernameModal = `
//   <div class="modal fade" id="users-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
//   aria-hidden="true">
//   <div class="modal-dialog" role="document">
//     <div class="modal-content">
//       <div class="modal-header text-center">
//         <h4 class="modal-title w-100 font-weight-bold">Sign in</h4>
//         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
//           <span aria-hidden="true">&times;</span>
//         </button>
//       </div>
//       <div class="modal-body mx-3">
//         <div class="md-form mb-5">
//           <i class="fas fa-envelope prefix grey-text"></i>
//           <input type="text" id="email-input" class="form-control" placeholder="Username" required>
//           <label data-error="wrong" data-success="right" for="defaultForm-email">Your email</label>
//         </div>
//         <div class="md-form mb-4">
//           <i class="fas fa-lock prefix grey-text"></i>
//           <input type="text" id="username-input" class="form-control" data-uid="${user.userId}" placeholder="Username" required>
//           <label data-error="wrong" data-success="right" for="defaultForm-username">User Name</label>
//         </div>
//       </div>
//       <div class="modal-footer d-flex justify-content-center">
//         <button class="btn btn-default">Save</button>
//       </div>
//     </div>
//   </div>
// </div>
//   `;
//   util.printToDom('new-user-modal', newUsernameModal);
// };

// const newUserLogin = (user) => {
//   // const userInput = document.getElementById('username-input').val();
//   // const emailInput = document.getElementById('email-input').value();
//   // const userId = document.getElementById('username-input').data('uid');
//   const newUser = {
//     uid: `${user.userId}`,
//     email: `${user.emailInput}`,
//     userName: `${user.userInput}`,
//   };
//   const currentUid = `${user.uid}`;
//   usersData.getUsers()
//     .then((resp) => {
//       const filteredUid = resp.filter(userId => userId === currentUid);
//       if (filteredUid.length < 1) {
//         console.error('New user added to Firebase');
//         usersData.createUserData(newUser);
//       } else if (filteredUid.length >= 1) {
//         console.error('User already Registered');
//       }
//     });
// };

// const usersEvents = () => {
//   document.getElementById('user-input').addEventListener('click', newUserLogin);
//   document.getElementById('username-save-btn').addEventListener('click', newUserLogin); // save button
// };
//   // Set the focus on the input box for the Modal
// //   $('body').on('shown.bs.modal', () => {
// //     $('#username-input').trigger('focus');
// //   });
// // };

// export default { userNameModal, usersEvents };

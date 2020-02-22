
// возвращает текущего юзера из localStorage
function getUser(item) {
  return JSON.parse(localStorage.getItem(item));
}

// удаляет текущего юзера из localStorage
function deleteUser(item) {
  localStorage.removeItem(item);
}


export {
  getUser,
  deleteUser,
};

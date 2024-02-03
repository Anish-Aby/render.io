type objectType = {
  userId: string;
  username: string;
  userImage: string;
};

export function isEmpty(obj: objectType) {
  // for (const prop in obj) {
  //   if (Object.prototype.hasOwnProperty.call(obj, prop)) {
  //     return false;
  //   }
  if (obj.userId === "") {
    return true;
  }

  return false;
}

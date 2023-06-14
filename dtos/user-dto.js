module.exports = class UserDto {
  email;
  id;
  username;
  isActivated;
  favorites;
  avatar;

  constructor(model) {
    this.email = model.email;
    this.id = model._id;
    this.username = model.username;
    this.isActivated = model.isActivated;
    this.favorites = model.favorites;
    this.avatar = model.avatar;
  }
};

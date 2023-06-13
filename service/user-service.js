const bcrypt = require("bcrypt");
const uuid = require("uuid");

const UserModel = require("../models/user-model");
const mailService = require("./mail-service");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");
const ApiError = require("../exceptions/api-error");

class UserService {
  async registration(email, password, username) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest(
        `User with email address ${email} already exists`
      );
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();

    const user = await UserModel.create({
      email,
      username,
      favorites: [],
      password: hashPassword,
      activationLink,
    });
    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate/${activationLink}`
    );

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async activate(activationLink) {
    const user = await UserModel.findOne({ activationLink });
    if (!user) {
      throw ApiError.BadRequest("Incorrect activation link");
    }
    user.isActivated = true;
    await user.save();
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest("User with this email was not found");
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest("Incorrect password");
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async getAllUsers() {
    const users = await UserModel.find();
    return users;
  }

  async update(form) {
    if (form.password) {
      form.password = await bcrypt.hash(form.password, 3);
    }

    if (form.email) {
      const candidate = await UserModel.findOne({ email: form.email });
      if (candidate) {
        throw ApiError.BadRequest(
          `User with email address ${form.email} already exists`
        );
      }

      const activationLink = uuid.v4();
      await mailService.sendActivationMail(
        form.email,
        `${process.env.API_URL}/api/activate/${activationLink}`
      );
      form.activationLink = activationLink;
      form.isActivated = false;
    }

    if (form.username) {
      const candidate = await UserModel.findOne({ username: form.username });
      if (candidate) {
        throw ApiError.BadRequest(`User named ${form.username} already exists`);
      }
    }

    if (form.id) {
      await UserModel.findByIdAndUpdate(form.id, {
        $set: form,
      });
    } else {
      throw ApiError.BadRequest(`User update error`);
    }

    return { ...form };
  }

  async addToFavorites(recipe, id) {
    const user = await UserModel.findById(id);
    const existRecipe = user.favorites.find((item) => item.id === recipe.id);

    if (!user) {
      throw ApiError.BadRequest("User is not found");
    }

    if (existRecipe) {
      throw ApiError.BadRequest("This recipe already exists");
    }

    user.favorites.push(recipe);
    user.save();

    return user;
  }

  async deleteFromFavorites(recipeId, id) {
    const user = await UserModel.findById(id);
    const existRecipe = user.favorites.find((item) => item.id === recipeId);

    if (!user) {
      throw ApiError.BadRequest("User is not found");
    }

    if (!existRecipe) {
      throw ApiError.BadRequest("This recipe already exists");
    }

    user.favorites = user.favorites.filter((item) => item.id !== recipeId);
    user.save();

    return user;
  }
}

module.exports = new UserService();

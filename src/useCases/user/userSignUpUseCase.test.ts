import { mock } from "jest-mock-extended";

import { User } from "@/domain/entity/user";
import { IHasher } from "@/useCases/interfaces/cryptograph";
import { ICheckEmailRepositorie } from "@/useCases/interfaces/repositories/ICheckEmailRepositorie";
import { ICheckUsernameRepositorie } from "@/useCases/interfaces/repositories/ICheckUsernameRepositorie";
import { IUserSignUpRepositorie } from "@/useCases/interfaces/repositories/IUserSignUpRepositorie";

import {
  EmailAlreadyExist,
  UsernameAlreadyExist,
} from "../interfaces/user/errors";
import UserSignUpUseCase from "./userSignUpUseCase";

describe("#userSignUpUseCase", () => {
  const makeSut = () => {
    const checkEmailRepository = mock<ICheckEmailRepositorie>();
    const checkUsernameRepository = mock<ICheckUsernameRepositorie>();
    const addUserRepository = mock<IUserSignUpRepositorie>();
    const hasher = mock<IHasher>();

    const sut = new UserSignUpUseCase(
      addUserRepository,
      checkEmailRepository,
      checkUsernameRepository,
      hasher
    );
    return {
      sut,
      addUserRepository,
      checkEmailRepository,
      checkUsernameRepository,
      hasher,
    };
  };
  test("should sign up with sucess", async () => {
    const mockUser = {
      email: "testing@email",
      password: "testing password",
      name: "testing user",
      username: "testinuser",
    };

    const { sut, hasher, addUserRepository } = makeSut();

    hasher.hash.mockResolvedValue("abc");
    addUserRepository.signUp.mockResolvedValue(true);

    jest
      .spyOn(User, "create")
      // @ts-ignore
      .mockReturnValue(new User({ ...mockUser }));

    const res = await sut.signUp(mockUser);

    expect(hasher.hash).toHaveBeenCalledWith(mockUser.password);
    expect(User.create).toHaveBeenCalledWith(mockUser);
    expect(addUserRepository.signUp).toHaveBeenCalledWith({
      ...mockUser,
      password: "abc",
    });
    expect(res).toBeTruthy();
  });

  test("should not sign up, because this email already exist", async () => {
    const { sut, checkEmailRepository } = makeSut();

    const mockUser = {
      email: "testing@email",
      password: "testing password",
      name: "testing user",
      username: "testinuser",
    };

    checkEmailRepository.check.mockResolvedValue(true);

    try {
      await sut.signUp(mockUser);
    } catch (err) {
      expect(checkEmailRepository.check).toHaveBeenCalledWith(mockUser.email);
      expect(err).toBeInstanceOf(EmailAlreadyExist);
    }
  });

  test("should not sign up, because this username already exist", async () => {
    const { sut, checkUsernameRepository } = makeSut();

    const mockUser = {
      email: "testing@email",
      password: "testing password",
      name: "testing user",
      username: "testinuser",
    };

    checkUsernameRepository.check.mockResolvedValue(true);
    try {
      await sut.signUp(mockUser);
    } catch (err) {
      expect(checkUsernameRepository.check).toHaveBeenCalledWith(
        mockUser.username
      );
      expect(err).toBeInstanceOf(UsernameAlreadyExist);
    }
  });
});

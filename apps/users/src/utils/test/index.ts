import { CreateCountryDto } from '@app/contract/users/dto/country/create.country.dto';
import { CreateInfluencerDto } from '@app/contract/users/dto/create.influencer.dto';
import { CreateMerchantDto } from '@app/contract/users/dto/create.merchant.dto';
import { CreateTrainerDto } from '@app/contract/users/dto/create.trainer.dto';
import { CreateUserDto } from '@app/contract/users/dto/create.user.dto';
import { CreateStateDto } from '@app/contract/users/dto/state/create.state.dto';
import { UpdateInfluencerDto } from '@app/contract/users/dto/update.influencer.dto';
import { UpdateMerchantDto } from '@app/contract/users/dto/update.merchant.dto';
import { UpdateTrainerDto } from '@app/contract/users/dto/update.trainer.dto';
import { UpdateUserDto } from '@app/contract/users/dto/update.user.dto';
import { Gender, ROLE } from '@app/database/enums';

export const getRegisterUserDto = role => {
	return {
		email: 'test@example.com',
		password: 'password123',
		username: 'testuser',
		role: role,
	};
};

export const getfindByUserNameDto = () => {
	return { id: '1', username: 'testuser', email: 'test@example.com' };
};

export const getResetPasswordUserDto = () => {
	return { id: '1', newPassword: 'newpassword123' };
};
export const getResetPasswordMockUser = () => {
	return { id: '1', password: 'oldHashedPassword' };
};

export const getCreateUserDto = () => {
	const createUserDto = new CreateUserDto();
	createUserDto.email = 'test@example.com';
	createUserDto.password = 'password123';
	createUserDto.username = 'testuser';
	createUserDto.firstName = 'Test';
	createUserDto.lastName = 'User';
	createUserDto.mobileNumber = '1234567890';
	createUserDto.dob = '1990-01-01';
	createUserDto.gender = Gender.MALE;
	return createUserDto;
};
export const getUpdateUserDto = () => {
	const updatedUserDto = new UpdateUserDto();
	updatedUserDto.firstName = 'UpdatedName';
	updatedUserDto.lastName = 'UpdatedlastName';
	updatedUserDto.mobileNumber = '1234567890';
	updatedUserDto.dob = '1990-01-01';
	updatedUserDto.gender = Gender.MALE;
	return updatedUserDto;
};
export const getMockUserDto = () => {
	return { id: '1', username: 'testuser', email: 'test@example.com', role: { name: ROLE.BUYER } };
};

export const getCreateMerchantDto = () => {
	const createMerchantDto: CreateMerchantDto = {
		username: 'merchantUser',
		email: 'merchant@example.com',
		password: 'password',
		dob: '1990-01-01',
		mobileNumber: '123456789',
		firstName: 'firstName',
		lastName: 'lastName',
		gender: Gender.MALE,
	};
	return createMerchantDto;
};

export const getUpdateMerchantDto = () => {
	const updateMerchantDto: UpdateMerchantDto = {
		firstName: 'firstName',
		lastName: 'lastName',
		gender: Gender.MALE,
		mobileNumber: '343434343434',
		dob: '1990-01-01',
	};
	return updateMerchantDto;
};
export const getCreateInfluencerDto = () => {
	const createInfluencerDto: CreateInfluencerDto = {
		username: 'influencerUser',
		email: 'influencer@example.com',
		password: 'password',
		dob: '1990-01-01',
		mobileNumber: '123456789',
		firstName: 'firstName',
		lastName: 'lastName',
		gender: Gender.MALE,
	};
	return createInfluencerDto;
};

export const getUpdateInfluencerDto = () => {
	const updateInfluencerDto: UpdateInfluencerDto = {
		firstName: 'firstName',
		lastName: 'lastName',
		gender: Gender.MALE,
		mobileNumber: '343434343434',
		dob: '1990-01-01',
	};
	return updateInfluencerDto;
};

export const getCreateTrainerDto = () => {
	const createTrainerDto: CreateTrainerDto = {
		username: 'trainerUser',
		email: 'trainer@example.com',
		password: 'password',
		dob: '1990-01-01',
		mobileNumber: '123456789',
		firstName: 'firstName',
		lastName: 'lastName',
		gender: Gender.MALE,
	};
	return createTrainerDto;
};

export const getUpdateTrainerDto = () => {
	const updateTrainerDto: UpdateTrainerDto = {
		firstName: 'firstName',
		lastName: 'lastName',
		gender: Gender.MALE,
		mobileNumber: '343434343434',
		dob: '1990-01-01',
	};
	return updateTrainerDto;
};
export const getMockCountriesResult = () => {
	const countries = [
		{ id: '1', name: 'Country1' },
		{ id: '2', name: 'Country2' },
	];
	return countries;
};
export const getMockCountyResult = () => {
	const country = { id: '1', name: 'Country1' };
	return country;
};
export const getcountyDto = () => {
	const countryDto = new CreateCountryDto();
	countryDto.name = 'Country';
	return countryDto;
};

export const getStateDto = () => {
	const stateDto = new CreateStateDto();
	stateDto.name = 'State';
	stateDto.country_id = '1';
	return stateDto;
};

export const getMockStatesResult = () => {
	const states = [
		{ id: '1', name: 'State1' },
		{ id: '2', name: 'State2' },
	];
	return states;
};
export const getMockStateResult = () => {
	const state = { id: '1', name: 'State' };
	return state;
};

/**
 * Pattern constants for the Users microservice.
 */
export const USERS_PATTERN = {
	FIND_ALL: 'users.findAll',
	FIND_ONE: 'users.findOne',
	CREATE: 'users.create',
	UPDATE: 'users.update',
	REMOVE: 'users.remove',
	REGISTER: 'users.register',
	RESET_PASSWORD: 'users.resetPassword',
	LOGIN: 'users.login',
	FIND_BY_USERNAME: 'users.findByUsername',
	FIND_USER: 'users.findUser',

	UPDATE_USER: 'users.updateUser', //need to verifty it is used or not

	CREATE_MERCHANT: 'merchants.create',
	UPDATE_MERCHANT: 'merchants.update',
	REMOVE_MERCHANT: 'merchants.remove',
	FIND_ALL_MERCHANT: 'merchants.findAll',
	FIND_ONE_MERCHANT: 'merchants.findOne',

	CREATE_INFLUENCER: 'influencers.create',
	UPDATE_INFLUENCER: 'influencers.update',
	REMOVE_INFLUENCER: 'influencers.remove',
	FIND_ALL_INFLUENCER: 'influencers.findAll',
	FIND_ONE_INFLUENCER: 'influencers.findOne',

	CREATE_TRAINER: 'trainer.create',
	UPDATE_TRAINER: 'trainer.update',
	REMOVE_TRAINER: 'trainer.remove',
	FIND_ALL_TRAINER: 'trainer.findAll',
	FIND_ONE_TRAINER: 'trainer.findOne',

	//Settings
	CREATE_SETTINGS_SUB_ROLE: 'settings.createSubRole',
	FIND_ALL_SETTINGS_SUB_ROLE: 'settings.findAllSubRole',
	FIND_ONE_SETTINGS_SUB_ROLE: 'settings.findOneSubRole',
	UPDATE_SETTINGS_SUB_ROLE: 'settings.updateSubRole',
	DELETE_SETTINGS_SUB_ROLE: 'settings.deleteSubRole',

	FIND_ALL_SETTINGS_PERMISSION: 'settings.findAllPermissions',
	FIND_ALL_SETTINGS_ENTITY_TYPES: 'settings.findAllEntityTypes',

	//country
	CREATE_COUNTRY: 'country.create',
	UPDATE_COUNTRY: 'country.update',
	REMOVE_COUNTRY: 'country.remove',
	FIND_ALL_COUNTRY: 'country.findAll',
	FIND_ONE_COUNTRY: 'country.findOne',

	//state
	CREATE_STATE: 'state.create',
	UPDATE_STATE: 'state.update',
	REMOVE_STATE: 'state.remove',
	FIND_ALL_STATE: 'state.findAll',
	FIND_ONE_STATE: 'state.findOne',
	FIND_STATE_BY_COUNTRY: 'state.findStateByCountry',

	//city
	CREATE_CITY: 'city.create',
	UPDATE_CITY: 'city.update',
	REMOVE_CITY: 'city.remove',
	FIND_ALL_CITY: 'city.findAll',
	FIND_ONE_CITY: 'city.findOne',
};

export const WRONG_CLASS_NAME = 'engin/wrong-class-name';
export const WRONG_METHOD_NAME = 'engin/wrong-method-name';
export const RESULT_IS_NOT_OBJECT = 'engin/result-is-not-object';
export const USER_CREATE_FAILED = 'engin/user-create-failed';
export const USER_NOT_EXIST = 'engin/user-not-exist';
export const AUTH_EMAIL_ALREADY_EXISTS = 'auth/email-already-exists';
export const AUTH_INVALID_PHONE_NUMBER = 'auth/invalid-phone-number';
export const AUTH_INVALID_UID = 'auth/invalid-uid';
export const AUTH_USER_NOT_FOUND = 'auth/user-not-found';

export const AUTH_PHONE_NUMBER_ALREADY_EXISTS = 'auth/phone-number-already-exists';

export const INPUT_NOT_PROVIDED = 'engin/input-data-is-not-provided';
export const EMAIL_NOT_PROVIDED = 'engin/email-is-not-provided';
export const PASSWORD_NOT_PROVIDED = 'engin/password-is-not-provided';

export const PERMISSION_DEFINED = 'engin/permission-denied';


export const INPUT_IS_EMPTY = 'engin/input-is-empty';
export const ID_IS_EMPTY = 'engin/id-is-empty';
export const TITLE_IS_EMPTY = 'engin/title-is-empty';

export const POST_ID_IS_UNDEFINED = 'engin/post-id-is-undefined';
export const CATEGORY_IS_UNDEFINED = 'engin/category-is-undefined';

export const UNDEFINED_FIELD_VALUE = 'engin/undefined-field-value';

export interface UserAuth {
    email: string;
    uid: string;
};

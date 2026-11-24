export const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
export const PHONEREGEX = /^(\+91|\+91\-|0)?[789]\d{9}$/;
export const PASSWORDREGEX=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;


export const STATUS={
    ACTIVE:1,
    INACTIVE:2,
}
export const ROLE={
    STUDENT:1,
    TEACHER:2,
    ADMIN:0,
}
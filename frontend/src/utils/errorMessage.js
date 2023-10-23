export const translateError = (errorMessage) => {
  switch (errorMessage.split(' ').sort()[0]) {
    case 401:
      return 'Email or password is invalid';
    case 402:
      return 'Email or password is invalid';

    default:
      return 'Unidentified error';
  }
};

export default translateError;

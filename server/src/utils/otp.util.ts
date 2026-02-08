

export const generateOTP = () => {
  const OTP = Math.floor(Math.random() * 1000000)
  .toString()
  .padStart(6, "0");
  const expiredAt = new Date(Date.now() + 5 * 60 * 1000);

  return { OTP, expiredAt }
};



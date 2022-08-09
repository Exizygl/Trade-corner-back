const signUpErrors = (err) => {
  let errors = { pseudo: "", email: "" };
  console.log(err);
  //   if (err.message("pseudo")) errors.pseudo = "Pseudo incorrect ou déjà pris";

  //   if (err.message("email")) errors.email = "Email incorrect";

  //   if (err.message("password"))
  //     errors.password = "Le mot de passe doit faire 6 caractères minimum";

  if (err === "Ce pseudo est déjà choisi")
    errors.pseudo = "Ce pseudo est déjà pris";

  if (err === "Cet email est déjà enregistré")
    errors.email = "Cet email est déjà enregistré";
  return errors;
};

const signInErrors = (err) => {
  let errors = { email: "", password: "", isValid: "" };

  if (err === "Authentication error - wrong email")
    errors.email = "Email inconnu";
  else if (err === "Authentication error - wrong password")
    errors.password = "Le mot de passe ne correspond pas";
  else if (err === "Please confirm your email to login - user is not valid")
    errors.isValid = "L'inscription n'est pas encore confirmé";

  return errors;
};

const updateErrors = (err) => {
  let errors = {
    passwordNotMatch: "",
    password: "",
    email: "",
    pseudo: "",
    zipcode: "",
    city: "",
  };

  if (err === "Update User error - Not the same password")
    errors.passwordNotMatch = "Les mots de passes sont différents";
  else if (err === "Update User error - Password too short")
    errors.passwordLenght = "Le mot de passe est trop cour";
  else if (err === "Update User error - Error old password")
    errors.password = "L'ancien mot de passe ne correspond pas";
  else if (err === "Update User error - Email already taken")
    errors.email = "Email déjà prit";
  else if (err === "Update User error - Pseudo already taken")
    errors.pseudo = "Pseudo déjà prit";
  else if (err === "Update User error - Zipcode too long")
    errors.zipcode = "Code postal trop long";
  else if (err === "Update User error - City has number")
    errors.city = "La ville ne peut pas contenir de chiffre";

  return errors;
};

const passwordChangeErrors = (err) => {
  let errors = { passwordNotMatch: "", password: "", email: "" };

  if (err === "Password Change error - wrong email")
    errors.email = "L'email n'est pas bon";
  else if (err === "Password Change error - Not the same password")
    errors.passwordNotMatch = "Les mots de passes sont différents";
  else if (err === "Password Change error - Password too short")
    errors.password = "Le mots de passe est trop cour";

  return errors;
};

const userSoftDeleteErrors = (err) => {
  let errors = { password: "" };

  if (err === "Delete User error - Mot de passe incorrect")
    errors.passwordNotMatch = "Mot de passe incorrect";

  return errors;
};

const ForgottenPasswordErrors = (err) => {
  let errors = { email: "" };

  if (err === "Authentication error - wrong email")
    errors.email = "Email inconnu";

  return errors;
};

module.exports = {
  signUpErrors,
  signInErrors,
  updateErrors,
  userSoftDeleteErrors,
  ForgottenPasswordErrors,
  passwordChangeErrors,
};

const signUpErrors = (err) => {
    let errors = { pseudo: '', email: '', password: '' }

    if (err.message.includes('pseudo'))
        errors.pseudo = "Pseudo incorrect ou déjà pris";

    if (err.message.includes('email'))
        errors.email = "Email incorrect";

    if (err.message.includes('password'))
        errors.password = "Le mot de passe doit faire 6 caractères minimum";

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('pseudo'))
        errors.pseudo = 'Ce pseudo est déjà pris';

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('email'))
        errors.email = 'Cet email est déjà enregistré';
    return errors
}

const signInErrors = (err) => {

    let errors = { email: '', password: '', isValid: '' }

    if (err === 'Authentication error - wrong email')
        errors.email = "Email inconnu";

    else if (err === 'Authentication error - wrong password')
        errors.password = "Le mot de passe ne correspond pas";

    else if (err === 'Please confirm your email to login - user is not valid')
        errors.isValid = "L'inscription n'est pas encore confirmé";

    return errors
}

const updateErrors = (err) => {

    let errors = { passwordNotMatch: '', password: '', isValid: '' }

    if (err === 'Update User error - Not the same password')
        errors.passwordNotMatch = "Les mots de passes sont différents";

    else if (err === 'Update User error - Error old password')
        errors.password = "L'ancien mot de passe ne correspond pas";

    else if (err === 'Update User error - Email already taken')
        errors.email = "Email déjà prit";

    else if (err === 'Update User error - Pseudo already taken')
        errors.pseudo = "Pseudo déjà prit";

    else if (err === 'Update User error - Zipcode too long')
        errors.zipcode = "Code postal trop long";

    return errors
}

const userSoftDeleteErrors = (err) => {

    let errors = { passwordNotMatch: '', password: '', isValid: '' }

    if (err === 'Delete User error - Mot de passe incorrect')
        errors.passwordNotMatch = "Mot de passe incorrect";

    return errors
}

module.exports = {
    signUpErrors,
    signInErrors,
    updateErrors,
    userSoftDeleteErrors
}
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
    console.log(err)

    let errors = { email: '', password: '', isValid: '' }

    if (err === 'Authentication error - wrong email')
        errors.email = "Email inconnu";

    if (err === 'Authentication error - wrong password')
        errors.password = "Le mot de passe ne correspond pas";

        if (err === 'Please confirm your email to login - user is not valid')
        errors.isValid = "L'inscription n'est pas encore confirmé";

    return errors
}

module.exports = {
    signUpErrors,
    signInErrors
}
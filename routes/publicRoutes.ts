import LoginScreen from "../screens/LoginScreen"
import RegistrationScreen from "../screens/RegistrationScreen"

export const publicRoute = () => {
    return [
        {
            name: "Login",
            component: LoginScreen
        },
        {
            name: "Register",
            component: RegistrationScreen
        }
    ]
}
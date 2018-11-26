import { showMessage } from "react-native-flash-message"; 

export const showFlashMessage = (message, description, type) => {
    showMessage({
        message: message,
        description: description,
        type: type,
    });
};
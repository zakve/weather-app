import { TextInputProps } from "react-native";
import { Input } from '@rneui/themed';

const InputUi = (props: TextInputProps) => {
    return (
        <Input
            {...props}
        />
    )
}

export default InputUi
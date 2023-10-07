import { UserPhone } from ".";

interface Creator {
    first_name: string;
    last_name: string;
    email: string;
    user_phone?: UserPhone;
}

export default Creator;
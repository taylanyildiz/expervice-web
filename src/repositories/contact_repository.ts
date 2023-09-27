import ContactForm from "@Models/contact_form";
import BaseRepository from "./base_repository";
import Contact from "./end-points/contact";
import SnackCustomBar from "@Utils/snack_custom_bar";

class ContactRespository extends BaseRepository {

    /**
     * Send Contact Form
     * @param props 
     */
    public async sendContactForm(props: ContactForm) {
        const path = Contact.contacts;
        const response = await this.post(path, props);
        const statusCode = response.status;
        if (statusCode !== 200) return;
        SnackCustomBar.status(response);
    }
}

export default ContactRespository;
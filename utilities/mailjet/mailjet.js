import Mailjet from "node-mailjet"
import { emailTemplate } from '../template/emailTemplate.js'


export const sendMailNotification = async (recipients) => {
  

  // mailjet connexion
  const mailjet = Mailjet.apiConnect(
    process.env.MJ_APIKEY_PUBLIC,
    process.env.MJ_APIKEY_PRIVATE,
     {
     config: {},
     options: {}
     } 
    )

    // send the email
    const request = await mailjet.post('send', { version: 'v3.1' }).request({
        Messages: [
            {
            
                From: {
                    Email: 'sst.v3r@gmail.com',
                    Name: 'Ville de Trois-Rivières'
                },

                To: recipients,
                

                Subject: 'Nouveau formulaire SST',
                HtmlPart: emailTemplate()
            }
        ]
    })
    console.log('-----------------------SEND MAIL---------------------------------')  
    console.log(request?.response?.status)   
    
}


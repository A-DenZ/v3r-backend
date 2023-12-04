import pool from "../../config/db.config.js"

export const sendNotification = async (targetedUser, triggeredBy, typeNotif, formID) => {
    
    const sqlCreateNotif = "INSERT INTO Notification (targetedUser, triggeredBy, type, formID) VALUES (?,?,?,?)"
    const sqlGetAdmin = "SELECT * FROM User WHERE AccessLevel = 3 LIMIT 1"
    
    const storeGetAdmin = await pool.query(sqlGetAdmin)



    if(typeNotif == 2){
        const storeCreateNotif = await pool.query(sqlCreateNotif, [
                                                                    storeGetAdmin[0][0]?.id,
                                                                    triggeredBy,
                                                                    typeNotif,
                                                                    formID        
                                                                  ]
                                                )
    }
    else{


        const storeCreateNotifAdmin = await pool.query(sqlCreateNotif, [
                                                                        storeGetAdmin[0][0]?.id,
                                                                        triggeredBy,
                                                                        typeNotif,
                                                                        formID        
                                                                       ]
                                                      )

        const storeCreateNotif = await pool.query(sqlCreateNotif, [
                                                                    targetedUser,
                                                                    triggeredBy,
                                                                    typeNotif,
                                                                    formID        
                                                                  ]
                                                )


    }
}
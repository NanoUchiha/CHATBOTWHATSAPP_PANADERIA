import BotWhatsapp from '@bot-whatsapp/bot'
import database from './database';
import provider from './provider';
import flow from './flow';
import "dotenv/config"

/**
 * Funcion encargada de iniciar el Bot
 */
const main = async () => {
    
   await BotWhatsapp.createBot({
        database,
        provider,
        flow
    })

}




main()
/** BotWhatsapp, Libreria de Javascript o Typescript, que nos permite generar chatbots dinamicos y estaticos, 
 * se pueden realizar chatbots personalizados, usando APIS o otras librerias, de aqui salen los
 * metodos addKeyword etc son exclusivos de esa libreria.
 */
import BotWhatsapp, { addKeyword } from '@bot-whatsapp/bot';

export default addKeyword(BotWhatsapp.EVENTS.ACTION)
.addAnswer('Valorame, te ayude a resolver tu problema, calificame en el siguiete formulario para seguir mejorando tu experiencia.')
.addAnswer('A continuacion te voy a mandar el formulario, muchas gracias por su participacion 😀.')



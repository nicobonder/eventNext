import path from "path"; //es de nodeJs
import fs from "fs";

function buildPath() {
  return path.join(process.cwd(), "data", "data.json");
}

function extractData(filePath) {
  const jsonData = fs.readFileSync(filePath);
  const data = JSON.parse(jsonData);
  return data;
}

export default function handler(req, res) {
  const { method } = req;
  const filePath = buildPath(); //dispara la funcion buildPath, que es la que obtiene el path al archivo de json
  const { events_categories, allEvents } = extractData(filePath); //destructura los 2 objetos que hay en data

  if (!allEvents) {
    return res.status(404).json({
      status: 404,
      message: "Events data not found",
    });
  }

  if (method === "POST") {
    const { email, eventId } = req.body;

    if(!email | !email.includes('@') | !email.includes('.')){
      res.status(422).json({message: 'Invalid email adress'})
      return;
    }

    const newAllEvents = allEvents.map((ev) => {
        if(ev.id === eventId) {
            if(ev.emails_registered.includes(email)){
                res.status(409).json({message: 'This email has already been registered'})
                return ev;
            }
            return {
                ...ev, emails_registered: [...ev.emails_registered, email]
            }
        }
        return ev; //si el id no es igual al que vino por body, devuelvo todo el evento.
    })

    //Para poder sobreescribir el archivo
    //como lo habia convertido en js object, usa stringify para convertirlo en string de nuevo
    fs.writeFileSync(filePath, JSON.stringify({events_categories,  allEvents: newAllEvents }))


    res.status(200).json({
      message: `You has been registered succesfully with the email: ${email} for the ${eventId} event`,
    });
  }
}

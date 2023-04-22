import SingleEvent from '@/src/components/events/single-Event';

const EventPage = ({ data }) => <SingleEvent data={data} />

export default EventPage;

export async function getStaticPaths(){
    const data = await import('/data/data.json');
    const allEvents = data.allEvents;

    const allPaths = allEvents.map(path => {
        return { //retorna un objeto con propiedades
            params: {  
                cat: path.city, //el path tb tiene cat como valor dinamico
                id: path.id //es id porque es el nombre que elegi para el archivo
            },
        }
    })

    return{
        paths: allPaths,
        fallback: false,
    }
}

export async function getStaticProps(context){
    const id = context.params.id;
    const { allEvents } = await import('/data/data.json'); //hacer esto es lo mismo q lo de la linea 10 y 11
    const eventData = allEvents.find((ev) => id === ev.id);
    console.log('eventData', eventData);

    return {
        props: { data: eventData },
    }
}
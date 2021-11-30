import Head from 'next/head';
import MeetupList from '../components/meetups/MeetupList';
import {MongoClient} from 'mongodb';
import { Fragment } from 'react';


function HomePage(props){

    return (
        <Fragment>
            <Head>
                <title>React Meetups</title>
                <meta
                   name="description"
                   content="Browser a huge list of higly active meetups!"
                />
            </Head>
            <MeetupList meetups = {props.meetups}/>
        </Fragment>
    )
}



//regenerated , data change very frequently
// export async function getServerSideProps(context){

//     const req = context.req;
//     const res = context.res;

//     return {
//         props:{
//             meetups: DUMMY_MEETUPS
//         },
//     };
// }


//change both run only on server
export async function getStaticProps() {
    

    const client = await MongoClient.connect('mongodb+srv://kartik:kartik@cluster0.hbs4s.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');
    const meetups = await meetupsCollection.find().toArray();

    client.close();

    return {
        props:{
            meetups: meetups.map( meetup => ({
                title : meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString(),
            }))
        },
        revalidate: 1
    }
}

export default HomePage;
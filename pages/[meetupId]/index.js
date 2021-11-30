import {MongoClient,ObjectId} from 'mongodb';
import { Fragment } from 'react';
import MeetupDetail from "../../components/meetups/MeetupDetail";
import Head from 'next/head';

function MeetupDetails(props) {
     
    console.log(props.image);
    return (
    <Fragment>    
        <Head>
           <title>{props.meetupData.title}</title>
           <meta 
             name="description"
             content = {props.meetupData.description}
            /> 
        </Head>
        <MeetupDetail
        image = {props.meetupData.image}
        title = {props.meetupData.title}
        address = {props.meetupData.address}
        description = {props.meetupData.description}
        />
    </Fragment>
    );
}


//useRouter can only be used in component function

export async function getStaticPaths() {
    
    const client = await MongoClient.connect('mongodb+srv://kartik:kartik@cluster0.hbs4s.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');
    const meetups = await meetupsCollection.find({},{_id: 1}).toArray();
    
    client.close();

    return{

        fallback: false,
        
        paths:  meetups.map ((meetup) => (
            {
                params: {
                    meetupId: meetup._id.toString()
                },
            }
        )),

    };
}

export async function getStaticProps(context){
    
    const meetupId = context.params.meetupId;
    
    const client = await MongoClient.connect('mongodb+srv://kartik:kartik@cluster0.hbs4s.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');
    const selectedMeetup = await meetupsCollection.findOne({_id: ObjectId(meetupId)});

    return {
        props:{
            meetupData:{
                id : selectedMeetup._id.toString(),
                image: selectedMeetup.image,
                title: selectedMeetup.title,
                address : selectedMeetup.address,
                description : selectedMeetup.description,
            }
        }
    }
}

export default MeetupDetails;
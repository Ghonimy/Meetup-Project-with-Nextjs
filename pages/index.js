import { Fragment } from 'react';
import Head from 'next/head';
import { MongoClient } from 'mongodb';

import MeetpList from '../components/meetups/MeetupList'

// const DUMMY_MEETUPS =[
//     {

//         id: 'm1',
//         title: 'A First Meetup',
//         image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Sphinx_and_the_Great_Pyramid_of_Giza_panorama.jpg/1280px-Sphinx_and_the_Great_Pyramid_of_Giza_panorama.jpg',
//         address: 'Some adress 5, 12345 Some City',
//         description: 'This is a first meetup'
//     },
//     {
//         id: 'm2',
//         title: 'A Second Meetup',
//         image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Little_Venice_in_Colmar_01.jpg/1280px-Little_Venice_in_Colmar_01.jpg',
//         address: 'Some address 10, 12345 Some City',
//         description: 'This is a second meetup'
//     }
// ]


function HomePage (props) {
    return  <Fragment>
            <Head>
                <title>Ghonemy's Meetups</title>
                <meta name="description" content="Browse a huge list of highly active meetups" />
            </Head>
            <MeetpList meetups={props.meetups} />
        </Fragment>
        
}


export async function getStaticProps () {

    const client = await MongoClient.connect('mongodb+srv://ghonemy:XJFv2Cl6RXra09OJ@cluster0.hi7xf.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();

    client.close();


    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString(),
            }))
        },
        revalidate: 1
    };
}
export default HomePage;
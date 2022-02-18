import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   return { props: { meetups: DUMMY_MEETUPS } };
// }

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://test:123@cluster0.pabyt.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close;

  return {
    props: {
      meetups: meetups.map((meetup) => {
        return {
          title: meetup.title,
          address: meetup.address,
          image: meetup.image,
          id: meetup._id.toString(),
        };
      }),
    },
    revalidate: 1,
  };
}

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

export default HomePage;

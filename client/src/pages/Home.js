import React, { useContext } from 'react'
import {useQuery} from '@apollo/react-hooks';
import { Dimmer, Grid, Header, Loader, Transition } from 'semantic-ui-react';
import PostCard from '../components/PostCard';
import { AuthContext } from "../context/auth"
import PostForm from '../components/PostForm';
import {FETCH_POSTS_QUERY} from '../utils/graphql';

const Home = () => {

    const { loading, data: { getPosts: posts } = {} } = useQuery(FETCH_POSTS_QUERY);
    const {user} = useContext(AuthContext)

    
    return (
        <Grid columns={1}>
            <Grid.Row style={{display:'flex', justifyContent: 'center', marginTop: 10}}>
                <h2>Recent posts</h2>
            </Grid.Row>

            { user && (
                <Grid.Column>
                    <PostForm />
                </Grid.Column>
            ) }
            <Grid.Row>
                {loading ? ( <Dimmer active inverted>
                                <Loader inverted>Loading</Loader>
                            </Dimmer> ) : (
                    <Transition.Group>
                        {posts && posts.map(post => (
                            <Grid.Column key={post.id} style={{marginBottom: 10}}>
                                <PostCard post={post} />
                            </Grid.Column>
                        ))}
                    </Transition.Group>
                )}
            </Grid.Row>
        </Grid>
    )
}


export default Home

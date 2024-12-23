import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag'
import moment from 'moment';
import React, { useContext, useRef, useState } from 'react'
import { Button, Card, Form, Grid, Icon, Image, Label } from 'semantic-ui-react';
import DeleteButton from '../components/DeleteButton';
import LikeButton from '../components/LikeButton';
import { AuthContext } from '../context/auth';
import CommentCard from '../components/CommentCard';
import CommentAddCard from '../components/CommentAddCard';
import CommentButton from '../components/CommentButton';
import ShareButton from '../components/ShareButton';

const SinglePost = (props) => {
	const postId = props.match.params.postId;

	const { user } = useContext(AuthContext);
	const [comment, setComment] = useState('');

	const commentInputRef = useRef(null);

	const { loading, data = {}
	} = useQuery(POST_QUERY, {
		variables: {
			postId
		}
	});
	const deletePostCallback = () => {
		props.history.push('/');
	}

	const [submitComment] = useMutation(CREATE_COMMENT, {
		update() {
			setComment('');
			commentInputRef.current.blur()
		},
		variables: {
			postId,
			body: comment
		}
	})

	let postMarkup;

	if (loading) {
		postMarkup = (<p>Loading Post...</p>)
	} else {
		const { id, body, createdAt, username, comments, likes, likeCount, commentCount } = data.getPost;
		postMarkup = (
			<Grid>
				<Grid.Row>
					<Grid.Column width={2}>
						<Image
							floated='right'
							size='small'
							src='https://semantic-ui.com/images/avatar/large/elliot.jpg'
						/>
					</Grid.Column>
					<Grid.Column width={10}>
						<Card fluid>
							<Card.Content>
								<Card.Header>
									{username}
								</Card.Header>
								<Card.Meta>
									{moment(createdAt).fromNow()}
								</Card.Meta>
								<Card.Description>
									{body}
								</Card.Description>
								<hr />
								<Card.Content extra>
									<LikeButton post={{ id, likes, likeCount }} />
									<CommentButton commentCount={commentCount} />
									<ShareButton postId={id} />
									{user && user.username === username && <DeleteButton postId={id} callback={deletePostCallback} />}
								</Card.Content>
							</Card.Content>
						</Card>

						{user && (
							<CommentAddCard
								comment={comment}
								setComment={setComment}
								submitComment={submitComment}
								ref={commentInputRef}
							/>
							// <Card fluid>
							// 	<Card.Content>
							// 		<p>Post a comment</p>
							// 		<Form>
							// 			<div className="ui action input fluid">
							// 				<input
							// 					type="text"
							// 					placeholder="Comment.."
							// 					name="comment"
							// 					value={comment}
							// 					onChange={event => setComment(event.target.value)}
							// 					ref={commentInputRef}
							// 				/>
							// 				<button
							// 					type="submit"
							// 					className="ui button teal"
							// 					disabled={comment.trim() === ''}
							// 					onClick={submitComment}
							// 				>
							// 					Send
							// 				</button>
							// 			</div>
							// 		</Form>
							// 	</Card.Content>
							// </Card>
						)}

						{comments.map(comment => (
							<CommentCard comment={comment} postId={id} />
						))}
					</Grid.Column>
				</Grid.Row>
			</Grid>
		)
	}


	return (
		<div>
			{postMarkup}
		</div>
	)
}

const POST_QUERY = gql`
    query($postId: ID!) {
        getPost(postId: $postId ){
            id 
            body 
            createdAt 
            username 
            likeCount 
            likes{
                username
            }
            commentCount
            comments{
                id 
                username 
                createdAt 
                body
            }
        }
    }
`

const CREATE_COMMENT = gql`
    mutation($postId: ID!, $body: String!){
        createComment(postId: $postId, body: $body){
            id
            comments {
                id body createdAt username
            }
            commentCount
        }
    }
`


export default SinglePost

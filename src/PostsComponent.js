import { useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { deletePost, fetchPosts } from "./redux/slices/postsSlice";

const PostsComponent = (props) => {
  const { fetchPosts, posts, deletePost } = props;
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <Container className="mt-4">
      <h2>Posts:</h2>
      <Row>
        {posts.map((post) => (
          <Col lg={4} className="mb-3 post" key={post.id} data-testid="post">
            <Card>
              <Card.Body>
                <Card.Title>
                  {post.id}. {post.title}
                </Card.Title>
                <Card.Text>{post.body}</Card.Text>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-end">
                <Button
                  variant="danger"
                  onClick={() => deletePost({ id: post.id })}
                  className="delete"
                >
                  Remove
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    posts: state.posts.posts,
    error: state.posts.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    deletePost: (id) => dispatch(deletePost(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsComponent);

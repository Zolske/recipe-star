// The code is based on  "Adam Lapinski's" walk-through project "Moments"!
// https://github.com/Code-Institute-Solutions/moments

import React from "react";
import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";

const Post = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    like_id,
    title,
    ingredients,
    content,
    image,
    updated_at,
    setPosts,
  } = props;

  const ingredientsArray = ingredients ? ingredients.split(";") : ['no ingredients listed'];
  const contentArray = content ? content.split(";") : ['no method written'];

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/posts/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      // await axiosRes.delete(`/posts/${id}/`);
      await axiosRes.delete(`/recipes/${id}/`);
      // history.goBack();
            history.push(`/`);
    } catch (err) {
      // console.log(err);
    }
  };

  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", { recipe: id });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
            : post;
        }),
      }));
    } catch (err) {
      // console.log(err);
    }
  };

  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count - 1, like_id: null }
            : post;
        }),
      }));
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <Card className={styles.Post}>
      <Card.Body>
        {title && <Card.Title className={styles.recipe_title}>{title}</Card.Title>}
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <span className={styles.cursive_explanation}>posted by</span>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span className={styles.cursive_explanation}>updated on&nbsp;</span>
            <span>{updated_at}</span>
            {is_owner && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/posts/${id}`}>
        <Card.Img src={image} alt={title} />
      </Link>
      <Card.Body>
        <hr></hr>
        <details><summary className={styles.summary_title}>ingredients list:</summary>
            <ul className={styles.ingredients_list}>
              {ingredientsArray.map((ingredient) => {
                return <li key={ingredient}>{ingredient}</li>
              })}
            </ul>
        </details>
        <hr></hr>
        <details><summary className={styles.summary_title}>cooking instructions:</summary>
          <ol className={styles.method_list}>
          {contentArray.map((content) => {
                return <div key={content}>
                  <li >{content}</li>
                  <div className={styles.icon_star}></div>
                  </div>
              })}
          </ol>
        </details>
        <hr></hr>
        <div className={styles.PostBar}>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own post!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          ) : like_id ? (
            <span onClick={handleUnlike}>
              <i className={`fas fa-heart ${styles.Heart}`} />
            </span>
          ) : currentUser ? (
            <span onClick={handleLike}>
              <i className={`far fa-heart ${styles.HeartOutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like posts!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          )}
          {/* {likes_count} not working bring back later ?*/}
          <Link to={`/posts/${id}`}>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Write a comment!</Tooltip>}
            >
              <i className="far fa-comments" />
            </OverlayTrigger>
          </Link>
          {/* {comments_count} not working bring back later ?*/}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Post;